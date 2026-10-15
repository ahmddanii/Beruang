import os
import subprocess

OUT_DIR = "public/branding/vault_redesign"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# STYLE 1: THE GEOMETRIC VAULT (Inspirasi Ref 4)
# Karakter: Kokoh, institusional, security-first, tanpa mata.
# Siluet perisai beruang bersudut tegas-halus, crown datar, moncong lingkaran brankas.
# --------------------------------------------------------------------------
style_1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-1">
  <title id="title-1">Beruang - The Geometric Vault</title>
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 96 64
      C 86 60 70 42 54 52
      C 42 60 44 80 52 96
      C 38 116 34 146 52 174
      C 68 202 96 216 128 216
      C 160 216 188 202 204 174
      C 222 146 218 116 204 96
      C 212 80 214 60 202 52
      C 186 42 170 60 160 64
      L 96 64 Z

      M 128 102
      C 150 102 168 120 168 142
      C 168 164 150 182 128 182
      C 106 182 88 164 88 142
      C 88 120 106 102 128 102 Z
    "
  />
  <!-- Emerald Growth Horizontal Oval Nose -->
  <path
    fill="#00AA13"
    d="
      M 110 136
      C 110 126 118 126 128 126
      C 138 126 146 126 146 136
      C 146 146 138 146 128 146
      C 118 146 110 146 110 136 Z
    "
  />
</svg>"""

# --------------------------------------------------------------------------
# STYLE 2: THE TECH CAPSULE (Inspirasi Ref 5)
# Karakter: Modern tech startup, siluet kapsul vertikal memanjang, telinga notch,
# mata half-lidded santai & percaya diri, moncong brankas vertikal stadium.
# --------------------------------------------------------------------------
style_2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-2">
  <title id="title-2">Beruang - The Tech Capsule</title>
  <!-- Single continuous body with ears, half-lidded eyes, and vertical vault slot cutout -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 44
      C 150 44 164 48 172 54
      C 178 38 198 42 202 58
      C 204 68 200 78 196 86
      L 196 156
      C 196 198 168 224 128 224
      C 88 224 60 198 60 156
      L 60 86
      C 56 78 52 68 54 58
      C 58 42 78 38 84 54
      C 92 48 106 44 128 44 Z

      M 80 114
      L 102 114
      C 102 122 80 122 80 114 Z

      M 154 114
      L 176 114
      C 176 122 154 122 154 114 Z

      M 112 120
      C 112 110 120 106 128 106
      C 136 106 144 110 144 120
      L 144 164
      C 144 174 136 178 128 178
      C 120 178 112 174 112 164 Z
    "
  />
  <!-- Emerald Growth Nose & Combination Dial Notch -->
  <path
    fill="#00AA13"
    d="
      M 118 124
      C 118 118 122 116 128 116
      C 134 116 138 118 138 124
      C 138 130 134 132 128 132
      C 122 132 118 130 118 124 Z

      M 124 158
      C 124 155 126 154 128 154
      C 130 154 132 155 132 158
      L 132 166
      C 132 169 130 170 128 170
      C 126 170 124 169 124 166 Z
    "
  />
</svg>"""

# --------------------------------------------------------------------------
# STYLE 3: THE FRIENDLY MASCOT (Inspirasi Ref 1 &amp; Ref 3)
# Karakter: Hangat, membumi, pipi chubby membal, mata tersenyum ramah, moncong bulat.
# --------------------------------------------------------------------------
style_3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-3">
  <title id="title-3">Beruang - The Friendly Mascot</title>
  <!-- Chubby Organic Bear Silhouette with Soft Ear Dips, Smiling Crescent Eyes, and Vault Muzzle -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 80
      C 112 80 100 66 86 54
      C 70 40 48 52 46 74
      C 44 94 44 112 38 132
      C 30 170 54 214 94 226
      C 110 230 118 230 128 230
      C 138 230 146 230 162 226
      C 202 214 226 170 218 132
      C 212 112 212 94 210 74
      C 208 52 186 40 170 54
      C 156 66 144 80 128 80 Z

      M 74 116
      C 80 124 92 124 98 116
      C 94 121 78 121 74 116 Z

      M 158 116
      C 164 124 176 124 182 116
      C 178 121 162 121 158 116 Z

      M 128 122
      C 150 122 168 139 168 160
      C 168 181 150 198 128 198
      C 106 198 88 181 88 160
      C 88 139 106 122 128 122 Z
    "
  />
  <!-- Emerald Growth Nose & Gentle Smile Arc inside Muzzle -->
  <path
    fill="#00AA13"
    d="
      M 116 148
      C 116 140 121 136 128 136
      C 135 136 140 140 140 148
      C 140 155 135 158 128 158
      C 121 158 116 155 116 148 Z

      M 122 172
      C 124 176 132 176 134 172
      C 132 174 124 174 122 172 Z
    "
  />
</svg>"""

def make_lockup(symbol_inner, title):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 180" width="680" height="180" role="img" aria-labelledby="title-lockup">
  <title id="title-lockup">{title}</title>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&amp;display=swap');
      .brand-title {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 54px;
        font-weight: 700;
        fill: #0F172A;
      }}
      .brand-tagline {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 13px;
        font-weight: 600;
        fill: #0081A0;
        letter-spacing: 2px;
      }}
    </style>
  </defs>
  <g transform="translate(24, 25) scale(0.5078)">
    {symbol_inner}
  </g>
  <text x="180" y="96" class="brand-title">Beruang</text>
  <text x="182" y="128" class="brand-tagline">AKSELERATOR KELAYAKAN UMKM</text>
</svg>"""

def get_inner(svg_str):
    start = svg_str.find(">") + 1
    end = svg_str.rfind("</svg>")
    return svg_str[start:end]

files = {
    "style-1-geometric.svg": style_1_svg,
    "style-2-capsule.svg": style_2_svg,
    "style-3-mascot.svg": style_3_svg,
    "style-1-lockup.svg": make_lockup(get_inner(style_1_svg), "Beruang - The Geometric Vault"),
    "style-2-lockup.svg": make_lockup(get_inner(style_2_svg), "Beruang - The Tech Capsule"),
    "style-3-lockup.svg": make_lockup(get_inner(style_3_svg), "Beruang - The Friendly Mascot"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated the 3 truly contrasting reference-inspired styles!")
