import os
import subprocess

OUT_DIR = "scratch/ear_tests"
os.makedirs(OUT_DIR, exist_ok=True)

# -----------------------------------------------------------------------------
# PERFECT WIDE CHUBBY BEAR ANATOMY (1.6:1 Width-to-Height Ratio)
# -----------------------------------------------------------------------------

# Head & Body Path:
# Head width = 184 (x=36..220), Height = 115 (y=54..169)
# Broad forehead: top crown spans gently from (72, 64) across (128, 54) to (184, 64)
# Cheeks swell to x=36 and x=220 at y=115
# Paws hold Banknote at center bottom
CHUBBY_BODY = """
  <!-- Broad Chubby Bear Body & Head -->
  <path
    fill="#0066D6"
    d="
      M 72 64
      C 90 54 128 52 166 54
      C 184 64 212 86 218 116
      C 224 146 216 172 202 192
      C 188 212 166 218 128 218
      C 90 218 68 212 54 192
      C 40 172 32 146 38 116
      C 44 86 54 64 72 64 Z
    "
  />
"""

# Eyes scaled and optical center adjusted for wide cute face
EYES = """
  <!-- Peaceful Serene Curved Closed Eyes (Matching user reference) -->
  <path
    fill="#FFFFFF"
    d="
      M 88 114
      C 98 102 114 102 122 114
      C 114 106 98 106 88 114 Z
    "
  />
  <path
    fill="#FFFFFF"
    d="
      M 134 114
      C 142 102 158 102 168 114
      C 158 106 142 106 134 114 Z
    "
  />
"""

MUZZLE = """
  <!-- White Snout / Muzzle -->
  <ellipse cx="128" cy="136" rx="22" ry="17" fill="#FFFFFF" />

  <!-- Blue Rounded Bear Nose -->
  <path
    fill="#0066D6"
    d="
      M 121 131
      C 121 126 124 124 128 124
      C 132 124 135 126 135 131
      C 135 136 132 140 128 140
      C 124 140 121 136 121 131 Z
    "
  />
"""

BANKNOTE = """
  <!-- Indonesian Rupiah Banknote (Tilted -8deg held snugly by paws) -->
  <g transform="translate(128, 174) rotate(-8) translate(-128, -174)">
    <rect x="72" y="150" width="112" height="54" rx="8" fill="#FFFFFF" />
    <rect x="74" y="152" width="108" height="50" rx="6" fill="#00AA13" />
    <rect x="78" y="156" width="100" height="42" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="128" cy="177" r="14" fill="#FFFFFF" />
    <!-- 'R' -->
    <path fill="#00AA13" d="M 122 171 L 126 171 C 128.5 171 129.5 172.2 129.5 174 C 129.5 175.8 128.5 177 126 177 L 124 177 L 124 181 L 122 181 Z M 124 173 L 124 175.5 L 125.8 175.5 C 126.8 175.5 127.5 175 127.5 174 C 127.5 173 126.8 173 125.8 173 Z" />
    <path fill="#00AA13" d="M 125.5 176.5 L 128.5 181 L 126.2 181 L 124 177 Z" />
    <!-- 'p' -->
    <path fill="#00AA13" d="M 130.5 173.5 L 132.3 173.5 L 132.3 174.8 C 133 173.8 134 173.3 135.2 173.3 C 137 173.3 138.2 174.8 138.2 176.8 C 138.2 178.8 137 180.3 135.2 180.3 C 134 180.3 133 179.8 132.3 178.8 L 132.3 183 L 130.5 183 Z M 132.3 176.8 C 132.3 178 133.2 178.8 134.4 178.8 C 135.6 178.8 136.4 178 136.4 176.8 C 136.4 175.6 135.6 174.8 134.4 174.8 C 133.2 174.8 132.3 175.6 132.3 176.8 Z" />
  </g>

  <!-- Left Bear Paw Hugging Banknote -->
  <path
    d="
      M 68 152
      C 60 162 62 180 78 190
      C 90 198 102 194 108 182
      C 102 180 96 176 92 170
      C 82 166 76 160 68 152 Z
    "
    fill="#0066D6"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linejoin="round"
  />

  <!-- Right Bear Paw Hugging Banknote -->
  <path
    d="
      M 188 152
      C 196 162 194 180 178 190
      C 166 198 154 194 148 182
      C 154 180 160 176 164 170
      C 174 166 180 160 188 152 Z
    "
    fill="#0066D6"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linejoin="round"
  />
"""

# -----------------------------------------------------------------------------
# OPTION A: AUTHENTIC TEDDY BEAR DOME (White Inner Crescent)
# Ears at (60, 62) and (196, 62) - spacing 136px
# -----------------------------------------------------------------------------
def opt_a():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Low-profile submerged dome -->
  <circle cx="60" cy="62" r="21" fill="#0066D6" />
  <circle cx="60" cy="60" r="9" fill="#FFFFFF" />

  <!-- Right Ear: Low-profile submerged dome -->
  <circle cx="196" cy="62" r="21" fill="#0066D6" />
  <circle cx="196" cy="60" r="9" fill="#FFFFFF" />

  {CHUBBY_BODY}
  {EYES}
  {MUZZLE}
  {BANKNOTE}
