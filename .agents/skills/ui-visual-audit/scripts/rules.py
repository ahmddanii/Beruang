"""Aturan audit UI/UX. Semua ambang batas ada di PROFILES supaya mudah disesuaikan.

Sumber standar: WCAG 2.2 (1.4.3, 1.4.4, 1.4.10, 1.4.11, 2.4.7, 2.5.8), Apple HIG (44pt),
Material Design (48dp), Nielsen 10 heuristics, dan pedoman NN/g untuk pengguna senior.
Detail ada di references/standards.md.
"""
from __future__ import annotations
import collections
import math
import statistics

CATS = {
    "typo": "Tipografi",
    "size": "Ukuran & Target Sentuh",
    "layout": "Layout & Konsistensi",
    "color": "Warna & Kontras",
    "ux": "UX & Aksesibilitas",
}

# rule_id: (kategori, judul, kenapa penting)
RULES = {
    "TYPO-01": ("typo", "Teks terlalu kecil", "Teks di bawah batas minimum sulit dibaca, terutama oleh pengguna lanjut usia (WCAG 1.4.4)."),
    "TYPO-02": ("typo", "Teks isi di bawah ukuran nyaman", "Teks paragraf idealnya 16–18px+ agar nyaman dibaca tanpa zoom."),
    "TYPO-03": ("typo", "Terlalu banyak ukuran font", "Skala tipografi yang rapi biasanya hanya 5–7 ukuran. Terlalu banyak membuat tampilan terasa tidak konsisten."),
    "TYPO-04": ("typo", "Ukuran font hampir sama tapi berbeda", "Misalnya 15px dan 16px dipakai bersamaan: selisih kecil yang tidak disengaja, tanda token tidak konsisten."),
    "TYPO-05": ("typo", "Jarak antar baris (line-height) terlalu rapat", "Line-height < 1.5 membuat baris teks menempel; WCAG 1.4.12 menyarankan minimal 1.5 untuk paragraf."),
    "TYPO-06": ("typo", "Font terlalu tipis", "Weight < 400 berkontras rendah pada layar; mata senior cepat lelah."),
    "TYPO-07": ("typo", "Hirarki heading bermasalah", "Heading yang benar membantu pengguna memindai halaman dan pembaca layar menavigasi."),
    "TYPO-08": ("typo", "Terlalu banyak jenis font", "Lebih dari 2 font keluarga membuat tampilan berantakan dan memperlambat loading."),
    "TYPO-09": ("typo", "Baris teks terlalu panjang", "Lebih dari ±75–90 karakter per baris melelahkan mata saat berpindah baris."),
    "TYPO-10": ("typo", "Gaya teks sulit dibaca", "Huruf kapital semua, miring panjang, dan rata kanan-kiri (justify) menurunkan keterbacaan."),
    "TYPO-11": ("typo", "Teks terpotong", "Teks yang dipotong (ellipsis/overflow) bisa menyembunyikan informasi penting."),
    "TYPO-12": ("typo", "Ukuran teks abnormal besar", "Teks yang jauh lebih besar dari sekitarnya merusak keseimbangan visual."),
    "SIZE-01": ("size", "Target sentuh terlalu kecil", "Tombol/link kecil sulit diketuk, terutama oleh jari yang kurang presisi (WCAG 2.5.8, HIG 44pt, Material 48dp)."),
    "SIZE-02": ("size", "Target sentuh terlalu berdekatan", "Jarak terlalu sempit memicu salah ketuk."),
    "SIZE-03": ("size", "Elemen interaktif saling tumpang tindih", "Tombol yang saling menimpa tidak bisa diklik dengan benar."),
    "SIZE-04": ("size", "Ukuran komponen sejenis tidak seragam", "Tombol/komponen dengan class yang sama seharusnya berukuran sama."),
    "SIZE-05": ("size", "Terlalu banyak variasi tombol", "Banyak variasi tinggi/radius tombol = tidak ada sistem desain yang konsisten."),
    "SIZE-06": ("size", "Ukuran komponen abnormal", "Elemen terlalu besar, terlalu kecil, atau gambar buram karena di-upscale."),
    "SIZE-07": ("size", "Ukuran ikon tidak konsisten", "Ikon sebaiknya mengikuti 2–4 ukuran baku."),
    "LAYOUT-01": ("layout", "Halaman bisa scroll ke samping", "Konten yang melebar keluar layar memaksa scroll horizontal (WCAG 1.4.10 Reflow)."),
    "LAYOUT-02": ("layout", "Spasi tidak mengikuti skala", "Spasi yang acak (bukan kelipatan 4/8px) membuat ritme visual tidak rapi."),
    "LAYOUT-03": ("layout", "Terlalu banyak variasi sudut membulat", "Radius yang beragam membuat komponen terasa tidak satu keluarga."),
    "LAYOUT-04": ("layout", "Elemen hampir sejajar tapi bergeser", "Selisih beberapa piksel pada tepi kiri terlihat seperti kesalahan, bukan keputusan desain."),
    "LAYOUT-05": ("layout", "Terlalu padat di layar pertama", "Terlalu banyak pilihan sekaligus menaikkan beban kognitif (hukum Hick/Miller)."),
    "LAYOUT-06": ("layout", "Elemen keluar dari area layar", "Elemen terpotong di sisi kiri tidak bisa diakses."),
    "LAYOUT-07": ("layout", "Padding komponen terlalu sempit", "Teks yang menempel ke tepi tombol terlihat sesak dan mengurangi area ketuk."),
    "COLOR-01": ("color", "Kontras teks kurang", "Rasio kontras minimal 4.5:1 (AA), disarankan 7:1 (AAA) untuk pengguna lansia (WCAG 1.4.3 / 1.4.6)."),
    "COLOR-02": ("color", "Batas kolom input kurang terlihat", "Border/komponen UI butuh kontras minimal 3:1 terhadap latar (WCAG 1.4.11)."),
    "COLOR-03": ("color", "Terlalu banyak warna / warna hampir sama", "Warna yang nyaris kembar menandakan nilai dipilih manual, bukan dari token."),
    "COLOR-04": ("color", "Link tidak terlihat seperti link", "Link dalam paragraf tanpa garis bawah dan kontras rendah tidak terlihat bisa diklik (WCAG 1.4.1)."),
    "COLOR-05": ("color", "Placeholder kontras rendah", "Teks petunjuk yang pudar sulit dibaca."),
    "UX-01": ("ux", "Gambar tanpa teks alternatif", "Pembaca layar tidak bisa menjelaskan gambar (WCAG 1.1.1)."),
    "UX-02": ("ux", "Kolom form tanpa label", "Label harus selalu terlihat; placeholder hilang saat mengetik sehingga membingungkan (Nielsen #6, WCAG 3.3.2)."),
    "UX-03": ("ux", "Kontrol tanpa nama", "Tombol/link tanpa nama tidak bisa dipahami pembaca layar (WCAG 4.1.2)."),
    "UX-04": ("ux", "Zoom diblokir / viewport tidak diatur", "Pengguna lansia sangat bergantung pada zoom. Jangan blokir (WCAG 1.4.4)."),
    "UX-05": ("ux", "Atribut bahasa halaman kosong", "Atribut lang membantu pembaca layar dan terjemahan otomatis (WCAG 3.1.1)."),
    "UX-06": ("ux", "Indikator fokus keyboard tidak terlihat", "Pengguna keyboard harus tahu posisi fokus (WCAG 2.4.7)."),
    "UX-07": ("ux", "Teks link tidak jelas", "Teks seperti 'klik di sini' tidak menjelaskan tujuan (WCAG 2.4.4)."),
    "UX-08": ("ux", "Tombol hanya ikon tanpa teks", "Pengguna senior sering tidak mengenali ikon tanpa label (NN/g)."),
    "UX-09": ("ux", "Tabindex positif", "Mengacaukan urutan tab alami."),
    "UX-10": ("ux", "Media/animasi otomatis", "Konten bergerak otomatis mengganggu dan sulit dihentikan (WCAG 2.2.2)."),
    "UX-11": ("ux", "ID ganda", "ID ganda merusak label, anchor, dan teknologi bantu."),
    "UX-12": ("ux", "Font input < 16px", "Browser mobile akan memperbesar layar otomatis saat fokus pada input kecil."),
    "UX-13": ("ux", "Judul halaman kosong", "Judul halaman (title) penting untuk orientasi dan tab browser (WCAG 2.4.2)."),
    "UX-14": ("ux", "Elemen fixed menutup layar", "Header/banner yang menempel terlalu besar menutupi konten, terutama di ponsel."),
    "UX-15": ("ux", "Menu navigasi terlalu banyak", "Lebih dari ±7 item menu membebani ingatan (Miller)."),
    "UX-16": ("ux", "Terlalu banyak tombol utama bersaing", "Satu halaman idealnya punya satu aksi utama yang jelas."),
    "TOKEN-01": ("layout", "Menyimpang dari design token", "Nilai tidak ada di daftar token yang Anda tetapkan."),
}

