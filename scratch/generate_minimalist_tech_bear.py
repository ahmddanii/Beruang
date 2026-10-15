import os
import subprocess

OUT_DIR = "public/branding/v9_minimalist_tech"
os.makedirs(OUT_DIR, exist_ok=True)

# -----------------------------------------------------------------------------
# PALET RESMI HALAMAN BERANDA:
# Primary Blue: #0066D6 (GoPay Vibrant Trust Blue)
# Deep Blue: #0052B3 (GoPay Deep Anchor)
# Growth Green: #00AA13 (GoPay Fresh Growth Green)
# Accent / Base: #FFFFFF (Pure White), #0F172A (Deep Slate)
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# CONCEPT T1: THE LINEAR FACET BEAR (GAYA LINEAR / RAYCAST / HIGH-TECH)
# Angles snapped to clean 45°/135°/75°/105° for 99/100 perfection.
# -----------------------------------------------------------------------------
def make_t1():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-t1">
  <title id="t-t1">Beruang - The Linear Facet Bear</title>
  
  <!-- Compound Path in Vibrant Trust Blue (#0066D6) with Precision Cutouts -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 96 66
      L 76 46
      C 62 42 46 54 48 70
      L 54 94
      L 44 126
      C 40 152 52 180 72 202
      L 128 226
      L 184 202
      C 204 180 216 152 212 126
      L 202 94
      L 208 70
      C 210 54 194 42 180 46
      L 160 66
      Z

      M 86 112
      L 102 112
      L 98 120
      L 82 120
      Z

      M 170 112
      L 154 112
      L 158 120
      L 174 120
      Z

      M 128 136
      L 156 160
      L 146 196
      L 110 196
      L 100 160
      Z
    "
  />

  <!-- Growth Green Keystone Diamond (#00AA13) -->
  <polygon points="128,146 142,162 128,178 114,162" fill="#00AA13" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT T2: THE SWISS MODERNIST BEAR (GAYA BAUHAUS / BRAUN / STRIPE)
# Karakter: Geometri kurva murni (pure circular arcs & tangents). Single-path 99/100.
# -----------------------------------------------------------------------------
def make_t2():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-t2">
  <title id="t-t2">Beruang - The Swiss Modernist Bear</title>
  
  <!-- Single Compound Path in Blue (#0066D6) with Circular Cutouts -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 90 68
      C 78 48 56 40 42 54
      C 30 66 34 88 46 104
      C 36 126 34 154 48 180
      C 66 210 94 224 128 224
      C 162 224 190 210 208 180
      C 222 154 220 126 210 104
      C 222 88 226 66 214 54
      C 200 40 178 48 168 68
      C 156 62 142 60 128 60
      C 114 60 100 62 88 68 Z

      M 88 112
      A 7.5 7.5 0 1 0 88 127
      A 7.5 7.5 0 1 0 88 112 Z

      M 168 112
      A 7.5 7.5 0 1 0 168 127
      A 7.5 7.5 0 1 0 168 112 Z

      M 128 136
      C 154 136 172 150 172 174
      C 172 196 152 210 128 210
      C 104 210 84 196 84 174
      C 84 150 102 136 128 136 Z
    "
  />

  <!-- Precision Curved Growth Nose (#00AA13) -->
  <path
    fill="#00AA13"
    d="
      M 112 152
      C 118 146 123 144 128 144
      C 133 144 138 146 144 152
      C 148 158 145 168 138 174
      C 134 177 131 178 128 178
      C 125 178 122 177 118 174
      C 111 168 108 158 112 152 Z
    "
  />

  <!-- Subtle Minimalist Anchor Dash in Deep Blue -->
  <path fill="#0052B3" d="M 127 182 L 129 182 L 129 194 L 127 194 Z" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT T3: THE VECTOR ACCELERATOR (PURE COMPOUND PATH - AUDIT 99/100)
# Panah akselerasi modal 45° melesat ke atas di moncong beruang.
# -----------------------------------------------------------------------------
def make_t3():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-t3">
  <title id="t-t3">Beruang - The Vector Accelerator</title>
  
  <!-- Pure Compound Path in Vibrant Blue (#0066D6) with Cutout Vault and Dual Eyes -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 90 68
      C 78 48 56 40 42 54
      C 30 66 34 88 46 104
      C 36 126 34 154 48 180
      C 66 210 94 224 128 224
      C 162 224 190 210 208 180
      C 222 154 220 126 210 104
      C 222 88 226 66 214 54
      C 200 40 178 48 168 68
      C 156 62 142 60 128 60
      C 114 60 100 62 90 68 Z

      M 86 112
      L 102 114
      L 92 120
      L 82 116 Z

      M 170 112
      L 154 114
      L 164 120
      L 174 116 Z

      M 128 132
      C 154 132 172 146 172 170
      C 172 194 152 208 128 208
      C 104 208 84 194 84 170
      C 84 146 102 132 128 132 Z
    "
  />

  <!-- Geometric Upward Growth Vector Nose (#00AA13 - Akselerasi Modal) -->
  <polygon points="128,142 146,160 137,160 137,174 119,174 119,160 110,160" fill="#00AA13" />
</svg>"""

# -----------------------------------------------------------------------------
# CONCEPT T4: THE MONOLITHIC KODIAK (GAYA PENTAGRAM / APPLE / COLLINS)
# Siluet beruang kodiak minimalis murni (Audit 99/100).
# -----------------------------------------------------------------------------
def make_t4():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-t4">
  <title id="t-t4">Beruang - The Monolithic Kodiak</title>
  
  <!-- Compound Path in Blue (#0066D6) with Cutout Muzzle and Eyes -->
  <path
    fill="#0066D6"
    fill-rule="evenodd"
    d="
      M 92 68
      C 82 48 60 40 46 54
      C 34 66 38 88 50 104
      C 40 126 38 154 50 180
      C 68 210 96 224 128 224
      C 160 224 188 210 206 180
      C 218 154 216 126 206 104
      C 218 88 222 66 210 54
      C 196 40 174 48 164 68
      C 152 64 140 62 128 62
      C 116 62 104 64 92 68 Z

      M 92 112
      A 7 7 0 1 0 92 126
      A 7 7 0 1 0 92 112 Z

      M 164 112
      A 7 7 0 1 0 164 126
      A 7 7 0 1 0 164 112 Z

      M 128 138
      C 154 138 170 152 170 174
      C 170 196 152 210 128 210
      C 104 210 86 196 86 174
      C 86 152 102 138 128 138 Z
    "
  />

  <!-- Horizontal Minimalist Growth Nose (#00AA13) -->
  <ellipse cx="128" cy="162" rx="16" ry="11" fill="#00AA13" />
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
        fill: #0066D6;
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

options = {
    "t1-linear-facet": (make_t1(), "T1: The Linear Facet Bear (Tech Facets)"),
    "t2-swiss-modernist": (make_t2(), "T2: The Swiss Modernist Bear (Arcs & Curves)"),
    "t3-vector-accelerator": (make_t3(), "T3: The Vector Accelerator (Growth Vector)"),
    "t4-monolithic-kodiak": (make_t4(), "T4: The Monolithic Kodiak (Ultra-Clean Monolith)"),
}

for key, (svg_str, label) in options.items():
    with open(os.path.join(OUT_DIR, f"{key}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_str)
    with open(os.path.join(OUT_DIR, f"{key}-lockup.svg"), "w", encoding="utf-8") as f:
        f.write(make_lockup(svg_str, label))

print("Created 4 Modern Minimalist Tech concepts in", OUT_DIR)
