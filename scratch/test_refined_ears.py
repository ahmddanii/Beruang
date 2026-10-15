import os
import subprocess

OUT_DIR = "scratch/ear_tests"
os.makedirs(OUT_DIR, exist_ok=True)

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

# HEAD SHAPE THAT TRULY MATCHES A CHUBBY TEDDY BEAR:
# Wide, sturdy forehead crown (x=76 to x=180), chubby cheeks swelling at 120-130
HEAD_CHUBBY_PATH = """
  <path
    fill="#0066D6"
    d="
      M 76 74
      C 92 56 128 54 164 56
      C 180 74 192 94 192 122
      C 197 138 202 158 198 182
      C 194 206 172 216 128 216
      C 84 216 62 206 58 182
      C 54 158 59 138 64 122
      C 64 94 72 74 76 74 Z
    "
  />
"""

# -----------------------------------------------------------------------------
# DESIGN 1: ANGLED TEDDY BEAR DOMES WITH WHITE INNER CRESCENT (Refined v12)
# -----------------------------------------------------------------------------
def make_design_1():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Tilted Dome at (62, 70), rotated -35 deg -->
  <g transform="translate(62, 70) rotate(-35)">
    <path d="M -18 10 C -18 -8 18 -8 18 10 Z" fill="#0066D6" />
    <path d="M -9 8 C -9 -1 9 -1 9 8 Z" fill="#FFFFFF" />
  </g>

  <!-- Right Ear: Tilted Dome at (194, 70), rotated 35 deg -->
  <g transform="translate(194, 70) rotate(35)">
    <path d="M -18 10 C -18 -8 18 -8 18 10 Z" fill="#0066D6" />
    <path d="M -9 8 C -9 -1 9 -1 9 8 Z" fill="#FFFFFF" />
  </g>

  {HEAD_CHUBBY_PATH}
  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

# -----------------------------------------------------------------------------
# DESIGN 2: TONAL BLUE INNER EAR (#0052B3) - 100% ELIMINATES MOUSE LOOK
# -----------------------------------------------------------------------------
def make_design_2():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Tilted Dome with Tonal Dark Blue Cavity -->
  <g transform="translate(62, 70) rotate(-35)">
    <path d="M -18 10 C -18 -8 18 -8 18 10 Z" fill="#0066D6" />
    <path d="M -10 8 C -10 -2 10 -2 10 8 Z" fill="#0052B3" />
  </g>

  <!-- Right Ear: Tilted Dome with Tonal Dark Blue Cavity -->
  <g transform="translate(194, 70) rotate(35)">
    <path d="M -18 10 C -18 -8 18 -8 18 10 Z" fill="#0066D6" />
    <path d="M -10 8 C -10 -2 10 -2 10 8 Z" fill="#0052B3" />
  </g>

  {HEAD_CHUBBY_PATH}
  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

# -----------------------------------------------------------------------------
# DESIGN 3: SOFT ROUNDED BEAR CUPS (CIRCULAR DOMES, EMBEDDED WIDE)
# -----------------------------------------------------------------------------
def make_design_3():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Circle at (62, 68), smaller r=16 -->
  <circle cx="62" cy="68" r="17" fill="#0066D6" />
  <circle cx="62" cy="68" r="8" fill="#FFFFFF" />

  <!-- Right Ear: Circle at (194, 68), smaller r=16 -->
  <circle cx="194" cy="68" r="17" fill="#0066D6" />
  <circle cx="194" cy="68" r="8" fill="#FFFFFF" />

  {HEAD_CHUBBY_PATH}
  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

