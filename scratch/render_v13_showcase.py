import os
import subprocess
import shutil

OUT_DIR = "public/branding/v13_authentic_bear"
HTML_PATH = os.path.join(OUT_DIR, "showcase.html")
PNG_PATH = os.path.join(OUT_DIR, "v13-authentic-bear-overview.png")
ARTIFACT_DIR = r"C:\Users\VOIR\.gemini\antigravity-ide\brain\660b1c81-8c12-486d-a5ab-c79e97c7cd97"

# Copy user ref image into OUT_DIR
user_ref_src = os.path.join(ARTIFACT_DIR, ".user_uploaded", "media_1792028342267.png")
shutil.copy(user_ref_src, os.path.join(OUT_DIR, "user_ref.png"))

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

svg_master = read_file(os.path.join(OUT_DIR, "rupiah-bear-master.svg"))
svg_squircle = read_file(os.path.join(OUT_DIR, "rupiah-bear-squircle.svg"))
svg_dark_squircle = read_file(os.path.join(OUT_DIR, "rupiah-bear-dark-squircle.svg"))
svg_lockup = read_file(os.path.join(OUT_DIR, "rupiah-bear-lockup.svg"))

# Old V12 SVG for direct before/after comparison
svg_old_v12 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="220" height="220">
  <circle cx="86" cy="62" r="22" fill="#0066D6" />
  <circle cx="86" cy="62" r="11" fill="#FFFFFF" />
  <circle cx="170" cy="62" r="22" fill="#0066D6" />
  <circle cx="170" cy="62" r="11" fill="#FFFFFF" />
  <path fill="#0066D6" d="M 98 68 C 108 62 118 60 128 60 C 138 60 148 62 158 68 C 176 78 186 98 186 122 C 192 138 200 158 196 182 C 192 206 172 216 128 216 C 84 216 64 206 60 182 C 56 158 64 138 70 122 C 70 98 80 78 98 68 Z" />
  <path fill="#FFFFFF" d="M 96 118 C 102 110 112 110 118 118 C 112 113 102 113 96 118 Z" />
  <path fill="#FFFFFF" d="M 138 118 C 144 110 154 110 160 118 C 154 113 144 113 138 118 Z" />
  <ellipse cx="128" cy="142" rx="22" ry="18" fill="#FFFFFF" />
  <path fill="#0066D6" d="M 120 137 C 120 131 123.5 129 128 129 C 132.5 129 136 131 136 137 C 136 143 132.5 147 128 147 C 123.5 147 120 143 120 137 Z" />
  <g transform="translate(128, 178) rotate(-10) translate(-128, -178)">
    <rect x="74" y="154" width="108" height="52" rx="8" fill="#FFFFFF" />
    <rect x="76" y="156" width="104" height="48" rx="6" fill="#00AA13" />
    <rect x="80" y="160" width="96" height="40" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="128" cy="180" r="14" fill="#FFFFFF" />
    <path fill="#00AA13" d="M 122 174 L 126 174 C 128.5 174 129.5 175.2 129.5 177 C 129.5 178.8 128.5 180 126 180 L 124 180 L 124 184 L 122 184 Z M 124 176 L 124 178.5 L 125.8 178.5 C 126.8 178.5 127.5 178 127.5 177 C 127.5 176 126.8 176 125.8 176 Z" />
    <path fill="#00AA13" d="M 125.5 179.5 L 128.5 184 L 126.2 184 L 124 180 Z" />
    <path fill="#00AA13" d="M 130.5 176.5 L 132.3 176.5 L 132.3 177.8 C 133 176.8 134 176.3 135.2 176.3 C 137 176.3 138.2 177.8 138.2 179.8 C 138.2 181.8 137 183.3 135.2 183.3 C 134 183.3 133 182.8 132.3 181.8 L 132.3 186 L 130.5 186 Z M 132.3 179.8 C 132.3 181 133.2 181.8 134.4 181.8 C 135.6 181.8 136.4 181 136.4 179.8 C 136.4 178.6 135.6 177.8 134.4 177.8 C 133.2 177.8 132.3 178.6 132.3 179.8 Z" />
  </g>
  <path d="M 74 156 C 66 166 68 182 82 192 C 94 200 106 196 112 184 C 106 182 100 178 96 172 C 86 168 80 162 74 156 Z" fill="#0066D6" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round" />
  <path d="M 182 156 C 190 166 188 182 174 192 C 162 200 150 196 144 184 C 150 182 156 178 160 172 C 170 168 176 162 182 156 Z" fill="#0066D6" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round" />
