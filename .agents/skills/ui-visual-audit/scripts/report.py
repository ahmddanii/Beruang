"""Membangun report.html (satu file, gambar tertanam) dari hasil audit."""
from __future__ import annotations
import base64
import collections
import html
import io
from pathlib import Path

from PIL import Image
from rules import CATS, RULES

E = html.escape
SEV_LABEL = {"error": "Error", "warn": "Peringatan", "info": "Info"}
SEV_ORDER = {"error": 0, "warn": 1, "info": 2}


def b64(path: Path, q=72, maxw=1500):
    img = Image.open(path).convert("RGB")
    if img.width > maxw:
        img = img.resize((maxw, int(img.height * maxw / img.width)))
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=q)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def grade(s):
    if s >= 90:
        return "Sangat baik", "ok"
    if s >= 75:
        return "Perlu perbaikan kecil", "warn"
    if s >= 50:
        return "Banyak masalah", "bad"
    return "Kritis", "bad"


def bar_row(label, n, mx, extra=""):
    pct = 0 if not mx else max(4, int(n / mx * 100))
    return f'<div class="brow"><span class="bl">{label}</span><span class="bt"><i style="width:{pct}%"></i></span><span class="bn">{n}</span>{extra}</div>'


def inventory_html(inv):
    if not inv:
        return ""
    out = []
    mx = max([f["n"] for f in inv["font_sizes"]] or [1])
    fs = []
    for f in inv["font_sizes"]:
        size = min(f["px"], 34)
        flag = ' <span class="tag warn">kecil</span>' if f["px"] < 14 else ""
        fs.append(f'<div class="fsrow"><span class="fsn">{f["px"]:g}px</span>'
                  f'<span class="fss" style="font-size:{size}px">{E(f["sample"] or "Contoh teks Aa")}</span>'
                  f'<span class="fsc">{f["n"]}×</span>{flag}</div>')
    out.append(f'<div class="card"><h3>Ukuran font yang dipakai <small>({len(inv["font_sizes"])} ukuran · teks isi ≈ {inv["body"]:g}px)</small></h3>{"".join(fs)}</div>')

    def swatches(items, title):
        if not items:
            return ""
        sw = "".join(f'<div class="sw"><i style="background:{c}"></i><b>{c}</b><span>{n}×</span></div>' for c, n in items)
        return f'<div class="card"><h3>{title} <small>({len(items)})</small></h3><div class="swg">{sw}</div></div>'

    out.append(swatches(inv["text_colors"], "Warna teks"))
    out.append(swatches(inv["bg_colors"], "Warna latar komponen"))
    if inv["radii"] or inv["pill"]:
        rs = "".join(f'<div class="rd"><i style="border-radius:{min(r, 40)}px"></i><b>{r}px</b><span>{n}×</span></div>' for r, n in inv["radii"])
        if inv["pill"]:
            rs += f'<div class="rd"><i style="border-radius:20px"></i><b>pill</b><span>{inv["pill"]}×</span></div>'
        out.append(f'<div class="card"><h3>Sudut membulat</h3><div class="rdg">{rs}</div></div>')
    if inv["buttons"]:
        mxb = max(n for _, n in inv["buttons"])
        out.append('<div class="card"><h3>Ukuran tombol (lebar×tinggi)</h3>' + "".join(bar_row(k, n, mxb) for k, n in inv["buttons"]) + "</div>")
    if inv["icons"]:
        ic = "".join(f'<div class="rd"><i style="width:{s}px;height:{s}px;border-radius:4px;background:#64748b"></i><b>{s}px</b><span>{n}×</span></div>' for s, n in inv["icons"])
        out.append(f'<div class="card"><h3>Ukuran ikon</h3><div class="rdg">{ic}</div></div>')
    if inv["spacing"]:
        mxs = max(n for _, n in inv["spacing"])
        rows = ""
        for v, n in inv["spacing"]:
            off = v % 4 != 0 and v not in (2, 6, 10)
            rows += bar_row(f"{v}px", n, mxs, ' <span class="tag warn">di luar skala</span>' if off else "")
        out.append(f'<div class="card"><h3>Nilai spasi (padding/margin/gap) paling sering</h3>{rows}</div>')
    if inv["families"]:
        out.append('<div class="card"><h3>Font keluarga</h3>' + "".join(
            f'<div class="fam" style="font-family:{E(f)}, sans-serif"><b>{E(f)}</b> <span>{n} elemen — Aa Bb Cc 123</span></div>' for f, n in inv["families"]) + "</div>")
    if inv["targets_total"]:
        pct = int(inv["targets_small"] / inv["targets_total"] * 100)
        out.append(f'<div class="card"><h3>Target sentuh</h3><p class="big">{inv["targets_small"]} dari {inv["targets_total"]} kontrol ({pct}%) lebih kecil dari ukuran ideal.</p></div>')
    return '<div class="grid2">' + "".join(out) + "</div>"


