import os
import subprocess

OUT_DIR = "public/branding/v5_two_eyes"
os.makedirs(OUT_DIR, exist_ok=True)

BEAR_HEAD_D = """
  M 98 64
  C 86 60 70 42 54 52
  C 42 60 44 80 52 96
  C 38 116 34 146 52 174
  C 68 202 96 216 128 216
  C 160 216 188 202 204 174
  C 222 146 218 116 204 96
  C 212 80 214 60 202 52
  C 186 42 170 60 160 64
  L 98 64 Z
""".strip()

# -----------------------------------------------------------------------------
# VARIANT 1: ANGLED GEOMETRIC RHOMBOID EYES + EMERALD VAULT SNOUT
# Karakter: Mata tegas, fokus analitis (discerning investor gaze),
# moncong brankas dengan permata zamrud di tengah.
# -----------------------------------------------------------------------------
def make_v1():
    # Left eye: angled rhomboid / diamond
    # Center around (94, 114)
    # Right eye: mirrored around (162, 114)
    left_eye = "M 94 106 L 102 114 L 94 122 L 86 114 Z"
    right_eye = "M 162 106 L 170 114 L 162 122 L 154 114 Z"
    # Vault / Snout negative space arch at bottom (cx=128, cy=158)
    snout_arch = """
      M 112 174
      L 112 154
      C 112 146 120 140 128 140
      C 136 140 144 146 144 154
      L 144 174
      C 138 178 134 180 128 180
      C 122 180 118 178 112 174 Z
    """.strip()
    
    d_path = f"{BEAR_HEAD_D}\n      {left_eye}\n      {right_eye}\n      {snout_arch}"
    # Emerald diamond inside snout arch: cx=128, cy=155
    diamond = '<polygon points="128,146 137,156 128,166 119,156" fill="#059669" />'
    
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-v1">
  <title id="t-v1">Beruang - Discerning Guardian (Dual Rhomboid Eyes)</title>
  <path fill="#0F172A" fill-rule="evenodd" d="{d_path}" />
  {diamond}
</svg>"""

# -----------------------------------------------------------------------------
# VARIANT 2: MINIMALIST CIRCULAR APERTURE EYES + EMERALD SNOUT KEYSTONE
# Karakter: Modernist Swiss / Bauhaus, 2 mata lingkaran presisi,
# moncong brankas minimalis dengan permata zamrud.
# -----------------------------------------------------------------------------
def make_v2():
    # Left eye: circle at (96, 114), r = 7
    # Right eye: circle at (160, 114), r = 7
    # SVG arc commands for evenodd path
    left_eye = "M 96 107 A 7 7 0 1 0 96 121 A 7 7 0 1 0 96 107 Z"
    right_eye = "M 160 107 A 7 7 0 1 0 160 121 A 7 7 0 1 0 160 107 Z"
    
    # Snout / Vault circle aperture at (128, 160), r = 18
    snout = "M 128 142 A 18 18 0 1 0 128 178 A 18 18 0 1 0 128 142 Z"
    
    d_path = f"{BEAR_HEAD_D}\n      {left_eye}\n      {right_eye}\n      {snout}"
    # Emerald diamond inside snout: cx=128, cy=160, r=10
    diamond = '<polygon points="128,150 138,160 128,170 118,160" fill="#059669" />'
    
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-v2">
  <title id="t-v2">Beruang - Modernist Precision (Dual Circular Eyes)</title>
  <path fill="#0F172A" fill-rule="evenodd" d="{d_path}" />
  {diamond}
</svg>"""

# -----------------------------------------------------------------------------
# VARIANT 3: SLEEK HORIZONTAL APERTURE EYES (TECH / LINEAR / CALM CONFIDENT)
# Karakter: Kalm, matang, berwibawa, mata slit horizontal lembut,
# moncong brankas dengan permata zamrud vertikal.
# -----------------------------------------------------------------------------
def make_v3():
    # Left eye: rounded slit from (88, 115) to (104, 115), height 8
    # Right eye: rounded slit from (152, 115) to (168, 115), height 8
    left_eye = """
      M 92 111
      L 100 111
      C 103 111 105 113 105 115
      C 105 117 103 119 100 119
      L 92 119
      C 89 119 87 117 87 115
      C 87 113 89 111 92 111 Z
    """.strip()
    right_eye = """
      M 156 111
      L 164 111
      C 167 111 169 113 169 115
      C 169 117 167 119 164 119
      L 156 119
      C 153 119 151 117 151 115
      C 151 113 153 111 156 111 Z
    """.strip()
    
    # Negative space muzzle/snout trapezoid + arch
    snout = """
      M 112 172
      L 112 152
      C 112 144 119 138 128 138
      C 137 138 144 144 144 152
      L 144 172
      L 112 172 Z
    """.strip()
    
    d_path = f"{BEAR_HEAD_D}\n      {left_eye}\n      {right_eye}\n      {snout}"
    diamond = '<polygon points="128,144 137,155 128,166 119,155" fill="#059669" />'
    
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-v3">
  <title id="t-v3">Beruang - Calm Executive (Dual Slit Eyes)</title>
  <path fill="#0F172A" fill-rule="evenodd" d="{d_path}" />
  {diamond}
