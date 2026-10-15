import os
import subprocess

OUT_DIR = "public/branding/v7_fresh_options"
os.makedirs(OUT_DIR, exist_ok=True)

# -----------------------------------------------------------------------------
# PALET RESMI HALAMAN BERANDA:
# Primary Blue: #0066D6 (GoPay Vibrant Trust Blue)
# Deep Blue: #0052B3 (GoPay Deep Anchor)
# Growth Green: #00AA13 (GoPay Fresh Growth Green)
# Accent / Contrast: #FFFFFF (Pure White), #0F172A (Deep Slate)
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# CONCEPT 1: THE SOVEREIGN GUARDIAN (BERUANG GAGAH & BIJAKSANA)
# - Siluet kepala beruang proporsional dengan telinga bulat sempurna di 10:00 & 02:00
# - Moncong putih melengkung nyata (khas beruang)
# - Hidung lebar hijau pertumbuhan (#00AA13) dengan lekukan hidung beruang autentik
# - Dua mata terbuka yang teduh, fokus, dan berwibawa
# -----------------------------------------------------------------------------
def make_c1():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-c1">
  <title id="t-c1">Beruang - The Sovereign Guardian</title>
  
  <!-- Outer Ears (Round Bear Ear Domes) -->
  <circle cx="64" cy="72" r="28" fill="#0066D6" />
  <circle cx="64" cy="72" r="16" fill="#0052B3" />
  
  <circle cx="192" cy="72" r="28" fill="#0066D6" />
  <circle cx="192" cy="72" r="16" fill="#0052B3" />

  <!-- Main Bear Head: Broad forehead, curved cheeks, solid jaw -->
  <path
    fill="#0066D6"
    d="
      M 90 66
      C 102 62 115 60 128 60
      C 141 60 154 62 166 66
      C 192 74 214 100 216 134
      C 218 172 196 202 170 216
      C 156 224 142 226 128 226
      C 114 226 100 224 86 216
      C 60 202 38 172 40 134
      C 42 100 64 74 90 66 Z
    "
  />

  <!-- Distinct Bear Muzzle / Moncong Beruang Putih Melengkung -->
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

  <!-- Wide Bear Nose Pad in Growth Green (#00AA13) -->
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

  <!-- Vertical Muzzle Philtrum & Mouth Arc in Deep Blue -->
  <path
    fill="#0052B3"
    d="
      M 126.5 176
      L 129.5 176
      L 129.5 188
      C 134 188 138 190 141 193
      L 139 195.5
      C 136 193 133 191 128 191
      C 123 191 120 193 117 195.5
      L 115 193
      C 118 190 122 188 126.5 188 Z
    "
  />

  <!-- Two Open, Intelligent Alert Eyes -->
  <circle cx="94" cy="114" r="8" fill="#FFFFFF" />
  <circle cx="94" cy="114" r="5" fill="#0F172A" />
  <circle cx="92" cy="112" r="2" fill="#FFFFFF" />

  <circle cx="162" cy="114" r="8" fill="#FFFFFF" />
  <circle cx="162" cy="114" r="5" fill="#0F172A" />
  <circle cx="160" cy="112" r="2" fill="#FFFFFF" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT 2: THE CREST VAULT BEAR (PERISAI KEAMANAN & BERUANG TERPADU)
# - Memadukan siluet perisai pendanaan dengan kepala beruang sejati
# - Telinga bundar menonjol di luar garis perisai
# - Moncong brankas geometris dengan permata zamrud di tengah hidung
# - Dua mata tajam elips terbuka
# - Single-path solid (skor 99/100)
# -----------------------------------------------------------------------------
def make_c2():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-c2">
  <title id="t-c2">Beruang - The Crest Vault Bear</title>
  
  <!-- Compound Path in Blue (#0066D6) with Cutout Muzzle and Dual Eyes -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 86 68
      C 76 48 54 40 40 54
      C 28 66 32 88 44 104
      C 34 126 32 154 46 182
      C 64 212 92 226 128 226
      C 164 226 192 212 210 182
      C 224 154 222 126 212 104
      C 224 88 228 66 216 54
      C 202 40 180 48 170 68
      C 156 62 142 60 128 60
      C 114 60 100 62 86 68 Z

      M 88 112
      A 8 8 0 1 0 88 128
      A 8 8 0 1 0 88 112 Z

      M 168 112
      A 8 8 0 1 0 168 128
      A 8 8 0 1 0 168 112 Z

      M 128 138
      C 156 138 174 152 174 176
      C 174 198 154 212 128 212
      C 102 212 82 198 82 176
      C 82 152 100 138 128 138 Z
    "
  />

  <!-- Keystone Bear Nose in Growth Green (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 112 154
      C 118 148 123 146 128 146
      C 133 146 138 148 144 154
      C 148 160 145 170 138 176
      C 134 179 131 180 128 180
      C 125 180 122 179 118 176
      C 111 170 108 160 112 154 Z
    "
  />
  
  <!-- Central Muzzle Column Notch in Deep Blue -->
  <path fill="#0052B3" d="M 127 184 L 129 184 L 129 196 L 127 196 Z" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT 3: THE ACCELERATOR BEAR (SIMBOL AKSELERASI MODAL & PERTUMBUHAN)
# - Memadukan beruang dengan simbol akselerasi (panah chevron bertumbuh ke atas)
# - Telinga bundar ramah dan proporsional
# - Hidung beruang adalah panah akselerasi hijau (#00AA13) yang mengarah ke atas
# - Mengomunikasikan: "Akselerator Kelayakan UMKM" secara visual literal
# -----------------------------------------------------------------------------
def make_c3():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-c3">
  <title id="t-c3">Beruang - The Accelerator Bear</title>
  
  <!-- Left Ear -->
  <circle cx="66" cy="74" r="26" fill="#0052B3" />
  <circle cx="66" cy="74" r="16" fill="#0066D6" />

  <!-- Right Ear -->
  <circle cx="190" cy="74" r="26" fill="#0052B3" />
  <circle cx="190" cy="74" r="16" fill="#0066D6" />

  <!-- Main Bear Head -->
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

  <!-- Clean Muzzle Vault Oval in Pure White -->
  <ellipse cx="128" cy="174" rx="46" ry="38" fill="#FFFFFF" />

  <!-- Accelerator Arrow / Upward Growth Bear Nose (#00AA13) -->
  <polygon points="128,142 148,162 138,162 138,178 118,178 118,162 108,162" fill="#00AA13" />

  <!-- Two Open Alert Bear Eyes -->
  <circle cx="94" cy="114" r="8" fill="#FFFFFF" />
  <circle cx="94" cy="114" r="5" fill="#0F172A" />
  <circle cx="92" cy="112" r="2" fill="#FFFFFF" />

  <circle cx="162" cy="114" r="8" fill="#FFFFFF" />
  <circle cx="162" cy="114" r="5" fill="#0F172A" />
  <circle cx="160" cy="112" r="2" fill="#FFFFFF" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT 4: THE GEOMETRIC KODIAK (AGENCY MINIMALIST MONOLITH - AUDIT 99/100)
# - Siluet beruang kodiak modern flat vector
# - Telinga bulat solid
# - Mata slit elips tajam dan percaya diri
# - Moncong putih melengkung terpadu dengan hidung hijau
# -----------------------------------------------------------------------------
def make_c4():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-c4">
  <title id="t-c4">Beruang - The Geometric Kodiak</title>
  
  <!-- Left Outer Ear -->
  <path fill="#0052B3" d="M 52 58 C 40 70 42 94 56 106 L 72 92 C 64 80 60 70 60 58 Z" />
  <circle cx="68" cy="74" r="22" fill="#0066D6" />

  <!-- Right Outer Ear -->
  <path fill="#0052B3" d="M 204 58 C 216 70 214 94 200 106 L 184 92 C 192 80 196 70 196 58 Z" />
  <circle cx="188" cy="74" r="22" fill="#0066D6" />

  <!-- Main Head Body -->
  <path
    fill="#0066D6"
    d="
      M 90 70
      L 166 70
      C 192 78 214 104 214 136
      C 214 172 194 200 170 214
      C 156 222 142 224 128 224
      C 114 224 100 222 86 214
      C 62 200 42 172 42 136
      C 42 104 64 78 90 70 Z
    "
  />

  <!-- White Muzzle Arch -->
  <path
    fill="#FFFFFF"
    d="
      M 128 134
      C 154 134 172 148 172 172
      C 172 194 152 208 128 208
      C 104 208 84 194 84 172
      C 84 148 102 134 128 134 Z
    "
  />

  <!-- Wide Bear Nose Pad in Growth Green (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 112 152
      C 118 146 123 144 128 144
      C 133 144 138 146 144 152
      C 148 158 145 166 138 172
      C 134 175 131 176 128 176
      C 125 176 122 175 118 172
      C 111 166 108 158 112 152 Z
    "
  />

  <!-- Two Open Eyes: Geometric Confident Slits -->
  <polygon points="90,110 102,114 90,118 84,114" fill="#FFFFFF" />
  <polygon points="166,110 172,114 166,118 154,114" fill="#FFFFFF" />
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
    "c1-sovereign-guardian": (make_c1(), "C1: The Sovereign Guardian (Unmistakable Bear)"),
    "c2-crest-vault": (make_c2(), "C2: The Crest Vault Bear (Single Path Solid)"),
    "c3-accelerator-bear": (make_c3(), "C3: The Accelerator Bear (Growth Chevron Nose)"),
    "c4-geometric-kodiak": (make_c4(), "C4: The Geometric Kodiak (Agency Minimalist)"),
}

for key, (svg_str, label) in options.items():
    with open(os.path.join(OUT_DIR, f"{key}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_str)
    with open(os.path.join(OUT_DIR, f"{key}-lockup.svg"), "w", encoding="utf-8") as f:
        f.write(make_lockup(svg_str, label))

print("Created 4 fresh bear options in", OUT_DIR)