# -----------------------------------------------------------------------------
# DESIGN 4: SEAMLESS INTEGRATED BEAR CONTOUR (ONE PIECE VECTOR)
# -----------------------------------------------------------------------------
# Head and ears merged into a single flowing silhouette like classic teddy bear plush
def make_design_4():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Single continuous body+ears path -->
  <path
    fill="#0066D6"
    d="
      M 80 62
      C 96 52 128 50 160 52
      C 176 62 180 56 186 52
      C 198 44 208 56 202 68
      C 198 76 192 84 192 122
      C 197 138 202 158 198 182
      C 194 206 172 216 128 216
      C 84 216 62 206 58 182
      C 54 158 59 138 64 122
      C 64 84 58 76 54 68
      C 48 56 58 44 70 52
      C 76 56 80 62 80 62 Z
    "
  />
  <!-- Inner ear accents -->
  <ellipse cx="64" cy="60" rx="6" ry="8" transform="rotate(-30 64 60)" fill="#FFFFFF" />
  <ellipse cx="192" cy="60" rx="6" ry="8" transform="rotate(30 192 60)" fill="#FFFFFF" />

  {EYES_SVG}
  {MUZZLE_SVG}
  {BANKNOTE_SVG}
</svg>"""

html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Perbandingan Telinga Beruang Otentik</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    body {{
      font-family: 'Poppins', sans-serif;
      background: #080C14;
      color: #E2E8F0;
      padding: 40px;
    }}
    h1 {{
      font-size: 22px;
      margin-bottom: 6px;
      color: #FFFFFF;
    }}
    p.subtitle {{
      color: #94A3B8;
      margin-bottom: 28px;
      font-size: 13px;
    }}
    .grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }}
    .card {{
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 20px;
      text-align: center;
    }}
    .card.fav {{
      border-color: #00AA13;
      background: rgba(0, 170, 19, 0.06);
    }}
    .card.blue {{
      border-color: #0066D6;
      background: rgba(0, 102, 214, 0.06);
    }}
    .tag {{
      display: inline-block;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      margin-bottom: 12px;
    }}
    .tag.green {{ background: rgba(0, 170, 19, 0.2); color: #4ADE80; }}
    .tag.blue {{ background: rgba(0, 102, 214, 0.2); color: #60A5FA; }}
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
  <h1>Penyempurnaan Telinga Beruang Berdasarkan Gambar Referensi</h1>
  <p class="subtitle">Memperlebar dahi kepala (128px), menempatkan telinga di sudut diagonal (10:30 & 1:30), dan membentuk kubah miring alami agar 100% beruang sejati tanpa siluet tikus.</p>

  <div class="grid">
    <div class="card fav">
      <span class="tag green">Koleksi 1 (Sesuai Referensi)</span>
      <div class="canvas">
        {make_design_1()}
      </div>
      <div class="title">Tilted Domes (White)</div>
      <div class="desc">• Kubah miring 35° natural khas boneka beruang<br>• Dahi lebar & kepala chubby bulat<br>• Telinga menempel kokoh di sudut diagonal</div>
    </div>

    <div class="card blue">
      <span class="tag blue">Koleksi 2 (Tonal Shadow)</span>
      <div class="canvas">
        {make_design_2()}
      </div>
      <div class="title">Tonal Navy Depth</div>
      <div class="desc">• Lekuk dalam telinga warna navy (#0052B3)<br>• Tanpa lingkaran putih (nol potensi mirip tikus)<br>• Tampilan berkelas & sangat institusional</div>
    </div>

    <div class="card">
      <span class="tag blue">Koleksi 3 (Embedded Cups)</span>
      <div class="canvas">
        {make_design_3()}
      </div>
      <div class="title">Embedded Wide Cups</div>
      <div class="desc">• Telinga bulat kecil (r=17) jarak lebar (132px)<br>• Dahi kokoh dengan transisi lembut<br>• Tetap playful dan bersahabat</div>
    </div>

    <div class="card">
      <span class="tag blue">Koleksi 4 (Seamless Silhouette)</span>
      <div class="canvas">
        {make_design_4()}
      </div>
      <div class="title">Sculpted Single-Path</div>
      <div class="desc">• Telinga menyatu dalam satu kurva kepala<br>• Karakter maskot modern minimalis<br>• Sangat bersih dan rapi</div>
    </div>
  </div>
</body>
</html>
"""

html_path = os.path.join(OUT_DIR, "refined_ears.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

png_path = os.path.join(OUT_DIR, "refined_ears.png")
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", html_path, "-o", png_path, "--width", "1380", "--height", "620"]
subprocess.run(cmd, check=True)
print("Rendered:", png_path)