PROFILES = {
    "elderly": dict(
        label="Ramah lansia (ketat)",
        min_font=14, body_err=16, body_warn=18, line_height=1.5, min_weight=400,
        contrast_err=4.5, contrast_warn=7.0, contrast_large_err=3.0, contrast_large_warn=4.5,
        target_err=44, target_warn=48, target_gap=12, max_line_ch=75,
        fold_interactive=10, input_min_font=16, pad_min=12, nav_max=7, primary_max=2,
        max_font_sizes=7, max_colors=7, max_radii=3, max_btn_heights=2,
        justify_warn=True, icon_only_sev="warn",
    ),
    "general": dict(
        label="Umum (WCAG AA)",
        min_font=12, body_err=14, body_warn=16, line_height=1.4, min_weight=300,
        contrast_err=4.5, contrast_warn=4.5, contrast_large_err=3.0, contrast_large_warn=3.0,
        target_err=24, target_warn=44, target_gap=8, max_line_ch=90,
        fold_interactive=18, input_min_font=16, pad_min=8, nav_max=9, primary_max=3,
        max_font_sizes=9, max_colors=9, max_radii=4, max_btn_heights=3,
        justify_warn=False, icon_only_sev="info",
    ),
}

VAGUE = {"klik di sini", "klik disini", "klik", "di sini", "disini", "click here", "here", "read more",
         "selengkapnya", "baca selengkapnya", "lihat", "more", "link", "learn more", "ini"}


def lum(rgb):
    def f(v):
        v = v / 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = rgb[:3]
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def over(fg, bg):
    a = fg[3]
    return [fg[i] * a + bg[i] * (1 - a) for i in range(3)]


def hexc(rgb):
    return "#%02x%02x%02x" % tuple(int(round(max(0, min(255, v)))) for v in rgb[:3])


def dist(a, b):
    return math.sqrt(sum((a[i] - b[i]) ** 2 for i in range(3)))


def is_heading(e):
    return len(e["tag"]) == 2 and e["tag"][0] == "h" and e["tag"][1] in "123456"


def r2(v, step=0.5):
    return round(v / step) * step


