import os
import subprocess

OUT_DIR = "scratch/ear_tests"
os.makedirs(OUT_DIR, exist_ok=True)

# Common SVG elements (Banknote, Muzzle, Eyes, Paws)
EYES_SVG = """
  <!-- Peaceful Serene Closed Eyes (Filled Smooth Arcs) -->
  <path
    fill="#FFFFFF"
    d="
      M 96 118
      C 102 110 112 110 118 118
      C 112 113 102 113 96 118 Z
    "
  />
  <path
    fill="#FFFFFF"
    d="
      M 138 118
      C 144 110 154 110 160 118
      C 154 113 144 113 138 118 Z
    "
  />
"""

MUZZLE_SVG = """
  <!-- White Snout / Muzzle -->
  <ellipse cx="128" cy="142" rx="22" ry="18" fill="#FFFFFF" />

  <!-- Blue Rounded Bear Nose -->
  <path
    fill="#0066D6"
    d="
      M 120 137
      C 120 131 123.5 129 128 129
      C 132.5 129 136 131 136 137
      C 136 143 132.5 147 128 147
      C 123.5 147 120 143 120 137 Z
    "
  />
"""

BANKNOTE_SVG = """
  <!-- Indonesian Rupiah Banknote (Tilted -10deg held by paws) -->
  <g transform="translate(128, 178) rotate(-10) translate(-128, -178)">
    <rect x="74" y="154" width="108" height="52" rx="8" fill="#FFFFFF" />
    <rect x="76" y="156" width="104" height="48" rx="6" fill="#00AA13" />
    <rect x="80" y="160" width="96" height="40" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="128" cy="180" r="14" fill="#FFFFFF" />
    <!-- 'R' -->
    <path fill="#00AA13" d="M 122 174 L 126 174 C 128.5 174 129.5 175.2 129.5 177 C 129.5 178.8 128.5 180 126 180 L 124 180 L 124 184 L 122 184 Z M 124 176 L 124 178.5 L 125.8 178.5 C 126.8 178.5 127.5 178 127.5 177 C 127.5 176 126.8 176 125.8 176 Z" />
    <path fill="#00AA13" d="M 125.5 179.5 L 128.5 184 L 126.2 184 L 124 180 Z" />
    <!-- 'p' -->
    <path fill="#00AA13" d="M 130.5 176.5 L 132.3 176.5 L 132.3 177.8 C 133 176.8 134 176.3 135.2 176.3 C 137 176.3 138.2 177.8 138.2 179.8 C 138.2 181.8 137 183.3 135.2 183.3 C 134 183.3 133 182.8 132.3 181.8 L 132.3 186 L 130.5 186 Z M 132.3 179.8 C 132.3 181 133.2 181.8 134.4 181.8 C 135.6 181.8 136.4 181 136.4 179.8 C 136.4 178.6 135.6 177.8 134.4 177.8 C 133.2 177.8 132.3 178.6 132.3 179.8 Z" />
  </g>

  <!-- Left Bear Paw Hugging Banknote -->
  <path
    d="
      M 74 156
      C 66 166 68 182 82 192
      C 94 200 106 196 112 184
      C 106 182 100 178 96 172
      C 86 168 80 162 74 156 Z
    "
    fill="#0066D6"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linejoin="round"
  />

  <!-- Right Bear Paw Hugging Banknote -->
  <path
    d="
      M 182 156
      C 190 166 188 182 174 192
      C 162 200 150 196 144 184
      C 150 182 156 178 160 172
      C 170 168 176 162 182 156 Z
    "
    fill="#0066D6"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linejoin="round"
  />
"""

# -----------------------------------------------------------------------------
# ORIGINAL V12 (FOR COMPARISON - REFERRED TO AS "SEPERTI TIKUS")
# -----------------------------------------------------------------------------
def make_original():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Original high circular ears -->
  <circle cx="86" cy="62" r="22" fill="#0066D6" />
  <circle cx="86" cy="62" r="11" fill="#FFFFFF" />
  <circle cx="170" cy="62" r="22" fill="#0066D6" />
  <circle cx="170" cy="62" r="11" fill="#FFFFFF" />

  <path
    fill="#0066D6"
    d="
      M 98 68
      C 108 62 118 60 128 60
      C 138 60 148 62 158 68
      C 176 78 186 98 186 122
      C 192 138 200 158 196 182
      C 192 206 172 216 128 216
      C 84 216 64 206 60 182
      C 56 158 64 138 70 122
      C 70 98 80 78 98 68 Z
    "
  />
  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

