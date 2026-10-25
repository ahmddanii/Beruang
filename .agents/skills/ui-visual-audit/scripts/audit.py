#!/usr/bin/env python3
"""UI Visual Audit — "unit test" visual untuk frontend.

Contoh:
  python audit.py --url http://localhost:3000
  python audit.py --file ./index.html --profile elderly
  python audit.py --url https://situs.com --viewports 375x812,1440x900 --out ./hasil --fail-on error

Keluaran (di folder --out):
  report.html          laporan visual (buka di browser)
  results.json         data mentah (untuk dibaca Claude / CI)
  screens/*.png        screenshot bersih
  screens/*.annotated  screenshot dengan penanda bernomor + potongan per bagian
"""
from __future__ import annotations
import argparse
import datetime
import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageChops

sys.path.insert(0, str(Path(__file__).parent))
from rules import PROFILES, Checker, score  # noqa: E402
from report import build_report  # noqa: E402

HERE = Path(__file__).parent
EXTRACT_JS = (HERE / "extract.js").read_text(encoding="utf-8")

DEFAULT_VIEWPORTS = {"mobile": (375, 812), "tablet": (768, 1024), "desktop": (1440, 900)}
MAX_SHOT_H = 7000
ANNOTATE_JS = """
(items) => {
  const old = document.getElementById('__uia_overlay'); if (old) old.remove();
  const root = document.createElement('div'); root.id = '__uia_overlay';
  root.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;z-index:2147483647;pointer-events:none;';
  const col = { error: '#e11d48', warn: '#f59e0b', info: '#2563eb' };
  for (const it of items) {
    const b = document.createElement('div');
    b.style.cssText = `position:absolute;left:${it.x}px;top:${it.y}px;width:${Math.max(it.w,6)}px;height:${Math.max(it.h,6)}px;` +
      `outline:3px solid ${col[it.sev]};outline-offset:1px;background:${col[it.sev]}22;box-sizing:border-box;`;
    const t = document.createElement('div');
    t.textContent = it.n;
    t.style.cssText = `position:absolute;left:-3px;top:-22px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;` +
      `background:${col[it.sev]};color:#fff;font:700 12px/20px system-ui,sans-serif;text-align:center;box-sizing:border-box;`;
    b.appendChild(t); root.appendChild(b);
  }
  document.body.appendChild(root);
}
"""


def parse_viewports(s):
    out = []
    if not s:
        return [(k, v[0], v[1]) for k, v in DEFAULT_VIEWPORTS.items()]
    for part in s.split(","):
        part = part.strip()
        if part in DEFAULT_VIEWPORTS:
            out.append((part, *DEFAULT_VIEWPORTS[part]))
        elif "x" in part:
            w, h = part.lower().split("x")
            out.append((f"{w}x{h}", int(w), int(h)))
    return out


def deep_update(a, b):
    for k, v in b.items():
        if isinstance(v, dict) and isinstance(a.get(k), dict):
            deep_update(a[k], v)
        else:
            a[k] = v
    return a


def merge_across(issues):
    """Gabungkan masalah yang sama dari beberapa ukuran layar menjadi satu temuan."""
    m = {}
    for i in issues:
        key = (i["rule"], i["sev"], i["targets"][0]["sel"] if i["targets"] else i["msg"][:50])
        if key not in m:
            m[key] = dict(i, targets=list(i["targets"]), vps=[i["vp"]], refs=[[i["vp"], i["n"]]])
            continue
        x = m[key]
        if i["vp"] not in x["vps"]:
            x["vps"].append(i["vp"])
        x["refs"].append([i["vp"], i["n"]])
        x["n_targets"] = max(x["n_targets"], i["n_targets"])
        have = {t["sel"] + t["msg"] for t in x["targets"]}
        for t in i["targets"]:
            if t["sel"] + t["msg"] not in have and len(x["targets"]) < 12:
                x["targets"].append(t)
    order = {"error": 0, "warn": 1, "info": 2}
    return sorted(m.values(), key=lambda i: (order[i["sev"]], i["rule"]))


def focus_test(page, els, limit=45):
    page.evaluate("document.activeElement && document.activeElement.blur(); window.scrollTo(0,0)")
    before = {e["id"]: e["snap"] for e in els if e["inter"]}
    result, seen = {}, set()
    for _ in range(limit):
        page.keyboard.press("Tab")
        info = page.evaluate("""() => { const a = document.activeElement; if (!a || a === document.body) return null;
            return { id: a.getAttribute('data-uia'), snap: window.__uia_snap(a) }; }""")
        if not info:
            break
        if info["id"] is None:
            continue
        i = int(info["id"])
        if i in seen:
            break
        seen.add(i)
        if i in before:
            result[i] = info["snap"] != before[i]
    page.evaluate("document.activeElement && document.activeElement.blur(); window.scrollTo(0,0)")
    return result


