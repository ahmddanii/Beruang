import os
import math

OUT_DIR = "public/branding/vault_v2"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# DIRECTION 1: THE VAULT WHEEL BEAR (Venture-Grade / Security Corporate)
# Siluet beruang kokoh dengan moncong berupa roda brankas bank & lubang kunci.
# --------------------------------------------------------------------------
# Menggunakan single compound path (fill-rule="evenodd") untuk siluet & brankas.
# Radius brankas: center (128, 144)
style_v1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-v1">
  <title id="title-v1">Beruang - The Vault Wheel Bear</title>
  <!-- Bear Silhouette with Cutout Vault Wheel Ring & Keyhole -->
  <path
    fill="#0F172A"
    fill-rule="evenodd"
    d="
      M 98 68
      C 88 64 68 44 54 56
      C 42 66 46 88 54 104
      C 40 124 36 150 50 178
      C 68 208 96 222 128 222
      C 160 222 188 208 206 178
      C 220 150 216 124 202 104
      C 210 88 214 66 202 56
      C 188 44 168 64 158 68
      L 98 68 Z

      M 128 106
      C 149 106 166 123 166 144
      C 166 165 149 182 128 182
      C 107 182 90 165 90 144
      C 90 123 107 106 128 106 Z
    "
  />
  <!-- Vault Wheel Bolt Lugs (8 radiating bank safe gear teeth) -->
  <g fill="#0F172A">
    <rect x="124" y="98" width="8" height="12" rx="3" />
    <rect x="124" y="178" width="8" height="12" rx="3" />
    <rect x="82" y="140" width="12" height="8" rx="3" />
    <rect x="162" y="140" width="12" height="8" rx="3" />
    <rect x="96" y="112" width="10" height="8" rx="3" transform="rotate(45 101 116)" />
    <rect x="150" y="166" width="10" height="8" rx="3" transform="rotate(45 155 170)" />
    <rect x="150" y="112" width="10" height="8" rx="3" transform="rotate(-45 155 116)" />
    <rect x="96" y="166" width="10" height="8" rx="3" transform="rotate(-45 101 170)" />
  </g>
  <!-- Inner Vault Door & Keyhole Accent in Emerald Green -->
  <circle cx="128" cy="144" r="28" fill="#00AA13" />
  <!-- Keyhole in white/negative space -->
  <path
    fill="#FFFFFF"
    d="
      M 128 134
      A 6 6 0 1 0 128 146
      L 125 153
      C 125 155 126 156 128 156
      C 130 156 131 155 131 153
      L 128 146
      A 6 6 0 0 0 128 134 Z
    "
  />