# -----------------------------------------------------------------------------
# VARIANT A: CLASSIC TEDDY BEAR (Snug Semicircles, Wider Forehead Crown)
# -----------------------------------------------------------------------------
# Ears are smaller (r=16), placed lower and wider (cx=74, cy=74 & cx=182, cy=74),
# embedded into the head. Forehead is broad and sturdy (M 84 76 C 102 62 154 62 172 76).
# Inner ear is a soft compact semicircle/pill (r=7) nestled snugly into the ear base.
def make_variant_a():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear (Snug, low-profile teddy bear ear) -->
  <circle cx="75" cy="74" r="17" fill="#0066D6" />
  <ellipse cx="75" cy="74" rx="8" ry="7" fill="#FFFFFF" />

  <!-- Right Ear -->
  <circle cx="181" cy="74" r="17" fill="#0066D6" />
  <ellipse cx="181" cy="74" rx="8" ry="7" fill="#FFFFFF" />

  <!-- Broad Chubby Bear Head & Body -->
  <path
    fill="#0066D6"
    d="
      M 86 74
      C 98 64 112 60 128 60
      C 144 60 158 64 170 74
      C 182 84 188 102 188 122
      C 193 138 200 158 196 182
      C 192 206 172 216 128 216
      C 84 216 64 206 60 182
      C 56 158 63 138 68 122
      C 68 102 74 84 86 74 Z
    "
  />
  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

# -----------------------------------------------------------------------------
# VARIANT B: OVAL TILTED BEAR EARS (Teddy Bear Organic Angles)
# -----------------------------------------------------------------------------
# Ears are angled at ~35° outward, following the diagonal skull slope.
# Inner ear is a small rounded dome matching the angle, very gentle and cute.
def make_variant_b():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear (Angled Outward -35deg, Semicircular dome) -->
  <g transform="translate(74, 76) rotate(-35)">
    <ellipse cx="0" cy="0" rx="18" ry="14" fill="#0066D6" />
    <ellipse cx="0" cy="0" rx="9" ry="6" fill="#FFFFFF" />
  </g>

  <!-- Right Ear (Angled Outward 35deg) -->
  <g transform="translate(182, 76) rotate(35)">
    <ellipse cx="0" cy="0" rx="18" ry="14" fill="#0066D6" />
    <ellipse cx="0" cy="0" rx="9" ry="6" fill="#FFFFFF" />
  </g>

  <!-- Head with Broad Cranium -->
  <path
    fill="#0066D6"
    d="
      M 86 74
      C 98 64 112 60 128 60
      C 144 60 158 64 170 74
      C 182 84 188 102 188 122
      C 193 138 200 158 196 182
      C 192 206 172 216 128 216
      C 84 216 64 206 60 182
      C 56 158 63 138 68 122
      C 68 102 74 84 86 74 Z
    "
  />
  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

# -----------------------------------------------------------------------------
# VARIANT C: CUTE COMPACT BEAR TABS (Kawaii Chubby Proportion - Rilakkuma / Line Brown)
# -----------------------------------------------------------------------------
# Ears are compact rounded tabs sitting flush on the 10 and 2 positions.
# Inner ear uses subtle rounded arc, giving unmistakably chubby bear energy.
def make_variant_c():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear (Compact Rounded Tab) -->
  <path
    d="
      M 62 88
      C 58 76 68 64 80 68
      C 88 70 92 78 90 88 Z
    "
    fill="#0066D6"
  />
  <!-- Left Inner Ear -->
  <path
    d="
      M 68 84
      C 66 78 72 72 78 74
      C 82 75 84 80 82 84 Z
    "
    fill="#FFFFFF"
  />

  <!-- Right Ear (Compact Rounded Tab) -->
  <path
    d="
      M 194 88
      C 198 76 188 64 176 68
      C 168 70 164 78 166 88 Z
    "
    fill="#0066D6"
  />
  <!-- Right Inner Ear -->
  <path
    d="
      M 188 84
      C 190 78 184 72 178 74
      C 174 75 172 80 174 84 Z
    "
    fill="#FFFFFF"
  />

  <!-- Head & Body -->
  <path
    fill="#0066D6"
    d="
      M 86 72
      C 98 62 112 58 128 58
      C 144 58 158 62 170 72
      C 184 84 188 102 188 122
      C 193 138 200 158 196 182
      C 192 206 172 216 128 216
      C 84 216 64 206 60 182
      C 56 158 63 138 68 122
      C 68 102 72 84 86 72 Z
    "
  />
  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

