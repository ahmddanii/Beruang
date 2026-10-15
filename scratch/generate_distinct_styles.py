import os

OUT_DIR = "public/branding/vault_redesign"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# OPTION A: THE GEOMETRIC VAULT (Inspirasi Ref 4)
# Murni siluet institusional, sudut tegas-halus, moncong brankas lingkaran, tanpa mata.
# --------------------------------------------------------------------------
style_a_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-a">
  <title id="title-a">Beruang - Geometric Vault (Ref 4)</title>
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
# OPTION B: THE TECH CAPSULE (Inspirasi Ref 5)
# Siluet kapsul vertikal memanjang, telinga notch, mata half-lidded santai & percaya diri,
# moncong brankas vertikal stadium/slot brankas.
# --------------------------------------------------------------------------
style_b_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-b">
  <title id="title-b">Beruang - Tech Capsule (Ref 5)</title>
  <!-- Outside Ears -->
  <path
    fill="#0081A0"
    d="
      M 56 66
      C 56 46 76 40 84 56
      C 88 64 88 74 88 78
      L 58 78
      C 56 74 56 70 56 66 Z

      M 200 66
      C 200 46 180 40 172 56
      C 168 64 168 74 168 78
      L 198 78
      C 200 74 200 70 200 66 Z
    "
  />
  <!-- Main Capsule Body with Cutout Eyes & Vertical Vault Snout -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 48
      C 174 48 196 74 196 120
      L 196 156
      C 196 202 174 224 128 224
      C 82 224 60 202 60 156
      L 60 120
      C 60 74 82 48 128 48 Z

      M 78 116
      L 98 116
      C 98 124 78 124 78 116 Z

      M 158 116
      L 178 116
      C 178 124 158 124 158 116 Z

      M 112 124
      C 112 114 120 110 128 110
      C 136 110 144 114 144 124
      L 144 166
      C 144 176 136 180 128 180
      C 120 180 112 176 112 166 Z
    "
  />
  <!-- Emerald Growth Nose & Vault Dial Notch -->
  <path
    fill="#00AA13"
    d="
      M 118 128
      C 118 122 122 120 128 120
      C 134 120 138 122 138 128
      C 138 134 134 136 128 136
      C 122 136 118 134 118 128 Z

      M 124 160
      C 124 157 126 156 128 156
      C 130 156 132 157 132 160
      L 132 168
      C 132 171 130 172 128 172
      C 126 172 124 171 124 168 Z
    "
  />
</svg>"""

# --------------------------------------------------------------------------
# OPTION C: THE FRIENDLY ORGANIC MASCOT (Inspirasi Ref 1 & Ref 3)
# Siluet beruang pipi chubby membal, mata tersenyum hangat, moncong ramah, sangat approachable.
# --------------------------------------------------------------------------
style_c_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c">
  <title id="title-c">Beruang - Friendly Organic Mascot (Ref 1 & 3)</title>
  <!-- Chubby Organic Bear Silhouette with Soft Ear Dips and Vault Muzzle Cutout -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 84
      C 112 84 100 70 86 58
      C 70 44 48 56 46 78
      C 44 98 44 116 38 136
      C 30 174 54 218 94 230
      C 110 234 118 234 128 234
      C 138 234 146 234 162 230
      C 202 218 226 174 218 136
      C 212 116 212 98 210 78
      C 208 56 186 44 170 58
      C 156 70 144 84 128 84 Z

      M 128 122
      C 152 122 170 138 170 160
      C 170 182 152 198 128 198
      C 104 198 86 182 86 160
      C 86 138 104 122 128 122 Z
    "
  />
  <!-- Warm Smiling Curved Eyes (Ref 3 Vibe) -->
  <path
    fill="none"
    stroke="#0081A0"
    stroke-width="5"
    stroke-linecap="round"
    d="
      M 72 122
      Q 84 134 96 122

      M 160 122
      Q 172 134 184 122
    "
  />
  <!-- Emerald Growth Nose & Gentle Smile Arc -->
  <path
    fill="#00AA13"
    d="
      M 114 148
      C 114 138 120 134 128 134
      C 136 134 142 138 142 148
      C 142 156 136 160 128 160
      C 120 160 114 156 114 148 Z
    "
  />
  <path
    fill="none"
    stroke="#00AA13"
    stroke-width="3.5"
    stroke-linecap="round"
    d="
      M 122 172
      Q 128 178 134 172
    "
  />
</svg>"""

# --------------------------------------------------------------------------
# OPTION D: THE TOFFEE APP-ICON SQUIRCLE (Inspirasi Ref 2 Toffee)
# Bingkai squircle elegan, beruang menggemaskan dengan telinga berdimensi di dalam app icon.
# --------------------------------------------------------------------------
style_d_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-d">
  <title id="title-d">Beruang - Toffee App Icon (Ref 2)</title>
  <defs>
    <clipPath id="squircle-clip">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>
  <!-- Background App Squircle Tile in Ice-Navy -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0F172A" />

  <!-- Clipped Bear Character Peeking in -->
  <g clip-path="url(#squircle-clip)">
    <!-- Bear Body & Head -->
    <path
      fill="#0081A0"
      d="
        M 40 240
        L 40 148
        C 40 102 70 72 118 72
        C 126 72 134 74 142 78
        C 152 66 170 64 182 76
        C 192 86 190 102 184 114
        C 204 130 216 156 216 188
        L 216 240 Z
      "
    />
    <!-- Left Ear (Inner / Outer) -->
    <ellipse cx="88" cy="88" rx="22" ry="24" fill="#0081A0" />
    <ellipse cx="88" cy="88" rx="12" ry="14" fill="#F3F8FC" opacity="0.9" />

    <!-- Right Ear Inner -->
    <ellipse cx="174" cy="84" rx="8" ry="10" fill="#F3F8FC" opacity="0.9" />

    <!-- Cute Snout in White/Ice -->
    <ellipse cx="140" cy="162" rx="36" ry="32" fill="#F3F8FC" />

    <!-- Emerald Growth Nose & Smile inside Snout -->
    <path
      fill="#00AA13"
      d="
        M 128 152
        C 128 144 133 140 140 140
        C 147 140 152 144 152 152
        C 152 158 147 162 140 162
        C 133 162 128 158 128 152 Z
      "
    />
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="3"
      stroke-linecap="round"
      d="
        M 132 170
        Q 140 176 148 170
      "
    />

    <!-- Expressive Eyes with Sparkle (Toffee Vibe) -->
    <ellipse cx="114" cy="132" rx="6" ry="9" fill="#0F172A" />
    <circle cx="116" cy="129" r="2.5" fill="#FFFFFF" />

    <ellipse cx="172" cy="132" rx="6" ry="9" fill="#0F172A" />
    <circle cx="174" cy="129" r="2.5" fill="#FFFFFF" />
  </g>
</svg>"""

# Lockup Builder
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
    "style-a-geometric.svg": style_a_svg,
    "style-b-capsule.svg": style_b_svg,
    "style-c-friendly.svg": style_c_svg,
    "style-d-toffee.svg": style_d_svg,
    "style-a-lockup.svg": make_lockup(get_inner(style_a_svg), "Beruang - Geometric Vault"),
    "style-b-lockup.svg": make_lockup(get_inner(style_b_svg), "Beruang - Tech Capsule"),
    "style-c-lockup.svg": make_lockup(get_inner(style_c_svg), "Beruang - Friendly Mascot"),
    "style-d-lockup.svg": make_lockup(get_inner(style_d_svg), "Beruang - Toffee App Icon"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated 4 truly distinct styles!")