</svg>"""

# -----------------------------------------------------------------------------
# OPTION B: DIAGONAL OVAL DOME (Tilted 38 deg matching reference exactly)
# -----------------------------------------------------------------------------
def opt_b():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Tilted Oval with soft white inner crescent -->
  <g transform="translate(60, 62) rotate(-38)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-3" rx="9" ry="6" fill="#FFFFFF" />
  </g>

  <!-- Right Ear: Tilted Oval with soft white inner crescent -->
  <g transform="translate(196, 62) rotate(38)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-3" rx="9" ry="6" fill="#FFFFFF" />
  </g>

  {CHUBBY_BODY}
  {EYES}
  {MUZZLE}
  {BANKNOTE}
</svg>"""

# -----------------------------------------------------------------------------
# OPTION C: TONAL NAVY SHADOW INNER EAR (#0052B3) - 100% PURE BEAR IDENTITY
# -----------------------------------------------------------------------------
def opt_c():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Tonal Navy Inner Ear -->
  <g transform="translate(60, 62) rotate(-38)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-2" rx="10" ry="7" fill="#0052B3" />
  </g>

  <!-- Right Ear: Tonal Navy Inner Ear -->
  <g transform="translate(196, 62) rotate(38)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-2" rx="10" ry="7" fill="#0052B3" />
  </g>

  {CHUBBY_BODY}
  {EYES}
  {MUZZLE}
  {BANKNOTE}
</svg>"""

# -----------------------------------------------------------------------------
# OPTION D: COMPACT CHUBBY STUBBY EARS (We Bare Bears / Rilakkuma style)
# -----------------------------------------------------------------------------
def opt_d():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Compact stubby semi-circle -->
  <circle cx="64" cy="66" r="18" fill="#0066D6" />
  <circle cx="64" cy="64" r="8" fill="#FFFFFF" />

  <!-- Right Ear: Compact stubby semi-circle -->
  <circle cx="192" cy="66" r="18" fill="#0066D6" />
  <circle cx="192" cy="64" r="8" fill="#FFFFFF" />

  {CHUBBY_BODY}
  {EYES}
  {MUZZLE}
  {BANKNOTE}
</svg>"""

html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tes Proporsi Beruang Chubby Sesuai Referensi</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    body {{
      font-family: 'Poppins', sans-serif;
      background: #080C14;
      color: #E2E8F0;
      padding: 40px;
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
  <h1 style="font-size: 22px; color: #FFF; margin-bottom: 6px;">Redesain Anatomi Beruang Chubby (Proporsi Referensi 1.6:1)</h1>
  <p style="font-size: 13px; color: #94A3B8; margin-bottom: 24px;">Kepala melebar chubby (184px), dahi luas (jarak telinga 136px), telinga menempel di pundak diagonal kepala.</p>

  <div class="grid">
    <div class="card fav">
      <span class="tag green">Opsi A (Classic Teddy Dome)</span>
      <div class="canvas">{opt_a()}</div>
      <div class="title">Teddy Semicircle</div>
      <div class="desc">• Kubah setengah terbenam di sudut diagonal<br>• Dahi sangat lebar & pipi chubby mengembang<br>• 100% beruang asli, nol siluet tikus</div>
    </div>

    <div class="card fav">
      <span class="tag green">Opsi B (Tilted Oval 38°)</span>
      <div class="canvas">{opt_b()}</div>
      <div class="title">Tilted Dome (Persis Referensi)</div>
      <div class="desc">• Miring 38° mengikuti kurva sudut kepala<br>• Inner ear elips halus terangkat<br>• Karakter sangat hidup & bersahabat</div>
    </div>

    <div class="card blue">
      <span class="tag blue">Opsi C (Tonal Navy Depth)</span>
      <div class="canvas">{opt_c()}</div>
      <div class="title">Tonal Blue Inner Ear</div>
      <div class="desc">• Lekuk dalam navy gelap (#0052B3)<br>• Kontras elegan, tanpa lingkaran putih<br>• Nuansa fintech institusional kuat</div>
    </div>

    <div class="card">
      <span class="tag blue">Opsi D (Compact Stubby)</span>
      <div class="canvas">{opt_d()}</div>
      <div class="title">Kawaii Stubby Domes</div>
      <div class="desc">• Telinga mungil pendek (r=18) di bahu dahi<br>• Siluet wajah ekstra bulat & menggemaskan<br>• Gaya Rilakkuma modern</div>
    </div>
  </div>
</body>
</html>
"""

html_path = os.path.join(OUT_DIR, "chubby_ears.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

png_path = os.path.join(OUT_DIR, "chubby_ears.png")
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", html_path, "-o", png_path, "--width", "1380", "--height", "620"]
subprocess.run(cmd, check=True)
print("Rendered:", png_path)
