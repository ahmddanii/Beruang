import os
import subprocess

OUT_DIR = "public/branding/vault_redesign"

def make_lockup(symbol_inner, title):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 180" width="680" height="180" role="img" aria-labelledby="title-lockup">
  <title id="title-lockup">{title}</title>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&amp;display=swap');
      .brand-title {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 54px;
        font-weight: 700;
        fill: #0F172A;
      }}
      .brand-tagline {{
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 13px;
        font-weight: 600;
        fill: #0081A0;
        letter-spacing: 2px;
      }}
    </style>
  </defs>
  <!-- Symbol scaled to 130x130 at (24, 25) -->
  <g transform="translate(24, 25) scale(0.5078)">
    {symbol_inner}
  </g>
  <!-- Wordmark Text -->
  <text x="180" y="96" class="brand-title">Beruang</text>
  <text x="182" y="128" class="brand-tagline">AKSELERATOR KELAYAKAN UMKM</text>
</svg>"""

def get_inner(path):
    with open(path, "r", encoding="utf-8") as f:
        svg_str = f.read()
    start = svg_str.find(">") + 1
    end = svg_str.rfind("</svg>")
    return svg_str[start:end]

l1 = make_lockup(get_inner(os.path.join(OUT_DIR, "style-1.svg")), "Beruang - The Calm Guardian")
l2 = make_lockup(get_inner(os.path.join(OUT_DIR, "style-2.svg")), "Beruang - The Pure Vault Silhouette")
l3 = make_lockup(get_inner(os.path.join(OUT_DIR, "style-3.svg")), "Beruang - The Modern Tech Bear")

with open(os.path.join(OUT_DIR, "style-1-lockup.svg"), "w", encoding="utf-8") as f:
    f.write(l1)
with open(os.path.join(OUT_DIR, "style-2-lockup.svg"), "w", encoding="utf-8") as f:
    f.write(l2)
with open(os.path.join(OUT_DIR, "style-3-lockup.svg"), "w", encoding="utf-8") as f:
    f.write(l3)

print("Lockups created!")
