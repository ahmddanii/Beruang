import os

OUT_DIR = "public/branding/fintech_vault_bear"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# OPTION 1: THE VAULT DOME BEAR (Deep Slate Navy + Ice Blue + Vault Dome)
# --------------------------------------------------------------------------
style_1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-f1">
  <title id="title-f1">Beruang - The Vault Dome Bear</title>
  <defs>
    <clipPath id="squircle-f1">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Deep Slate Navy Squircle Canvas (60% Architecture) -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0F172A" />

  <g clip-path="url(#squircle-f1)">
    <!-- White Security Vault Dome Helmet / Arch behind head -->
    <path
      fill="#FFFFFF"
      d="
        M 62 168
        C 58 92 88 56 128 56
        C 168 56 198 92 194 168
        C 176 166 80 166 62 168 Z
      "
    />
    <!-- Emerald Green Safe Combination Dial on Dome (10% Interaction Accent) -->
    <circle cx="128" cy="98" r="18" fill="#00AA13" />
    <circle cx="128" cy="98" r="12" fill="#0081A0" />
    <circle cx="128" cy="98" r="5" fill="#FFFFFF" />
    <!-- 4 Dial Tick Notches -->
    <rect x="126" y="82" width="4" height="4" rx="1.5" fill="#FFFFFF" />
    <rect x="126" y="110" width="4" height="4" rx="1.5" fill="#FFFFFF" />
    <rect x="112" y="96" width="4" height="4" rx="1.5" fill="#FFFFFF" />
    <rect x="140" y="96" width="4" height="4" rx="1.5" fill="#FFFFFF" />

    <!-- Cute Bear Ears in Ice-Blue -->
    <circle cx="78" cy="144" r="22" fill="#E0F2FE" />
    <circle cx="78" cy="144" r="12" fill="#BAE6FD" />

    <circle cx="178" cy="144" r="22" fill="#E0F2FE" />
    <circle cx="178" cy="144" r="12" fill="#BAE6FD" />

    <!-- Doughy Ice-Blue Bear Head emerging from bottom -->
    <path
      fill="#E0F2FE"
      d="
        M 44 240
        C 40 164 74 128 128 128
        C 182 128 216 164 212 240 Z
      "
    />

    <!-- Iconic Thick Peaceful Closed Eyes in Deep Navy (No Nose / No Mouth - Exact Ref Charm) -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="8.5"
      stroke-linecap="round"
      d="
        M 96 186
        C 102 194 114 194 120 186

        M 142 186
        C 148 194 160 194 166 186
      "
    />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# OPTION 2: THE CLOUD-VAULT GUARDIAN (Trust Fintech Blue + White Cloud Hat)
# --------------------------------------------------------------------------
style_2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-f2">
  <title id="title-f2">Beruang - The Cloud-Vault Guardian</title>
  <defs>
    <clipPath id="squircle-f2">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Trust Fintech Blue Squircle Canvas -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0081A0" />

  <g clip-path="url(#squircle-f2)">
    <!-- Doughy Ice-White Bear Head emerging from bottom -->
    <path
      fill="#F0F9FF"
      d="
        M 44 240
        C 40 164 74 126 128 126
        C 182 126 216 164 212 240 Z
      "
    />

    <!-- Puffy White Cloud-Vault Hat with Bear Ears (Cloud Data Room) -->
    <!-- Hat Rim -->
    <path
      fill="#E0F2FE"
      d="
        M 86 146
        C 86 138 170 138 170 146
        L 168 155
        C 168 159 88 159 88 155 Z
      "
    />
    <!-- Hat Puffy Body with Ears -->
    <path
      fill="#FFFFFF"
      d="
        M 90 144
        C 68 144 60 114 78 96
        C 66 76 80 50 102 54
        C 108 55 112 59 116 64
        C 124 58 132 58 140 64
        C 144 59 148 55 154 54
        C 176 50 190 76 178 96
        C 196 114 188 144 166 144 Z
      "
    />
    <!-- Emerald Safe Lock on Cloud Hat -->
    <circle cx="128" cy="98" r="14" fill="#00AA13" />
    <path
      fill="#FFFFFF"
      d="
        M 128 92
        A 4 4 0 1 0 128 100
        L 126 105
        C 126 106 127 107 128 107
        C 129 107 130 106 130 105
        L 128 100
        A 4 4 0 0 0 128 92 Z
      "
    />

    <!-- Iconic Thick Peaceful Closed Eyes in Trust Blue -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="8.5"
      stroke-linecap="round"
      d="
        M 96 186
        C 102 194 114 194 120 186

        M 142 186
        C 148 194 160 194 166 186
      "
    />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# OPTION 3: THE PROSPERITY GROWTH BEAR (Polar White Bear + Emerald Dial)
# --------------------------------------------------------------------------
style_3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-f3">
  <title id="title-f3">Beruang - The Prosperity Growth Bear</title>
  <defs>
    <clipPath id="squircle-f3">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Deep Slate Navy Squircle Canvas -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0F172A" />

  <g clip-path="url(#squircle-f3)">
    <!-- White Polar Bear Ears -->
    <circle cx="76" cy="120" r="26" fill="#FFFFFF" />
    <circle cx="76" cy="120" r="15" fill="#E2E8F0" />

    <circle cx="180" cy="120" r="26" fill="#FFFFFF" />
    <circle cx="180" cy="120" r="15" fill="#E2E8F0" />

    <!-- Pure White Doughy Bear Head -->
    <circle cx="128" cy="150" r="66" fill="#FFFFFF" />

    <!-- Iconic Thick Peaceful Closed Eyes -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="8"
      stroke-linecap="round"
      d="
        M 94 150
        C 99 157 109 157 114 150

        M 142 150
        C 147 157 157 157 162 150
      "
    />

    <!-- Emerald Growth / Profitability Vault Dial at the Base -->
    <path
      fill="#00AA13"
      d="
        M 86 240
        C 86 200 104 186 128 186
        C 152 186 170 200 170 240 Z
      "
    />
    <!-- Upward Growth Arrow inside Dial (Ready for Funding / Profit) -->
    <path
      fill="none"
      stroke="#FFFFFF"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="
        M 108 226
        L 120 216
        L 130 220
        L 146 204
        M 136 204
        L 146 204
        L 146 214
      "
    />
  </g>
</svg>"""

# Lockups
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
    "fintech-vault-1.svg": style_1_svg,
    "fintech-vault-2.svg": style_2_svg,
    "fintech-vault-3.svg": style_3_svg,
    "fintech-vault-1-lockup.svg": make_lockup(get_inner(style_1_svg), "Beruang - The Vault Dome Bear"),
    "fintech-vault-2-lockup.svg": make_lockup(get_inner(style_2_svg), "Beruang - The Cloud-Vault Guardian"),
    "fintech-vault-3-lockup.svg": make_lockup(get_inner(style_3_svg), "Beruang - The Prosperity Growth Bear"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated Fintech-Aligned Vault Bear SVGs!")