</svg>"""

# -----------------------------------------------------------------------------
# VARIANT 4: DUAL EMERALD GROWTH EYES (THE DUAL KEYSTONE GUARDIAN)
# Karakter: Kedua matanya adalah permata zamrud (#059669) yang bercahaya!
# Menatap ke depan dengan visi pertumbuhan dan ketelitian analitis.
# Hidung/moncong brankas adalah negative space murni tanpa ada lingkaran mata tengah.
# -----------------------------------------------------------------------------
def make_v4():
    # Negative space muzzle / vault arch at bottom
    snout_vault = """
      M 110 178
      L 110 156
      C 110 146 118 138 128 138
      C 138 138 146 146 146 156
      L 146 178
      C 140 182 135 184 128 184
      C 121 184 116 182 110 178 Z
    """.strip()
    
    # Diamond nose in negative space vault
    nose_cutout = """
      M 128 152
      L 134 160
      L 128 168
      L 122 160 Z
    """.strip()

    d_path = f"{BEAR_HEAD_D}\n      {snout_vault}"
    
    # TWO Emerald Eyes! Diamond keystone eyes at (95, 114) and (161, 114)
    emerald_eyes = """
      <!-- Left Emerald Growth Eye -->
      <polygon points="95,106 103,114 95,122 87,114" fill="#059669" />
      <!-- Right Emerald Growth Eye -->
      <polygon points="161,106 169,114 161,122 153,114" fill="#059669" />
      <!-- Slate Navy Vault Key inside the white snout arch -->
      <polygon points="128,150 136,160 128,170 120,160" fill="#0F172A" />
    """.strip()
    
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-v4">
  <title id="t-v4">Beruang - Dual Emerald Vision Eyes</title>
  <path fill="#0F172A" fill-rule="evenodd" d="{d_path}" />
  {emerald_eyes}
</svg>"""

# -----------------------------------------------------------------------------
# VARIANT 5: THE POLARIS VAULT (ANGLED GEOMETRIC FACET EYES + INTEGRATED NOSE)
# Karakter: Inspirasi GitLab/Evernote solid facets, 2 mata tajam berwibawa
# + hidung brankas perisai zamrud murni.
# -----------------------------------------------------------------------------
def make_v5():
    # Left eye: sharp forward polygon (90, 110) to (104, 114)
    left_eye = "M 90 114 L 102 110 L 100 118 L 88 116 Z"
    # Right eye: mirrored (166, 114) to (152, 110)
    right_eye = "M 166 114 L 154 110 L 156 118 L 168 116 Z"
    
    # Snout triangle/arch in negative space
    snout = """
      M 114 176
      L 114 156
      C 114 148 120 142 128 142
      C 136 142 142 148 142 156
      L 142 176
      L 114 176 Z
    """.strip()
    
    d_path = f"{BEAR_HEAD_D}\n      {left_eye}\n      {right_eye}\n      {snout}"
    # Emerald diamond
    diamond = '<polygon points="128,148 136,158 128,168 120,158" fill="#059669" />'
    
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-v5">
  <title id="t-v5">Beruang - The Polaris Vault</title>
  <path fill="#0F172A" fill-rule="evenodd" d="{d_path}" />
  {diamond}
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
        fill: #0F172A;
      }}
      .brand-tagline {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 13px;
        font-weight: 600;
        fill: #059669;
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

files = {
    "v1-dual-rhomboid": (make_v1(), "V1: Dual Rhomboid Eyes (Discerning Guardian)"),
    "v2-dual-circular": (make_v2(), "V2: Dual Circular Eyes (Modernist Precision)"),
    "v3-dual-slit": (make_v3(), "V3: Dual Slit Eyes (Calm Executive)"),
    "v4-dual-emerald-eyes": (make_v4(), "V4: Dual Emerald Vision Eyes"),
    "v5-polaris-facets": (make_v5(), "V5: Polaris Facets"),
}

for key, (svg_str, label) in files.items():
    with open(os.path.join(OUT_DIR, f"{key}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_str)
    with open(os.path.join(OUT_DIR, f"{key}-lockup.svg"), "w", encoding="utf-8") as f:
        f.write(make_lockup(svg_str, label))

print("Created 5 two-eyed bear vector variants in", OUT_DIR)
