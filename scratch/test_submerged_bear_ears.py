import os
import subprocess

OUT_DIR = "scratch/ear_tests"
os.makedirs(OUT_DIR, exist_ok=True)

# Common elements
EYES = """
  <!-- Peaceful Serene Closed Eyes (Refined matching reference image) -->
  <path
    fill="#FFFFFF"
    d="
      M 94 122
      C 102 112 114 112 122 122
      C 114 115 102 115 94 122 Z
    "
  />
  <path
    fill="#FFFFFF"
    d="
      M 134 122
      C 142 112 154 112 162 122
      C 154 115 142 115 134 122 Z
    "
  />
"""

MUZZLE = """
  <!-- White Snout / Muzzle -->
  <ellipse cx="128" cy="144" rx="22" ry="18" fill="#FFFFFF" />

  <!-- Blue Rounded Bear Nose -->
  <path
    fill="#0066D6"
    d="
      M 120 139
      C 120 133 123.5 131 128 131
      C 132.5 131 136 133 136 139
      C 136 145 132.5 149 128 149
      C 123.5 149 120 145 120 139 Z
    "
  />
"""

BANKNOTE = """
  <!-- Indonesian Rupiah Banknote (Tilted -10deg held by paws) -->
  <g transform="translate(128, 180) rotate(-10) translate(-128, -180)">
    <rect x="74" y="156" width="108" height="52" rx="8" fill="#FFFFFF" />
    <rect x="76" y="158" width="104" height="48" rx="6" fill="#00AA13" />
    <rect x="80" y="162" width="96" height="40" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="128" cy="182" r="14" fill="#FFFFFF" />
    <!-- 'R' -->
    <path fill="#00AA13" d="M 122 176 L 126 176 C 128.5 176 129.5 177.2 129.5 179 C 129.5 180.8 128.5 182 126 182 L 124 182 L 124 186 L 122 186 Z M 124 178 L 124 180.5 L 125.8 180.5 C 126.8 180.5 127.5 180 127.5 179 C 127.5 178 126.8 178 125.8 178 Z" />
    <path fill="#00AA13" d="M 125.5 181.5 L 128.5 186 L 126.2 186 L 124 182 Z" />
    <!-- 'p' -->
    <path fill="#00AA13" d="M 130.5 178.5 L 132.3 178.5 L 132.3 179.8 C 133 178.8 134 178.3 135.2 178.3 C 137 178.3 138.2 179.8 138.2 181.8 C 138.2 183.8 137 185.3 135.2 185.3 C 134 185.3 133 184.8 132.3 183.8 L 132.3 188 L 130.5 188 Z M 132.3 181.8 C 132.3 183 133.2 183.8 134.4 183.8 C 135.6 183.8 136.4 183 136.4 181.8 C 136.4 180.6 135.6 179.8 134.4 179.8 C 133.2 179.8 132.3 180.6 132.3 181.8 Z" />
  </g>

  <!-- Left Bear Paw Hugging Banknote -->
  <path
    d="
      M 74 158
      C 66 168 68 184 82 194
      C 94 202 106 198 112 186
      C 106 184 100 180 96 174
      C 86 170 80 164 74 158 Z
    "
    fill="#0066D6"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linejoin="round"
  />

  <!-- Right Bear Paw Hugging Banknote -->
  <path
    d="
      M 182 158
      C 190 168 188 184 174 194
      C 162 202 150 198 144 186
      C 150 184 156 180 160 174
      C 170 170 176 164 182 158 Z
    "
    fill="#0066D6"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linejoin="round"
  />
"""

# BROAD CHUBBY BEAR HEAD (Directly matching reference image proportions):
# Top crown spans from x=78 to x=178 at y=54, chubby cheeks swell at x=48..208
BODY_HEAD_PATH = """
  <path
    fill="#0066D6"
    d="
      M 74 64
      C 90 52 128 50 166 52
      C 182 64 200 84 202 120
      C 205 142 204 162 198 184
      C 192 208 172 216 128 216
      C 84 216 64 208 58 184
      C 52 162 51 142 54 120
      C 56 84 66 64 74 64 Z
    "
  />
"""

# -----------------------------------------------------------------------------
# OPTION 1: SUBMERGED ROUND DOMES WITH WHITE INNER CRESCENT (Teddy Bear Standard)
# Ear centers at (64, 62) and (192, 62), radius 22.
# Exposed part is a gentle dome rising only 12px above the head corner.
# -----------------------------------------------------------------------------
def opt1():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear (Submerged dome) -->
  <circle cx="66" cy="62" r="22" fill="#0066D6" />
  <circle cx="66" cy="60" r="10" fill="#FFFFFF" />

  <!-- Right Ear (Submerged dome) -->
  <circle cx="190" cy="62" r="22" fill="#0066D6" />
  <circle cx="190" cy="60" r="10" fill="#FFFFFF" />

  {BODY_HEAD_PATH}
  {EYES}
  {MUZZLE}
  {BANKNOTE}
