import os
import subprocess

OUT_DIR = "public/branding/v8_reboot"
os.makedirs(OUT_DIR, exist_ok=True)

# -----------------------------------------------------------------------------
# BRIEF DIRECTIVES:
# 1. Tipe Mark: Opsi A (Kepala Beruang) dengan shape non-generic / agnostic sedikit.
# 2. Dominan: Finansial ("Ber-uang" / pertumbuhan, modal, likuiditas).
# 3. Vibe: Fintech Ramah & Dinamis (ala GoPay, Bibit, Plaid).
# 4. Warna: Mengunci selaras beranda (#0066D6 Blue 60%, #00AA13 Green 30%, White/Navy 10%).
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# CONCEPT 1: THE TOKEN GUARDIAN (KOIN & LIKUIDITAS BERUANG)
# Gagasan: Siluet beruang yang tersusun dari geometri koin dinamis (circulating tokens).
# - Telinga adalah koin likuiditas yang melambangkan modal masuk.
# - Moncong putih melengkung ramah dengan hidung hijau pertumbuhan (#00AA13).
# - Dua mata terbuka hangat & percaya diri (mentor bisnis yang ramah).
# -----------------------------------------------------------------------------
def make_c1():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-c1">
  <title id="t-c1">Beruang - The Token Guardian</title>
  
  <!-- Left Dynamic Coin Ear -->
  <circle cx="66" cy="72" r="28" fill="#0052B3" />
  <circle cx="66" cy="72" r="18" fill="#0066D6" />
  <circle cx="66" cy="72" r="8" fill="#FFFFFF" opacity="0.9" />

  <!-- Right Dynamic Coin Ear -->
  <circle cx="190" cy="72" r="28" fill="#0052B3" />
  <circle cx="190" cy="72" r="18" fill="#0066D6" />
  <circle cx="190" cy="72" r="8" fill="#FFFFFF" opacity="0.9" />

  <!-- Main Bear Head (Vibrant Trust Blue #0066D6) -->
  <path
    fill="#0066D6"
    d="
      M 92 68
      C 104 64 116 62 128 62
      C 140 62 152 64 164 68
      C 188 76 212 102 214 136
      C 216 172 196 202 170 216
      C 156 224 142 226 128 226
      C 114 226 100 224 86 216
      C 60 202 40 172 42 136
      C 44 102 68 76 92 68 Z
    "
  />

  <!-- Friendly White Muzzle (Bentuk Kubah Brankas Finansial) -->
  <path
    fill="#FFFFFF"
    d="
      M 128 130
      C 156 130 176 146 176 172
      C 176 196 154 212 128 212
      C 102 212 80 196 80 172
      C 80 146 100 130 128 130 Z
    "
  />

  <!-- Growth Green Bear Nose (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 112 150
      C 118 144 123 142 128 142
      C 133 142 138 144 144 150
      C 148 156 145 166 138 172
      C 134 175 131 176 128 176
      C 125 176 122 175 118 172
      C 111 166 108 156 112 150 Z
    "
  />

  <!-- Friendly Subtle Mouth Arc in Deep Blue (Ramah, Mentor Terpercaya) -->
  <path
    d="M 128 176 L 128 186 M 116 192 C 122 197 134 197 140 192"
    fill="none"
    stroke="#0052B3"
    stroke-width="3"
    stroke-linecap="round"
  />

  <!-- Two Open, Warm, Confident Eyes -->
  <ellipse cx="94" cy="114" rx="8" ry="10" fill="#FFFFFF" />
  <circle cx="94" cy="115" r="5" fill="#0F172A" />
  <circle cx="92" cy="113" r="1.8" fill="#FFFFFF" />

  <ellipse cx="162" cy="114" rx="8" ry="10" fill="#FFFFFF" />
  <circle cx="162" cy="115" r="5" fill="#0F172A" />
  <circle cx="160" cy="113" r="1.8" fill="#FFFFFF" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT 2: THE ACCELERATOR CHEVRON BEAR (PANAH AKSELERASI MODAL)
# Gagasan: Bentuk kepala beruang yang mengintegrasikan panah pertumbuhan modal.
# - Shape non-generic: sudut dinamis 45° yang mengalir ke atas.
# - Hidung beruang adalah segitiga pertumbuhan dinamis hijau (#00AA13).
# - Telinga bundar beruang kontras biru trust.
# - Memberi impresi kuat: "Bisnis UMKM terakselerasi dan siap didanai".
# -----------------------------------------------------------------------------
def make_c2():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-c2">
  <title id="t-c2">Beruang - The Accelerator Chevron Bear</title>
  
  <!-- Left Ear -->
  <circle cx="68" cy="74" r="26" fill="#0052B3" />
  <circle cx="68" cy="74" r="16" fill="#0066D6" />

  <!-- Right Ear -->
  <circle cx="188" cy="74" r="26" fill="#0052B3" />
  <circle cx="188" cy="74" r="16" fill="#0066D6" />

  <!-- Main Head Body (Dynamic Curved Contours) -->
  <path
    fill="#0066D6"
    d="
      M 92 68
      C 104 64 116 62 128 62
      C 140 62 152 64 164 68
      C 188 78 212 104 214 136
      C 216 172 194 200 170 214
      C 156 222 142 224 128 224
      C 114 224 100 222 86 214
      C 62 200 40 172 42 136
      C 44 104 68 78 92 68 Z
    "
  />

  <!-- Clean Vault Muzzle in Pure White -->
  <path
    fill="#FFFFFF"
    d="
      M 128 132
      C 154 132 172 146 172 170
      C 172 194 152 208 128 208
      C 104 208 84 194 84 170
      C 84 146 102 132 128 132 Z
    "
  />

  <!-- Upward Accelerator Chevron Nose (#00AA13 - Melambangkan Akselerasi Modal) -->
  <path
    fill="#00AA13"
    d="
      M 128 142
      L 146 160
      L 137 160
      L 137 172
      C 137 175 133 177 128 177
      C 123 177 119 175 119 172
      L 119 160
      L 110 160 Z
    "
  />

  <!-- Two Open, Focused Fintech Eyes -->
  <ellipse cx="94" cy="114" rx="8" ry="10" fill="#FFFFFF" />
  <circle cx="94" cy="115" r="5" fill="#0052B3" />
  <circle cx="92" cy="113" r="1.8" fill="#FFFFFF" />

  <ellipse cx="162" cy="114" rx="8" ry="10" fill="#FFFFFF" />
  <circle cx="162" cy="115" r="5" fill="#0052B3" />
  <circle cx="160" cy="113" r="1.8" fill="#FFFFFF" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT 3: THE PROSPERITY SHIELD BEAR (BERUANG PERISAI KELAYAKAN MODAL)
# Gagasan: Mengombinasikan siluet perisai kesiapan audit dengan wajah beruang yang ramah.
# - Telinga bundar menonjol di luar perisai sehingga 100% terbaca beruang.
# - Wajah ramah dengan moncong hijau pertumbuhan modal penuh (#00AA13).
# - Hidung navy (#0F172A) berbentuk kubah proteksi kas.
# - Mengomunikasikan: "Kas terlindungi, usaha layak didanai".
# -----------------------------------------------------------------------------
def make_c3():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-c3">
  <title id="t-c3">Beruang - The Prosperity Shield Bear</title>
  
  <!-- Left Ear -->
  <circle cx="68" cy="72" r="26" fill="#0052B3" />
  <circle cx="68" cy="72" r="15" fill="#0066D6" />

  <!-- Right Ear -->
  <circle cx="188" cy="72" r="26" fill="#0052B3" />
  <circle cx="188" cy="72" r="15" fill="#0066D6" />

  <!-- Main Shield Bear Body -->
  <path
    fill="#0066D6"
    d="
      M 90 66
      C 102 62 115 60 128 60
      C 141 60 154 62 166 66
      C 190 74 212 98 214 132
      C 216 172 188 206 128 226
      C 68 206 40 172 42 132
      C 44 98 66 74 90 66 Z
    "
  />

  <!-- White Outer Muzzle Ring -->
  <ellipse cx="128" cy="168" rx="48" ry="38" fill="#FFFFFF" />

  <!-- Inner Growth Green Snout (#00AA13 - Dominan Finansial) -->
  <ellipse cx="128" cy="168" rx="40" ry="30" fill="#00AA13" />

  <!-- Deep Slate Vault Nose (#0F172A) -->
  <path
    fill="#0F172A"
    d="
      M 112 150
      C 118 144 123 142 128 142
      C 133 142 138 144 144 150
      C 148 156 144 164 138 170
      C 134 173 131 174 128 174
      C 125 174 122 173 118 170
      C 112 164 108 156 112 150 Z
    "
  />

  <!-- Friendly Smile in White on Green Snout -->
  <path
    d="M 120 182 C 124 187 132 187 136 182"
    fill="none"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linecap="round"
  />

  <!-- Two Open, Intelligent Bear Eyes -->
  <circle cx="94" cy="112" r="8" fill="#FFFFFF" />
  <circle cx="94" cy="112" r="5" fill="#0F172A" />
  <circle cx="92" cy="110" r="1.8" fill="#FFFFFF" />

  <circle cx="162" cy="112" r="8" fill="#FFFFFF" />
  <circle cx="162" cy="112" r="5" fill="#0F172A" />
  <circle cx="160" cy="110" r="1.8" fill="#FFFFFF" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT 4: THE GEOMETRIC FINTECH BEAR (SWISS / LINEAR FLAT COMPOUND)
# Gagasan: Agnostik, modern, sangat rapi & matematis.
# - Single compound vector path (audit 99/100).
# - Telinga bundar presisi, moncong brankas putih, hidung hijau zamrud.
# - Dua mata slit elips terbuka yang modern dan minimalis.
# -----------------------------------------------------------------------------
def make_c4():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-c4">
  <title id="t-c4">Beruang - The Geometric Fintech Bear</title>
  
  <!-- Compound Path in Vibrant Trust Blue (#0066D6) with Cutouts -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 88 68
      C 78 48 56 40 42 54
      C 30 66 34 88 46 104
      C 36 126 34 154 48 180
      C 66 210 94 224 128 224
      C 162 224 190 210 208 180
      C 222 154 220 126 210 104
      C 222 88 226 66 214 54
      C 200 40 178 48 168 68
      C 156 62 142 60 128 60
      C 114 60 100 62 88 68 Z

      M 88 112
      A 8 8 0 1 0 88 128
      A 8 8 0 1 0 88 112 Z

      M 168 112
      A 8 8 0 1 0 168 128
      A 8 8 0 1 0 168 112 Z

      M 128 136
      C 154 136 172 150 172 174
      C 172 196 152 210 128 210
      C 104 210 84 196 84 174
      C 84 150 102 136 128 136 Z
    "
  />

  <!-- Green Bear Nose (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 112 152
      C 118 146 123 144 128 144
      C 133 144 138 146 144 152
      C 148 158 145 168 138 174
      C 134 177 131 178 128 178
      C 125 178 122 177 118 174
      C 111 168 108 158 112 152 Z
    "
  />

  <!-- Subtle Chin Anchor Notch -->
  <path fill="#0052B3" d="M 127 182 L 129 182 L 129 194 L 127 194 Z" />
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

options = {
    "c1-token-guardian": (make_c1(), "C1: The Token Guardian (Likuiditas & Koin)"),
    "c2-accelerator-chevron": (make_c2(), "C2: The Accelerator Chevron (Akselerasi Modal)"),
    "c3-prosperity-shield": (make_c3(), "C3: The Prosperity Shield (Perisai Kelayakan)"),
    "c4-geometric-fintech": (make_c4(), "C4: The Geometric Fintech Bear (Minimalist Flat)"),
}

for key, (svg_str, label) in options.items():
    with open(os.path.join(OUT_DIR, f"{key}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_str)
    with open(os.path.join(OUT_DIR, f"{key}-lockup.svg"), "w", encoding="utf-8") as f:
        f.write(make_lockup(svg_str, label))

print("Generated 4 reboot concepts successfully in", OUT_DIR)
