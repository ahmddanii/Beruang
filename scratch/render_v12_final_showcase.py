import os
import subprocess
import shutil

OUT_DIR = "public/branding/v12_clean_rupiah_bear"
HTML_PATH = os.path.join(OUT_DIR, "showcase.html")
PNG_PATH = os.path.join(OUT_DIR, "clean-rupiah-bear-overview.png")

# Copy the AI generated images to OUT_DIR for local referencing
art_dir = r"C:\Users\VOIR\.gemini\antigravity-ide\brain\660b1c81-8c12-486d-a5ab-c79e97c7cd97"
img_flat = os.path.join(art_dir, "rupiah_bear_flat_1792029825410.jpg")
img_squircle = os.path.join(art_dir, "rupiah_bear_squircle_1792029872341.jpg")
ref_img = os.path.join(art_dir, ".tempmediaStorage", "media_1792022642521.png")

shutil.copy(img_flat, os.path.join(OUT_DIR, "art_flat.jpg"))
shutil.copy(img_squircle, os.path.join(OUT_DIR, "art_squircle.jpg"))
shutil.copy(ref_img, os.path.join(OUT_DIR, "user_ref.png"))

def read_svg(name):
    with open(os.path.join(OUT_DIR, name), "r", encoding="utf-8") as f:
        return f.read()

