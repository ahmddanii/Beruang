import os
import subprocess

OUT_DIR = "public/branding/v11_rupiah_bear"
os.makedirs(OUT_DIR, exist_ok=True)

# -----------------------------------------------------------------------------
# VECTOR GLYPH UNTUK "Rp" (PATH MURNI TANPA <text>):
# Center at (128, 195)
# -----------------------------------------------------------------------------
RP_GLYPH = """
  <!-- 'R' path -->
  <path fill="#00AA13" d="M 122 189 L 126 189 C 128.5 189 129.5 190.2 129.5 192 C 129.5 193.8 128.5 195 126 195 L 124 195 L 124 199 L 122 199 Z M 124 191 L 124 193.5 L 125.8 193.5 C 126.8 193.5 127.5 193 127.5 192 C 127.5 191 126.8 191 125.8 191 Z" />
  <path fill="#00AA13" d="M 125.5 194.5 L 128.5 199 L 126.2 199 L 124 195 Z" />
  <!-- 'p' path -->
  <path fill="#00AA13" d="M 130.5 191.5 L 132.3 191.5 L 132.3 192.8 C 133 191.8 134 191.3 135.2 191.3 C 137 191.3 138.2 192.8 138.2 194.8 C 138.2 196.8 137 198.3 135.2 198.3 C 134 198.3 133 197.8 132.3 196.8 L 132.3 201 L 130.5 201 Z M 132.3 194.8 C 132.3 196 133.2 196.8 134.4 196.8 C 135.6 196.8 136.4 196 136.4 194.8 C 136.4 193.6 135.6 192.8 134.4 192.8 C 133.2 192.8 132.3 193.6 132.3 194.8 Z" />
""".strip()