def split_parts(img: Image.Image, max_h: int):
    parts, y, n = [], 0, 0
    while y < img.height and n < 8:
        parts.append(img.crop((0, y, img.width, min(img.height, y + max_h))))
        y += max_h
        n += 1
    return parts


def visual_diff(base_path: Path, new_img: Image.Image, out_path: Path):
    base = Image.open(base_path).convert("RGB")
    new = new_img.convert("RGB")
    if base.size != new.size:
        h = min(base.height, new.height)
        info = {"same_size": False, "base": base.size, "new": new.size}
        base, new = base.crop((0, 0, min(base.width, new.width), h)), new.crop((0, 0, min(base.width, new.width), h))
    else:
        info = {"same_size": True}
    diff = ImageChops.difference(base, new).convert("L").point(lambda v: 255 if v > 24 else 0)
    changed = sum(1 for v in diff.getdata() if v) / max(1, diff.width * diff.height)
    overlay = new.copy()
    red = Image.new("RGB", new.size, (225, 29, 72))
    overlay = Image.composite(red, overlay, diff)
    overlay.save(out_path)
    info["changed_pct"] = round(changed * 100, 2)
    return info


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    src = ap.add_mutually_exclusive_group(required=True)
    src.add_argument("--url")
    src.add_argument("--file", help="path file HTML lokal")
    ap.add_argument("--profile", default="elderly", choices=list(PROFILES))
    ap.add_argument("--viewports", help="mis. mobile,tablet,desktop atau 375x812,1440x900 (default: ketiganya)")
    ap.add_argument("--out", default="ui-audit-output")
    ap.add_argument("--config", help="JSON: {thresholds:{}, ignore:[selectors], tokens:{font_sizes,colors,radii,spacing_base}}")
    ap.add_argument("--manual", help="JSON temuan penilaian visual dari Claude: [{title,severity,detail,fix,viewport}]")
    ap.add_argument("--baseline", help="folder baseline untuk regresi visual (dibuat jika belum ada)")
    ap.add_argument("--update-baseline", action="store_true")
    ap.add_argument("--wait", type=int, default=800, help="jeda ms setelah halaman termuat")
    ap.add_argument("--fail-on", default="error", choices=["error", "warn", "never"])
    ap.add_argument("--storage-state", help="file sesi login Playwright (untuk halaman yang butuh login)")
    ap.add_argument("--title")
    a = ap.parse_args()

    from playwright.sync_api import sync_playwright

    cfg = json.loads(Path(a.config).read_text(encoding="utf-8")) if a.config else {}
    P = deep_update(dict(PROFILES[a.profile]), cfg.get("thresholds", {}))
    out = Path(a.out)
    (out / "screens").mkdir(parents=True, exist_ok=True)
    target = a.url or Path(a.file).resolve().as_uri()
    vps = parse_viewports(a.viewports)
    all_issues, vp_results, regress = [], [], {}
    primary_inv, primary_w = {}, -1
    base_dir = Path(a.baseline) if a.baseline else None
    if base_dir:
        base_dir.mkdir(parents=True, exist_ok=True)
    largest = max(vps, key=lambda v: v[1])[0]

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for label, w, h in vps:
            ctx_args = dict(viewport={"width": w, "height": h}, device_scale_factor=1, is_mobile=w < 600, has_touch=w < 600)
            if a.storage_state:
                ctx_args["storage_state"] = a.storage_state
            ctx = browser.new_context(**ctx_args)
            page = ctx.new_page()
            errs = []
            page.on("pageerror", lambda e: errs.append(str(e)))
            try:
                page.goto(target, wait_until="networkidle", timeout=45000)
            except Exception:
                page.goto(target, wait_until="load", timeout=45000)
            page.wait_for_timeout(a.wait)
            # picu lazy-load
            H = page.evaluate("document.documentElement.scrollHeight")
            for y in range(0, min(H, MAX_SHOT_H), max(300, h // 2)):
                page.evaluate(f"window.scrollTo(0,{y})")
                page.wait_for_timeout(60)
            page.evaluate("window.scrollTo(0,0)")
            page.wait_for_timeout(200)

            data = page.evaluate(EXTRACT_JS, {"ignore": cfg.get("ignore", [])})
            focus = focus_test(page, data["els"]) if label == largest else None
            vp = {"label": label, "w": w, "h": h}
            ck = Checker(data, vp, P, cfg.get("tokens"), focus)
            issues = ck.run()
            if w > primary_w:
                primary_w, primary_inv = w, ck.inv
            for i in issues:
                i["viewport_size"] = f"{w}×{h}"

            # screenshot bersih
            page.evaluate("window.scrollTo(0,0)")
            H = min(page.evaluate("document.documentElement.scrollHeight"), MAX_SHOT_H)
            clip = {"x": 0, "y": 0, "width": w, "height": H}
            clean_png = page.screenshot(full_page=True, clip=clip, type="png")
            clean = Image.open(io.BytesIO(clean_png)).convert("RGB")
            clean_path = out / "screens" / f"{label}.png"
            clean.save(clean_path)

            # penomoran + anotasi (error dulu)
            order = {"error": 0, "warn": 1, "info": 2}
            issues.sort(key=lambda i: (order[i["sev"]], i["rule"]))
            marks = []
            for n, i in enumerate(issues, 1):
                i["n"] = n
                if n <= 70:
                    for t in i["targets"][:6]:
                        r = t["rect"]
                        if r["y"] < MAX_SHOT_H:
                            marks.append({"x": r["x"], "y": r["y"], "w": r["w"], "h": r["h"], "sev": i["sev"], "n": n})
            page.evaluate(ANNOTATE_JS, marks)
            ann_png = page.screenshot(full_page=True, clip=clip, type="png")
            ann = Image.open(io.BytesIO(ann_png)).convert("RGB")
            ann_path = out / "screens" / f"{label}.annotated.png"
            ann.save(ann_path)
            part_h = int(h * 1.25)
            parts = []
            for k, part in enumerate(split_parts(ann, part_h), 1):
                p = out / "screens" / f"{label}.annotated.part{k}.png"
                part.save(p)
                parts.append(str(p.relative_to(out)))

            if base_dir:
                bp = base_dir / f"{label}.png"
                if bp.exists() and not a.update_baseline:
                    regress[label] = visual_diff(bp, clean, out / "screens" / f"{label}.diff.png")
                    regress[label]["diff_image"] = f"screens/{label}.diff.png"
                    regress[label]["baseline_image"] = None
                else:
                    clean.save(bp)
                    regress[label] = {"created": True}

            vp_results.append({"label": label, "w": w, "h": h, "page_height": data["meta"]["docH"], "issues": issues,
                               "image": f"screens/{label}.annotated.png", "clean": f"screens/{label}.png",
                               "parts": parts, "js_errors": errs[:5], "elements": len(data["els"])})
            all_issues += issues
            ctx.close()
        browser.close()

    merged = merge_across(all_issues)
    overall, cats = score(merged)
    manual = json.loads(Path(a.manual).read_text(encoding="utf-8")) if a.manual else []
    result = {
        "target": a.url or a.file, "profile": a.profile, "profile_label": P["label"],
        "date": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
        "score": overall, "category_scores": cats,
        "counts": {s: sum(1 for i in merged if i["sev"] == s) for s in ("error", "warn", "info")},
        "instances": {s: sum(max(1, i["n_targets"]) for i in merged if i["sev"] == s) for s in ("error", "warn", "info")},
        "viewports": [{k: v for k, v in r.items() if k != "issues"} | {"issue_count": len(r["issues"])} for r in vp_results],
        "issues_by_viewport": {r["label"]: r["issues"] for r in vp_results},
        "issues": merged, "inventory": primary_inv, "regression": regress, "manual": manual, "thresholds": P,
    }
    (out / "results.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    build_report(result, vp_results, out, a.title or (a.url or Path(a.file).name))

    c = result["counts"]
    print(f"\n=== UI Visual Audit — profil: {P['label']} ===")
    ins = result["instances"]
    print(f"Skor: {overall}/100   Error: {c['error']} jenis ({ins['error']} elemen)   Peringatan: {c['warn']} jenis ({ins['warn']} elemen)   Info: {c['info']}")
    for k, v in cats.items():
        from rules import CATS
        print(f"  {CATS[k]:<26}{v}")
    print(f"Laporan : {out / 'report.html'}")
    print(f"Data    : {out / 'results.json'}")
    if regress:
        for k, v in regress.items():
            print(f"Regresi {k}: " + ("baseline dibuat" if v.get('created') else f"{v['changed_pct']}% piksel berubah"))
    if a.fail_on == "error" and c["error"]:
        sys.exit(1)
    if a.fail_on == "warn" and (c["error"] or c["warn"]):
        sys.exit(1)


if __name__ == "__main__":
    main()