svg_master = read_svg("rupiah-bear-master.svg")
svg_squircle = read_svg("rupiah-bear-squircle.svg")
svg_dark_squircle = read_svg("rupiah-bear-dark-squircle.svg")
svg_lockup = read_svg("rupiah-bear-lockup.svg")

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Redesain Beruang Memeluk Uang Lembar Rupiah</title>
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

    .header {{
      max-width: 1280px;
      margin: 0 auto 32px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 24px;
    }}

    .badge-bar {{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 12px;
    }}

    .badge-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 999px;
    }}

    .badge-blue {{
      background: rgba(0, 102, 214, 0.2);
      border: 1px solid rgba(0, 102, 214, 0.5);
      color: #60A5FA;
    }}

    .badge-green {{
      background: rgba(0, 170, 19, 0.2);
      border: 1px solid rgba(0, 170, 19, 0.5);
      color: #4ADE80;
    }}

    h1 {{
      font-size: 28px;
      font-weight: 700;
      color: #F8FAFC;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }}

    .subtitle {{
      color: #94A3B8;
      font-size: 14px;
      max-width: 960px;
    }}

    .container {{
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }}

    /* Transformation Pipeline Card */
    .pipeline-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr 1.2fr;
      gap: 20px;
    }}

    .pipeline-card {{
      background: #0F1626;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }}

    .pipeline-card.highlight {{
      border: 2px solid #00AA13;
      background: linear-gradient(180deg, #13241F 0%, #0D1620 100%);
      box-shadow: 0 12px 36px -8px rgba(0, 170, 19, 0.3);
    }}

    .badge-step {{
      font-size: 10px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 6px;
      margin-bottom: 12px;
    }}

    .badge-step.old {{
      background: rgba(245, 158, 11, 0.15);
      color: #FBBF24;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }}

    .badge-step.art {{
      background: rgba(0, 102, 214, 0.2);
      color: #60A5FA;
      border: 1px solid rgba(0, 102, 214, 0.4);
    }}

    .badge-step.final {{
      background: #00AA13;
      color: #FFFFFF;
    }}

    .img-box {{
      width: 170px;
      height: 170px;
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
    }}

    .img-box img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }}

    .img-box svg {{
      width: 150px;
      height: 150px;
    }}

    .card-title {{
      font-size: 15px;
      font-weight: 600;
      color: #F8FAFC;
      margin-bottom: 4px;
    }}

    .card-desc {{
      font-size: 12px;
      color: #94A3B8;
      line-height: 1.5;
    }}

    /* Lockup & Squircle Preview */
    .showcase-grid {{
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 20px;
    }}

    .lockup-box {{
      background: #FFFFFF;
      border-radius: 16px;
      padding: 32px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }}

    .lockup-box svg {{
      max-width: 100%;
      height: auto;
    }}

    .squircle-preview-box {{
      background: #0F1626;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}

    .icon-tiles-row {{
      display: flex;
      align-items: center;
      gap: 20px;
    }}

    .tile-wrap {{
      width: 80px;
      height: 80px;
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      flex-shrink: 0;
    }}

    .tile-wrap svg {{
      width: 100%;
      height: 100%;
    }}

    /* Scalability Matrix */
    .scale-strip {{
      background: #0F1626;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
    }}

    .scale-title {{
      font-size: 15px;
      font-weight: 600;
      color: #F1F5F9;
      margin-bottom: 16px;
    }}

    .scale-row {{
      display: flex;
      align-items: center;
      gap: 36px;
    }}

    .scale-item {{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }}

    .scale-box {{
      background: #FFFFFF;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }}

    .scale-lbl {{
      font-size: 11px;
      color: #94A3B8;
    }}
  </style>
</head>
<body>

  <div class="header">
    <div class="badge-bar">
      <div class="badge-pill badge-green">✓ Sesuai Gambar Referensi Pengguna</div>
      <div class="badge-pill badge-green">✓ Memeluk Uang Lembar Rupiah (#00AA13)</div>
      <div class="badge-pill badge-blue">✓ Warna Resmi Beranda (GoPay Blue #0066D6)</div>
    </div>
    <h1>Beruang — Hasil Redesain Final Sesuai Gambar Referensi</h1>
    <p class="subtitle">
      Mengadaptasi langsung figur beruang dari gambar referensi Anda: diubah dari tekstur 3D clay oranye menjadi <strong>flat vector murni yang bersih (clean)</strong>, koin dan daun digantikan oleh <strong>selembar uang kertas Rupiah hijau berlogo "Rp" yang dipeluk kedua tangan</strong>, serta warna diselaraskan dengan palet resmi aplikasi.
    </p>
  </div>

  <div class="container">

    <!-- Transformation Pipeline -->
    <div class="pipeline-grid">
      
      <!-- Card 1: User's Reference -->
      <div class="pipeline-card">
        <span class="badge-step old">1. REFERENSI ASLI PENGGUNA</span>
        <div class="img-box">
          <img src="user_ref.png" alt="Referensi Asli" />
        </div>
        <div class="card-title">Referensi Input</div>
        <div class="card-desc">
          Clay 3D warna oranye hangat, memegang koin emas dan daun hijau, mata terpejam tenang.
        </div>
      </div>

      <!-- Card 2: AI Art Direction Reference -->
      <div class="pipeline-card">
        <span class="badge-step art">2. ART DIRECTION 2D FLAT</span>
        <div class="img-box">
          <img src="art_flat.jpg" alt="Art Direction 2D Flat" />
        </div>
        <div class="card-title">Transformasi Visual</div>
        <div class="card-desc">
          Diubah menjadi 2D flat clean: beruang biru memeluk selembar uang kertas Rupiah hijau bertuliskan "Rp".
        </div>
      </div>

      <!-- Card 3: Final Production Vector SVG -->
      <div class="pipeline-card highlight">
        <span class="badge-step final">3. PRODUCTION VECTOR SVG (FINAL)</span>
        <div class="img-box">
          {svg_master}
        </div>
        <div class="card-title">Master Vector SVG Resmi</div>
        <div class="card-desc">
          100% path vektor presisi matematis, 0 teks mentah, tajam di resolusi retina, siap deploy ke aplikasi.
        </div>
      </div>

    </div>

    <!-- Showcase: Horizontal Lockup & Squircle Icon -->
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
            Tersedia dalam versi Light (kanvas putih bersih) dan Dark (kanvas navy ice-blue elegan).
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
    f.write(html_content)

print(f"Generated {HTML_PATH}")

# Render to PNG
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", HTML_PATH, "-o", PNG_PATH, "--width", "1380", "--height", "1550"]
subprocess.run(cmd, check=True)
print(f"Rendered {PNG_PATH}")