# -----------------------------------------------------------------------------
# OPTION 1: THE SERENE RUPIAH BEAR (CLEAN FLAT VECTOR - PERSIS GAMBAR REFERENSI)
# -----------------------------------------------------------------------------
def make_v1():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-r1">
  <title id="t-r1">Beruang - The Serene Rupiah Bear</title>
  
  <!-- Left Ear -->
  <circle cx="72" cy="68" r="28" fill="#0066D6" />
  <circle cx="72" cy="68" r="16" fill="#0052B3" />

  <!-- Right Ear -->
  <circle cx="184" cy="68" r="28" fill="#0066D6" />
  <circle cx="184" cy="68" r="16" fill="#0052B3" />

  <!-- Main Round Bear Head (Clean Flat Vector in Vibrant Trust Blue) -->
  <path
    fill="#0066D6"
    d="
      M 92 64
      C 104 60 116 58 128 58
      C 140 58 152 60 164 64
      C 192 72 216 98 218 132
      C 220 170 196 200 170 214
      C 156 222 142 224 128 224
      C 114 224 100 222 86 214
      C 60 200 36 170 38 132
      C 40 98 64 72 92 64 Z
    "
  />

  <!-- Serene Closed Eyes (Filled Crescent Shapes without raw strokes) -->
  <!-- Left Eye -->
  <path
    fill="#0F172A"
    d="
      M 78 132
      C 86 120 102 120 110 132
      C 104 127 92 127 78 132 Z
    "
  />
  <!-- Left Eye Eyelash Ticks -->
  <polygon points="76,134 78,131 72,138 71,140" fill="#0F172A" />
  <polygon points="84,124 87,123 83,118 81,119" fill="#0F172A" />

  <!-- Right Eye -->
  <path
    fill="#0F172A"
    d="
      M 146 132
      C 154 120 170 120 178 132
      C 164 127 152 127 146 132 Z
    "
  />
  <!-- Right Eye Eyelash Ticks -->
  <polygon points="180,134 178,131 184,138 185,140" fill="#0F172A" />
  <polygon points="172,124 169,123 173,118 175,119" fill="#0F172A" />

  <!-- Uang Lembar Rupiah (Clean Banknote in Growth Green #00AA13) -->
  <g transform="translate(128, 194)">
    <!-- Base Paper Bill -->
    <rect x="-56" y="-26" width="112" height="52" rx="8" fill="#00AA13" />
    <rect x="-51" y="-22" width="102" height="44" rx="5" fill="#10B981" />
    <!-- White Guilloche Inner Border -->
    <rect x="-46" y="-18" width="92" height="36" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
    <!-- Central Value Medallion -->
    <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
    <!-- Corner Value Indicators -->
    <circle cx="-38" cy="-11" r="3" fill="#FFFFFF" />
    <circle cx="38" cy="-11" r="3" fill="#FFFFFF" />
    <circle cx="-38" cy="11" r="3" fill="#FFFFFF" />
    <circle cx="38" cy="11" r="3" fill="#FFFFFF" />
  </g>
  
  {RP_GLYPH}

  <!-- Left Bear Paw Holding Banknote -->
  <ellipse cx="84" cy="196" rx="18" ry="16" fill="#0052B3" />
  <ellipse cx="86" cy="194" rx="15" ry="13" fill="#0066D6" />

  <!-- Right Bear Paw Holding Banknote -->
  <ellipse cx="172" cy="196" rx="18" ry="16" fill="#0052B3" />
  <ellipse cx="170" cy="194" rx="15" ry="13" fill="#0066D6" />
</svg>"""

# -----------------------------------------------------------------------------
# OPTION 2: THE CONFIDENT OPEN-EYED RUPIAH BEAR (MATA TERBUKA CERDAS)
# -----------------------------------------------------------------------------
def make_v2():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-r2">
  <title id="t-r2">Beruang - The Confident Open-Eyed Rupiah Bear</title>
  
  <!-- Left Ear -->
  <circle cx="72" cy="68" r="28" fill="#0066D6" />
  <circle cx="72" cy="68" r="16" fill="#0052B3" />

  <!-- Right Ear -->
  <circle cx="184" cy="68" r="28" fill="#0066D6" />
  <circle cx="184" cy="68" r="16" fill="#0052B3" />

  <!-- Main Round Bear Head -->
  <path
    fill="#0066D6"
    d="
      M 92 64
      C 104 60 116 58 128 58
      C 140 58 152 60 164 64
      C 192 72 216 98 218 132
      C 220 170 196 200 170 214
      C 156 222 142 224 128 224
      C 114 224 100 222 86 214
      C 60 200 36 170 38 132
      C 40 98 64 72 92 64 Z
    "
  />

  <!-- Subtle Snout Base in White -->
  <ellipse cx="128" cy="152" rx="32" ry="22" fill="#FFFFFF" />
  <ellipse cx="128" cy="145" rx="10" ry="7" fill="#0052B3" />

  <!-- Two Open, Intelligent, Friendly Eyes -->
  <ellipse cx="94" cy="116" rx="9" ry="11" fill="#FFFFFF" />
  <circle cx="94" cy="117" r="6" fill="#0F172A" />
  <circle cx="92" cy="114" r="2.2" fill="#FFFFFF" />

  <ellipse cx="162" cy="116" rx="9" ry="11" fill="#FFFFFF" />
  <circle cx="162" cy="117" r="6" fill="#0F172A" />
  <circle cx="160" cy="114" r="2.2" fill="#FFFFFF" />

  <!-- Uang Lembar Rupiah Hijau (#00AA13) -->
  <g transform="translate(128, 194)">
    <rect x="-56" y="-26" width="112" height="52" rx="8" fill="#00AA13" />
    <rect x="-51" y="-22" width="102" height="44" rx="5" fill="#10B981" />
    <rect x="-46" y="-18" width="92" height="36" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
    <circle cx="-38" cy="-11" r="3" fill="#FFFFFF" />
    <circle cx="38" cy="-11" r="3" fill="#FFFFFF" />
    <circle cx="-38" cy="11" r="3" fill="#FFFFFF" />
    <circle cx="38" cy="11" r="3" fill="#FFFFFF" />
  </g>

  {RP_GLYPH}

  <!-- Left Bear Paw -->
  <ellipse cx="84" cy="196" rx="18" ry="16" fill="#0052B3" />
  <ellipse cx="86" cy="194" rx="15" ry="13" fill="#0066D6" />

  <!-- Right Bear Paw -->
  <ellipse cx="172" cy="196" rx="18" ry="16" fill="#0052B3" />
  <ellipse cx="170" cy="194" rx="15" ry="13" fill="#0066D6" />
</svg>"""

# -----------------------------------------------------------------------------
# OPTION 3: THE SQUIRCLE APP ICON EDITION (FORMAT FULL SQUIRCLE SEPERTI GAMBAR)
# -----------------------------------------------------------------------------
def make_v3():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-r3">
  <title id="t-r3">Beruang - Squircle App Icon Edition</title>
  
  <defs>
    <clipPath id="squircle-clip-clean">
      <rect x="12" y="12" width="232" height="232" rx="60" />
    </clipPath>
  </defs>

  <!-- Squircle Canvas in Dark Ice Navy (#0C121D) -->
  <rect x="12" y="12" width="232" height="232" rx="60" fill="#0C121D" />
  <rect x="12" y="12" width="232" height="232" rx="60" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />

  <g clip-path="url(#squircle-clip-clean)">
    <!-- Ambient Glow behind Bear -->
    <circle cx="128" cy="130" r="90" fill="#0066D6" opacity="0.2" />

    <!-- Left Ear -->
    <circle cx="74" cy="74" r="28" fill="#0066D6" />
    <circle cx="74" cy="74" r="16" fill="#0052B3" />

    <!-- Right Ear -->
    <circle cx="182" cy="74" r="28" fill="#0066D6" />
    <circle cx="182" cy="74" r="16" fill="#0052B3" />

    <!-- Main Round Bear Head -->
    <path
      fill="#0066D6"
      d="
        M 94 70
        C 106 66 117 64 128 64
        C 139 64 150 66 162 70
        C 190 78 214 104 216 138
        C 218 176 194 204 168 218
        C 155 226 141 228 128 228
        C 115 228 101 226 88 218
        C 62 204 38 176 40 138
        C 42 104 66 78 94 70 Z
      "
    />

    <!-- Serene Closed Eyes in White -->
    <path
      fill="#FFFFFF"
      d="
        M 80 136
        C 88 124 104 124 112 136
        C 106 131 94 131 80 136 Z
      "
    />
    <polygon points="78,138 80,135 74,142 73,144" fill="#FFFFFF" />
    <polygon points="86,128 89,127 85,122 83,123" fill="#FFFFFF" />

    <path
      fill="#FFFFFF"
      d="
        M 144 136
        C 152 124 168 124 176 136
        C 162 131 150 131 144 136 Z
      "
    />
    <polygon points="178,138 176,135 182,142 183,144" fill="#FFFFFF" />
    <polygon points="170,128 167,127 171,122 173,123" fill="#FFFFFF" />

    <!-- Uang Lembar Rupiah Hijau (#00AA13) -->
    <g transform="translate(128, 196)">
      <rect x="-56" y="-26" width="112" height="52" rx="8" fill="#00AA13" />
      <rect x="-51" y="-22" width="102" height="44" rx="5" fill="#10B981" />
      <rect x="-46" y="-18" width="92" height="36" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
      <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
      <circle cx="-38" cy="-11" r="3" fill="#FFFFFF" />
      <circle cx="38" cy="-11" r="3" fill="#FFFFFF" />
      <circle cx="-38" cy="11" r="3" fill="#FFFFFF" />
      <circle cx="38" cy="11" r="3" fill="#FFFFFF" />
    </g>

    <g transform="translate(0, 2)">
      {RP_GLYPH}
    </g>

    <!-- Left Bear Paw -->
    <ellipse cx="84" cy="198" rx="18" ry="16" fill="#0052B3" />
    <ellipse cx="86" cy="196" rx="15" ry="13" fill="#0066D6" />

    <!-- Right Bear Paw -->
    <ellipse cx="172" cy="198" rx="18" ry="16" fill="#0052B3" />
    <ellipse cx="170" cy="196" rx="15" ry="13" fill="#0066D6" />
  </g>
</svg>"""

# -----------------------------------------------------------------------------
# OPTION 4: THE WARM GOLDEN HONEY BEAR HOLDING GREEN RUPIAH
# -----------------------------------------------------------------------------
def make_v4():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-r4">
  <title id="t-r4">Beruang - The Golden Honey Rupiah Bear</title>
  
  <!-- Left Ear -->
  <circle cx="72" cy="68" r="28" fill="#F59E0B" />
  <circle cx="72" cy="68" r="16" fill="#D97706" />

  <!-- Right Ear -->
  <circle cx="184" cy="68" r="28" fill="#F59E0B" />
  <circle cx="184" cy="68" r="16" fill="#D97706" />

  <!-- Main Round Golden Honey Bear Head -->
  <path
    fill="#F59E0B"
    d="
      M 92 64
      C 104 60 116 58 128 58
      C 140 58 152 60 164 64
      C 192 72 216 98 218 132
      C 220 170 196 200 170 214
      C 156 222 142 224 128 224
      C 114 224 100 222 86 214
      C 60 200 36 170 38 132
      C 40 98 64 72 92 64 Z
    "
  />

  <!-- Serene Closed Eyes in Deep Brown -->
  <path
    fill="#78350F"
    d="
      M 78 132
      C 86 120 102 120 110 132
      C 104 127 92 127 78 132 Z
    "
  />
  <polygon points="76,134 78,131 72,138 71,140" fill="#78350F" />
  <polygon points="84,124 87,123 83,118 81,119" fill="#78350F" />

  <path
    fill="#78350F"
    d="
      M 146 132
      C 154 120 170 120 178 132
      C 164 127 152 127 146 132 Z
    "
  />
  <polygon points="180,134 178,131 184,138 185,140" fill="#78350F" />
  <polygon points="172,124 169,123 173,118 175,119" fill="#78350F" />

  <!-- Uang Lembar Rupiah Hijau (#00AA13) -->
  <g transform="translate(128, 194)">
    <rect x="-56" y="-26" width="112" height="52" rx="8" fill="#00AA13" />
    <rect x="-51" y="-22" width="102" height="44" rx="5" fill="#10B981" />
    <rect x="-46" y="-18" width="92" height="36" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="0" cy="0" r="14" fill="#FFFFFF" />
    <circle cx="-38" cy="-11" r="3" fill="#FFFFFF" />
    <circle cx="38" cy="-11" r="3" fill="#FFFFFF" />
    <circle cx="-38" cy="11" r="3" fill="#FFFFFF" />
    <circle cx="38" cy="11" r="3" fill="#FFFFFF" />
  </g>

  {RP_GLYPH}

  <!-- Left Bear Paw -->
  <ellipse cx="84" cy="196" rx="18" ry="16" fill="#D97706" />
  <ellipse cx="86" cy="194" rx="15" ry="13" fill="#F59E0B" />

  <!-- Right Bear Paw -->
  <ellipse cx="172" cy="196" rx="18" ry="16" fill="#D97706" />
  <ellipse cx="170" cy="194" rx="15" ry="13" fill="#F59E0B" />
</svg>"""

# Lockup Builder
def make_lockup(symbol_svg, title, is_golden=False):
    inner = symbol_svg[symbol_svg.find(">") + 1 : symbol_svg.rfind("</svg>")]
    title_color = "#D97706" if is_golden else "#0066D6"
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 180" width="680" height="180" role="img" aria-labelledby="t-lk">
  <title id="t-lk">{title}</title>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&amp;display=swap');
      .brand-title {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 54px;
        font-weight: 700;
        fill: {title_color};
      }}
      .brand-tagline {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 13px;
        font-weight: 600;
        fill: #00AA13;
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

items = {
    "v1-serene-rupiah-blue": (make_v1(), "Opsi 1: The Serene Rupiah Bear (Mata Tenang Khas Referensi)", False),
    "v2-confident-rupiah-blue": (make_v2(), "Opsi 2: The Confident Rupiah Bear (Mata Terbuka Percaya Diri)", False),
    "v3-squircle-app-icon": (make_v3(), "Opsi 3: The Squircle App Icon (Format Ikon Aplikasi)", False),
    "v4-golden-honey-rupiah": (make_v4(), "Opsi 4: The Golden Honey Bear (Warna Emas Asli Referensi)", True),
}

for key, (svg_str, label, is_gold) in items.items():
    with open(os.path.join(OUT_DIR, f"{key}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_str)
    with open(os.path.join(OUT_DIR, f"{key}-lockup.svg"), "w", encoding="utf-8") as f:
        f.write(make_lockup(svg_str, label, is_gold))

print("Regenerated clean flat Rupiah bear vectors in", OUT_DIR)