def build_report(res, vp_results, out: Path, title: str):
    sc, cats = res["score"], res["category_scores"]
    g, gcls = grade(sc)
    c = res["counts"]
    # kelompok per aturan
    groups = collections.defaultdict(list)
    for i in res["issues"]:
        groups[i["rule"]].append(i)

    def rank(item):
        rule, lst = item
        best = min(SEV_ORDER[i["sev"]] for i in lst)
        return (best, -sum(i["n_targets"] for i in lst))
    cards = []
    for rule, lst in sorted(groups.items(), key=rank):
        cat, ttl, why = RULES[rule]
        sev = min((i["sev"] for i in lst), key=lambda s: SEV_ORDER[s])
        vps = sorted({v for i in lst for v in i.get("vps", [i["vp"]])})
        inst = sum(max(1, i["n_targets"]) for i in lst)
        seen, ex = set(), []
        for i in lst:
            for t in (i["targets"][:3] or [{"sel": "(seluruh halaman)", "text": "", "msg": i["msg"]}]):
                k = (t["sel"], t.get("msg", i["msg"]))
                if k in seen:
                    continue
                seen.add(k)
                ex.append((i, t))
        exh = "".join(f'<li><code>{E(t["sel"])}</code>{(" “" + E(t["text"][:34]) + "”") if t.get("text") else ""}<br><span>{E(t.get("msg", i["msg"]))}</span> '
                      f'<span class="vpt">{E(i["refs"][0][0])} #{i["refs"][0][1]}{(" ×" + str(i["n_targets"])) if i["n_targets"] > 1 else ""}</span></li>' for i, t in ex[:6])
        more = f'<li class="more">+ {len(ex) - 6} contoh lain</li>' if len(ex) > 6 else ""
        fix = next((i["fix"] for i in lst if i["fix"]), "")
        fixh = f'<div class="fix"><b>Saran perbaikan</b><pre>{E(fix)}</pre></div>' if fix else ""
        cards.append(f'<article class="rule {sev}"><header><span class="badge {sev}">{SEV_LABEL[sev]}</span>'
                     f'<code class="rid">{rule}</code><h3>{E(ttl)}</h3><span class="cnt">{inst} temuan · {", ".join(vps)}</span></header>'
                     f'<p class="why">{E(why)}</p><ul class="ex">{exh}{more}</ul>{fixh}</article>')
    rules_html = "".join(cards) or '<div class="card ok-card"><h3>Tidak ada temuan otomatis 🎉</h3></div>'

    cat_html = "".join(
        f'<div class="cat"><div class="ring {("ok" if v >= 85 else "warn" if v >= 65 else "bad")}" style="--p:{v}"><b>{v}</b></div><span>{CATS[k]}</span></div>'
        for k, v in cats.items())

    # screenshot tabs
    tabs, panes = [], []
    for k, r in enumerate(vp_results):
        img = b64(out / r["image"])
        items = []
        for i in r["issues"]:
            tg = i["targets"][0] if i["targets"] else None
            y = int(tg["rect"]["y"]) if tg else 0
            sel = E(tg["sel"]) if tg else "halaman"
            items.append(f'<li class="it {i["sev"]}" data-y="{y}"><span class="num">{i["n"]}</span><div><b>{i["rule"]}</b> {E(RULES[i["rule"]][1])}<br>'
                         f'<small>{E(i["msg"])}{(" (+" + str(i["n_targets"] - 1) + " elemen serupa)") if i["n_targets"] > 1 else ""}</small><br><code>{sel}</code></div></li>')
        tabs.append(f'<button class="tab{" on" if k == 0 else ""}" data-t="p{k}">{r["label"]} <small>{r["w"]}×{r["h"]} · {len(r["issues"])}</small></button>')
        panes.append(f'<section class="pane{" on" if k == 0 else ""}" id="p{k}"><div class="shot"><div class="sc"><img src="{img}" alt="Screenshot {r["label"]} beranotasi" data-w="{r["w"]}" style="width:{min(r["w"], 760)}px"></div>'
                     f'<ol class="il">{"".join(items) or "<li>Tidak ada temuan.</li>"}</ol></div></section>')

    # regresi
    reg = ""
    if res["regression"]:
        rows = ""
        for k, v in res["regression"].items():
            if v.get("created"):
                rows += f'<tr><td>{k}</td><td colspan="2">Baseline baru dibuat.</td></tr>'
            else:
                note = "" if v.get("same_size", True) else " (ukuran halaman berubah)"
                cls = "bad" if v["changed_pct"] > 2 else "warn" if v["changed_pct"] > 0.2 else "ok"
                rows += f'<tr><td>{k}</td><td><b class="{cls}">{v["changed_pct"]}%</b> piksel berubah{note}</td><td><a href="{v["diff_image"]}">lihat gambar selisih</a></td></tr>'
        reg = f'<h2>Regresi visual</h2><div class="card"><table class="tb">{rows}</table></div>'

    man = ""
    if res["manual"]:
        ms = "".join(f'<article class="rule {m.get("severity", "warn")}"><header><span class="badge {m.get("severity", "warn")}">{SEV_LABEL.get(m.get("severity", "warn"), "Info")}</span><h3>{E(m.get("title", ""))}</h3>'
                     f'<span class="cnt">{E(m.get("viewport", ""))}</span></header><p class="why">{E(m.get("detail", ""))}</p>'
                     f'{("<div class=fix><b>Saran</b><pre>" + E(m["fix"]) + "</pre></div>") if m.get("fix") else ""}</article>' for m in res["manual"])
        man = f'<h2>Penilaian visual oleh AI <small>(hal yang tidak bisa diukur skrip)</small></h2>{ms}'

    html_doc = f"""<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>UI Visual Audit — {E(title)}</title><style>{CSS}</style></head><body>
<header class="top"><div class="wrap"><p class="eyebrow">UI Visual Audit · profil {E(res["profile_label"])}</p><h1>{E(title)}</h1>
<p class="meta">{E(res["date"])} · {len(vp_results)} ukuran layar · {sum(r["elements"] for r in vp_results)} elemen diukur</p></div></header>
<main class="wrap">
<section class="summary"><div class="score {gcls}"><b>{sc}</b><span>/100</span><em>{g}</em></div>
<div class="sums"><div class="n e"><b>{c["error"]}</b>Error</div><div class="n w"><b>{c["warn"]}</b>Peringatan</div><div class="n i"><b>{c["info"]}</b>Info</div></div>
<div class="cats">{cat_html}</div></section>
<h2>Temuan per aturan</h2>{rules_html}
{man}
<h2>Screenshot beranotasi <small>(klik temuan untuk melompat ke lokasinya)</small></h2>
<div class="tabs">{"".join(tabs)}</div>{"".join(panes)}
<h2>Inventaris desain <small>(cek konsistensi secara visual)</small></h2>{inventory_html(res["inventory"])}
{reg}
<p class="foot">Pemeriksaan otomatis mencakup ±45 aturan (WCAG 2.2, HIG, Material, NN/g). Hal subjektif seperti kerapian visual, hirarki perhatian, dan kejelasan bahasa tetap perlu ditinjau manusia.</p>
</main><script>{JS}</script></body></html>"""
    (out / "report.html").write_text(html_doc, encoding="utf-8")


