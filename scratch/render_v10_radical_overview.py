import os
import subprocess

HTML_PATH = "public/branding/v10_radical_redesign/overview.html"
PNG_PATH = "public/branding/v10_radical_redesign/radical-overview.png"

def read_svg(name):
    with open(os.path.join("public/branding/v10_radical_redesign", name), "r", encoding="utf-8") as f:
        return f.read()

ca = read_svg("concept-a-market-profile.svg")
cb = read_svg("concept-b-cashflow-loop.svg")
cc = read_svg("concept-c-b-monogram.svg")
cd = read_svg("concept-d-isometric-facet.svg")

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Radically Fresh Redesign (4 Arketipe Baru)</title>
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

    /* 4 Radically Different Concepts Grid */
    .grid-concepts {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }}

    .card {{
      background: #0F1626;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }}

    .card.highlight {{
      border: 2px solid #0066D6;
      background: linear-gradient(180deg, #131E33 0%, #0D1524 100%);
      box-shadow: 0 12px 36px -8px rgba(0, 102, 214, 0.35);
    }}

    .badge-card {{
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
    }}

    .badge-card.primary {{
      background: #0066D6;
      color: #FFFFFF;
    }}

    .badge-card.sec {{
      background: rgba(148, 163, 184, 0.15);
      color: #94A3B8;
    }}

    .preview-box {{
      width: 100%;
      height: 190px;
      background: #FFFFFF;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      padding: 16px;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
    }}

    .preview-box svg {{
      width: 140px;
      height: 140px;
    }}

    .card-title {{
      font-size: 15px;
      font-weight: 600;
      color: #F8FAFC;
      margin-bottom: 4px;
      text-align: center;
    }}

    .card-meta {{
      font-size: 11px;
      color: #38BDF8;
      font-weight: 500;
      margin-bottom: 8px;
      text-align: center;
    }}

    .card-desc {{
      font-size: 12px;
      color: #94A3B8;
      text-align: center;
      line-height: 1.5;
    }}

    /* Scalability Strip (Dark & Light Micro-Scale Test) */
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

    .scale-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }}

    .scale-item {{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 16px;
    }}

    .display-row {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .app-icon-wrap {{
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }}

    .app-icon-wrap.dark {{
      background: #080C14;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }}

    .app-icon-wrap svg {{
      width: 100%;
      height: 100%;
    }}

    .favicon-wrap {{
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }}

    .favicon-wrap svg {{
      width: 18px;
      height: 18px;
    }}

    .scale-lbl {{
      font-size: 11px;
      color: #94A3B8;
      text-align: center;
    }}
  </style>
</head>
<body>

  <div class="header">
    <div class="badge-bar">
      <div class="badge-pill badge-blue">✓ Redesign Total: 4 Arketipe Visual Baru</div>
      <div class="badge-pill badge-green">✓ Modern Minimalis Tech (0 Ornamen Kartun)</div>
      <div class="badge-pill badge-blue">✓ Warna Selaras Beranda (#0066D6 & #00AA13)</div>
    </div>
    <h1>Beruang — 4 Arah Redesain Konsep Baru (Beda Total dari Sebelumnya)</h1>
    <p class="subtitle">
      Keluar dari lingkaran modifikasi topeng frontal yang monoton. Kami mengeksplorasi 4 arketipe desain identitas yang benar-benar berbeda secara struktur, sudut pandang, dan metafora visual: dari profil pasar beruang, pita arus kas kontinu, monogram letterform B, hingga faset teknologi isometrik.
    </p>
  </div>

  <div class="container">

    <div class="grid-concepts">

      <!-- CA -->
      <div class="card highlight">
        <span class="badge-card primary">★ OPSI A: MARKET PROFILE</span>
        <div class="preview-box">
          {ca}
        </div>
        <div class="card-title">Konsep A: The Forward Market Profile</div>
        <div class="card-meta">Profil Samping Finansial (Audit 99/100)</div>
        <div class="card-desc">
          <strong>Perubahan Sudut Pandang Radikal.</strong> Kepala beruang menghadap ke kanan (arah masa depan & pertumbuhan). Sangat dewasa, berwibawa, dan venture-grade ala institusi pasar modal global. Ujung moncong beraksen hijau (#00AA13).
        </div>
      </div>

      <!-- CB -->
      <div class="card highlight">
        <span class="badge-card primary">★ OPSI B: CASHFLOW LOOP</span>
        <div class="preview-box">
          {cb}
        </div>
        <div class="card-title">Konsep B: The Continuous Cash-Flow</div>
        <div class="card-meta">Pita Loop Arus Kas (Audit 99/100)</div>
        <div class="card-desc">
          <strong>Metafora Arus Kas Tanpa Putus.</strong> Dibangun dari satu garis kurva pita geometris kontinu (continuous ribbon) yang mengalir membentuk siluet beruang dan loop likuiditas dengan simpul pertumbuhan hijau di pusatnya.
        </div>
      </div>

      <!-- CC -->
      <div class="card">
        <span class="badge-card sec">OPSI C: 'B' MONOGRAM</span>
        <div class="preview-box">
          {cc}
        </div>
        <div class="card-title">Konsep C: The 'B' Monogram Bear</div>
        <div class="card-meta">Fusi Huruf 'B' + Beruang (Audit 99/100)</div>
        <div class="card-desc">
          <strong>Letterform Hybrid Modern.</strong> Menggabungkan huruf kapital <strong>"B"</strong> (Beruang / Bisnis) dengan siluet telinga bundar dan moncong brankas modal. Sangat ikonik sebagai app icon dan favicon (ala Beats/Airbnb).
        </div>
      </div>

      <!-- CD -->
      <div class="card">
        <span class="badge-card sec">OPSI D: ISOMETRIC TECH</span>
        <div class="preview-box">
          {cd}
        </div>
        <div class="card-title">Konsep D: The Isometric Tech Bear</div>
        <div class="card-meta">Poligon Facet Venture Capital</div>
        <div class="card-desc">
          <strong>Konstruksi 3D Faset Geometris.</strong> Memadukan pencahayaan multi-bidang (deep blue, vibrant blue, dan green keystone core) yang melambangkan kecerdasan analitis data finansial UMKM.
        </div>
      </div>

    </div>

    <!-- Scalability Strip -->
    <div class="scale-strip">
      <div class="scale-title">Uji Keterbacaan Ikon Aplikasi Seluler & Favicon 16px (True Micro-Scale Test)</div>
      <div class="scale-grid">

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{ca}</div>
            <div class="favicon-wrap">{ca}</div>
          </div>
          <div class="scale-lbl"><strong>Konsep A</strong> (Market Profile)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{cb}</div>
            <div class="favicon-wrap">{cb}</div>
          </div>
          <div class="scale-lbl"><strong>Konsep B</strong> (Cashflow Loop)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{cc}</div>
            <div class="favicon-wrap">{cc}</div>
          </div>
          <div class="scale-lbl"><strong>Konsep C</strong> ('B' Monogram)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{cd}</div>
            <div class="favicon-wrap">{cd}</div>
          </div>
          <div class="scale-lbl"><strong>Konsep D</strong> (Isometric Tech)</div>
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
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", HTML_PATH, "-o", PNG_PATH, "--width", "1380", "--height", "1500"]
subprocess.run(cmd, check=True)
print(f"Rendered {PNG_PATH}")
