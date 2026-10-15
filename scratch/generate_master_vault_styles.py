import os
import subprocess

OUT_DIR = "public/branding/vault_redesign"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# OPTION 1: THE MODERN GUARDIAN (Ref 4 Precision)
# --------------------------------------------------------------------------
# Proportions faithfully derived from Reference 4:
# Wide flat crown, compact rounded ears flowing organically, wide sturdy cheeks,
# shield-rounded jaw, pure circular vault muzzle, wide horizontal oval emerald nose.
style_1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-1">
  <title id="title-1">Beruang - The Modern Guardian</title>
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 100 68
      C 88 64 70 44 54 54
      C 42 62 44 82 52 98
      C 38 118 34 148 52 176
      C 68 204 96 216 128 216
      C 160 216 188 204 204 176
      C 222 148 218 118 204 98
      C 212 82 214 62 202 54
      C 186 44 168 64 156 68
      L 100 68 Z

      M 128 100
      C 151 100 170 119 170 142
      C 170 165 151 184 128 184
      C 105 184 86 165 86 142
      C 86 119 105 100 128 100 Z
    "
  />
  <!-- Emerald Growth Horizontal Oval Nose (Ref 4 Proportion) -->
  <path
    fill="#00AA13"
    d="
      M 108 134
      C 108 123 117 123 128 123
      C 139 123 148 123 148 134
      C 148 145 139 145 128 145
      C 117 145 108 145 108 134 Z
    "
  />
</svg>
"""

# --------------------------------------------------------------------------
# OPTION 2: THE TRUST MENTOR (Hybrid Ref 4 + Ref 1)
# --------------------------------------------------------------------------
# Institutional silhouette + approachable, trustworthy almond calm eyes.
style_2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-2">
  <title id="title-2">Beruang - The Trust Mentor</title>
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 100 68
      C 88 64 70 44 54 54
      C 42 62 44 82 52 98
      C 38 118 34 148 52 176
      C 68 204 96 216 128 216
      C 160 216 188 204 204 176
      C 222 148 218 118 204 98
      C 212 82 214 62 202 54
      C 186 44 168 64 156 68
      L 100 68 Z

      M 128 100
      C 151 100 170 119 170 142
      C 170 165 151 184 128 184
      C 105 184 86 165 86 142
      C 86 119 105 100 128 100 Z

      M 72 106
      C 72 99 92 99 92 106
      C 88 112 76 112 72 106 Z

      M 164 106
      C 164 99 184 99 184 106
      C 180 112 168 112 164 106 Z
    "
  />
  <!-- Emerald Growth Horizontal Oval Nose -->
  <path
    fill="#00AA13"
    d="
      M 108 134
      C 108 123 117 123 128 123
      C 139 123 148 123 148 134
      C 148 145 139 145 128 145
      C 117 145 108 145 108 134 Z
    "
  />
</svg>
"""

# --------------------------------------------------------------------------
# OPTION 3: THE FRIENDLY COMPANION (Ref 1 & Ref 2 Chubby Squircle)
# --------------------------------------------------------------------------
# Organic contour from Ref 1: gentle valley crown, smooth ears, chubby cheeks,
# calm eyes, and central circular vault muzzle.
style_3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-3">
  <title id="title-3">Beruang - The Friendly Companion</title>
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 76
      C 112 76 98 62 84 50
      C 68 36 50 46 48 68
      C 46 86 46 106 42 126
      C 36 162 56 204 94 218
      C 108 222 120 222 128 222
      C 136 222 148 222 162 218
      C 200 204 220 162 214 126
      C 210 106 210 86 208 68
      C 206 46 188 36 172 50
      C 158 62 144 76 128 76 Z

      M 128 108
      C 149 108 166 125 166 146
      C 166 167 149 184 128 184
      C 107 184 90 167 90 146
      C 90 125 107 108 128 108 Z

      M 74 112
      C 74 105 92 105 92 112
      C 88 118 78 118 74 112 Z

      M 164 112
      C 164 105 182 105 182 112
      C 178 118 168 118 164 112 Z
    "
  />
  <path
    fill="#00AA13"
    d="
      M 110 140
      C 110 130 118 130 128 130
      C 138 130 146 130 146 140
      C 146 150 138 150 128 150
      C 118 150 110 150 110 140 Z
    "
  />
</svg>
"""

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
    "style-1.svg": style_1_svg,
    "style-2.svg": style_2_svg,
    "style-3.svg": style_3_svg,
    "style-1-lockup.svg": make_lockup(get_inner(style_1_svg), "Beruang - Style 1"),
    "style-2-lockup.svg": make_lockup(get_inner(style_2_svg), "Beruang - Style 2"),
    "style-3-lockup.svg": make_lockup(get_inner(style_3_svg), "Beruang - Style 3"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated refined master styles 1, 2, 3 and lockups!")