class Checker:
    def __init__(self, data, vp, P, tokens=None, focus=None):
        self.d, self.vp, self.P = data, vp, P
        self.tokens = tokens or {}
        self.focus = focus
        self.els = data["els"]
        self.meta = data["meta"]
        self.issues = []
        self._seen = set()
        self._idx = {}
        self.text_els = [e for e in self.els if e["tlen"] > 0]
        self.inv = {}

    # ---- util -------------------------------------------------------------
    def add(self, rule, sev, targets, msg, fix=""):
        if not isinstance(targets, list):
            targets = [targets]
        targets = [t for t in targets if t is not None]

        def pack(t):
            return {"sel": t["sel"], "text": t.get("text", ""), "rect": t["r"], "msg": msg}
        if len(targets) <= 1:
            t = targets[0] if targets else None
            if t is not None:
                if (rule, t["id"]) in self._seen:
                    return
                self._seen.add((rule, t["id"]))
            key = (rule, sev, t["sel"] if t else "-", None if t else msg)
            if t is not None and key in self._idx:
                iss = self._idx[key]
                iss["n_targets"] += 1
                if len(iss["targets"]) < 12:
                    iss["targets"].append(pack(t))
                return
            iss = {"rule": rule, "sev": sev, "vp": self.vp["label"], "msg": msg, "fix": fix,
                   "targets": [pack(t)] if t else [], "n_targets": 1}
            self._idx[key] = iss
            self.issues.append(iss)
            return
        key = (rule, sev, tuple(t["id"] for t in targets[:3]), msg[:40])
        if key in self._seen:
            return
        self._seen.add(key)
        self.issues.append({"rule": rule, "sev": sev, "vp": self.vp["label"], "msg": msg, "fix": fix,
                            "targets": [pack(t) for t in targets[:6]], "n_targets": len(targets)})

    def body_size(self):
        w = collections.Counter()
        for e in self.text_els:
            w[r2(e["fs"])] += e["tlen"]
        return w.most_common(1)[0][0] if w else 16

    def is_body(self, e):
        return e["tlen"] >= 30 and not is_heading(e) and e["tag"] not in ("button", "a", "label", "th") and e["fs"] < 24

    # ---- runner -----------------------------------------------------------
    def run(self):
        self.base = self.body_size()
        for fn in (self.typography, self.sizes, self.layout, self.color, self.ux, self.token_checks):
            fn()
        self.build_inventory()
        return self.issues

    # ---- Tipografi --------------------------------------------------------
    def typography(self):
        P, els = self.P, self.text_els
        for e in els:
            if e["fs"] < P["min_font"] and not e["disabled"]:
                self.add("TYPO-01", "error", e, f"Font {e['fs']:g}px (minimum {P['min_font']}px).",
                         f"font-size: {P['body_warn'] / 16:g}rem; /* {P['body_warn']}px */")
            elif self.is_body(e):
                if e["fs"] < P["body_err"]:
                    self.add("TYPO-02", "error", e, f"Teks isi {e['fs']:g}px, di bawah {P['body_err']}px.",
                             f"font-size: {P['body_warn'] / 16:g}rem;")
                elif e["fs"] < P["body_warn"]:
                    self.add("TYPO-02", "warn", e, f"Teks isi {e['fs']:g}px, disarankan ≥ {P['body_warn']}px.",
                             f"font-size: {P['body_warn'] / 16:g}rem;")
            if self.is_body(e) and e["tlen"] >= 60:
                ratio = (e["lh"] / e["fs"]) if e["lh"] else 1.2
                if ratio < P["line_height"] - 0.01:
                    self.add("TYPO-05", "warn", e, f"Line-height {ratio:.2f} (disarankan ≥ {P['line_height']}).",
                             f"line-height: {P['line_height']};")
                cpl = min(e["tlen"], e["r"]["w"] / (e["fs"] * 0.5))
                if e["tlen"] >= 100 and cpl > P["max_line_ch"] * 1.2 and e["r"]["w"] / (e["fs"] * 0.5) > P["max_line_ch"] * 1.2:
                    self.add("TYPO-09", "warn", e, f"Baris bisa memuat ≈ {int(cpl)} karakter (ideal ≤ {P['max_line_ch']}).",
                             "max-width: 65ch;")
            if e["fw"] < P["min_weight"] and e["fs"] < 24:
                self.add("TYPO-06", "warn", e, f"Font weight {e['fw']} terlalu tipis.", "font-weight: 400;")
            if e["tt"] == "uppercase" and e["tlen"] > 25 and e["tag"] not in ("button",):
                self.add("TYPO-10", "warn", e, "Huruf kapital semua pada teks panjang.", "text-transform: none;")
            if e["fst"] == "italic" and e["tlen"] > 80:
                self.add("TYPO-10", "warn", e, "Teks miring pada paragraf panjang.", "font-style: normal;")
            if e["ta"] == "justify" and e["tlen"] > 80:
                self.add("TYPO-10", "warn" if P["justify_warn"] else "info", e,
                         "Teks rata kanan-kiri menciptakan jarak kata tidak rata.", "text-align: left;")
            if (e["ovx"] in ("hidden", "clip") and e["scrollW"] > e["clientW"] + 2 and e["clientW"] > 0) or \
                    (e["tov"] == "ellipsis" and e["scrollW"] > e["clientW"] + 2):
                self.add("TYPO-11", "warn", e, "Teks terpotong (ellipsis/overflow).",
                         "Izinkan teks membungkus: white-space: normal; overflow: visible;")
            if e["fs"] > max(72, self.base * 4):
                self.add("TYPO-12", "warn", e, f"Font {e['fs']:g}px = {e['fs'] / self.base:.1f}× teks isi.",
                         "Gunakan clamp() agar ukuran heading proporsional.")

        sizes = collections.Counter()
        for e in els:
            sizes[r2(e["fs"])] += 1
        distinct = sorted(sizes)
        if len(distinct) > P["max_font_sizes"]:
            rare = [e for e in els if sizes[r2(e["fs"])] <= 2][:6]
            self.add("TYPO-03", "warn", rare,
                     f"{len(distinct)} ukuran font berbeda ({', '.join(f'{s:g}' for s in distinct)}px); target ≤ {P['max_font_sizes']}.",
                     "Tentukan skala tipografi: 14/16/18/24/32/40 lalu pakai hanya itu.")
        for a, b in zip(distinct, distinct[1:]):
            if 0 < b - a <= 2 and min(sizes[a], sizes[b]) >= 1:
                minor = a if sizes[a] < sizes[b] else b
                tg = [e for e in els if r2(e["fs"]) == minor][:6]
                self.add("TYPO-04", "warn", tg, f"{a:g}px dan {b:g}px dipakai bersamaan; satukan ke satu ukuran.",
                         f"Ganti {minor:g}px menjadi {(b if minor == a else a):g}px.")

        fams = collections.Counter(e["ff"] for e in els if e["ff"] and not any(k in e["ff"] for k in ("mono", "consolas", "courier", "menlo")))
        if len(fams) > 2:
            self.add("TYPO-08", "warn", [e for e in els if e["ff"] == fams.most_common()[-1][0]][:4],
                     f"{len(fams)} font keluarga: {', '.join(list(fams)[:5])}.", "Batasi 1–2 keluarga font.")

        heads = [e for e in self.els if is_heading(e)]
        h1 = [e for e in heads if e["tag"] == "h1"]
        if self.els and not h1:
            self.add("TYPO-07", "warn", None if not heads else heads[:1], "Halaman tidak punya <h1>.", "Tambahkan satu <h1> sebagai judul utama.")
        elif len(h1) > 1:
            self.add("TYPO-07", "warn", h1[:4], f"Ada {len(h1)} <h1>; sebaiknya satu.", "Ubah h1 tambahan menjadi h2.")
        prev = 0
        for h in heads:
            lv = int(h["tag"][1])
            if prev and lv > prev + 1:
                self.add("TYPO-07", "warn", h, f"Lompat level heading h{prev} → h{lv}.", f"Gunakan h{prev + 1}.")
            prev = lv
            if h["fs"] <= self.base * 1.1 and lv <= 3:
                self.add("TYPO-07", "warn", h, f"<{h['tag']}> ({h['fs']:g}px) hampir sama dengan teks isi ({self.base:g}px).",
                         "Perbesar heading atau perjelas dengan weight/warna.")
        med = {}
        for lv in range(1, 7):
            v = [h["fs"] for h in heads if h["tag"] == f"h{lv}"]
            if v:
                med[lv] = statistics.median(v)
        ks = sorted(med)
        for a, b in zip(ks, ks[1:]):
            if med[b] > med[a] + 0.5:
                self.add("TYPO-07", "error", [h for h in heads if h["tag"] == f"h{b}"][:3],
                         f"h{b} ({med[b]:g}px) lebih besar dari h{a} ({med[a]:g}px): hirarki terbalik.",
                         f"Pastikan h{a} > h{b} pada ukuran.")

    # ---- Ukuran & target --------------------------------------------------
    def sizes(self):
        P, els = self.P, self.els
        inter = [e for e in els if e["inter"] and not e["inlineLink"] and not e["disabled"]
                 and not (e["tag"] == "a" and e["tlen"] == 0 and not e["hasIcon"])]
        for e in inter:
            t = e["tr"]
            if t["w"] < P["target_err"] or t["h"] < P["target_err"]:
                sev = "error" if (t["w"] < 24 or t["h"] < 24) or P["target_err"] >= 44 else "warn"
                self.add("SIZE-01", sev, e, f"Target {t['w']:.0f}×{t['h']:.0f}px (minimum {P['target_err']}px).",
                         f"min-width: {P['target_warn']}px; min-height: {P['target_warn']}px; padding: 12px 20px;")
            elif t["w"] < P["target_warn"] or t["h"] < P["target_warn"]:
                self.add("SIZE-01", "warn", e, f"Target {t['w']:.0f}×{t['h']:.0f}px, disarankan ≥ {P['target_warn']}px.",
                         f"min-height: {P['target_warn']}px;")
        # jarak & tumpang tindih
        sub = inter[:250]
        pairs = []
        for i in range(len(sub)):
            a = sub[i]["tr"]
            for j in range(i + 1, len(sub)):
                b = sub[j]["tr"]
                dx = max(b["x"] - (a["x"] + a["w"]), a["x"] - (b["x"] + b["w"]), 0)
                dy = max(b["y"] - (a["y"] + a["h"]), a["y"] - (b["y"] + b["h"]), 0)
                if dx > P["target_gap"] or dy > P["target_gap"]:
                    continue
                contains = (a["x"] <= b["x"] + 1 and a["y"] <= b["y"] + 1 and a["x"] + a["w"] >= b["x"] + b["w"] - 1 and a["y"] + a["h"] >= b["y"] + b["h"] - 1) or \
                           (b["x"] <= a["x"] + 1 and b["y"] <= a["y"] + 1 and b["x"] + b["w"] >= a["x"] + a["w"] - 1 and b["y"] + b["h"] >= a["y"] + a["h"] - 1)
                if contains or sub[i]["parent"] == sub[j]["id"] or sub[j]["parent"] == sub[i]["id"]:
                    continue
                gap = math.hypot(dx, dy)
                pairs.append((gap, sub[i], sub[j], dx == 0 and dy == 0))
        pairs.sort(key=lambda p: p[0])
        for gap, a, b, ov in pairs[:25]:
            if ov and (a["tr"]["w"] * a["tr"]["h"]) > 0:
                ox = min(a["tr"]["x"] + a["tr"]["w"], b["tr"]["x"] + b["tr"]["w"]) - max(a["tr"]["x"], b["tr"]["x"])
                oy = min(a["tr"]["y"] + a["tr"]["h"], b["tr"]["y"] + b["tr"]["h"]) - max(a["tr"]["y"], b["tr"]["y"])
                if ox > 2 and oy > 2:
                    self.add("SIZE-03", "error", [a, b], "Dua elemen interaktif saling menimpa.", "Beri jarak atau perbaiki layout.")
                    continue
            self.add("SIZE-02", "warn", [a, b], f"Jarak antar target hanya {gap:.0f}px (disarankan ≥ {P['target_gap']}px).",
                     f"gap: {P['target_gap']}px;")
        # konsistensi komponen sejenis
        def btnlike(e):
            return e["tag"] == "button" or (e["tag"] == "input" and e["type"] in ("submit", "button", "reset")) or \
                e["role"] == "button" or (e["tag"] == "a" and ("btn" in e["cls"].lower() or "button" in e["cls"].lower()))
        btns = [e for e in els if btnlike(e) and not e["inlineLink"]]
        groups = collections.defaultdict(list)
        for b in btns:
            groups[(b["tag"], b["cls"].split()[0] if b["cls"] else "")].append(b)
        for (tag, cls), g in groups.items():
            if len(g) < 3 or not cls:
                continue
            mh = statistics.median(x["r"]["h"] for x in g)
            mf = statistics.median(x["fs"] for x in g)
            for x in g:
                if abs(x["r"]["h"] - mh) > max(4, 0.12 * mh):
                    self.add("SIZE-04", "warn", x, f"Tinggi {x['r']['h']:.0f}px; tombol sekelas (.{cls}) umumnya {mh:.0f}px. Jika ini varian disengaja, jadikan bagian dari sistem ukuran.",
                             f"height/min-height: {mh:.0f}px;")
                elif abs(x["fs"] - mf) > 1:
                    self.add("SIZE-04", "warn", x, f"Font {x['fs']:g}px; tombol sekelas umumnya {mf:g}px.", f"font-size: {mf:g}px;")
        rows = collections.defaultdict(list)
        for e in els:
            if e["cls"] and not e["inter"] and e["parent"] is not None and e["r"]["w"] > 40 and e["r"]["h"] > 40 and e["disp"] != "inline":
                rows[(e["parent"], e["cls"].split()[0], round(e["r"]["y"] / 4))].append(e)
        for (_, cls, _), g in rows.items():
            if len(g) < 3:
                continue
            mw = statistics.median(x["r"]["w"] for x in g)
            for x in g:
                if abs(x["r"]["w"] - mw) > 0.15 * mw:
                    self.add("SIZE-04", "warn", x, f"Lebar {x['r']['w']:.0f}px, saudara sekelasnya {mw:.0f}px.", "Samakan lebar (grid/flex: 1 1 0).")
        if len(btns) >= 3:
            hs = {round(b["r"]["h"] / 2) * 2 for b in btns}
            rs = {round(b["radius"]) if b["radius"] < 999 else 999 for b in btns}
            if len(hs) > P["max_btn_heights"] + 1:
                self.add("SIZE-05", "warn", btns[:6], f"{len(hs)} tinggi tombol berbeda ({', '.join(str(int(h)) for h in sorted(hs))}px).",
                         "Tetapkan 1–2 ukuran tombol (mis. 48px dan 56px).")
            if len(rs) > P["max_radii"]:
                self.add("SIZE-05", "warn", btns[:6], f"{len(rs)} radius sudut tombol berbeda.", "Gunakan satu radius tombol.")
        vh, vw = self.vp["h"], self.vp["w"]
        for e in els:
            if e["tag"] in ("img", "video", "canvas") and e["r"]["h"] > vh * 1.3 and e["r"]["w"] > 200:
                self.add("SIZE-06", "warn", e, f"Tinggi {e['r']['h']:.0f}px ({e['r']['h'] / vh:.1f}× tinggi layar).", "max-height: 70vh; object-fit: cover;")
            if e["tag"] == "img" and e["imgDone"] and e["nw"] > 0 and e["r"]["w"] > 120 and e["nw"] < e["r"]["w"] * 0.6:
                self.add("SIZE-06", "warn", e, f"Gambar {e['nw']}px ditampilkan {e['r']['w']:.0f}px: akan terlihat buram.", "Gunakan gambar beresolusi lebih tinggi / srcset.")
            if e["inter"] and e["tag"] in ("button", "input", "select") and vw >= 1024 and e["r"]["w"] > 640 and e["type"] not in ("checkbox", "radio", "range"):
                self.add("SIZE-06", "warn", e, f"Lebar {e['r']['w']:.0f}px pada desktop: terlalu lebar.", "max-width: 480px;")
            if e["inter"] and e["tag"] in ("button", "input") and e["r"]["h"] > 120 and e["type"] not in ("image",):
                self.add("SIZE-06", "warn", e, f"Tinggi {e['r']['h']:.0f}px: terlalu tinggi untuk kontrol.", "height: 56px;")
            if e["tag"] in ("img", "svg") and 0 < e["r"]["w"] < 16 and 0 < e["r"]["h"] < 16 and e["r"]["w"] > 4:
                self.add("SIZE-06", "warn", e, f"Ikon {e['r']['w']:.0f}×{e['r']['h']:.0f}px terlalu kecil.", "width/height: 24px;")
        icons = [e for e in els if e["tag"] in ("svg", "img") and 8 <= e["r"]["w"] <= 64 and 8 <= e["r"]["h"] <= 64 and abs(e["r"]["w"] - e["r"]["h"]) < 6]
        sc = collections.Counter(round(i["r"]["w"] / 2) * 2 for i in icons)
        if len(sc) > 5:
            rare = [i for i in icons if sc[round(i["r"]["w"] / 2) * 2] <= 1][:6]
            self.add("SIZE-07", "warn", rare, f"{len(sc)} ukuran ikon berbeda ({', '.join(str(k) for k in sorted(sc))}px).", "Tetapkan 16/20/24/32px saja.")

    # ---- Layout -----------------------------------------------------------
    def layout(self):
        P, els, m = self.P, self.els, self.meta
        if m["docW"] > m["cw"] + 1:
            off = sorted([e for e in els if e["r"]["x"] + e["r"]["w"] > m["cw"] + 1 and e["pos"] != "fixed"],
                         key=lambda e: -(e["r"]["x"] + e["r"]["w"]))[:5]
            self.add("LAYOUT-01", "error", off, f"Lebar dokumen {m['docW']}px > layar {m['cw']}px (scroll horizontal).",
                     "Cari elemen dengan lebar tetap; gunakan max-width: 100%; box-sizing: border-box;")
        for e in els:
            if e["r"]["x"] < -2 and e["pos"] not in ("fixed",) and e["r"]["x"] + e["r"]["w"] > 0 and e["r"]["w"] < m["cw"] * 3:
                self.add("LAYOUT-06", "warn", e, f"Elemen mulai di x={e['r']['x']:.0f}px (terpotong di kiri).", "Periksa margin negatif / transform.")
        vals = collections.Counter()
        for e in els:
            if e["tag"] in ("html", "body"):
                continue
            for v in e["pad"] + e["mar"] + e["gap"]:
                if v >= 1 and v < 400:
                    vals[round(v)] += 1
        tot = sum(vals.values())
        if tot > 30:
            def on_grid(v):
                return v % 4 == 0 or v in (2, 6, 10)
            off = {v: c for v, c in vals.items() if not on_grid(v)}
            ratio = sum(off.values()) / tot
            if ratio > 0.3 or len(vals) > 18:
                top = sorted(off.items(), key=lambda kv: -kv[1])[:6]
                self.add("LAYOUT-02", "warn", [],
                         f"{ratio * 100:.0f}% spasi di luar skala 4/8px; {len(vals)} nilai spasi berbeda. Paling sering menyimpang: {', '.join(f'{v}px×{c}' for v, c in top)}.",
                         "Pakai skala spasi: 4, 8, 12, 16, 24, 32, 48, 64.")
        radii = collections.Counter()
        for e in els:
            if e["radius"] > 0 and (e["bgOwn"][3] > 0.5 or e["bw"] > 0) and e["r"]["h"] > 12:
                radii[round(e["radius"]) if e["radius"] < 999 else 9999] += 1
        radii.pop(9999, None)
        if len(radii) > P["max_radii"] + 1:
            self.add("LAYOUT-03", "warn", [e for e in els if round(e["radius"]) in {k for k, c in radii.items() if c <= 2}][:6],
                     f"{len(radii)} radius berbeda ({', '.join(f'{k}px' for k in sorted(radii))}).", "Pilih 2–3 radius (mis. 8px, 16px, pill).")
        # misalignment
        kids = collections.defaultdict(list)
        for e in els:
            if e["parent"] is not None and e["pos"] not in ("absolute", "fixed") and e["disp"] not in ("inline", "contents") \
                    and e["r"]["w"] > 40 and e["r"]["h"] > 10:
                kids[e["parent"]].append(e)
        for pid, ch in kids.items():
            if len(ch) < 3:
                continue
            ch.sort(key=lambda e: e["r"]["y"])
            stacked = all(ch[i + 1]["r"]["y"] >= ch[i]["r"]["y"] + ch[i]["r"]["h"] - 2 for i in range(len(ch) - 1))
            if not stacked:
                continue
            lc = collections.Counter(round(e["r"]["x"]) for e in ch)
            modal, mc = lc.most_common(1)[0]
            if mc < 2:
                continue
            for e in ch:
                dx = abs(round(e["r"]["x"]) - modal)
                if 1 <= dx <= 6 and e["r"]["w"] < self.meta["cw"] * 0.98:
                    self.add("LAYOUT-04", "warn", e, f"Tepi kiri bergeser {dx}px dari saudara-saudaranya.", "Samakan margin/padding kiri.")
        fold = [e for e in els if e["inter"] and not e["disabled"] and e["tr"]["y"] < self.vp["h"] and not e["inlineLink"]]
        if len(fold) > P["fold_interactive"]:
            self.add("LAYOUT-05", "warn", fold[:6], f"{len(fold)} kontrol interaktif di layar pertama (disarankan ≤ {P['fold_interactive']}).",
                     "Kelompokkan, sembunyikan aksi sekunder, utamakan satu aksi.")
        for e in els:
            if e["inter"] and e["tlen"] > 0 and e["tag"] in ("button", "a") and not e["inlineLink"] and e["bgOwn"][3] > 0.5:
                if min(e["pad"][1], e["pad"][3]) < P["pad_min"]:
                    self.add("LAYOUT-07", "warn", e, f"Padding horizontal {min(e['pad'][1], e['pad'][3]):.0f}px terlalu sempit.", f"padding-inline: {P['pad_min'] + 4}px;")

    # ---- Warna ------------------------------------------------------------
    def color(self):
        P, els = self.P, self.els
        unknown = []
        for e in self.text_els:
            if e["disabled"]:
                continue
            if e["bgUnknown"]:
                unknown.append(e)
                continue
            col = e["color"]
            a = col[3] * e["op"]
            fg = over([col[0], col[1], col[2], a], e["bgEff"])
            ratio = contrast(fg, e["bgEff"])
            large = e["fs"] >= 24 or (e["fs"] >= 18.66 and e["fw"] >= 700)
            err, warn = (P["contrast_large_err"], P["contrast_large_warn"]) if large else (P["contrast_err"], P["contrast_warn"])
            if ratio < err:
                self.add("COLOR-01", "error", e, f"Kontras {ratio:.2f}:1 ({hexc(fg)} di {hexc(e['bgEff'])}); minimum {err}:1.", "Gelapkan warna teks atau terangkan latar.")
            elif ratio < warn:
                self.add("COLOR-01", "warn", e, f"Kontras {ratio:.2f}:1; disarankan ≥ {warn}:1 untuk kenyamanan senior.", "Gelapkan warna teks.")
        if unknown:
            self.add("COLOR-01", "info", unknown[:5], f"{len(unknown)} teks berada di atas gambar/gradien: kontras tidak bisa dihitung otomatis. Periksa manual lewat screenshot.", "Tambahkan overlay gelap atau latar solid di belakang teks.")
        for e in els:
            if e["tag"] in ("input", "select", "textarea") and e["type"] not in ("checkbox", "radio", "hidden", "submit", "button", "range", "color") and not e["bgUnknown"]:
                b = e["bc"]
                vis_border = e["bw"] > 0 and e["bs"] != "none" and b[3] > 0.3
                r_b = contrast(over(b, e["bgPar"]), e["bgPar"]) if vis_border else 1
                bg_own = e["bgOwn"]
                r_bg = contrast(over(bg_own, e["bgPar"]), e["bgPar"]) if bg_own[3] > 0.3 else 1
                if max(r_b, r_bg) < 3 and not e["shadow"]:
                    self.add("COLOR-02", "warn", e, f"Batas kolom kontras {max(r_b, r_bg):.1f}:1 (minimum 3:1).", "border: 2px solid #6b7280;")
            if e["placeholderColor"] and not e["bgUnknown"]:
                pc = over(e["placeholderColor"], e["bgEff"])
                r = contrast(pc, e["bgEff"])
                if r < 4.5:
                    self.add("COLOR-05", "warn", e, f"Placeholder kontras {r:.1f}:1.", "color: #6b7280; /* ≥4.5:1 di latar putih */")
            if e["inlineLink"] and "underline" not in e["td"] and not e["bgUnknown"]:
                par = next((p for p in els if p["id"] == e["parent"]), None)
                if par:
                    r = contrast(over(e["color"], e["bgEff"]), over(par["color"], par["bgEff"]) if par["color"][3] > 0 else e["bgEff"])
                    if r < 3:
                        self.add("COLOR-04", "warn", e, f"Link hanya dibedakan warna (kontras vs teks sekitar {r:.1f}:1) tanpa garis bawah.", "text-decoration: underline;")
        tc = collections.Counter()
        for e in self.text_els:
            tc[hexc(e["color"])] += 1
        # warna dengan sedikit pemakai yang hampir sama dengan warna dominan
        cols = [c for c, n in tc.most_common()]
        P_ = P["max_colors"]
        near = []
        for i, a in enumerate(cols):
            for b in cols[i + 1:]:
                ra = tuple(int(a[k:k + 2], 16) for k in (1, 3, 5))
                rb = tuple(int(b[k:k + 2], 16) for k in (1, 3, 5))
                d = dist(ra, rb)
                if 0 < d <= 14:
                    near.append((a, b, d))
        if near[:1]:
            a, b, d = near[0]
            tg = [e for e in self.text_els if hexc(e["color"]) == b][:5]
            self.add("COLOR-03", "warn", tg, f"Warna teks {a} dan {b} nyaris sama (Δ={d:.0f}); satukan jadi satu token.", f"Ganti {b} dengan {a}.")
        if len(tc) > P_:
            self.add("COLOR-03", "warn", [e for e in self.text_els if tc[hexc(e["color"])] <= 2][:6], f"{len(tc)} warna teks berbeda (target ≤ {P_}).", "Batasi: teks utama, teks sekunder, link, error, sukses, putih.")

    # ---- UX & aksesibilitas ----------------------------------------------
    def ux(self):
        P, els, m = self.P, self.els, self.meta
        vm = m["viewportMeta"]
        if vm is None:
            self.add("UX-04", "error", None, 'Tidak ada <meta name="viewport">.', '<meta name="viewport" content="width=device-width, initial-scale=1">')
        else:
            low = vm.replace(" ", "").lower()
            mx = [float(x.split("=")[1]) for x in low.split(",") if x.startswith("maximum-scale=") and x.split("=")[1].replace(".", "", 1).isdigit()]
            if "user-scalable=no" in low or "user-scalable=0" in low or (mx and mx[0] < 2):
                self.add("UX-04", "error", None, f"Zoom diblokir oleh meta viewport ({vm}).", "Hapus user-scalable=no dan maximum-scale.")
        if not m["lang"]:
            self.add("UX-05", "warn", None, "<html> tidak punya atribut lang.", '<html lang="id">')
        if not m["title"]:
            self.add("UX-13", "warn", None, "Halaman tidak punya <title>.", "<title>Nama halaman — Nama situs</title>")
        if m["dupIds"]:
            self.add("UX-11", "warn", None, f"ID ganda: {', '.join(m['dupIds'])}.", "Buat id unik.")
        if m["autoplay"]:
            self.add("UX-10", "warn", None, f"{m['autoplay']} media/animasi berjalan otomatis.", "Hapus autoplay atau sediakan tombol jeda.")
        if m["posTabindex"]:
            self.add("UX-09", "warn", None, f"{m['posTabindex']} elemen memakai tabindex positif.", 'Gunakan tabindex="0" atau urutan DOM.')
        for e in els:
            if e["tag"] == "img" and not e["hasAlt"] and e["role"] not in ("presentation", "none"):
                self.add("UX-01", "error", e, "<img> tanpa atribut alt.", 'alt="deskripsi gambar" (atau alt="" bila dekoratif)')
            if e["inter"] and not e["disabled"]:
                if e["tag"] in ("input", "select", "textarea") and e["type"] not in ("hidden", "submit", "button", "reset", "image"):
                    if not e["name"]:
                        if e["placeholder"]:
                            self.add("UX-02", "warn", e, f'Hanya memakai placeholder "{e["placeholder"][:30]}" sebagai label.', "Tambahkan <label> yang selalu terlihat.")
                        else:
                            self.add("UX-02", "error", e, "Kolom form tanpa label.", '<label for="id">…</label>')
                    if e["tag"] in ("input", "textarea", "select") and e["type"] not in ("checkbox", "radio", "range", "file", "color") and e["fs"] < P["input_min_font"]:
                        self.add("UX-12", "warn", e, f"Font input {e['fs']:g}px (< {P['input_min_font']}px).", f"font-size: {P['input_min_font']}px;")
                elif not e["name"]:
                    self.add("UX-03", "error", e, f"<{e['tag']}> tanpa nama yang bisa dibaca.", 'aria-label="…" atau teks di dalamnya')
                elif e["tag"] in ("a", "button") and e["name"].strip().lower().rstrip(".!") in VAGUE and e["tag"] == "a":
                    self.add("UX-07", "warn", e, f'Teks link "{e["name"][:30]}" tidak menjelaskan tujuan.', 'Gunakan teks bermakna: "Lihat jadwal dokter".')
                if e["tag"] in ("a", "button") and not e["visText"] and e["hasIcon"] and not e["inlineLink"]:
                    self.add("UX-08", P["icon_only_sev"], e, "Kontrol hanya berisi ikon tanpa label teks.", "Tambahkan teks di samping ikon.")
            if e["inter"] and e["tabindex"] is not None:
                pass
        # Fokus
        if self.focus is not None:
            for e in els:
                if e["id"] in self.focus and not self.focus[e["id"]] and not e["disabled"]:
                    self.add("UX-06", "error", e, "Tidak ada perubahan visual saat fokus keyboard (Tab).", "button:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }")
        # fixed
        vw, vh = self.vp["w"], self.vp["h"]
        for e in els:
            if e["pos"] in ("fixed", "sticky") and e["r"]["w"] > vw * 0.5 and e["r"]["h"] > vh * 0.25 and e["tag"] not in ("body", "html"):
                self.add("UX-14", "warn", e, f"Elemen {e['pos']} menutupi {e['r']['h'] / vh * 100:.0f}% tinggi layar.", "Kecilkan header/banner menempel atau jadikan statis.")
        for n in m["navCounts"]:
            if n > P["nav_max"]:
                self.add("UX-15", "warn", [], f"Satu menu memiliki {n} tautan (disarankan ≤ {P['nav_max']}).", "Kelompokkan ke 5–7 kategori utama.")
                break
        prim = [e for e in els if e["inter"] and e["tr"]["y"] < vh and e["bgOwn"][3] > 0.9 and
                (e["tag"] == "button" or "btn" in e["cls"].lower() or "button" in e["cls"].lower() or e["type"] == "submit")
                and contrast(e["bgOwn"], e["bgPar"]) > 1.6 and e["tlen"] + len(e["visText"]) > 0]
        if len(prim) > P["primary_max"] + 1:
            self.add("UX-16", "warn", prim[:6], f"{len(prim)} tombol solid di layar pertama; pengguna bingung memilih aksi utama.", "Satu tombol solid, sisanya outline/teks.")

    # ---- Token ------------------------------------------------------------
    def token_checks(self):
        t = self.tokens
        if not t:
            return
        fs = set(float(x) for x in t.get("font_sizes", []))
        if fs:
            for e in self.text_els:
                if not any(abs(e["fs"] - x) < 0.6 for x in fs):
                    self.add("TOKEN-01", "warn", e, f"Font {e['fs']:g}px tidak ada di token ({', '.join(f'{x:g}' for x in sorted(fs))}).", "Gunakan ukuran dari token.")
        rd = set(float(x) for x in t.get("radii", []))
        if rd:
            for e in self.els:
                if e["radius"] > 0 and e["radius"] < 999 and (e["bgOwn"][3] > 0.5 or e["bw"] > 0) and not any(abs(e["radius"] - x) < 1.5 for x in rd):
                    self.add("TOKEN-01", "warn", e, f"Radius {e['radius']:.0f}px tidak ada di token ({', '.join(f'{x:g}' for x in sorted(rd))}).", "Gunakan radius dari token.")
        cs = t.get("colors", [])
        if cs:
            allowed = [tuple(int(c.lstrip('#')[k:k + 2], 16) for k in (0, 2, 4)) for c in cs]
            for e in self.text_els:
                if not any(dist(e["color"], a) < 8 for a in allowed):
                    self.add("TOKEN-01", "warn", e, f"Warna teks {hexc(e['color'])} tidak ada di token.", "Gunakan warna dari token.")
        sp = t.get("spacing_base")
        if sp:
            bad = [e for e in self.els if any(v >= 1 and round(v) % sp != 0 for v in e["pad"])]
            if bad:
                self.add("TOKEN-01", "warn", bad[:6], f"{len(bad)} elemen memakai padding bukan kelipatan {sp}px.", f"Gunakan kelipatan {sp}px.")

    # ---- Inventaris (untuk laporan visual) --------------------------------
    def build_inventory(self):
        els = self.els
        fs = collections.defaultdict(lambda: {"n": 0, "sample": ""})
        for e in self.text_els:
            k = r2(e["fs"])
            fs[k]["n"] += 1
            if not fs[k]["sample"] or (len(e["text"]) > len(fs[k]["sample"]) and len(e["text"]) < 40):
                fs[k]["sample"] = e["text"][:40]
        colors = collections.Counter(hexc(e["color"]) for e in self.text_els)
        bgs = collections.Counter(hexc(e["bgOwn"]) for e in els if e["bgOwn"][3] > 0.9)
        radii = collections.Counter(round(e["radius"]) for e in els if 0 < e["radius"] < 999 and (e["bgOwn"][3] > 0.5 or e["bw"] > 0) and e["r"]["h"] > 12)
        pill = sum(1 for e in els if e["radius"] >= 999 and (e["bgOwn"][3] > 0.5 or e["bw"] > 0))
        btn = collections.Counter(f"{round(e['r']['w'])}×{round(e['r']['h'])}" for e in els
                                  if e["tag"] == "button" or (e["tag"] == "input" and e["type"] in ("submit", "button")))
        icons = collections.Counter(round(e["r"]["w"] / 2) * 2 for e in els if e["tag"] in ("svg", "img") and 8 <= e["r"]["w"] <= 64 and abs(e["r"]["w"] - e["r"]["h"]) < 6)
        sp = collections.Counter()
        for e in els:
            for v in e["pad"] + e["mar"] + e["gap"]:
                if 1 <= v < 200:
                    sp[round(v)] += 1
        fam = collections.Counter(e["ff"] for e in self.text_els if e["ff"])
        tgt = collections.Counter(f"{round(e['tr']['w'])}×{round(e['tr']['h'])}" for e in els if e["inter"] and not e["inlineLink"])
        self.inv = {
            "body": self.base,
            "font_sizes": [{"px": k, "n": v["n"], "sample": v["sample"]} for k, v in sorted(fs.items())],
            "text_colors": colors.most_common(14), "bg_colors": bgs.most_common(14),
            "radii": sorted(radii.items()), "pill": pill,
            "buttons": btn.most_common(10), "icons": sorted(icons.items()),
            "spacing": sorted(sp.items(), key=lambda kv: -kv[1])[:16],
            "families": fam.most_common(6),
            "targets_small": sum(1 for e in els if e["inter"] and not e["inlineLink"] and (e["tr"]["w"] < self.P["target_warn"] or e["tr"]["h"] < self.P["target_warn"])),
            "targets_total": sum(1 for e in els if e["inter"] and not e["inlineLink"]),
        }


def score(issues):
    """Skor 0–100 per kategori dan keseluruhan. Pengurangan per aturan dibatasi agar adil."""
    cnt = collections.defaultdict(lambda: collections.Counter())
    for i in issues:
        cnt[i["rule"]][i["sev"]] += max(1, i["n_targets"])
    cat_ded = collections.defaultdict(float)
    for rule, c in cnt.items():
        d = 0.0
        if c["error"]:
            d += min(14, 6 + 0.7 * (c["error"] - 1))
        if c["warn"]:
            d += min(7, 2 + 0.3 * (c["warn"] - 1))
        cat_ded[RULES[rule][0]] += d
    cats = {k: max(0, round(100 - cat_ded.get(k, 0))) for k in CATS}
    vals = list(cats.values())
    blend = sum(vals) / len(vals) * 0.5 + min(vals) * 0.5
    n_err = sum(1 for i in issues if i["sev"] == "error")
    overall = max(0, round(min(blend, 100 - 1.2 * n_err)))  # banyak jenis error membatasi nilai akhir
    return overall, cats