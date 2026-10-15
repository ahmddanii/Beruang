import os
import subprocess

OUT_DIR = "scratch"
HTML_PATH = os.path.join(OUT_DIR, "navbar_test.html")
PNG_PATH = os.path.join(OUT_DIR, "navbar_test.png")

with open("public/logo/logoSmall.svg", "r", encoding="utf-8") as f:
    svg_small = f.read()

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Navbar Logo Test</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');
    
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    
    body {{
      font-family: 'Poppins', sans-serif;
      background: #F3F8FC;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }}

    .navbar-card {{
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 16px;
      padding: 16px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
    }}

    .navbar-card.dark {{
      background: rgba(10, 10, 12, 0.95);
      border-color: rgba(39, 39, 42, 0.8);
    }}

    .brand-link {{
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }}

    .logo-img {{
      height: 38px;
      width: auto;
      display: block;
    }}

    .brand-text {{
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1;
    }}

    .ber {{
      color: #0081A0;
    }}

    .dark .ber {{
      color: #00A5CC;
    }}

    .uang {{
      color: #00AA13;
    }}

    .dark .uang {{
      color: #22C55E;
    }}

    .nav-links {{
      display: flex;
      gap: 24px;
      font-size: 13px;
      font-weight: 600;
      color: #475569;
    }}

    .dark .nav-links {{
      color: #94A3B8;
    }}

    .cta-btn {{
      background: #0081A0;
      color: #FFF;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 18px;
      border-radius: 12px;
      text-decoration: none;
    }}
  </style>
</head>
<body>
  <div>
    <h3 style="font-size: 13px; color: #64748B; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Mode Terang (Light Mode Navbar)</h3>
    <div class="navbar-card">
      <div class="brand-link">
        <div class="logo-img">
          {svg_small}
        </div>
        <span class="brand-text">
          <span class="ber">Ber</span><span class="uang">uang</span>
        </span>
      </div>
      <div class="nav-links">
        <span>Untuk UMKM</span>
        <span>Untuk Investor</span>
        <span>Katalog Terkurasi</span>
        <span>Tentang Kami</span>
      </div>
      <a href="#" class="cta-btn">Mulai Sekarang</a>
    </div>
  </div>

  <div>
    <h3 style="font-size: 13px; color: #64748B; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Mode Gelap (Dark Mode Navbar)</h3>
    <div class="navbar-card dark">
      <div class="brand-link">
        <div class="logo-img">
          {svg_small}
        </div>
        <span class="brand-text">
          <span class="ber">Ber</span><span class="uang">uang</span>
        </span>
      </div>
      <div class="nav-links">
        <span>Untuk UMKM</span>
        <span>Untuk Investor</span>
        <span>Katalog Terkurasi</span>
        <span>Tentang Kami</span>
      </div>
      <a href="#" class="cta-btn">Mulai Sekarang</a>
    </div>
  </div>
</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", HTML_PATH, "-o", PNG_PATH, "--width", "1000", "--height", "360"]
subprocess.run(cmd, check=True)
print("Rendered:", PNG_PATH)
