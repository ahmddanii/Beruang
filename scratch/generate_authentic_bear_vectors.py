import os
import subprocess

OUT_DIR = "public/branding/v6_authentic_bear"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# PALET WARNA HALAMAN BERANDA (HOMEPAGE ECOSYSTEM):
# Primary Blue (60%): #0066D6 (GoPay Vibrant Trust Blue)
# Success Green (30%): #00AA13 (GoPay Fresh Growth Green)
# Accent / Base: #FFFFFF (Crisp White), #F0F7FD (Ice Blue), #0F172A (Deep Slate)
# --------------------------------------------------------------------------

# --------------------------------------------------------------------------
# OPTION 1: THE ICONIC MODERN BEAR (SANGAT BERUANG & ELEGAN FINANSIAL)
# Ciri khas beruang sejati:
# - Telinga bundar menonjol di kiri & kanan atas (unmistakable bear ears)
# - Moncong (muzzle) oval melengkung khas beruang dalam warna kontras ice-blue/putih
# - Hidung beruang lebar segitiga membulat warna hijau GoPay (#00AA13)
# - 2 mata terbuka yang waspada, ramah, dan berwibawa
# - Kepala utama biru GoPay (#0066D6)
# --------------------------------------------------------------------------
def make_opt1():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-opt1">
  <title id="t-opt1">Beruang - The Iconic Modern Bear</title>
  
  <!-- Left Round Bear Ear -->
  <circle cx="68" cy="74" r="28" fill="#0066D6" />
  <circle cx="68" cy="74" r="16" fill="#0052B3" />
  
  <!-- Right Round Bear Ear -->
  <circle cx="188" cy="74" r="28" fill="#0066D6" />
  <circle cx="188" cy="74" r="16" fill="#0052B3" />

  <!-- Main Bear Head Shape (Broad Forehead, Rounded Cheeks, Sturdy Chin) -->
  <path
    fill="#0066D6"
    d="
      M 92 68
      C 104 64 116 62 128 62
      C 140 62 152 64 164 68
      C 186 76 210 102 212 136
      C 214 170 196 198 172 212
      C 158 220 144 224 128 224
      C 112 224 98 220 84 212
      C 60 198 42 170 44 136
      C 46 102 70 76 92 68 Z
    "
  />

  <!-- Distinct Bear Muzzle / Moncong Beruang (Crisp White Vault Oval) -->
  <path
    fill="#FFFFFF"
    d="
      M 128 132
      C 156 132 174 148 174 172
      C 174 196 154 210 128 210
      C 102 210 82 196 82 172
      C 82 148 100 132 128 132 Z
    "
  />

  <!-- Wide Bear Nose (Growth Green #00AA13 - Khas Hidung Beruang) -->
  <path
    fill="#00AA13"
    d="
      M 112 152
      C 118 148 124 146 128 146
      C 132 146 138 148 144 152
      C 148 156 146 166 138 172
      C 134 175 131 176 128 176
      C 125 176 122 175 118 172
      C 110 166 108 156 112 152 Z
    "
  />

  <!-- Subtle Bear Mouth / Muzzle Seam -->
  <path
    d="M 128 176 L 128 188 M 118 194 C 123 197 128 197 128 197 C 128 197 133 197 138 194"
    fill="none"
    stroke="#0052B3"
    stroke-width="3"
    stroke-linecap="round"
  />

  <!-- Two Open, Alert, Intelligent Bear Eyes (Slate Navy #0F172A) -->
  <circle cx="94" cy="116" r="8" fill="#FFFFFF" />
  <circle cx="94" cy="116" r="5" fill="#0F172A" />
  <circle cx="92" cy="114" r="2" fill="#FFFFFF" />

  <circle cx="162" cy="116" r="8" fill="#FFFFFF" />
  <circle cx="162" cy="116" r="5" fill="#0F172A" />
  <circle cx="160" cy="114" r="2" fill="#FFFFFF" />
</svg>"""

# --------------------------------------------------------------------------
# OPTION 2: THE FLAT GEOMETRIC BEAR (MODERN TECH B2B - SINGLE PATH COMPOUND)
# Tetap murni flat vector shape (0 stroke, 100% scalable):
# - Telinga melengkung tebal sempurna (identitas beruang 100%)
# - Ruang negatif moncong membentuk brankas kubah dan hidung segitiga hijau
# - Sepasang mata terbuka tajam dan percaya diri
# --------------------------------------------------------------------------
def make_opt2():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-opt2">
  <title id="t-opt2">Beruang - The Flat Geometric Bear</title>
  
  <!-- Compound Path in Vibrant Trust Blue (#0066D6) with Cutout Muzzle & Eyes -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 90 70
      C 82 52 64 42 48 54
      C 34 64 36 86 48 102
      C 36 122 34 152 48 178
      C 64 206 92 222 128 222
      C 164 222 192 206 208 178
      C 222 152 220 122 208 102
      C 220 86 222 64 208 54
      C 192 42 174 52 166 70
      C 154 66 142 64 128 64
      C 114 64 102 66 90 70 Z

      M 86 112
      C 86 104 94 98 102 104
      C 106 107 106 117 102 120
      C 94 126 86 120 86 112 Z

      M 170 112
      C 170 104 162 98 154 104
      C 150 107 150 117 154 120
      C 162 126 170 120 170 112 Z

      M 128 136
      C 154 136 170 150 170 172
      C 170 194 152 208 128 208
      C 104 208 86 194 86 172
      C 86 150 102 136 128 136 Z
    "
  />

  <!-- Wide Bear Nose Pad in GoPay Growth Green (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 112 156
      C 118 152 123 150 128 150
      C 133 150 138 152 144 156
      C 147 160 145 168 138 174
      C 134 177 131 178 128 178
      C 125 178 122 177 118 174
      C 111 168 109 160 112 156 Z
    "
  />

  <!-- Subtle Chin Anchor Point in Deep Blue (#0052B3) -->
  <path
    fill="#0052B3"
    d="M 128 184 L 132 192 L 124 192 Z"
  />
</svg>"""

# --------------------------------------------------------------------------
# OPTION 3: THE DUAL-TONE VENTURE BEAR (BLUE & GREEN HARMONY)
# Memadukan Biru Trust (#0066D6) dan Hijau Pertumbuhan (#00AA13) secara seimbang:
# - Siluet beruang gagah dengan telinga melengkung berkontur
# - Area dahi dan telinga berwibawa
# - Moncong beruang hijau zamrud terang (#00AA13) dengan hidung navy (#0F172A)
# - Sangat jelas merepresentasikan "Beruang" dan "Ber-uang" (finansial)
# --------------------------------------------------------------------------
def make_opt3():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-opt3">
  <title id="t-opt3">Beruang - The Dual-Tone Venture Bear</title>
  
  <!-- Left Ear -->
  <circle cx="70" cy="72" r="26" fill="#0052B3" />
  <circle cx="70" cy="72" r="15" fill="#0066D6" />

  <!-- Right Ear -->
  <circle cx="186" cy="72" r="26" fill="#0052B3" />
  <circle cx="186" cy="72" r="15" fill="#0066D6" />

  <!-- Main Bear Head (Vibrant Blue #0066D6) -->
  <path
    fill="#0066D6"
    d="
      M 92 68
      C 104 64 116 62 128 62
      C 140 62 152 64 164 68
      C 188 78 210 102 212 136
      C 214 172 194 200 170 214
      C 156 222 142 224 128 224
      C 114 224 100 222 86 214
      C 62 200 42 172 44 136
      C 46 102 68 78 92 68 Z
    "
  />

  <!-- Prominent Green Snout / Moncong Hijau Pertumbuhan (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 128 134
      C 154 134 172 148 172 172
      C 172 194 152 208 128 208
      C 104 208 84 194 84 172
      C 84 148 102 134 128 134 Z
    "
  />

  <!-- Deep Slate Bear Nose on Green Snout (#0F172A) -->
  <path
    fill="#0F172A"
    d="
      M 112 152
      C 118 148 123 146 128 146
      C 133 146 138 148 144 152
      C 147 156 145 164 138 170
      C 134 173 131 174 128 174
      C 125 174 122 173 118 170
      C 111 164 109 156 112 152 Z
    "
  />

  <!-- Open Alert Bear Eyes (White Sclera + Deep Navy Pupil) -->
  <ellipse cx="94" cy="114" rx="9" ry="11" fill="#FFFFFF" />
  <circle cx="94" cy="114" r="6" fill="#0F172A" />
  <circle cx="92" cy="112" r="2" fill="#FFFFFF" />

  <ellipse cx="162" cy="114" rx="9" ry="11" fill="#FFFFFF" />
  <circle cx="162" cy="114" r="6" fill="#0F172A" />
  <circle cx="160" cy="112" r="2" fill="#FFFFFF" />
</svg>"""

# --------------------------------------------------------------------------
# OPTION 4: THE MONOLITHIC KODIAK (MINIMALIST & VERY STRONG BEAR SILHOUETTE)
# Gaya agensi premium:
# - Siluet beruang kodiak yang masif, proporsional, dan sangat organik-geometris
# - Telinga bulat sempurna terpadu dengan kontur dahi
# - Moncong putih bersih dengan hidung zamrud #00AA13
# - Mata slit elips percaya diri khas beruang kutub / beruang coklat
# --------------------------------------------------------------------------
def make_opt4():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-opt4">
  <title id="t-opt4">Beruang - The Monolithic Kodiak</title>
  
  <!-- Single Sculpted Bear Silhouette in Vibrant Blue (#0066D6) with Cutouts -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 88 72
      C 78 50 56 42 42 56
      C 30 68 34 90 48 106
      C 38 126 36 154 48 180
      C 66 210 94 224 128 224
      C 162 224 190 210 208 180
      C 220 154 218 126 208 106
      C 222 90 226 68 214 56
      C 200 42 178 50 168 72
      C 156 66 142 64 128 64
      C 114 64 100 66 88 72 Z

      M 88 114
      A 7 7 0 1 0 88 128
      A 7 7 0 1 0 88 114 Z

      M 168 114
      A 7 7 0 1 0 168 128
      A 7 7 0 1 0 168 114 Z

      M 128 140
      C 152 140 168 152 168 174
      C 168 196 150 210 128 210
      C 106 210 88 196 88 174
      C 88 152 104 140 128 140 Z
    "
  />

  <!-- Green Growth Bear Nose (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 112 156
      C 118 150 123 148 128 148
      C 133 148 138 150 144 156
      C 148 162 144 172 138 176
      C 134 178 131 179 128 179
      C 125 179 122 178 118 176
      C 112 172 108 162 112 156 Z
    "
  />
</svg>"""

# Lockup Builder with Homepage Colors
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
    "opt1-iconic-bear": (make_opt1(), "Option 1: The Iconic Modern Bear"),
    "opt2-flat-geometric": (make_opt2(), "Option 2: The Flat Geometric Bear"),
    "opt3-dualtone-venture": (make_opt3(), "Option 3: The Dual-Tone Venture Bear"),
    "opt4-monolithic-kodiak": (make_opt4(), "Option 4: The Monolithic Kodiak"),
}

for key, (svg_str, label) in options.items():
    with open(os.path.join(OUT_DIR, f"{key}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_str)
    with open(os.path.join(OUT_DIR, f"{key}-lockup.svg"), "w", encoding="utf-8") as f:
        f.write(make_lockup(svg_str, label))

print("Created 4 authentic bear options in", OUT_DIR)
