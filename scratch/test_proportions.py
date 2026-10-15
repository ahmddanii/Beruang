import os
import subprocess

OUT_DIR = "public/branding/vault_redesign"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# OPTION 2A: THE HERITAGE VAULT BEAR (Pure Ref 4)
# --------------------------------------------------------------------------
# Proportions faithfully derived from Reference 4:
# Compact semicircular ears, wide flat crown, sturdy wide cheeks, shield-rounded jaw.
# Central circular vault muzzle with emerald horizontal oval nose.
style_2a_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-2a">
  <title id="title-2a">Beruang - The Pure Vault Bear</title>
  <!-- Symmetrical Bear Silhouette with wide crown, sturdy rounded ears, and vault muzzle -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 96 84
      C 90 70 78 60 62 60
      C 44 60 34 76 38 98
      C 40 114 42 124 38 140
      C 32 174 54 212 88 228
      C 106 236 120 238 128 238
      C 136 238 150 236 168 228
      C 202 212 224 174 218 140
      C 214 124 216 114 218 98
      C 222 76 212 60 194 60
      C 178 60 166 70 160 84
      L 96 84 Z

      M 128 114
      C 152 114 172 134 172 158
      C 172 182 152 202 128 202
      C 104 202 84 182 84 158
      C 84 134 104 114 128 114 Z
    "
  />
  <!-- Emerald Growth Horizontal Oval Nose -->
  <path
    fill="#00AA13"
    d="
      M 112 156
      C 112 148 119 144 128 144
      C 137 144 144 148 144 156
      C 144 164 137 168 128 168
      C 119 168 112 164 112 156 Z
    "
  />
</svg>
"""

# --------------------------------------------------------------------------
# OPTION 2B: THE CALM VAULT GUARDIAN (Ref 4 Silhouette + Ref 1 Calm Eyes)
# --------------------------------------------------------------------------
# Exactly like 2A, but incorporates the calm, trusting almond eyes from Ref 1.
style_2b_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-2b">
  <title id="title-2b">Beruang - The Calm Vault Guardian</title>
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 96 84
      C 90 70 78 60 62 60
      C 44 60 34 76 38 98
      C 40 114 42 124 38 140
      C 32 174 54 212 88 228
      C 106 236 120 238 128 238
      C 136 238 150 236 168 228
      C 202 212 224 174 218 140
      C 214 124 216 114 218 98
      C 222 76 212 60 194 60
      C 178 60 166 70 160 84
      L 96 84 Z

      M 128 116
      C 152 116 170 134 170 158
      C 170 182 152 200 128 200
      C 104 200 86 182 86 158
      C 86 134 104 116 128 116 Z

      M 74 122
      C 74 116 84 116 84 122
      C 84 128 74 128 74 122 Z

      M 172 122
      C 172 116 182 116 182 122
      C 182 128 172 128 172 122 Z
    "
  />
  <!-- Emerald Growth Nose inside Muzzle -->
  <path
    fill="#00AA13"
    d="
      M 112 154
      C 112 146 119 142 128 142
      C 137 142 144 146 144 154
      C 144 162 137 166 128 166
      C 119 166 112 162 112 154 Z
    "
  />
</svg>
"""

# --------------------------------------------------------------------------
# OPTION 2C: THE ORGANIC SQUIRCLE BEAR (Ref 1 & Ref 2 Pure Organic Chubby)
# --------------------------------------------------------------------------
# Chubby squircle contour with subtle top dip and friendly compact ears.
style_2c_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-2c">
  <title id="title-2c">Beruang - The Organic Squircle Bear</title>
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 80
      C 110 80 102 70 92 56
      C 82 42 66 42 56 56
      C 44 72 46 94 42 120
      C 36 168 54 216 92 232
      C 108 238 120 238 128 238
      C 136 238 148 238 164 232
      C 202 216 220 168 214 120
      C 210 94 212 72 200 56
      C 190 42 174 42 164 56
      C 154 70 146 80 128 80 Z

      M 128 118
      C 150 118 168 136 168 158
      C 168 180 150 198 128 198
      C 106 198 88 180 88 158
      C 88 136 106 118 128 118 Z

      M 76 124
      C 76 117 87 117 87 124
      C 87 131 76 131 76 124 Z

      M 169 124
      C 169 117 180 117 180 124
      C 180 131 169 131 169 124 Z
    "
  />
  <path
    fill="#00AA13"
    d="
      M 114 154
      C 114 146 120 142 128 142
      C 136 142 142 146 142 154
      C 142 162 136 166 128 166
      C 120 166 114 162 114 154 Z
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
    "style-2a.svg": style_2a_svg,
    "style-2b.svg": style_2b_svg,
    "style-2c.svg": style_2c_svg,
    "style-2a-lockup.svg": make_lockup(get_inner(style_2a_svg), "Beruang - Style 2A"),
    "style-2b-lockup.svg": make_lockup(get_inner(style_2b_svg), "Beruang - Style 2B"),
    "style-2c-lockup.svg": make_lockup(get_inner(style_2c_svg), "Beruang - Style 2C"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated style 2A, 2B, 2C!")