</svg>"""

# -----------------------------------------------------------------------------
# OPTION 2: DIAGONAL OVAL DOME (Matches reference image ear tilt ~40 deg)
# -----------------------------------------------------------------------------
def opt2():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Tilted Oval -->
  <g transform="translate(64, 62) rotate(-40)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-2" rx="10" ry="7" fill="#FFFFFF" />
  </g>

  <!-- Right Ear: Tilted Oval -->
  <g transform="translate(192, 62) rotate(40)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-2" rx="10" ry="7" fill="#FFFFFF" />
  </g>

  {BODY_HEAD_PATH}
  {EYES}
  {MUZZLE}
  {BANKNOTE}
</svg>"""

# -----------------------------------------------------------------------------
# OPTION 3: TONAL NAVY INNER EAR (#0052B3) - NO WHITE BULLSEYE AT ALL
# -----------------------------------------------------------------------------
def opt3():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Tilted Oval with Tonal Shadow -->
  <g transform="translate(64, 62) rotate(-40)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-2" rx="11" ry="8" fill="#0052B3" />
  </g>

  <!-- Right Ear: Tilted Oval with Tonal Shadow -->
  <g transform="translate(192, 62) rotate(40)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-2" rx="11" ry="8" fill="#0052B3" />
  </g>

  {BODY_HEAD_PATH}
  {EYES}
  {MUZZLE}
  {BANKNOTE}
</svg>"""

# -----------------------------------------------------------------------------
# OPTION 4: COMPACT CHUBBY DOME (KAWAII PROPORTION - RILAKKUMA / WE BARE BEARS)
# Ears are smaller (r=18), low profile, very cozy.
# -----------------------------------------------------------------------------
def opt4():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <!-- Left Ear: Compact Submerged Dome -->
  <circle cx="70" cy="64" r="18" fill="#0066D6" />
  <circle cx="70" cy="62" r="8" fill="#FFFFFF" />

  <!-- Right Ear: Compact Submerged Dome -->
  <circle cx="186" cy="64" r="18" fill="#0066D6" />
  <circle cx="186" cy="62" r="8" fill="#FFFFFF" />

  {BODY_HEAD_PATH}
  {EYES}
  {MUZZLE}
  {BANKNOTE}
</svg>"""

html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tes Telinga Beruang Submerged</title>
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
  <h1 style="font-size: 22px; color: #FFF; margin-bottom: 6px;">Uji Geometri Telinga Beruang (Submerged Domes)</h1>
  <p style="font-size: 13px; color: #94A3B8; margin-bottom: 24px;">Telinga setengah terbenam dalam struktur kepala chubby (jarak antar telinga 126px, dahi luas). Hanya puncak kubah yang muncul sehingga 100% beruang asli tanpa efek tikus.</p>

  <div class="grid">
    <div class="card fav">
      <span class="tag green">Opsi 1 (Teddy Bear Semicircle)</span>
      <div class="canvas">{opt1()}</div>
      <div class="title">Submerged Classic</div>
      <div class="desc">• Kubah setengah terbenam di sudut luar<br>• Dahi lebar 126px persis gambar referensi<br>• Inner ear putih lembut</div>
    </div>

    <div class="card blue">
      <span class="tag blue">Opsi 2 (Tilted Oval 40°)</span>
      <div class="canvas">{opt2()}</div>
      <div class="title">Tilted Organic Oval</div>
      <div class="desc">• Sudut miring 40° keluar mengikuti lekuk dahi<br>• Bentuk elips organik natural<br>• Sangat ramah & ekspresif</div>
    </div>

    <div class="card blue">
      <span class="tag blue">Opsi 3 (Tonal Navy Depth)</span>
      <div class="canvas">{opt3()}</div>
      <div class="title">Tonal Blue Accent</div>
      <div class="desc">• Lekukan dalam warna navy (#0052B3)<br>• Tanpa warna putih di telinga (anti-tikus)<br>• Lebih tech & elegan</div>
    </div>

    <div class="card">
      <span class="tag blue">Opsi 4 (Kawaii Compact)</span>
      <div class="canvas">{opt4()}</div>
      <div class="title">Kawaii Snug Domes</div>
      <div class="desc">• Telinga kompak (r=18) sangat imut<br>• Kepala beruang terlihat ekstra chubby<br>• Gaya We Bare Bears / Rilakkuma</div>
    </div>
  </div>
</body>
</html>
"""

html_path = os.path.join(OUT_DIR, "submerged_ears.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

png_path = os.path.join(OUT_DIR, "submerged_ears.png")
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", html_path, "-o", png_path, "--width", "1380", "--height", "620"]
subprocess.run(cmd, check=True)
print("Rendered:", png_path)
