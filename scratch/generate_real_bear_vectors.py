import os

OUT_DIR = "public/branding/real_bear"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# OPTION A: THE POLAR VAULT BEAR (Ice-Blue Bear with Emerald Safe-Dial Collar)
# Karakter beruang sejati yang jelas, menggemaskan, telinga bundar, moncong putih,
# mata damai terpejam, berkalung brankas zamrud.
# --------------------------------------------------------------------------
style_a_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-ra">
  <title id="title-ra">Beruang - The Polar Vault Bear</title>
  <defs>
    <clipPath id="squircle-ra">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Deep Slate Navy Squircle Canvas -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0F172A" />

  <g clip-path="url(#squircle-ra)">
    <!-- Distinct Bear Ears with Inner Contrast -->
    <ellipse cx="76" cy="88" rx="26" ry="28" fill="#E0F2FE" />
    <ellipse cx="76" cy="88" rx="14" ry="16" fill="#BAE6FD" />

    <ellipse cx="180" cy="88" rx="26" ry="28" fill="#E0F2FE" />
    <ellipse cx="180" cy="88" rx="14" ry="16" fill="#BAE6FD" />

    <!-- Chubby Ice-Blue Bear Head & Body -->
    <path
      fill="#E0F2FE"
      d="
        M 44 240
        L 44 190
        C 42 136 72 96 128 96
        C 184 96 214 136 212 190
        L 212 240 Z
      "
    />

    <!-- Prominent White Bear Snout / Muzzle -->
    <ellipse cx="128" cy="166" rx="36" ry="30" fill="#FFFFFF" />

    <!-- Cute Bear Nose in Deep Navy -->
    <path
      fill="#0F172A"
      d="
        M 116 156
        C 116 148 122 144 128 144
        C 134 144 140 148 140 156
        C 140 164 134 168 128 168
        C 122 168 116 164 116 156 Z
      "
    />
    <!-- Subtle Bear Smile -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="3"
      stroke-linecap="round"
      d="
        M 123 174
        Q 128 179 133 174
      "
    />

    <!-- Peaceful Contented Closed Curved Eyes (Exact Ref Charm) -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="7"
      stroke-linecap="round"
      d="
        M 94 138
        C 99 146 109 146 114 138

        M 142 138
        C 147 146 157 146 162 138
      "
    />

    <!-- Emerald Safe-Dial Vault Collar (The Vault Bear Accent) -->
    <path
      fill="#00AA13"
      d="
        M 56 218
        C 76 226 180 226 200 218
        L 204 230
        C 180 240 76 240 52 230 Z
      "
    />
    <!-- Circular Vault Dial Medallion in Center of Collar -->
    <circle cx="128" cy="226" r="18" fill="#0081A0" stroke="#00AA13" stroke-width="3" />
    <circle cx="128" cy="226" r="10" fill="#00AA13" />
    <circle cx="128" cy="226" r="4" fill="#FFFFFF" />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# OPTION B: THE MINIMAL SLATE BEAR (Ref 1, Ref 4, & Ref 3 Master Hybrid)
