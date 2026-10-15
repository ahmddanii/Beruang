import os

OUT_DIR = "public/branding/compiled_references"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# 1. REF 4 COMPILATION: THE SCULPTED VAULT BEAR
# Sintesis langsung Ref 4 (Siluet kepala beruang kokoh, moncong brankas lingkaran,
# hidung zamrud horizontal oval, aura venture-grade).
# --------------------------------------------------------------------------
svg_ref4 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-r4">
  <title id="title-r4">Beruang - The Sculpted Vault Bear (Ref 4 Synthesis)</title>
  <!-- Ice-Blue Background Canvas -->
  <rect width="256" height="256" rx="56" fill="#F0F7FD" />

  <!-- Symmetrical Deep Slate Navy Sculpted Bear Head with Muzzle & Calm Eyes Cutout -->
  <path
    fill="#0F172A"
    fill-rule="evenodd"
    d="
      M 98 72
      C 86 68 68 48 52 58
      C 40 66 42 88 52 104
      C 36 126 32 156 52 184
      C 68 212 96 226 128 226
      C 160 226 188 212 204 184
      C 224 156 220 126 204 104
      C 214 88 216 66 204 58
      C 188 48 170 68 158 72
      L 98 72 Z

      M 128 112
      C 150 112 168 130 168 152
      C 168 174 150 192 128 192
      C 106 192 88 174 88 152
      C 88 130 106 112 128 112 Z

      M 76 112
      C 76 106 90 106 90 112
      C 87 117 79 117 76 112 Z

      M 166 112
      C 166 106 180 106 180 112
      C 177 117 169 117 166 112 Z
    "
  />

  <!-- Emerald Growth Horizontal Oval Nose (Vault Keystone) -->
  <path
    fill="#00AA13"
    d="
      M 110 146
      C 110 136 118 132 128 132
      C 138 132 146 136 146 146
      C 146 156 138 160 128 160
      C 118 160 110 156 110 146 Z
    "
  />
</svg>"""

# --------------------------------------------------------------------------
# 2. REF 2 COMPILATION: THE APP ICON TOFFEE BEAR MASCOT
# Sintesis langsung Ref 2 (Maskot beruang madu ramah di dalam squircle tile,
# telinga bulat manis, moncong krem, berkalung medali brankas zamrud).
# --------------------------------------------------------------------------
svg_ref2 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-r2">
  <title id="title-r2">Beruang - The Toffee App Icon Bear (Ref 2 Synthesis)</title>
  <defs>
    <clipPath id="squircle-r2">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Deep Slate Navy Squircle Canvas -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#0F172A" />

  <g clip-path="url(#squircle-r2)">
    <!-- Warm Golden Amber Diagonal Glow in background -->
    <path d="M 120 16 L 240 16 L 240 136 Z" fill="#D97706" opacity="0.35" />

    <!-- Rounded Honey Bear Ears -->
    <ellipse cx="76" cy="88" rx="26" ry="28" fill="#F59E0B" />
    <ellipse cx="76" cy="88" rx="14" ry="16" fill="#D97706" />

    <ellipse cx="180" cy="88" rx="26" ry="28" fill="#F59E0B" />
    <ellipse cx="180" cy="88" rx="14" ry="16" fill="#D97706" />

    <!-- Honey Bear Head & Torso -->
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

    <!-- Cute Chocolate Nose -->
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

    <!-- Friendly Expressive Eyes with Sparkle -->
    <circle cx="98" cy="140" r="8" fill="#0F172A" />
    <circle cx="100.5" cy="137.5" r="3" fill="#FFFFFF" />

    <circle cx="158" cy="140" r="8" fill="#0F172A" />
    <circle cx="160.5" cy="137.5" r="3" fill="#FFFFFF" />

    <!-- Emerald Safe-Dial Vault Medallion (The Vault Bear Element) -->
    <circle cx="128" cy="226" r="18" fill="#00AA13" stroke="#FFFFFF" stroke-width="2.5" />
    <circle cx="128" cy="226" r="10" fill="#0F172A" />
    <circle cx="128" cy="226" r="4" fill="#00AA13" />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# 3. REF 1 COMPILATION: THE ORGANIC MINIMALIST BEAR
# Sintesis langsung Ref 1 (Wajah beruang chubby organik, mata almond tenang,
# moncong brankas lingkaran, hidung zamrud di latar Trust Blue).
# --------------------------------------------------------------------------
svg_ref1 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-r1">
  <title id="title-r1">Beruang - The Organic Minimalist Bear (Ref 1 Synthesis)</title>
  <!-- Trust Blue Squircle Canvas -->
  <rect width="256" height="256" rx="56" fill="#0081A0" />

  <!-- Organic Chubby Bear Head with Cutout Snout & Calm Almond Eyes -->
  <path
    fill="#FFFFFF"
    fill-rule="evenodd"
    d="
      M 128 66
      C 108 66 98 52 86 42
      C 70 28 50 38 48 60
      C 46 80 46 100 42 120
      C 34 162 56 206 94 220
      C 110 224 118 224 128 224
      C 138 224 146 224 162 220
      C 200 206 222 162 214 120
      C 210 100 210 80 208 60
      C 206 38 186 28 170 42
      C 158 52 148 66 128 66 Z

      M 128 116
      C 148 116 164 132 164 152
      C 164 172 148 188 128 188
      C 108 188 92 172 92 152
      C 92 132 108 116 128 116 Z

      M 76 112
      C 76 105 92 105 92 112
      C 88 118 80 118 76 112 Z

      M 164 112
      C 164 105 180 105 180 112
      C 176 118 168 118 164 112 Z
    "
  />

  <!-- Emerald Growth Nose Keystone inside Snout -->
  <path
    fill="#00AA13"
    d="
      M 112 146
      C 112 138 119 134 128 134
      C 137 134 144 138 144 146
      C 144 154 137 158 128 158
      C 119 158 112 154 112 146 Z
    "
  />
</svg>"""

