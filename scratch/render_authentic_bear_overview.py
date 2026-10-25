import os
import subprocess

HTML_PATH = "public/branding/v6_authentic_bear/overview.html"
PNG_PATH = "public/branding/v6_authentic_bear/authentic-bear-overview.png"

def read_svg(name):
    with open(os.path.join("public/branding/v6_authentic_bear", name), "r", encoding="utf-8") as f:
        return f.read()

opt1 = read_svg("opt1-iconic-bear.svg")
opt2 = read_svg("opt2-flat-geometric.svg")
opt3 = read_svg("opt3-dualtone-venture.svg")
opt4 = read_svg("opt4-monolithic-kodiak.svg")

# Previous V4 for comparison
with open("public/branding/v5_two_eyes/v1-dual-rhomboid.svg", "r", encoding="utf-8") as f:
    v_prev = f.read()

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Anatomi Beruang Asli & Sinkronisasi Warna Halaman Beranda</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    
    body {{
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0B0F17;
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
      max-width: 920px;
    }}

    .container {{
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }}

    /* Palette Breakdown Banner */
    .palette-banner {{
      background: #131B2A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 18px 24px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }}

    .swatch-card {{
      display: flex;
      align-items: center;
      gap: 14px;
    }}

    .swatch-box {{
      width: 44px;
      height: 44px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      flex-shrink: 0;
    }}

    .swatch-name {{
      font-size: 13px;
      font-weight: 600;
      color: #F8FAFC;
    }}

    .swatch-hex {{
      font-size: 11px;
      color: #94A3B8;
      font-family: monospace;
    }}

    /* 4 Options Grid */
    .grid-options {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }}

    .card {{
      background: #131B2A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }}

    .card.star {{
      border: 2px solid #0066D6;
      background: linear-gradient(180deg, #152238 0%, #101826 100%);
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

    .badge-card.top {{
      background: #0066D6;
      color: #FFFFFF;
    }}

    .badge-card.opt {{
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

    /* Context Strip */
    .context-strip {{
      background: #131B2A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
    }}

    .context-title {{
      font-size: 15px;
      font-weight: 600;
      color: #F1F5F9;
      margin-bottom: 16px;
    }}

    .context-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }}

    .context-item {{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }}

    .navbar-mock {{
      width: 100%;
      background: #0A0A0C;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }}

    .navbar-logo-wrap {{
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: #FFFFFF;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }}

    .navbar-logo-wrap svg {{
      width: 100%;
      height: 100%;
    }}

    .navbar-brand {{
      font-size: 13px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1;
    }}

    .navbar-tagline {{
      font-size: 9px;
      color: #94A3B8;
      line-height: 1;
      margin-top: 3px;
    }}
  </style>
</head>
<body>

  <div class="header">
    <div class="badge-bar">
      <div class="badge-pill badge-blue">✓ Warna Resmi Halaman Beranda (GoPay Blue 60%)</div>
      <div class="badge-pill badge-green">✓ Anatomi Asli Beruang (Telinga Bundar + Moncong Jelas)</div>
    </div>
    <h1>Beruang — Rekonstruksi Karakter Beruang Sejati & Harmonisasi Beranda</h1>
    <p class="subtitle">
      Konsep sebelumnya terasa "kurang beruang" karena siluetnya terlalu mirip perisai heksagonal/helm dan warnanya adalah Slate Navy gelap (`#0F172A`). Kini warna diselaraskan 100% dengan identitas halaman beranda: <strong>GoPay Vibrant Trust Blue (#0066D6)</strong> dan <strong>Growth Green (#00AA13)</strong>, dengan telinga bundar khas beruang dan moncong nyata.
    </p>
  </div>

  <div class="container">

    <!-- Palette Banner -->
    <div class="palette-banner">
      <div class="swatch-card">
        <div class="swatch-box" style="background: #0066D6;"></div>
        <div>
          <div class="swatch-name">Primary Trust Blue (60%)</div>
          <div class="swatch-hex">#0066D6 (Tailwind Primary-500)</div>
        </div>
      </div>
      <div class="swatch-card">
        <div class="swatch-box" style="background: #00AA13;"></div>
        <div>
          <div class="swatch-name">Success Growth Green (30%)</div>
          <div class="swatch-hex">#00AA13 (Tailwind Success DEFAULT)</div>
        </div>
      </div>
      <div class="swatch-card">
        <div class="swatch-box" style="background: #FFFFFF; border: 1px solid #E2E8F0;"></div>
        <div>
          <div class="swatch-name">Kontras Moncong & Mata (10%)</div>
          <div class="swatch-hex">#FFFFFF / #F0F7FD (Ice Blue)</div>
        </div>
      </div>
    </div>

    <!-- 4 Options Grid -->
    <div>
      <div style="font-size: 16px; font-weight: 600; color: #F8FAFC; margin-bottom: 14px;">
        4 Pilihan Eksplorasi: Sangat "Beruang", Berwibawa & Senada dengan Beranda
      </div>
      <div class="grid-options">

        <!-- Option 1 -->
        <div class="card star">
          <span class="badge-card top">★ REKOMENDASI 1</span>
          <div class="preview-box">
            {opt1}
          </div>
          <div class="card-title">Opsi 1: The Iconic Modern Bear</div>
          <div class="card-meta">Anatomi Beruang Ikonik + Moncong Putih</div>
          <div class="card-desc">
            Sangat terasa beruangnya: telinga bundar menonjol, moncong putih membal, hidung lebar hijau GoPay (#00AA13), dan mata terbuka percaya diri.
          </div>
        </div>

        <!-- Option 2 -->
        <div class="card star">
          <span class="badge-card top">★ REKOMENDASI 2</span>
          <div class="preview-box">
            {opt2}
          </div>
          <div class="card-title">Opsi 2: The Flat Geometric Bear</div>
          <div class="card-meta">Single Compound Vector (Audit 99/100)</div>
          <div class="card-desc">
            Gaya agensi Swiss/Linear. Siluet telinga bundar beruang terpadu dalam satu path solid, moncong brankas putih, hidung hijau zamrud.
          </div>
        </div>

        <!-- Option 3 -->
        <div class="card">
          <span class="badge-card opt">OPSI 3</span>
          <div class="preview-box">
            {opt3}
          </div>
          <div class="card-title">Opsi 3: Dual-Tone Venture Bear</div>
          <div class="card-meta">Moncong Hijau Pertumbuhan Modal</div>
          <div class="card-desc">
            Kepala Biru Trust (#0066D6) dipadukan dengan area moncong hijau segar (#00AA13) dan hidung navy. Kuat melambangkan "Ber-uang" (finansial).
          </div>
        </div>

        <!-- Option 4 -->
        <div class="card">
          <span class="badge-card opt">OPSI 4</span>
          <div class="preview-box">
            {opt4}
          </div>
          <div class="card-title">Opsi 4: The Monolithic Kodiak</div>
          <div class="card-meta">Minimalis Single Path (Audit 99/100)</div>
          <div class="card-desc">
            Siluet beruang kodiak masif dan kokoh. Telinga bulat tegas, dua mata aperture terbuka, dan hidung hijau minimalis.
          </div>
        </div>

      </div>
    </div>

    <!-- Context Strip (Navbar Test) -->
    <div class="context-strip">
      <div class="context-title">Uji Tampilan Langsung di Navbar Halaman Beranda (Real Navbar Preview)</div>
      <div class="context-grid">
        
        <div class="context-item">
          <div class="navbar-mock">
            <div class="navbar-logo-wrap">{opt1}</div>
            <div>
              <div class="navbar-brand">Beruang</div>
              <div class="navbar-tagline">Finansial & Modal UMKM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #94A3B8;">Opsi 1 di Navbar</div>
        </div>

        <div class="context-item">
          <div class="navbar-mock">
            <div class="navbar-logo-wrap">{opt2}</div>
            <div>
              <div class="navbar-brand">Beruang</div>
              <div class="navbar-tagline">Finansial & Modal UMKM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #94A3B8;">Opsi 2 di Navbar</div>
        </div>

        <div class="context-item">
          <div class="navbar-mock">
            <div class="navbar-logo-wrap">{opt3}</div>
            <div>
              <div class="navbar-brand">Beruang</div>
              <div class="navbar-tagline">Finansial & Modal UMKM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #94A3B8;">Opsi 3 di Navbar</div>
        </div>

        <div class="context-item">
          <div class="navbar-mock">
            <div class="navbar-logo-wrap">{opt4}</div>
            <div>
              <div class="navbar-brand">Beruang</div>
              <div class="navbar-tagline">Finansial & Modal UMKM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #94A3B8;">Opsi 4 di Navbar</div>
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