</svg>"""

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Penyempurnaan Telinga Beruang Otentik</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    
    body {{
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #080C14;
      color: #E2E8F0;
      padding: 40px 32px;
      line-height: 1.5;
    }}

    .container {{
      max-width: 1280px;
      margin: 0 auto;
    }}

    .header {{
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }}

    .badge-bar {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 12px;
    }}

    .badge {{
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    .badge.green {{ background: rgba(0, 170, 19, 0.15); color: #4ADE80; border: 1px solid rgba(0, 170, 19, 0.3); }}
    .badge.blue {{ background: rgba(0, 102, 214, 0.15); color: #60A5FA; border: 1px solid rgba(0, 102, 214, 0.3); }}
    .badge.purple {{ background: rgba(168, 85, 247, 0.15); color: #C084FC; border: 1px solid rgba(168, 85, 247, 0.3); }}

    h1 {{
      font-size: 26px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }}

    .subtitle {{
      color: #94A3B8;
      font-size: 14px;
      max-width: 860px;
    }}

    /* COMPARISON SECTION */
    .compare-grid {{
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }}

    .ref-card {{
      background: #0F172A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }}

    .ref-img-wrap {{
      width: 200px;
      height: 200px;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      margin-bottom: 16px;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }}

    .ref-img-wrap img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }}

    .master-hero-card {{
      background: linear-gradient(135deg, rgba(0, 102, 214, 0.12) 0%, rgba(0, 170, 19, 0.06) 100%);
      border: 1px solid rgba(0, 102, 214, 0.3);
      border-radius: 20px;
      padding: 24px;
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 28px;
      align-items: center;
    }}

    .master-canvas {{
      background: #FFFFFF;
      border-radius: 24px;
      padding: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
    }}

    .hero-info h2 {{
      font-size: 20px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 8px;
    }}

    .pill-status {{
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      background: #00AA13;
      color: #FFFFFF;
      margin-bottom: 14px;
    }}

    .fixes-list {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }}

    .fixes-list li {{
      font-size: 13px;
      color: #CBD5E1;
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }}

    .fixes-list .check {{
      color: #00AA13;
      font-weight: 700;
      font-size: 14px;
    }}

    /* BEFORE vs AFTER STRIP */
    .diff-section {{
      background: #0F172A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 32px;
    }}

    .diff-title {{
      font-size: 16px;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 20px;
    }}

    .diff-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }}

    .diff-card {{
      background: #111827;
      border-radius: 16px;
      padding: 20px;
      display: flex;
      gap: 20px;
      align-items: center;
    }}

    .diff-card.before {{
      border: 1px solid rgba(239, 68, 68, 0.3);
      background: rgba(239, 68, 68, 0.04);
    }}

    .diff-card.after {{
      border: 1px solid rgba(0, 170, 19, 0.4);
      background: rgba(0, 170, 19, 0.04);
    }}

    .diff-canvas {{
      background: #FFFFFF;
      border-radius: 16px;
      padding: 10px;
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }}

    .diff-canvas svg {{
      width: 120px;
      height: 120px;
    }}

    .diff-details h3 {{
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 6px;
    }}

    .diff-details p {{
      font-size: 12px;
      color: #94A3B8;
      line-height: 1.5;
    }}

    /* LOCKUP & APP ICONS */
    .showcase-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }}

    .lockup-box {{
      background: #FFFFFF;
      border-radius: 20px;
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }}

    .squircle-preview-box {{
      background: #0F172A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }}

    .icon-tiles-row {{
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 14px;
    }}

    .tile-wrap {{
      width: 96px;
      height: 96px;
    }}

    .tile-wrap svg {{
      width: 100%;
      height: 100%;
    }}

    /* SCALABILITY STRIP */
    .scale-strip {{
      background: #0F172A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 24px;
    }}

    .scale-title {{
      font-size: 14px;
      font-weight: 600;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }}

    .scale-row {{
      display: flex;
      align-items: center;
      gap: 40px;
    }}

    .scale-item {{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }}

    .scale-box {{
      background: #FFFFFF;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }}

    .scale-lbl {{
      font-size: 11px;
      color: #64748B;
      font-weight: 500;
    }}
  </style>
</head>
<body>

  <div class="container">

    <!-- Header -->
    <div class="header">
      <div class="badge-bar">
        <span class="badge green">Penyempurnaan V13 Selesai</span>
        <span class="badge blue">Bebas Efek Tikus (100% Beruang)</span>
        <span class="badge purple">Palet Finansial Bersih #0066D6 & #00AA13</span>
      </div>
      <h1>Beruang — Redesain Telinga & Proporsi Beruang Otentik</h1>
      <p class="subtitle">
        Menghilangkan efek telinga tikus dengan melebarkan dahi (136px antar telinga), membentuk kubah telinga miring 38° yang setengah terbenam di pundak dahi, dan mempertahankan pose memeluk uang Rupiah hijau yang rapi & ramah.
      </p>
    </div>

    <!-- Master Compare -->
    <div class="compare-grid">
      
      <div class="ref-card">
        <div class="ref-img-wrap">
          <img src="user_ref.png" alt="Gambar Referensi Pengguna">
        </div>
        <div style="font-size: 13px; font-weight: 600; color: #FFFFFF; margin-bottom: 4px;">Referensi Pilihan Anda</div>
        <div style="font-size: 11px; color: #94A3B8;">Karakter beruang chubby dengan dahi luas, mata tertidur damai, dan telinga menempel di sudut diagonal.</div>
      </div>

      <div class="master-hero-card">
        <div class="master-canvas">
          {svg_master}
        </div>
        <div class="hero-info">
          <span class="pill-status">Desain Master Final (Aktif di Web)</span>
          <h2>V13: Authentic Chubby Rupiah Bear</h2>
          <ul class="fixes-list">
            <li>
              <span class="check">✓</span>
              <span><strong>Telinga Beruang Asli:</strong> Kubah miring 38° di sudut diagonal (10:30 & 1:30), setengah terbenam di otot dahi (hanya timbul 18px).</span>
            </li>
            <li>
              <span class="check">✓</span>
              <span><strong>Dahi Lebar & Kokoh:</strong> Jarak antar telinga diperluas dari 84px menjadi 136px (bebas dari siluet tikus berwajah sempit).</span>
            </li>
            <li>
              <span class="check">✓</span>
              <span><strong>Pipi Chubby Mengembang:</strong> Lebar kepala 184px memberikan kesan hangat, bersahabat, dan dapat dipercaya bagi pelaku UMKM.</span>
            </li>
            <li>
              <span class="check">✓</span>
              <span><strong>Uang Kertas Rupiah Bersih:</strong> Tetap memegang uang lembaran hijau (#00AA13) berlogo "Rp" dengan pelukan kedua tangan beruang.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <!-- Before vs After -->
    <div class="diff-section">
      <div class="diff-title">Perbandingan Langsung: Sebelum (V12) vs Sesudah (V13)</div>
      <div class="diff-grid">
        
        <div class="diff-card before">
          <div class="diff-canvas">
            {svg_old_v12}
          </div>
          <div class="diff-details">
            <h3 style="color: #F87171;">Sebelumnya (V12 - Efek Tikus)</h3>
            <p>
              • Telinga berdiri tegak terlalu tinggi di ubun-ubun kepala.<br>
              • Jarak telinga terlalu sempit (hanya 84px), dahi mengerucut.<br>
              • Lingkaran putih di dalam telinga terlalu kontras seperti Mickey Mouse.
            </p>
          </div>
        </div>

        <div class="diff-card after">
          <div class="diff-canvas">
            {svg_master}
          </div>
          <div class="diff-details">
            <h3 style="color: #4ADE80;">Sesudah (V13 - 100% Beruang Otentik)</h3>
            <p>
              • Telinga berupa kubah miring 38° yang duduk natural di sudut bahu dahi.<br>
              • Dahi diperlebar menjadi 136px dengan pipi chubby yang mengembang manis.<br>
              • Inner ear lembut mengikuti lekukan kubah telinga boneka beruang.
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- Lockup & App Icons -->
    <div class="showcase-grid">
      <div class="lockup-box">
        {svg_lockup}
      </div>
      <div class="squircle-preview-box">
        <div style="font-size: 14px; font-weight: 600; color: #F1F5F9;">Format Ikon Aplikasi Seluler (App Icon Squircle)</div>
        <div class="icon-tiles-row">
          <div class="tile-wrap">
            {svg_squircle}
          </div>
          <div class="tile-wrap">
            {svg_dark_squircle}
          </div>
          <div style="font-size: 12px; color: #94A3B8; line-height: 1.4;">
            Ikon aplikasi seluler siap rilis (Light kanvas putih & Dark kanvas navy ice-blue).
          </div>
        </div>
      </div>
    </div>

    <!-- Scalability Strip -->
    <div class="scale-strip">
      <div class="scale-title">Uji Keterbacaan Vektor di Berbagai Ukuran Layar</div>
      <div class="scale-row">

        <div class="scale-item">
          <div class="scale-box" style="width: 80px; height: 80px; padding: 6px;">
            <div style="width: 64px; height: 64px; transform: scale(0.25); transform-origin: top left;">
              {svg_master}
            </div>
          </div>
          <div class="scale-lbl">64px (Mobile App Icon)</div>
        </div>

        <div class="scale-item">
          <div class="scale-box" style="width: 48px; height: 48px; padding: 8px;">
            <div style="width: 32px; height: 32px; transform: scale(0.125); transform-origin: top left;">
              {svg_master}
            </div>
          </div>
          <div class="scale-lbl">32px (Navbar Brand)</div>
        </div>

        <div class="scale-item">
          <div class="scale-box" style="width: 32px; height: 32px; padding: 8px;">
            <div style="width: 16px; height: 16px; transform: scale(0.0625); transform-origin: top left;">
              {svg_master}
            </div>
          </div>
          <div class="scale-lbl">16px (Favicon Browser)</div>
        </div>

      </div>
    </div>

  </div>

</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Generated {HTML_PATH}")

# Render to PNG
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", HTML_PATH, "-o", PNG_PATH, "--width", "1380", "--height", "1550"]
subprocess.run(cmd, check=True)
print(f"Rendered {PNG_PATH}")

# Also copy PNG to ARTIFACT_DIR for direct user viewing
shutil.copy(PNG_PATH, os.path.join(ARTIFACT_DIR, "v13-authentic-bear-overview.png"))
print("Copied overview to artifact directory")
