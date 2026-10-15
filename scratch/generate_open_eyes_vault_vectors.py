import os

OUT_DIR = "public/branding/vault_bear_open_eyes"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# STYLE 1: THE VAULT DOME BEAR (OPEN EYES + CLEAR BEAR ANATOMY)
# Perbaikan dari Style 1 sebelumnya:
# 1. Anatomi beruang jelas (telinga bundar terlihat jelas, moncong putih membal, hidung, senyum).
# 2. Mata DIBUKA (bulat, ramah, bersinar dengan pantulan cahaya putih/catchlights).
# 3. Helm kubah brankas putih tetap ada di kepala dengan dial brankas zamrud.
# --------------------------------------------------------------------------
style_1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-oe1">
  <title id="title-oe1">Beruang - The Vault Dome Bear (Open Eyes)</title>
  <defs>
    <clipPath id="squircle-oe1">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Deep Slate Navy Squircle Canvas (60% Dominan) -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0F172A" />

  <g clip-path="url(#squircle-oe1)">
    <!-- White Security Vault Dome Helmet on Top of Head -->
    <path
      fill="#FFFFFF"
      d="
        M 66 142
        C 64 82 90 54 128 54
        C 166 54 192 82 190 142
        L 194 148
        C 194 152 62 152 62 148 Z
      "
    />
    <!-- Emerald Green Safe Combination Dial on Helmet (10% Interaction Accent) -->
    <circle cx="128" cy="94" r="18" fill="#00AA13" />
    <circle cx="128" cy="94" r="11" fill="#0081A0" />
    <circle cx="128" cy="94" r="4.5" fill="#FFFFFF" />
    <!-- 4 Dial Tick Marks -->
    <rect x="126" y="78" width="4" height="4" rx="1.5" fill="#FFFFFF" />
    <rect x="126" y="106" width="4" height="4" rx="1.5" fill="#FFFFFF" />
    <rect x="112" y="92" width="4" height="4" rx="1.5" fill="#FFFFFF" />
    <rect x="140" y="92" width="4" height="4" rx="1.5" fill="#FFFFFF" />

    <!-- Clearly Identifiable Round Bear Ears with Inner Contrast -->
    <ellipse cx="62" cy="118" rx="20" ry="22" fill="#E0F2FE" />
    <ellipse cx="62" cy="118" rx="11" ry="13" fill="#BAE6FD" />

    <ellipse cx="194" cy="118" rx="20" ry="22" fill="#E0F2FE" />
    <ellipse cx="194" cy="118" rx="11" ry="13" fill="#BAE6FD" />

    <!-- Cute Doughy Ice-Blue Bear Head & Body -->
    <path
      fill="#E0F2FE"
      d="
        M 44 240
        L 44 176
        C 42 142 74 132 128 132
        C 182 132 214 142 212 176
        L 212 240 Z
      "
    />

    <!-- Distinct White Bear Snout / Muzzle -->
    <ellipse cx="128" cy="180" rx="34" ry="26" fill="#FFFFFF" />

    <!-- Cute Bear Nose -->
    <path
      fill="#0F172A"
      d="
        M 118 172
        C 118 165 123 162 128 162
        C 133 162 138 165 138 172
        C 138 178 133 182 128 182
        C 123 182 118 178 118 172 Z
      "
    />
    <!-- Subtle Bear Smile -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="2.5"
      stroke-linecap="round"
      d="
        M 124 186
        Q 128 190 132 186
      "
    />

    <!-- WIDE OPEN FRIENDLY EYES with Sparkle Catchlights -->
    <circle cx="96" cy="154" r="8.5" fill="#0F172A" />
    <circle cx="98.5" cy="151.5" r="3" fill="#FFFFFF" />
    <circle cx="94.5" cy="156.5" r="1.2" fill="#FFFFFF" />

    <circle cx="160" cy="154" r="8.5" fill="#0F172A" />
    <circle cx="162.5" cy="151.5" r="3" fill="#FFFFFF" />
    <circle cx="158.5" cy="156.5" r="1.2" fill="#FFFFFF" />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# STYLE 2: THE POLAR VAULT BEAR (OPEN EYES + SAFE-DIAL COLLAR)
