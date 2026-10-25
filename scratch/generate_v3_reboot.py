import os

OUT_DIR = "public/branding/v3_reboot"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# CONCEPT A: THE MONOLITHIC VAULT BEAR (Siluet Monolitik & Brankas Presisi)
# Inspirasi: Ref 4 + Evernote/GitLab solid abstraction.
# Siluet kepala beruang perisai kokoh matematis, flat crown, telinga geometris,
# moncong brankas lingkaran (negative space murni) dengan batu penjuru zamrud (#059669).
# TANPA MATA, TANPA HIDUNG KARTUN, TANPA MULUT.
# --------------------------------------------------------------------------
concept_a_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-ca">
  <title id="title-ca">Beruang - The Monolithic Vault</title>
  <!-- Single Compound Path in Slate Navy with Negative Space Vault Cutout -->
  <path
    fill="#0F172A"
    fill-rule="evenodd"
    d="
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

      M 128 106
      C 148 106 164 122 164 142
      C 164 162 148 178 128 178
      C 108 178 92 162 92 142
      C 92 122 108 106 128 106 Z
    "
  />
  <!-- Emerald Growth Geometric Keystone (Venture Capital / Profitability Anchor) -->
  <polygon points="128,126 144,142 128,158 112,142" fill="#059669" />
</svg>"""

# --------------------------------------------------------------------------
# CONCEPT B: THE HEX-SHIELD BEAR (Perisai Heksagonal & Pilar Pertumbuhan)
# Perisai heksagonal institusional yang memadukan siluet kepala beruang
# dengan pilar pertumbuhan modal dalam presisi matematis 60°/120°.
# --------------------------------------------------------------------------
concept_b_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-cb">
  <title id="title-cb">Beruang - The Hex-Shield Bear</title>
  <!-- Left Ear Arc -->
  <path
    fill="#0F172A"
    d="
      M 56 64
      C 44 76 46 96 58 108
      L 76 92
      C 70 82 66 72 66 64 Z
    "
  />
  <!-- Right Ear Arc -->
  <path
    fill="#0F172A"
    d="
      M 200 64
      C 212 76 210 96 198 108
      L 180 92
      C 186 82 190 72 190 64 Z
    "
  />
  <!-- Main Shield Body with Negative Space Vault Column -->
  <path
    fill="#0F172A"
    fill-rule="evenodd"
    d="
      M 80 72
      L 176 72
      L 208 128
      L 176 184
      L 128 220
      L 80 184
      L 48 128 Z

      M 128 104
      L 155 151
      L 137 182
      L 119 182
      L 101 151 Z
    "
  />
  <!-- Ascending Emerald Keystone / Diamond snapped to exact 60 degrees -->
  <polygon points="128,118 143,144 128,170 113,144" fill="#059669" />
</svg>"""

# --------------------------------------------------------------------------
# CONCEPT C: THE GATEWAY ARCH BEAR (Modernist Monolithic Portal)
# Inspirasi: Modern Enterprise Tech (Linear / Stripe style).
# Siluet beruang yang memadukan portal/gerbang brankas kas (Gateway to Capital)
# dalam negative space murni, dengan permata zamrud suspended di puncaknya.
# --------------------------------------------------------------------------
concept_c_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-cc">
  <title id="title-cc">Beruang - The Gateway Arch Bear</title>
  <!-- Monolithic Bear Silhouette with Archway Vault Cutout -->
  <path
    fill="#0F172A"
    fill-rule="evenodd"
    d="
      M 96 66
      C 86 62 70 44 54 54
      C 42 62 44 82 52 98
      C 38 118 34 148 52 176
      C 68 204 96 218 128 218
      C 160 218 188 204 204 176
      C 222 148 218 118 204 98
      C 212 82 214 62 202 54
      C 186 44 170 62 160 66
      L 96 66 Z

      M 128 106
      C 146 106 160 120 160 138
      L 160 218
      L 96 218
      L 96 138
      C 96 120 110 106 128 106 Z
    "
  />
  <!-- Suspended Emerald Growth Keystone at Vault Apex -->
  <polygon points="128,118 140,136 128,152 116,136" fill="#059669" />
</svg>"""

# Lockup Builder
def make_lockup(symbol_inner, title):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 180" width="680" height="180" role="img" aria-labelledby="title-lockup">
  <title id="title-lockup">{title}</title>
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
    "concept-a-monolithic.svg": concept_a_svg,
    "concept-b-hexshield.svg": concept_b_svg,
    "concept-c-gateway.svg": concept_c_svg,
    "concept-a-lockup.svg": make_lockup(get_inner(concept_a_svg), "Beruang - The Monolithic Vault"),
    "concept-b-lockup.svg": make_lockup(get_inner(concept_b_svg), "Beruang - The Hex-Shield Bear"),
    "concept-c-lockup.svg": make_lockup(get_inner(concept_c_svg), "Beruang - The Gateway Arch Bear"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated clean V3 Reboot concepts successfully!")