# --------------------------------------------------------------------------
# 4. REF 5 COMPILATION: THE TECH CAPSULE VAULT BEAR
# Sintesis langsung Ref 5 (Siluet kapsul vertikal, telinga notch, mata half-lidded,
# moncong brankas bank vertikal dengan dial kombinasi).
# --------------------------------------------------------------------------
svg_ref5 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-r5">
  <title id="title-r5">Beruang - The Tech Capsule Vault Bear (Ref 5 Synthesis)</title>
  <!-- Ice-Blue Background Canvas -->
  <rect width="256" height="256" rx="56" fill="#F0F7FD" />

  <!-- Single Continuous Capsule Bear Silhouette with Notch Ears & Cutouts -->
  <path
    fill="#0F172A"
    fill-rule="evenodd"
    d="
      M 128 36
      C 152 36 166 40 174 46
      C 180 30 200 34 204 50
      C 206 60 202 70 198 78
      L 198 160
      C 198 206 170 232 128 232
      C 86 232 58 206 58 160
      L 58 78
      C 54 70 50 60 52 50
      C 56 34 76 30 82 46
      C 90 40 104 36 128 36 Z

      M 80 104
      L 102 104
      C 102 112 80 112 80 104 Z

      M 154 104
      L 176 104
      C 176 112 154 112 154 104 Z

      M 112 140
      C 112 126 120 120 128 120
      C 136 120 144 126 144 140
      L 144 186
      C 144 198 136 204 128 204
      C 120 204 112 198 112 186 Z
    "
  />

  <!-- Emerald Safe-Dial & Keyhole inside Vault Slot -->
  <circle cx="128" cy="154" r="12" fill="#00AA13" />
  <circle cx="128" cy="154" r="5" fill="#FFFFFF" />
  <!-- Combination Slot Line -->
  <rect x="126" y="176" width="4" height="12" rx="2" fill="#00AA13" />
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
    "comp-ref4-sculpted.svg": svg_ref4,
    "comp-ref2-toffee.svg": svg_ref2,
    "comp-ref1-organic.svg": svg_ref1,
    "comp-ref5-capsule.svg": svg_ref5,
    "comp-ref4-lockup.svg": make_lockup(get_inner(svg_ref4), "Beruang - Sculpted Vault"),
    "comp-ref2-lockup.svg": make_lockup(get_inner(svg_ref2), "Beruang - Toffee App Icon"),
    "comp-ref1-lockup.svg": make_lockup(get_inner(svg_ref1), "Beruang - Organic Minimal"),
    "comp-ref5-lockup.svg": make_lockup(get_inner(svg_ref5), "Beruang - Tech Capsule"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated all 4 compiled reference SVGs successfully!")