# Beruang kutub putih/ice-blue sejati dengan mata terbuka bersinar,
# moncong ramah, dan kalung medali brankas zamrud di dada.
# --------------------------------------------------------------------------
style_2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-oe2">
  <title id="title-oe2">Beruang - The Polar Vault Bear (Open Eyes)</title>
  <defs>
    <clipPath id="squircle-oe2">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Deep Slate Navy Squircle Canvas -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0F172A" />

  <g clip-path="url(#squircle-oe2)">
    <!-- Round Bear Ears with Soft Contrast -->
    <ellipse cx="76" cy="86" rx="26" ry="28" fill="#F0F9FF" />
    <ellipse cx="76" cy="86" rx="14" ry="16" fill="#BAE6FD" />

    <ellipse cx="180" cy="86" rx="26" ry="28" fill="#F0F9FF" />
    <ellipse cx="180" cy="86" rx="14" ry="16" fill="#BAE6FD" />

    <!-- Pure White / Light Ice-Blue Bear Head & Torso -->
    <path
      fill="#F0F9FF"
      d="
        M 44 240
        L 44 186
        C 42 134 72 94 128 94
        C 184 94 214 134 212 186
        L 212 240 Z
      "
    />

    <!-- Prominent Snout in Crisp White -->
    <ellipse cx="128" cy="164" rx="36" ry="28" fill="#FFFFFF" />

    <!-- Bear Nose in Deep Navy -->
    <path
      fill="#0F172A"
      d="
        M 116 154
        C 116 146 122 142 128 142
        C 134 142 140 146 140 154
        C 140 162 134 166 128 166
        C 122 166 116 162 116 154 Z
      "
    />
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="3"
      stroke-linecap="round"
      d="
        M 123 172
        Q 128 177 133 172
      "
    />

    <!-- WIDE OPEN FRIENDLY EYES with Catchlight Sparkle -->
    <circle cx="96" cy="138" r="8.5" fill="#0F172A" />
    <circle cx="98.5" cy="135.5" r="3" fill="#FFFFFF" />
    <circle cx="94.5" cy="140.5" r="1.2" fill="#FFFFFF" />

    <circle cx="160" cy="138" r="8.5" fill="#0F172A" />
    <circle cx="162.5" cy="135.5" r="3" fill="#FFFFFF" />
    <circle cx="158.5" cy="140.5" r="1.2" fill="#FFFFFF" />

    <!-- Emerald Green Safe-Dial Collar & Medallion -->
    <path
      fill="#00AA13"
      d="
        M 54 216
        C 76 224 180 224 202 216
        L 206 228
        C 180 238 76 238 50 228 Z
      "
    />
    <circle cx="128" cy="224" r="18" fill="#0081A0" stroke="#00AA13" stroke-width="3" />
    <circle cx="128" cy="224" r="10" fill="#00AA13" />
    <circle cx="128" cy="224" r="4" fill="#FFFFFF" />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# STYLE 3: THE CLOUD-VAULT BEAR (OPEN EYES + TRUST BLUE)
# Beruang putih ramah bermata terbuka dengan topi awan brankas & gembok zamrud
# di atas kanvas Trust Fintech Blue.
# --------------------------------------------------------------------------
style_3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-oe3">
  <title id="title-oe3">Beruang - The Cloud-Vault Bear (Open Eyes)</title>
  <defs>
    <clipPath id="squircle-oe3">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Trust Fintech Blue Squircle Canvas -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0081A0" />

  <g clip-path="url(#squircle-oe3)">
    <!-- White Bear Ears -->
    <circle cx="76" cy="116" r="24" fill="#FFFFFF" />
    <circle cx="76" cy="116" r="13" fill="#E0F2FE" />

    <circle cx="180" cy="116" r="24" fill="#FFFFFF" />
    <circle cx="180" cy="116" r="13" fill="#E0F2FE" />

    <!-- White Doughy Bear Head -->
    <path
      fill="#FFFFFF"
      d="
        M 44 240
        L 44 176
        C 42 136 74 126 128 126
        C 182 126 214 136 212 176
        L 212 240 Z
      "
    />

    <!-- Puffy White Cloud Hat on top of head -->
    <path
      fill="#F0F9FF"
      stroke="#E0F2FE"
      stroke-width="3"
      d="
        M 90 134
        C 70 134 60 110 76 94
        C 66 74 92 56 114 68
        C 124 48 148 48 158 66
        C 178 56 200 78 190 100
        C 204 116 194 134 174 134 Z
      "
    />
    <!-- Emerald Green Padlock on Cloud Hat (Cloud Private Data Room) -->
    <circle cx="128" cy="94" r="14" fill="#00AA13" />
    <path
      fill="#FFFFFF"
      d="
        M 128 88
        A 4 4 0 1 0 128 96
        L 126 101
        C 126 102 127 103 128 103
        C 129 103 130 102 130 101
        L 128 96
        A 4 4 0 0 0 128 88 Z
      "
    />

    <!-- Snout / Muzzle in Ice-Blue -->
    <ellipse cx="128" cy="180" rx="32" ry="24" fill="#F0F9FF" />
    <!-- Cute Bear Nose -->
    <path
      fill="#0F172A"
      d="
        M 118 172
        C 118 165 123 162 128 162
        C 133 162 138 165 138 172
        C 138 178 133 182 128 182
        C 123 182 118 178 118 172 Z
      "
    />
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="2.5"
      stroke-linecap="round"
      d="
        M 124 186
        Q 128 190 132 186
      "
    />

    <!-- WIDE OPEN FRIENDLY EYES with Catchlight Sparkle -->
    <circle cx="96" cy="154" r="8.5" fill="#0F172A" />
    <circle cx="98.5" cy="151.5" r="3" fill="#FFFFFF" />
    <circle cx="94.5" cy="156.5" r="1.2" fill="#FFFFFF" />

    <circle cx="160" cy="154" r="8.5" fill="#0F172A" />
    <circle cx="162.5" cy="151.5" r="3" fill="#FFFFFF" />
    <circle cx="158.5" cy="156.5" r="1.2" fill="#FFFFFF" />
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
    "open-eyes-1-vault-dome.svg": style_1_svg,
    "open-eyes-2-polar-vault.svg": style_2_svg,
    "open-eyes-3-cloud-vault.svg": style_3_svg,
    "open-eyes-1-lockup.svg": make_lockup(get_inner(style_1_svg), "Beruang - The Vault Dome Bear"),
    "open-eyes-2-lockup.svg": make_lockup(get_inner(style_2_svg), "Beruang - The Polar Vault Bear"),
    "open-eyes-3-lockup.svg": make_lockup(get_inner(style_3_svg), "Beruang - The Cloud-Vault Bear"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated Vault Bear Open Eyes SVGs successfully!")
