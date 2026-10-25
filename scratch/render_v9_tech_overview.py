import os
import subprocess

HTML_PATH = "public/branding/v9_minimalist_tech/overview.html"
PNG_PATH = "public/branding/v9_minimalist_tech/tech-bear-overview.png"

def read_svg(name):
    with open(os.path.join("public/branding/v9_minimalist_tech", name), "r", encoding="utf-8") as f:
        return f.read()

t1 = read_svg("t1-linear-facet.svg")
t2 = read_svg("t2-swiss-modernist.svg")
t3 = read_svg("t3-vector-accelerator.svg")
t4 = read_svg("t4-monolithic-kodiak.svg")

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Arah Modern Minimalis Tech</title>
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

    /* 4 Tech Concepts Grid */
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
      <div class="badge-pill badge-blue">✓ Arah Baru: Modern Minimalis Tech</div>
      <div class="badge-pill badge-green">✓ Presisi Geometris Murni (0 Ornamen)</div>
      <div class="badge-pill badge-blue">✓ Selaras Halaman Beranda (#0066D6 & #00AA13)</div>
    </div>
    <h1>Beruang — Eksplorasi Arah Modern Minimalis Tech</h1>
    <p class="subtitle">
      Pendekatan desain kelas agensi teknologi internasional (ala Linear, Stripe, Raycast, Vercel). Bentuk kepala beruang diolah ke dalam kurva dan sudut geometris murni, tanpa ornamen ilustratif, dengan ketajaman arsitektur finansial modern.
    </p>
  </div>

  <div class="container">

    <div class="grid-concepts">

      <!-- T1 -->
      <div class="card highlight">
        <span class="badge-card primary">★ OPSI T1: LINEAR FACET</span>
        <div class="preview-box">
          {t1}
        </div>
        <div class="card-title">T1: The Linear Facet Bear</div>
        <div class="card-meta">Gaya Linear / Raycast / High-Tech</div>
        <div class="card-desc">
          Geometri facet bersudut tajam presisi. Telinga 45°/60°, dua mata slit horisontal analitis, dan hidung permata zamrud keystone (#00AA13) di tengah brankas.
        </div>
      </div>

      <!-- T2 -->
      <div class="card highlight">
        <span class="badge-card primary">★ OPSI T2: SWISS MODERNIST</span>
        <div class="preview-box">
          {t2}
        </div>
        <div class="card-title">T2: The Swiss Modernist Bear</div>
        <div class="card-meta">Gaya Bauhaus / Stripe (Audit 99/100)</div>
        <div class="card-desc">
          Geometri kurva melingkar murni (pure circular arcs & tangents). Telinga bundar menyatu organik, moncong brankas kubah, hidung hijau GoPay, dan mata presisi.
        </div>
      </div>

      <!-- T3 -->
      <div class="card">
        <span class="badge-card sec">OPSI T3: VECTOR ACCELERATOR</span>
        <div class="preview-box">
          {t3}
        </div>
        <div class="card-title">T3: The Vector Accelerator</div>
        <div class="card-meta">Panah Pertumbuhan Modal (Audit 91/100)</div>
        <div class="card-desc">
          Moncong beruang mengintegrasikan panah akselerasi modal 45° melesat ke atas dalam warna hijau (#00AA13). Simbol literal dari "Akselerator Kelayakan".
        </div>
      </div>

      <!-- T4 -->
      <div class="card">
        <span class="badge-card sec">OPSI T4: MONOLITHIC KODIAK</span>
        <div class="preview-box">
          {t4}
        </div>
        <div class="card-title">T4: The Monolithic Kodiak</div>
        <div class="card-meta">Gaya Pentagram / Apple (Audit 99/100)</div>
        <div class="card-desc">
          Monolitik ultra-clean single compound path. Siluet beruang kodiak yang masif dan tenang, telinga bulat tegas, hidung oval hijau minimalis.
        </div>
      </div>

    </div>

    <!-- Scalability Strip -->
    <div class="scale-strip">
      <div class="scale-title">Uji Keterbacaan Ikon Aplikasi Seluler & Favicon 16px (True Micro-Scale Test)</div>
      <div class="scale-grid">

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{t1}</div>
            <div class="favicon-wrap">{t1}</div>
          </div>
          <div class="scale-lbl"><strong>Opsi T1</strong> (Linear Facet)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{t2}</div>
            <div class="favicon-wrap">{t2}</div>
          </div>
          <div class="scale-lbl"><strong>Opsi T2</strong> (Swiss Modernist)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{t3}</div>
            <div class="favicon-wrap">{t3}</div>
          </div>
          <div class="scale-lbl"><strong>Opsi T3</strong> (Vector Accelerator)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{t4}</div>
            <div class="favicon-wrap">{t4}</div>
          </div>
          <div class="scale-lbl"><strong>Opsi T4</strong> (Monolithic Kodiak)</div>
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