# Kepala beruang navy minimalis di kanvas ice-blue, moncong putih, hidung zamrud.
# --------------------------------------------------------------------------
style_b_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-rb">
  <title id="title-rb">Beruang - The Minimal Slate Bear</title>
  <defs>
    <clipPath id="squircle-rb">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Ice-Blue Squircle Canvas -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#F0F7FD" />

  <g clip-path="url(#squircle-rb)">
    <!-- Rounded Bear Ears -->
    <circle cx="74" cy="92" r="28" fill="#0F172A" />
    <circle cx="74" cy="92" r="15" fill="#1E293B" />

    <circle cx="182" cy="92" r="28" fill="#0F172A" />
    <circle cx="182" cy="92" r="15" fill="#1E293B" />

    <!-- Deep Slate Navy Bear Head -->
    <circle cx="128" cy="146" r="70" fill="#0F172A" />

    <!-- Pure White Snout / Muzzle -->
    <ellipse cx="128" cy="164" rx="34" ry="28" fill="#FFFFFF" />

    <!-- Emerald Green Nose (The Growth Keystone) -->
    <path
      fill="#00AA13"
      d="
        M 116 154
        C 116 146 122 142 128 142
        C 134 142 140 146 140 154
        C 140 162 134 166 128 166
        C 122 166 116 162 116 154 Z
      "
    />
    <!-- Subtle Bear Smile -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="3"
      stroke-linecap="round"
      d="
        M 124 172
        Q 128 176 132 172
      "
    />

    <!-- Peaceful Curved Closed Eyes in White -->
    <path
      fill="none"
      stroke="#FFFFFF"
      stroke-width="7"
      stroke-linecap="round"
      d="
        M 92 134
        C 97 142 107 142 112 134

        M 144 134
        C 149 142 159 142 164 134
      "
    />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# OPTION C: THE HONEY TOFFEE BEAR (Warm Amber Mascot with Vault Medallion)
# Beruang madu hangat ala Ref 2 Toffee di kanvas Trust Blue.
# --------------------------------------------------------------------------
style_c_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-rc">
  <title id="title-rc">Beruang - The Honey Toffee Bear</title>
  <defs>
    <clipPath id="squircle-rc">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Trust Fintech Blue Squircle Canvas -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0081A0" />

  <g clip-path="url(#squircle-rc)">
    <!-- Warm Golden Bear Ears -->
    <ellipse cx="76" cy="88" rx="26" ry="28" fill="#F59E0B" />
    <ellipse cx="76" cy="88" rx="14" ry="16" fill="#D97706" />

    <ellipse cx="180" cy="88" rx="26" ry="28" fill="#F59E0B" />
    <ellipse cx="180" cy="88" rx="14" ry="16" fill="#D97706" />

    <!-- Honey Bear Head & Body -->
    <path
      fill="#F59E0B"
      d="
        M 44 240
        L 44 190
        C 42 136 72 96 128 96
        C 184 96 214 136 212 190
        L 212 240 Z
      "
    />

    <!-- Warm Cream Snout / Muzzle -->
    <ellipse cx="128" cy="166" rx="36" ry="30" fill="#FEF3C7" />

    <!-- Cute Bear Nose in Chocolate Navy -->
    <path
      fill="#0F172A"
      d="
        M 116 156
        C 116 148 122 144 128 144
        C 134 144 140 148 140 156
        C 140 164 134 168 128 168
        C 122 168 116 164 116 156 Z
      "
    />
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="3"
      stroke-linecap="round"
      d="
        M 123 174
        Q 128 179 133 174
      "
    />

    <!-- Peaceful Closed Curved Eyes -->
    <path
      fill="none"
      stroke="#0F172A"
      stroke-width="7"
      stroke-linecap="round"
      d="
        M 94 138
        C 99 146 109 146 114 138

        M 142 138
        C 147 146 157 146 162 138
      "
    />

    <!-- Emerald Safe Dial Badge on Chest -->
    <circle cx="128" cy="224" r="18" fill="#00AA13" stroke="#FFFFFF" stroke-width="2.5" />
    <circle cx="128" cy="224" r="10" fill="#0F172A" />
    <circle cx="128" cy="224" r="4" fill="#00AA13" />
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
    "real-bear-a.svg": style_a_svg,
    "real-bear-b.svg": style_b_svg,
    "real-bear-c.svg": style_c_svg,
    "real-bear-a-lockup.svg": make_lockup(get_inner(style_a_svg), "Beruang - Polar Vault Bear"),
    "real-bear-b-lockup.svg": make_lockup(get_inner(style_b_svg), "Beruang - Minimal Slate Bear"),
    "real-bear-c-lockup.svg": make_lockup(get_inner(style_c_svg), "Beruang - Honey Toffee Bear"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated Real Bear SVGs successfully!")
