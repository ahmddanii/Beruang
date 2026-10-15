import os
import subprocess

OUT_DIR = "public/branding/vault_redesign"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# OPTION 1A: THE PURE VAULT SILHOUETTE (Exact Reference 4 Vibe)
# --------------------------------------------------------------------------
# Bear head with flat crown, smooth semicircular ears, chubby rounded cheeks,
# tapering to a rounded chin (vault shield).
# Center has a large circular muzzle cutout with an emerald horizontal oval nose.
style_1a_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-1a">
  <title id="title-1a">Beruang - The Pure Vault Silhouette</title>
  <!-- Symmetrical Bear Silhouette with Crown, Rounded Ears, and Central Muzzle Cutout -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 98 76
      C 94 54 82 36 62 36
      C 42 36 34 56 36 78
      C 36 96 40 108 38 126
      C 34 164 52 200 86 220
      C 106 230 120 232 128 232
      C 136 232 150 230 170 220
      C 204 200 222 164 218 126
      C 216 108 220 96 220 78
      C 222 56 214 36 194 36
      C 174 36 162 54 158 76
      L 98 76 Z

      M 128 106
      C 152 106 172 124 172 148
      C 172 172 152 190 128 190
      C 104 190 84 172 84 148
      C 84 124 104 106 128 106 Z
    "
  />
  <!-- Emerald Growth Horizontal Oval Nose -->
  <path
    fill="#00AA13"
    d="
      M 110 144
      C 110 136 118 132 128 132
      C 138 132 146 136 146 144
      C 146 152 138 156 128 156
      C 118 156 110 152 110 144 Z
    "
  />
</svg>
"""

# --------------------------------------------------------------------------
# OPTION 1B: THE CALM GUARDIAN (Reference 1 & 4 Hybrid with Friendly Eyes)
# --------------------------------------------------------------------------
# Same sculpted silhouette, plus calm friendly half-lidded eyes and smile.
style_1b_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-1b">
  <title id="title-1b">Beruang - The Calm Guardian</title>
  <!-- Bear Silhouette with Muzzle & Calm Eyes Cutouts -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 98 76
      C 94 54 82 36 62 36
      C 42 36 34 56 36 78
      C 36 96 40 108 38 126
      C 34 164 52 200 86 220
      C 106 230 120 232 128 232
      C 136 232 150 230 170 220
      C 204 200 222 164 218 126
      C 216 108 220 96 220 78
      C 222 56 214 36 194 36
      C 174 36 162 54 158 76
      L 98 76 Z

      M 128 114
      C 150 114 168 130 168 152
      C 168 174 150 190 128 190
      C 106 190 88 174 88 152
      C 88 130 106 114 128 114 Z

      M 76 114
      C 76 108 88 108 88 114
      C 88 120 76 120 76 114 Z

      M 168 114
      C 168 108 180 108 180 114
      C 180 120 168 120 168 114 Z
    "
  />
  <!-- Emerald Growth Nose & Smile inside Muzzle -->
  <path
    fill="#00AA13"
    d="
      M 114 142
      C 114 135 120 131 128 131
      C 136 131 142 135 142 142
      C 142 149 136 153 128 153
      C 120 153 114 149 114 142 Z

      M 122 162
      C 122 166 134 166 134 162
      C 134 158 122 158 122 162 Z
    "
  />
</svg>
"""

# --------------------------------------------------------------------------
# OPTION 1C: THE ROUNDED SHIELD (Squircle Mascot inspired by Ref 1 & 2)
# --------------------------------------------------------------------------
# A wider, friendly chubby bear head with cute rounded ears and warm expression.
style_1c_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-1c">
  <title id="title-1c">Beruang - The Friendly Vault</title>
  <!-- Chubby Friendly Silhouette -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 72
      C 108 72 98 62 88 46
      C 74 24 50 32 44 56
      C 38 80 44 98 42 118
      C 38 160 52 198 86 218
      C 104 230 118 232 128 232
      C 138 232 152 230 170 218
      C 204 198 218 160 214 118
      C 212 98 218 80 212 56
      C 206 32 182 24 168 46
      C 158 62 148 72 128 72 Z

      M 128 116
      C 152 116 170 132 170 154
      C 170 176 152 192 128 192
      C 104 192 86 176 86 154
      C 86 132 104 116 128 116 Z

      M 78 110
      C 78 102 90 102 90 110
      C 90 118 78 118 78 110 Z

      M 166 110
      C 166 102 178 102 178 110
      C 178 118 166 118 166 110 Z
    "
  />
  <!-- Emerald Growth Nose & Smile Arc -->
  <path
    fill="#00AA13"
    d="
      M 112 144
      C 112 136 119 132 128 132
      C 137 132 144 136 144 144
      C 144 152 137 156 128 156
      C 119 156 112 152 112 144 Z
    "
  />
</svg>
"""

# Horizontal lockup builder
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
    "style-1a.svg": style_1a_svg,
    "style-1b.svg": style_1b_svg,
    "style-1c.svg": style_1c_svg,
    "style-1a-lockup.svg": make_lockup(get_inner(style_1a_svg), "Beruang - Style 1A"),
    "style-1b-lockup.svg": make_lockup(get_inner(style_1b_svg), "Beruang - Style 1B"),
    "style-1c-lockup.svg": make_lockup(get_inner(style_1c_svg), "Beruang - Style 1C"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated refined styles 1A, 1B, 1C and lockups!")
