import os
import subprocess

OUT_DIR = "public/branding"
os.makedirs(OUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# CONCEPT 1: THE VAULT BEAR (Sentinel Shield & Friendly Face)
# -------------------------------------------------------------
concept_1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c1">
  <title id="title-c1">Beruang - The Vault Bear</title>
  <!-- Symmetrical Geometric Bear Head with Integrated Vault Shield & True Holes -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 76 40
      A 32 32 0 1 0 102 70
      L 154 70
      A 32 32 0 1 0 180 40
      A 32 32 0 0 0 152 64
      C 144 60 136 58 128 58
      C 120 58 112 60 104 64
      A 32 32 0 0 0 76 40 Z

      M 62 82
      C 42 108 42 152 62 184
      C 78 210 104 224 128 224
      C 152 224 178 210 194 184
      C 214 152 214 108 194 82
      C 176 72 152 68 128 68
      C 104 68 80 72 62 82 Z

      M 94 106
      A 8 8 0 1 0 94 122
      A 8 8 0 1 0 94 106 Z

      M 162 106
      A 8 8 0 1 0 162 122
      A 8 8 0 1 0 162 106 Z

      M 104 148
      C 104 134 114 124 128 124
      C 142 124 152 134 152 148
      C 152 174 140 188 128 188
      C 116 188 104 174 104 148 Z
    "
  />
  <!-- Emerald Growth Nose / Upward Horizon Arc -->
  <path
    fill="#00AA13"
    d="
      M 116 142
      C 116 137 121 133 128 133
      C 135 133 140 137 140 142
      C 140 149 133 154 128 154
      C 123 154 116 149 116 142 Z
    "
  />
</svg>
"""

# -------------------------------------------------------------
# CONCEPT 2: THE GROWTH MONOGRAM "B" (Centered & Polished)
# -------------------------------------------------------------
concept_2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c2">
  <title id="title-c2">Beruang - The Growth Monogram B</title>
  <!-- Main B Shape in Trust Blue with evenodd counters (Shifted -14 to be optically centered) -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 42 48
      C 42 39 49 32 58 32
      L 122 32
      C 148 32 168 48 168 72
      C 168 86 160 98 148 106
      C 166 114 182 132 182 158
      C 182 190 154 216 120 216
      L 58 216
      C 49 216 42 209 42 200
      L 42 48 Z

      M 82 68
      L 82 108
      L 118 108
      C 130 108 138 100 138 88
      C 138 76 130 68 118 68
      L 82 68 Z

      M 82 140
      L 82 180
      L 120 180
      C 134 180 144 170 144 160
      C 144 150 134 140 120 140
      L 82 140 Z
    "
  />
  <!-- Bear Ear Arc on Top Loop -->
  <path
    fill="#0081A0"
    d="
      M 134 32
      A 26 26 0 1 0 174 64
      C 174 50 160 36 144 32 Z
    "
  />
  <!-- Emerald Growth Momentum Dynamic Wedge (Profitability Accent) -->
  <path
    fill="#00AA13"
    d="
      M 182 128
      L 206 104
      C 209 101 214 103 214 108
      L 214 144
      C 214 148 210 152 206 152
      L 182 152
      C 178 144 180 136 182 128 Z
    "
  />
</svg>
"""

# -------------------------------------------------------------
# CONCEPT 3: THE PROSPERITY CREST (Clean 60°/120° Angles)
# -------------------------------------------------------------
concept_3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c3">
  <title id="title-c3">Beruang - The Prosperity Crest</title>
  <!-- Left Ear -->
  <circle cx="76" cy="64" r="26" fill="#0081A0" />
  <!-- Right Ear -->
  <circle cx="180" cy="64" r="26" fill="#0081A0" />

  <!-- Shield Base with exact 60° (dx=30, dy=52) and 120° angles -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 60 76
      C 56 128 54 172 82 202
      C 106 228 150 228 174 202
      C 202 172 200 128 196 76
      L 60 76 Z

      M 128 100
      L 158 152
      L 135 192
      L 121 192
      L 98 152
      Z
    "
  />
  <!-- Central Growth Keystone (Emerald Accent with exact 60° angles) -->
  <path
    fill="#00AA13"
    d="
      M 128 116
      L 151 156
      L 137 180
      L 119 180
      L 105 156
      Z
    "
  />
</svg>
"""

# -------------------------------------------------------------
# HORIZONTAL LOCKUPS (Symbol + Poppins "Beruang" + Tagline)
# -------------------------------------------------------------
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
  <!-- Symbol scaled to 130x130 at (24, 25) -->
  <g transform="translate(24, 25) scale(0.5078)">
    {symbol_inner}
  </g>
  <!-- Wordmark Text -->
  <text x="180" y="96" class="brand-title">Beruang</text>
  <text x="182" y="128" class="brand-tagline">AKSELERATOR KELAYAKAN UMKM</text>
</svg>"""

# Extract inner SVG contents for lockups
def get_inner(svg_str):
    start = svg_str.find(">") + 1
    end = svg_str.rfind("</svg>")
    return svg_str[start:end]

lockup_1 = make_lockup(get_inner(concept_1_svg), "Beruang Lockup - The Vault Bear")
lockup_2 = make_lockup(get_inner(concept_2_svg), "Beruang Lockup - The Growth Monogram")
lockup_3 = make_lockup(get_inner(concept_3_svg), "Beruang Lockup - The Prosperity Crest")

# Write SVGs
files = {
    "concept-a.svg": concept_1_svg,
    "concept-b.svg": concept_2_svg,
    "concept-c.svg": concept_3_svg,
    "concept-a-lockup.svg": lockup_1,
    "concept-b-lockup.svg": lockup_2,
    "concept-c-lockup.svg": lockup_3,
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated all 3 concepts and 3 lockups!")
