import os
import subprocess

OUT_DIR = "scratch"
HTML_PATH = os.path.join(OUT_DIR, "logo_scale_test.html")
PNG_PATH = os.path.join(OUT_DIR, "logo_scale_test.png")

logo_url = os.path.abspath("public/logo/logoSmall.svg").replace("\\", "/")

sizes = [
    ("36px (Sebelumnya / Terlalu Besar)", "36px", "text-xl (20px)", "font-size: 20px;"),
    ("30px (Medium)", "30px", "text-xl (21px)", "font-size: 21px;"),
    ("27px (Ergonomis Ideal - Cap-Height Ratio 1.25x)", "27px", "text-xl (21px)", "font-size: 21px;"),
    ("24px (Compact Snug)", "24px", "text-lg (19px)", "font-size: 19px;"),
]

rows_html = ""
for label, h, font_lbl, font_style in sizes:
    rows_html += f"""
    <div style="background: #FFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="file:///{logo_url}" style="height: {h}; width: auto; object-fit: contain;" alt="Logo" />
        <span style="font-family: 'Poppins', sans-serif; font-weight: 800; {font_style} letter-spacing: -0.4px; line-height: 1;">
          <span style="color: #0081A0;">Ber</span><span style="color: #00AA13;">uang</span>
        </span>
      </div>
      <div style="font-size: 12px; color: #64748B; font-weight: 600;">
        Logo: {h} · Teks: {font_lbl} · {label}
      </div>
    </div>
    """

html = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Tes Ukuran Ergonomis Logo Navbar</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap');
    body {{
      font-family: 'Poppins', sans-serif;
      background: #F3F8FC;
      padding: 32px;
    }}
  </style>
</head>
<body>
  <h2 style="font-size: 18px; color: #0F172A; margin-bottom: 4px;">Uji Skala Ergonomis Logo vs Teks Branding</h2>
  <p style="font-size: 13px; color: #64748B; margin-bottom: 24px;">Membandingkan rasio tinggi logo terhadap cap-height teks Beruang agar selaras, proporsional, dan tidak mendominasi.</p>
  {rows_html}
</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", HTML_PATH, "-o", PNG_PATH, "--width", "960", "--height", "450"]
subprocess.run(cmd, check=True)
print("Rendered:", PNG_PATH)
