import os
import subprocess

OUT_DIR = "public/branding/v10_radical_redesign"
os.makedirs(OUT_DIR, exist_ok=True)

# -----------------------------------------------------------------------------
# PALET RESMI HALAMAN BERANDA:
# Primary Blue: #0066D6 (GoPay Vibrant Trust Blue)
# Deep Blue: #0052B3 (GoPay Deep Anchor)
# Growth Green: #00AA13 (GoPay Fresh Growth Green)
# Contrast: #FFFFFF (Pure White), #0F172A (Deep Slate)
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# CONCEPT A: THE FORWARD MARKET PROFILE (PROFIL SAMPING FINANSIAL)
# Gagasan: Mengubah sudut pandang dari frontal menjadi profil samping (Side Profile).
# Dalam dunia finansial global, profil beruang melambangkan kekuatan pasar & visi ke depan.
# - Kepala beruang menghadap ke kanan (arah masa depan & grafik bertumbuh).
# - Telinga bundar khas beruang di puncak.
# - Moncong tegas dengan hidung hijau pertumbuhan (#00AA13) di ujungnya.
# - Mata slit elips tajam yang memandang optimis.
# -----------------------------------------------------------------------------
def make_concept_a():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-ca">
  <title id="t-ca">Beruang - The Forward Market Profile</title>
  
  <!-- Single Sculpted Profile Silhouette in Vibrant Blue (#0066D6) with Cutouts -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 56 196
      C 52 168 56 136 68 108
      C 76 88 92 72 108 68
      C 106 52 116 38 132 38
      C 146 38 156 48 158 64
      C 176 68 196 82 208 104
      C 214 116 218 130 220 144
      L 184 144
      C 174 144 164 148 156 156
      L 142 170
      C 134 178 122 184 110 184
      L 76 184
      C 66 184 58 188 56 196 Z

      M 148 102
      C 154 96 164 96 170 102
      C 174 106 172 114 166 116
      C 158 118 146 110 148 102 Z
    "
  />

  <!-- Growth Green Snout Tip & Nose (#00AA13) - Titik Fokus Akselerasi -->
  <path
    fill="#00AA13"
    d="
      M 218 126
      C 222 132 222 138 220 144
      L 188 144
      C 192 136 198 130 206 128
      L 218 126 Z
    "
  />

  <!-- Base Grounding Shadow Arc in Deep Blue (#0052B3) -->
  <path
    fill="#0052B3"
    d="
      M 56 196
      C 72 192 90 190 110 190
      L 142 190
      C 156 190 168 196 176 206
      L 156 214
      C 148 208 138 204 126 204
      L 72 204
      C 62 204 56 200 56 196 Z
    "
  />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT B: THE CONTINUOUS CASH-FLOW BEAR (MONOLINE LOOP ARUS KAS)
# Gagasan: Siluet kepala beruang yang tersusun dari pita kontinu geometris (continuous ribbon).
# Melambangkan: "Arus kas UMKM yang mengalir lancar, aman, dan tanpa henti".
# - Garis dinamis membentuk telinga melingkar kiri & kanan.
# - Mengalir membentuk kontur rahang dan menyatu di pusat moncong.
# - Hidung beruang adalah simpul hijau pertumbuhan modal (#00AA13).
# -----------------------------------------------------------------------------
def make_concept_b():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-cb">
  <title id="t-cb">Beruang - The Continuous Cash-Flow Bear</title>
  
  <!-- Outer Flow Loop: Ears, Head, Cheeks in Bold Unified Vector Geometry -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 86 64
      C 72 44 48 38 34 54
      C 20 70 24 96 40 112
      C 30 134 30 162 44 186
      C 62 216 92 230 128 230
      C 164 230 194 216 212 186
      C 226 162 226 134 216 112
      C 232 96 236 70 222 54
      C 208 38 184 44 170 64
      C 156 58 142 56 128 56
      C 114 56 100 58 86 64 Z

      M 84 80
      C 98 74 112 72 128 72
      C 144 72 158 74 172 80
      C 180 84 188 78 194 68
      C 202 56 214 58 218 64
      C 224 74 218 90 206 100
      C 214 122 214 148 202 170
      C 188 196 162 212 128 212
      C 94 212 68 196 54 170
      C 42 148 42 122 50 100
      C 38 90 32 74 38 64
      C 42 58 54 56 62 68
      C 68 78 76 84 84 80 Z

      M 86 116
      A 7 7 0 1 0 86 130
      A 7 7 0 1 0 86 116 Z

      M 170 116
      A 7 7 0 1 0 170 130
      A 7 7 0 1 0 170 116 Z

      M 128 146
      C 148 146 162 158 162 176
      C 162 194 146 206 128 206
      C 110 206 94 194 94 176
      C 94 158 108 146 128 146 Z
    "
  />

  <!-- Growth Green Vault Node (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 114 162
      C 120 156 124 154 128 154
      C 132 154 136 156 142 162
      C 145 166 143 174 137 178
      C 134 180 131 181 128 181
      C 125 181 122 180 119 178
      C 113 174 111 166 114 162 Z
    "
  />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT C: THE "B" MONOGRAM BEAR (FUSI HURUF 'B' + KEPALA BERUANG)
# Gagasan: Mengawinkan huruf kapital "B" (Beruang / Bisnis) dengan siluet beruang.
# - Lengkungan atas 'B' mengintegrasikan telinga bundar beruang.
# - Lengkungan bawah 'B' mengintegrasikan moncong brankas modal.
# - Hidung hijau zamrud (#00AA13) sebagai pusat atensi.
# - Sangat bernilai sebagai ikon aplikasi finansial kelas dunia (ala Beats / Airbnb).
# -----------------------------------------------------------------------------
def make_concept_c():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-cc">
  <title id="t-cc">Beruang - The 'B' Monogram Bear</title>
  
  <!-- Geometric 'B' Bear Monogram in Trust Blue (#0066D6) with Precision Cutouts -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 60 48
      L 142 48
      C 164 48 180 58 184 76
      C 188 94 174 110 156 118
      C 178 126 196 144 196 170
      C 196 198 172 216 140 216
      L 60 216
      Z

      M 88 74
      L 136 74
      C 148 74 156 82 156 94
      C 156 106 148 114 136 114
      L 88 114
      Z

      M 88 136
      L 138 136
      C 152 136 164 146 164 162
      C 164 178 152 190 138 190
      L 88 190
      Z
    "
  />

  <!-- Integrated Bear Ear Disc on Top of Monogram in Deep Blue (#0052B3) -->
  <circle cx="140" cy="48" r="22" fill="#0052B3" />
  <circle cx="140" cy="48" r="12" fill="#0066D6" />

  <!-- Growth Green Accelerator Keystone (#00AA13) Nestled in Lower Loop -->
  <polygon points="138,150 152,162 138,174 124,162" fill="#00AA13" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT D: THE ISOMETRIC TECH BEAR (POLIGON FACET VENTURE CAPITAL)
# Gagasan: Konstruksi 3D/Isometric flat planes. Menggunakan pencahayaan faset:
# - Bidang kiri: Deep Blue (#0052B3)
# - Bidang kanan & dahi: Vibrant Trust Blue (#0066D6)
# - Moncong & hidung: Growth Green (#00AA13)
# - Memberikan impresi teknologi modern mutakhir, kecerdasan buatan, dan ketelitian audit data.
# -----------------------------------------------------------------------------
def make_concept_d():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-cd">
  <title id="t-cd">Beruang - The Isometric Tech Bear</title>
  
  <!-- Left Ear (Deep Tone #003E8A) -->
  <polygon points="60,82 46,60 70,46 86,64" fill="#003E8A" />
  <circle cx="68" cy="62" r="14" fill="#0052B3" />

  <!-- Right Ear (Vibrant Tone #0052B3) -->
  <polygon points="196,82 210,60 186,46 170,64" fill="#0052B3" />
  <circle cx="188" cy="62" r="14" fill="#0066D6" />

  <!-- Left Facet Face (Deep Shadow #0052B3) -->
  <polygon points="128,68 86,64 54,104 48,156 128,224 128,154" fill="#0052B3" />

  <!-- Right Facet Face (Vibrant Light #0066D6) -->
  <polygon points="128,68 170,64 202,104 208,156 128,224 128,154" fill="#0066D6" />

  <!-- Crown Forehead Facet (Mid Tone #0077F5) -->
  <polygon points="128,68 86,64 128,102 170,64" fill="#0077F5" />

  <!-- Left Eye Slit in White Negative Space -->
  <polygon points="90,114 104,118 92,124 82,120" fill="#FFFFFF" />

  <!-- Right Eye Slit in White Negative Space -->
  <polygon points="166,114 152,118 164,124 174,120" fill="#FFFFFF" />

  <!-- Center Snout Keystone Facet in Growth Green (#00AA13 - Venture Core) -->
  <polygon points="128,138 148,162 128,186 108,162" fill="#00AA13" />
  <!-- Keystone Highlight Plane -->
  <polygon points="128,138 148,162 128,186" fill="#10B981" />
</svg>"""

# Lockup Builder
def make_lockup(symbol_svg, title):
    inner = symbol_svg[symbol_svg.find(">") + 1 : symbol_svg.rfind("</svg>")]
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 180" width="680" height="180" role="img" aria-labelledby="t-lk">
  <title id="t-lk">{title}</title>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&amp;display=swap');
      .brand-title {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 54px;
        font-weight: 700;
        fill: #0066D6;
      }}
      .brand-tagline {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 13px;
        font-weight: 600;
        fill: #00AA13;
        letter-spacing: 2px;
      }}
    </style>
  </defs>
  <g transform="translate(24, 25) scale(0.5078)">
    {inner}
  </g>
  <text x="180" y="96" class="brand-title">Beruang</text>
  <text x="182" y="128" class="brand-tagline">AKSELERATOR KELAYAKAN UMKM</text>
</svg>"""

concepts = {
    "concept-a-market-profile": (make_concept_a(), "Konsep A: The Forward Market Profile (Profil Samping Finansial)"),
    "concept-b-cashflow-loop": (make_concept_b(), "Konsep B: The Continuous Cash-Flow Bear (Loop Arus Kas)"),
    "concept-c-b-monogram": (make_concept_c(), "Konsep C: The 'B' Monogram Bear (Fusi Huruf 'B' + Beruang)"),
    "concept-d-isometric-facet": (make_concept_d(), "Konsep D: The Isometric Tech Bear (Poligon Facet Venture)"),
}

for key, (svg_str, label) in concepts.items():
    with open(os.path.join(OUT_DIR, f"{key}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_str)
    with open(os.path.join(OUT_DIR, f"{key}-lockup.svg"), "w", encoding="utf-8") as f:
        f.write(make_lockup(svg_str, label))

print("Created 4 radically fresh concepts in", OUT_DIR)
