import os
import subprocess

HTML_PATH = "public/branding/v8_reboot/overview.html"
PNG_PATH = "public/branding/v8_reboot/reboot-overview.png"

def read_svg(name):
    with open(os.path.join("public/branding/v8_reboot", name), "r", encoding="utf-8") as f:
        return f.read()

c1 = read_svg("c1-token-guardian.svg")
c2 = read_svg("c2-accelerator-chevron.svg")
c3 = read_svg("c3-prosperity-shield.svg")
c4 = read_svg("c4-geometric-fintech.svg")

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Reboot Identitas Brand (Fintech Ramah & Dinamis)</title>
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

    /* 4 Concepts Grid */
    .grid-concepts {{
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

    .card.highlight {{
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

    /* Real-world Navbar Test */
    .navbar-test-strip {{
      background: #131B2A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
    }}

    .strip-title {{
      font-size: 15px;
      font-weight: 600;
      color: #F1F5F9;
      margin-bottom: 16px;
    }}

    .navbar-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }}

    .navbar-item {{
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
      width: 36px;
      height: 36px;
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
      <div class="badge-pill badge-blue">✓ Brief Baru: Opsi A (Kepala Beruang Non-Generic)</div>
      <div class="badge-pill badge-green">✓ Dominan Finansial ("Ber-uang")</div>
      <div class="badge-pill badge-blue">✓ Vibe: Fintech Ramah & Dinamis</div>
      <div class="badge-pill badge-green">✓ Warna Selaras Beranda (GoPay Blue 60% & Green 30%)</div>
    </div>
    <h1>Beruang — 4 Arah Konsep Reboot (Fintech Ramah & Dinamis)</h1>
    <p class="subtitle">
      Didesain ulang dari nol dengan memadukan siluet kepala beruang yang berkarakter (tidak generik) dan metafora finansial yang kuat (koin likuiditas, panah akselerasi modal, dan perisai kesiapan audit).
    </p>
  </div>

  <div class="container">

    <div class="grid-concepts">

      <!-- Concept 1 -->
      <div class="card highlight">
        <span class="badge-card primary">★ REKOMENDASI 1</span>
        <div class="preview-box">
          {c1}
        </div>
        <div class="card-title">Konsep 1: The Token Guardian</div>
        <div class="card-meta">Koin Likuiditas & Pertumbuhan Modal</div>
        <div class="card-desc">
          Telinga beruang diolah dari sepasang koin dinamis bersusun (aliran modal masuk). Moncong putih kubah brankas, hidung hijau GoPay, dan tatapan ramah mentor bisnis.
        </div>
      </div>

      <!-- Concept 2 -->
      <div class="card highlight">
        <span class="badge-card primary">★ REKOMENDASI 2</span>
        <div class="preview-box">
          {c2}
        </div>
        <div class="card-title">Konsep 2: The Accelerator Chevron</div>
        <div class="card-meta">Panah Akselerasi Kelayakan Modal</div>
        <div class="card-desc">
          Hidung beruang dibentuk dari panah akselerasi modal hijau yang mengarah ke atas (scale-up). Siluet telinga bundar ramah dan kontur wajah dinamis.
        </div>
      </div>

      <!-- Concept 3 -->
      <div class="card">
        <span class="badge-card sec">KONSEP 3</span>
        <div class="preview-box">
          {c3}
        </div>
        <div class="card-title">Konsep 3: The Prosperity Shield</div>
        <div class="card-meta">Moncong Hijau "Ber-uang" Penuh</div>
        <div class="card-desc">
          Mengomunikasikan kata "Ber-uang" secara literal melalui moncong hijau pertumbuhan kas (#00AA13) di dalam perisai proteksi modal dan hidung brankas navy.
        </div>
      </div>

      <!-- Concept 4 -->
      <div class="card">
        <span class="badge-card sec">KONSEP 4</span>
        <div class="preview-box">
          {c4}
        </div>
        <div class="card-title">Konsep 4: The Geometric Fintech</div>
        <div class="card-meta">Minimalis Single-Path (Audit 99/100)</div>
        <div class="card-desc">
          Pendekatan agnostik ultra-clean ala agensi Swiss/Linear. Single-path solid dengan telinga bundar presisi, moncong brankas putih, dan hidung hijau zamrud.
        </div>
      </div>

    </div>

    <!-- Real-world Navbar Preview -->
    <div class="navbar-test-strip">
      <div class="strip-title">Simulasi Tampilan di Navbar Halaman Beranda (Desktop Dark Navbar)</div>
      <div class="navbar-grid">

        <div class="navbar-item">
          <div class="navbar-mock">
            <div class="navbar-logo-wrap">{c1}</div>
            <div>
              <div class="navbar-brand">Beruang</div>
              <div class="navbar-tagline">Finansial & Modal UMKM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #94A3B8;">Konsep 1 (Token Guardian)</div>
        </div>

        <div class="navbar-item">
          <div class="navbar-mock">
            <div class="navbar-logo-wrap">{c2}</div>
            <div>
              <div class="navbar-brand">Beruang</div>
              <div class="navbar-tagline">Finansial & Modal UMKM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #94A3B8;">Konsep 2 (Accelerator Chevron)</div>
        </div>

        <div class="navbar-item">
          <div class="navbar-mock">
            <div class="navbar-logo-wrap">{c3}</div>
            <div>
              <div class="navbar-brand">Beruang</div>
              <div class="navbar-tagline">Finansial & Modal UMKM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #94A3B8;">Konsep 3 (Prosperity Shield)</div>
        </div>

        <div class="navbar-item">
          <div class="navbar-mock">
            <div class="navbar-logo-wrap">{c4}</div>
            <div>
              <div class="navbar-brand">Beruang</div>
              <div class="navbar-tagline">Finansial & Modal UMKM</div>
            </div>
          </div>
          <div style="font-size: 11px; color: #94A3B8;">Konsep 4 (Geometric Fintech)</div>
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