# -----------------------------------------------------------------------------
# VARIANT D: TONAL BEAR EARS (Deep Blue Inner Ear #0052B3 - Zero Mouse Bullseye)
# -----------------------------------------------------------------------------
# Many premium bear marks avoid white inner ears to completely eliminate mouse comparisons.
# Deep blue (#0052B3) inner ear gives tactile depth without stark white circles.
def make_variant_d():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear -->
  <circle cx="75" cy="74" r="17" fill="#0066D6" />
  <ellipse cx="75" cy="74" rx="9" ry="8" fill="#0052B3" />

  <!-- Right Ear -->
  <circle cx="181" cy="74" r="17" fill="#0066D6" />
  <ellipse cx="181" cy="74" rx="9" ry="8" fill="#0052B3" />

  <!-- Broad Chubby Bear Head & Body -->
  <path
    fill="#0066D6"
    d="
      M 86 74
      C 98 64 112 60 128 60
      C 144 60 158 64 170 74
      C 182 84 188 102 188 122
      C 193 138 200 158 196 182
      C 192 206 172 216 128 216
      C 84 216 64 206 60 182
      C 56 158 63 138 68 122
      C 68 102 74 84 86 74 Z
    "
  />
  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Perbandingan Bentuk Telinga Beruang</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    body {{
      font-family: 'Poppins', sans-serif;
      background: #080C14;
      color: #E2E8F0;
      padding: 40px;
    }}
    h1 {{
      font-size: 24px;
      margin-bottom: 8px;
      color: #FFFFFF;
    }}
    p.subtitle {{
      color: #94A3B8;
      margin-bottom: 32px;
      font-size: 14px;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
    }}
    .card {{
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
    }}
    .card.original {{
      border-color: #EF4444;
      background: rgba(239, 68, 68, 0.05);
    }}
    .card.highlight {{
      border-color: #0066D6;
      background: rgba(0, 102, 214, 0.08);
    }}
    .tag {{
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 12px;
    }}
    .tag.red {{ background: rgba(239, 68, 68, 0.2); color: #FCA5A5; }}
    .tag.blue {{ background: rgba(0, 102, 214, 0.2); color: #60A5FA; }}
    .tag.green {{ background: rgba(0, 170, 19, 0.2); color: #4ADE80; }}
    .canvas {{
      background: #FFFFFF;
      border-radius: 12px;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 14px;
    }}
    .title {{
      font-size: 14px;
      font-weight: 600;
      color: #F8FAFC;
      margin-bottom: 6px;
    }}
    .desc {{
      font-size: 11px;
      color: #94A3B8;
      line-height: 1.4;
      text-align: left;
    }}
  </style>
</head>
<body>
  <h1>Evolusi Bentuk Telinga Beruang (Bebas Efek Tikus)</h1>
  <p class="subtitle">Analisis anatomi telinga: telinga tikus tinggi & bulat melingkar; telinga beruang rendah, proporsional kecil, bersandar kokoh pada dahi lebar.</p>

  <div class="grid">
    <div class="card original">
      <span class="tag red">Sebelumnya (Tikus)</span>
      <div class="canvas">
        {make_original()}
      </div>
      <div class="title">Versi Awal</div>
      <div class="desc">• Telinga terlalu tinggi & bulat (r=22)<br>• Inner ear putih bulat kontras (r=11)<br>• Dahi sempit membuat ilusi telinga tikus</div>
    </div>

    <div class="card highlight">
      <span class="tag blue">Opsi A (Rekomendasi)</span>
      <div class="canvas">
        {make_variant_a()}
      </div>
      <div class="title">Teddy Bear Snug</div>
      <div class="desc">• Telinga lebih kecil (r=17) & turun ke sisi<br>• Dahi lebih lebar & kokoh khas beruang<br>• Inner ear proporsional lembut (8x7px)</div>
    </div>

    <div class="card highlight">
      <span class="tag green">Opsi B (Angled Domes)</span>
      <div class="canvas">
        {make_variant_b()}
      </div>
      <div class="title">Tilted Organic Domes</div>
      <div class="desc">• Telinga miring 35° mengikuti lekuk kepala<br>• Bentuk kubah oval natural<br>• Sangat ramah, bersahabat, & ekspresif</div>
    </div>

    <div class="card">
      <span class="tag blue">Opsi C (Kawaii Chubby)</span>
      <div class="canvas">
        {make_variant_c()}
      </div>
      <div class="title">Chubby Tabs (Rilakkuma)</div>
      <div class="desc">• Telinga tab kompak menempel di sisi<br>• Siluet kepala beruang sangat dominan<br>• Gaya modern ilustratif Jepang</div>
    </div>

    <div class="card">
      <span class="tag blue">Opsi D (Tonal Navy)</span>
      <div class="canvas">
        {make_variant_d()}
      </div>
      <div class="title">Tonal Blue Accent</div>
      <div class="desc">• Inner ear warna navy gelap (#0052B3)<br>• 100% bebas dari efek "mata/telinga putih"<br>• Nuansa tech & institusi lebih kuat</div>
    </div>
  </div>
</body>
</html>
"""

html_path = os.path.join(OUT_DIR, "ears_comparison.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

png_path = os.path.join(OUT_DIR, "ears_comparison.png")
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", html_path, "-o", png_path, "--width", "1380", "--height", "620"]
subprocess.run(cmd, check=True)
print("Rendered:", png_path)