</svg>"""

# --------------------------------------------------------------------------
# DIRECTION 2: THE TOFFEE APP ICON VAULT (Warm Mascot / Friendly Digital)
# Tile squircle elegan dengan maskot beruang madu/amber yang ramah & terpercaya.
# --------------------------------------------------------------------------
style_v2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-v2">
  <title id="title-v2">Beruang - The Toffee App Icon</title>
  <defs>
    <clipPath id="app-tile-clip">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>
  <!-- Background Squircle in Deep Midnight Slate -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0F172A" />

  <g clip-path="url(#app-tile-clip)">
    <!-- Golden Amber Diagonal Warm Glow (Top Right) -->
    <path d="M 120 16 L 240 16 L 240 136 Z" fill="#D97706" opacity="0.85" />

    <!-- Bear Head & Ears in Honey Amber -->
    <!-- Left Ear -->
    <ellipse cx="80" cy="86" rx="26" ry="28" fill="#F59E0B" />
    <ellipse cx="80" cy="86" rx="14" ry="16" fill="#D97706" />

    <!-- Right Ear -->
    <ellipse cx="176" cy="86" rx="26" ry="28" fill="#F59E0B" />
    <ellipse cx="176" cy="86" rx="14" ry="16" fill="#D97706" />

    <!-- Main Bear Face Contour -->
    <path
      fill="#F59E0B"
      d="
        M 80 94
        C 100 84 156 84 176 94
        C 210 112 216 156 204 192
        C 192 226 160 236 128 236
        C 96 236 64 226 52 192
        C 40 156 46 112 80 94 Z
      "
    />

    <!-- Snout in Warm Ivory Cream -->
    <ellipse cx="128" cy="172" rx="38" ry="32" fill="#FEF3C7" />

    <!-- Nose in Deep Navy -->
    <path
      fill="#0F172A"
      d="
        M 116 162
        C 116 154 122 150 128 150
        C 134 150 140 154 140 162
        C 140 170 134 174 128 174
        C 122 174 116 170 116 162 Z
      "
    />
    <!-- Gentle Smile Arc -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="3"
      stroke-linecap="round"
      d="
        M 122 180
        Q 128 186 134 180
      "
    />

    <!-- Expressive Friendly Eyes with Highlights -->
    <circle cx="98" cy="140" r="9" fill="#0F172A" />
    <circle cx="101" cy="137" r="3.5" fill="#FFFFFF" />

    <circle cx="158" cy="140" r="9" fill="#0F172A" />
    <circle cx="161" cy="137" r="3.5" fill="#FFFFFF" />

    <!-- Financial Readiness Vault Crest Badge (Emerald Accent Collar) -->
    <path
      fill="#00AA13"
      d="
        M 128 214
        L 136 226
        L 128 234
        L 120 226 Z
      "
    />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# DIRECTION 3: THE SAFE-DIAL MINIMALIST (Nordic-Japanese Clean Character)
# Bentuk beruang membal minimalis dengan hidung tombol brankas (safe combination dial).
# --------------------------------------------------------------------------
style_v3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-v3">
  <title id="title-v3">Beruang - The Safe-Dial Minimalist</title>
  <!-- Outer Head & Ears in Deep Forest Slate / Dark Teal -->
  <ellipse cx="68" cy="74" rx="26" ry="26" fill="#0F2937" />
  <ellipse cx="68" cy="74" rx="14" ry="14" fill="#0081A0" />

  <ellipse cx="188" cy="74" rx="26" ry="26" fill="#0F2937" />
  <ellipse cx="188" cy="74" rx="14" ry="14" fill="#0081A0" />

  <!-- Main Round Head -->
  <circle cx="128" cy="140" r="82" fill="#0F2937" />

  <!-- Calm Almond Eyes -->
  <path
    fill="#FFFFFF"
    d="
      M 86 122
      C 86 116 100 116 100 122
      C 97 127 89 127 86 122 Z

      M 156 122
      C 156 116 170 116 170 122
      C 167 127 159 127 156 122 Z
    "
  />

  <!-- Circular Snout in Ice Blue -->
  <ellipse cx="128" cy="164" rx="42" ry="38" fill="#F0F6FA" />

  <!-- Safe Combination Dial (Vault Element) -->
  <circle cx="128" cy="154" r="18" fill="#0081A0" />
  <circle cx="128" cy="154" r="12" fill="#00AA13" />
  <circle cx="128" cy="154" r="4" fill="#FFFFFF" />

  <!-- Safe Dial Index Line -->
  <line x1="128" y1="138" x2="128" y2="142" stroke="#0F2937" stroke-width="2" stroke-linecap="round" />

  <!-- Smile from Dial to Snout Bottom -->
  <path
    fill="none"
    stroke="#0F2937"
    stroke-width="3"
    stroke-linecap="round"
    d="
      M 128 174
      L 128 178
      M 120 184
      Q 128 190 136 184
    "
  />
</svg>"""

# Lockups
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
    "v1-vault-wheel.svg": style_v1_svg,
    "v2-toffee-icon.svg": style_v2_svg,
    "v3-safedial-minimal.svg": style_v3_svg,
    "v1-lockup.svg": make_lockup(get_inner(style_v1_svg), "Beruang - The Vault Wheel"),
    "v2-lockup.svg": make_lockup(get_inner(style_v2_svg), "Beruang - The Toffee App Icon"),
    "v3-lockup.svg": make_lockup(get_inner(style_v3_svg), "Beruang - The Safe-Dial Minimal"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated Vault V2 SVGs successfully!")