CSS = """
:root{--bg:#f6f7f9;--card:#fff;--tx:#111827;--mu:#4b5563;--bd:#e5e7eb;--e:#be123c;--w:#b45309;--i:#1d4ed8;--ok:#047857;--accent:#0f766e;color-scheme:light dark}
@media(prefers-color-scheme:dark){:root{--bg:#0f1115;--card:#171a21;--tx:#f3f4f6;--mu:#a1a8b5;--bd:#2a2f3a;--e:#fb7185;--w:#fbbf24;--i:#60a5fa;--ok:#34d399;--accent:#2dd4bf}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px}.top{background:var(--card);border-bottom:1px solid var(--bd);padding:28px 0 22px}
.eyebrow{margin:0;color:var(--accent);font-weight:700;font-size:14px;letter-spacing:.04em;text-transform:uppercase}h1{margin:.2em 0;font-size:30px;line-height:1.25;word-break:break-word}
.meta{margin:0;color:var(--mu);font-size:15px}h2{margin:44px 0 16px;font-size:23px}h2 small,h3 small{font-weight:400;color:var(--mu);font-size:.65em}
h3{margin:0 0 10px;font-size:18px}code{font:13px/1.4 ui-monospace,Menlo,Consolas,monospace;background:rgba(127,127,127,.15);padding:1px 6px;border-radius:6px;word-break:break-all}
.summary{display:grid;grid-template-columns:auto auto 1fr;gap:28px;align-items:center;margin-top:28px;background:var(--card);border:1px solid var(--bd);border-radius:20px;padding:24px}
.score{display:flex;flex-direction:column;align-items:center;min-width:150px}.score b{font-size:64px;line-height:1}.score span{color:var(--mu);margin-top:-4px}.score em{font-style:normal;font-weight:700;margin-top:8px;text-align:center}
.score.ok b,.score.ok em{color:var(--ok)}.score.warn b,.score.warn em{color:var(--w)}.score.bad b,.score.bad em{color:var(--e)}
.sums{display:flex;gap:12px}.n{border-radius:14px;padding:12px 18px;text-align:center;font-size:14px;min-width:96px}.n b{display:block;font-size:30px;line-height:1.1}
.n.e{background:rgba(225,29,72,.12);color:var(--e)}.n.w{background:rgba(245,158,11,.14);color:var(--w)}.n.i{background:rgba(37,99,235,.12);color:var(--i)}
.cats{display:flex;gap:16px;flex-wrap:wrap;justify-content:flex-end}.cat{display:flex;flex-direction:column;align-items:center;font-size:13px;color:var(--mu);width:96px;text-align:center}
.ring{--c:var(--ok);width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--c) calc(var(--p)*1%),var(--bd) 0);margin-bottom:6px}
.ring.warn{--c:var(--w)}.ring.bad{--c:var(--e)}.ring b{width:48px;height:48px;border-radius:50%;background:var(--card);display:grid;place-items:center;font-size:16px;color:var(--tx)}
.rule{background:var(--card);border:1px solid var(--bd);border-left:6px solid var(--bd);border-radius:14px;padding:16px 20px;margin-bottom:14px}
.rule.error{border-left-color:var(--e)}.rule.warn{border-left-color:var(--w)}.rule.info{border-left-color:var(--i)}
.rule header{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center}.rule h3{margin:0;flex:1 1 260px}.cnt{color:var(--mu);font-size:14px}
.badge{font-size:13px;font-weight:700;padding:3px 10px;border-radius:999px}.badge.error{background:rgba(225,29,72,.14);color:var(--e)}.badge.warn{background:rgba(245,158,11,.16);color:var(--w)}.badge.info{background:rgba(37,99,235,.14);color:var(--i)}
.why{margin:.5em 0;color:var(--mu);font-size:15px}.ex{margin:8px 0;padding-left:18px;font-size:14.5px}.ex li{margin:6px 0}.ex span{color:var(--mu)}.vpt{font-size:12px;border:1px solid var(--bd);border-radius:6px;padding:0 6px;margin-left:4px}.more{list-style:none;color:var(--mu)}
.fix{background:rgba(15,118,110,.08);border-radius:10px;padding:8px 12px;margin-top:8px;font-size:14px}.fix pre{margin:4px 0 0;white-space:pre-wrap;font:13px/1.5 ui-monospace,Menlo,Consolas,monospace}
.tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}.tab{font:inherit;font-size:16px;padding:10px 18px;min-height:48px;border-radius:12px;border:2px solid var(--bd);background:var(--card);color:var(--tx);cursor:pointer}.tab.on{border-color:var(--accent);background:rgba(15,118,110,.12);font-weight:700}.tab:focus-visible{outline:3px solid var(--i);outline-offset:2px}
.pane{display:none}.pane.on{display:block}.shot{display:grid;grid-template-columns:minmax(0,auto) 1fr;gap:16px;align-items:start}
.sc{max-height:82vh;overflow:auto;border:1px solid var(--bd);border-radius:12px;background:#fff;max-width:100%}.sc img{display:block;max-width:none}
.il{list-style:none;margin:0;padding:0;max-height:82vh;overflow:auto}.it{display:flex;gap:10px;background:var(--card);border:1px solid var(--bd);border-radius:12px;padding:10px 12px;margin-bottom:8px;cursor:pointer;font-size:14.5px}
.it:hover{border-color:var(--accent)}.it small{color:var(--mu)}.num{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;font-size:13px}
.it.error .num{background:#e11d48}.it.warn .num{background:#d97706}.it.info .num{background:#2563eb}
.card{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:16px 20px}.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px}
.fsrow{display:flex;align-items:baseline;gap:12px;border-bottom:1px dashed var(--bd);padding:4px 0}.fsn{width:56px;font-weight:700;font-size:14px;flex:none}.fss{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fsc{color:var(--mu);font-size:13px}
.tag{font-size:12px;border-radius:6px;padding:0 6px}.tag.warn{background:rgba(245,158,11,.18);color:var(--w)}
.swg{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:10px}.sw{display:flex;flex-direction:column;font-size:12.5px}.sw i{height:36px;border-radius:8px;border:1px solid var(--bd)}.sw span{color:var(--mu)}
.rdg{display:flex;flex-wrap:wrap;gap:16px}.rd{display:flex;flex-direction:column;align-items:center;font-size:13px}.rd i{width:44px;height:44px;border:2px solid var(--accent);background:rgba(15,118,110,.1)}.rd span{color:var(--mu)}
.brow{display:flex;align-items:center;gap:10px;font-size:13.5px;margin:4px 0}.bl{width:84px;flex:none}.bt{flex:1;height:10px;background:var(--bd);border-radius:6px;overflow:hidden}.bt i{display:block;height:100%;background:var(--accent)}.bn{width:36px;text-align:right;color:var(--mu)}
.fam{padding:4px 0}.fam span{color:var(--mu);font-size:14px}.big{font-size:19px;margin:0}.tb{width:100%;border-collapse:collapse}.tb td{padding:8px;border-bottom:1px solid var(--bd)}
b.bad{color:var(--e)}b.warn{color:var(--w)}b.ok{color:var(--ok)}.foot{color:var(--mu);font-size:14px;margin:40px 0}
@media(max-width:860px){.summary{grid-template-columns:1fr}.cats{justify-content:flex-start}.shot{grid-template-columns:1fr}.sc,.il{max-height:70vh}}
"""

JS = """
document.querySelectorAll('.tab').forEach(function(b){b.addEventListener('click',function(){
 document.querySelectorAll('.tab,.pane').forEach(function(x){x.classList.remove('on')});
 b.classList.add('on');document.getElementById(b.dataset.t).classList.add('on');});});
document.querySelectorAll('.it').forEach(function(li){li.addEventListener('click',function(){
 var sc=li.closest('.shot').querySelector('.sc');var img=sc.querySelector('img');
 var k=img.clientWidth/parseFloat(img.dataset.w);
 sc.scrollTo({top:Math.max(0,parseInt(li.dataset.y)*k-60),behavior:'smooth'});});});
"""