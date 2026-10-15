import os
import subprocess

HTML_PATH = "public/branding/v7_fresh_options/overview.html"
PNG_PATH = "public/branding/v7_fresh_options/fresh-options-overview.png"

def read_svg(name):
    with open(os.path.join("public/branding/v7_fresh_options", name), "r", encoding="utf-8") as f:
        return f.read()

c1 = read_svg("c1-sovereign-guardian.svg")
c2 = read_svg("c2-crest-vault.svg")
c3 = read_svg("c3-accelerator-bear.svg")
c4 = read_svg("c4-geometric-kodiak.svg")

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Eksplorasi Opsi Baru (Anatomi Beruang Nyata & Warna Beranda)</title>
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

    /* Scalability strip */
    .scale-strip {{
      background: #131B2A;
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

    .app-icon-wrap {{
      width: 64px;
      height: 64px;
      border-radius: 16px;
      background: #0066D6;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      box-shadow: 0 8px 20px rgba(0, 102, 214, 0.3);
    }}

    .app-icon-wrap.light {{
      background: #FFFFFF;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
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
      <div class="badge-pill badge-blue">✓ Warna Resmi Beranda (GoPay Blue #0066D6 + Green #00AA13)</div>
      <div class="badge-pill badge-green">✓ Anatomi Asli Beruang (Telinga Bundar + Moncong Nyata)</div>
    </div>
    <h1>Beruang — 4 Eksplorasi Opsi Baru Logo Brand</h1>
    <p class="subtitle">
      Dibuat dengan penekanan maksimal pada identitas beruang asli yang berwibawa, ramah, dan profesional sebagai mentor bisnis & akselerator pendanaan UMKM, dipadukan secara presisi dengan warna resmi halaman beranda.
    </p>
  </div>

  <div class="container">

    <!-- 4 Options Grid -->
    <div class="grid-options">

      <!-- C1 -->
      <div class="card highlight">
        <span class="badge-card primary">★ OPSI A: THE SOVEREIGN</span>
        <div class="preview-box">
          {c1}
        </div>
        <div class="card-title">Opsi A: The Sovereign Guardian</div>
        <div class="card-meta">Anatomi Beruang Utuh & Berwibawa</div>
        <div class="card-desc">
          Paling kuat aura beruangnya: telinga bundar menonjol di 10:00 & 02:00, moncong putih melengkung nyata, hidung hijau GoPay (#00AA13), dan sepasang mata terbuka yang bijaksana.
        </div>
      </div>

      <!-- C2 -->
      <div class="card highlight">
        <span class="badge-card primary">★ OPSI B: THE CREST VAULT</span>
        <div class="preview-box">
          {c2}
        </div>
        <div class="card-title">Opsi B: The Crest Vault Bear</div>
        <div class="card-meta">Perisai & Beruang Solid (Audit 99/100)</div>
        <div class="card-desc">
          Memadukan perisai proteksi modal dan kepala beruang dalam single-path vector murni. Telinga bundar tegas, moncong brankas putih, hidung keystone hijau.
        </div>
      </div>

      <!-- C3 -->
      <div class="card">
        <span class="badge-card sec">OPSI C: ACCELERATOR</span>
        <div class="preview-box">
          {c3}
        </div>
        <div class="card-title">Opsi C: The Accelerator Bear</div>
        <div class="card-meta">Simbol Panah Pertumbuhan Modal</div>
        <div class="card-desc">
          Hidung beruang dibentuk dari panah akselerasi modal hijau yang mengarah ke atas (simbol akselerator kelayakan & scale-up usaha).
        </div>
      </div>

      <!-- C4 -->
      <div class="card">
        <span class="badge-card sec">OPSI D: KODIAK TECH</span>
        <div class="preview-box">
          {c4}
        </div>
        <div class="card-title">Opsi D: The Geometric Kodiak</div>
        <div class="card-meta">Minimalis Modern Agensi (Audit 91/100)</div>
        <div class="card-desc">
          Siluet beruang kodiak yang maskulin dan gagah. Telinga bulat tegas, dua mata slit elips tajam, dan hidung hijau zamrud minimalis.
        </div>
      </div>

    </div>

    <!-- Scalability Strip -->
    <div class="scale-strip">
      <div class="scale-title">Uji Keterbacaan Ikon Aplikasi Seluler (64px) & Favicon Tab (16px)</div>
      <div class="scale-grid">

        <div class="scale-item">
          <div class="app-icon-wrap light">{c1}</div>
          <div class="favicon-wrap">{c1}</div>
          <div class="scale-lbl"><strong>Opsi A</strong> (The Sovereign)</div>
        </div>

        <div class="scale-item">
          <div class="app-icon-wrap light">{c2}</div>
          <div class="favicon-wrap">{c2}</div>
          <div class="scale-lbl"><strong>Opsi B</strong> (The Crest Vault)</div>
        </div>

        <div class="scale-item">
          <div class="app-icon-wrap light">{c3}</div>
          <div class="favicon-wrap">{c3}</div>
          <div class="scale-lbl"><strong>Opsi C</strong> (The Accelerator)</div>
        </div>

        <div class="scale-item">
          <div class="app-icon-wrap light">{c4}</div>
          <div class="favicon-wrap">{c4}</div>
          <div class="scale-lbl"><strong>Opsi D</strong> (Geometric Kodiak)</div>
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
