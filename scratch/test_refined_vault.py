import os
import math

OUT_DIR = "public/branding/v4_refinement"
os.makedirs(OUT_DIR, exist_ok=True)

# Bear head outer path
BEAR_HEAD_D = """
  M 98 64
  C 86 60 70 42 54 52
  C 42 60 44 80 52 96
  C 38 116 34 146 52 174
  C 68 202 96 216 128 216
  C 160 216 188 202 204 174
  C 222 146 218 116 204 96
  C 212 80 214 60 202 52
  C 186 42 170 60 160 64
  L 98 64 Z
"""

def make_circle_path(cx, cy, r):
    # Using exact arc for 100% mathematical precision in SVG
    return f"M {cx} {cy - r} A {r} {r} 0 1 0 {cx} {cy + r} A {r} {r} 0 1 0 {cx} {cy - r} Z"

def build_svg(r, diamond_r=16, title="Beruang"):
    cx, cy = 128, 142
    circle_d = make_circle_path(cx, cy, r)
    d_path = f"{BEAR_HEAD_D.strip()}\n  {circle_d}"
    
    # Diamond points
    top = (cx, cy - diamond_r)
    right = (cx + diamond_r, cy)
    bottom = (cx, cy + diamond_r)
    left = (cx - diamond_r, cy)
    pts = f"{top[0]},{top[1]} {right[0]},{right[1]} {bottom[0]},{bottom[1]} {left[0]},{left[1]}"
    
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-{r}">
  <title id="title-{r}">{title} (r={r})</title>
  <!-- Single Compound Path in Slate Navy with Negative Space Vault Cutout -->
  <path
    fill="#0F172A"
    fill-rule="evenodd"
    d="{d_path}"
  />
  <!-- Emerald Growth Geometric Keystone -->
  <polygon points="{pts}" fill="#059669" />
</svg>"""
    return svg

def build_lockup(symbol_svg, title="Beruang"):
    # Strip svg wrapper
    inner = symbol_svg[symbol_svg.find(">") + 1 : symbol_svg.rfind("</svg>")]
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 180" width="680" height="180" role="img" aria-labelledby="title-lk">
  <title id="title-lk">{title}</title>
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&amp;display=swap');
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
        fill: #059669;
        letter-spacing: 2px;
      }}
    </style>
  </defs>
  <g transform="translate(24, 25) scale(0.5078)">
    {inner}
  </g>
  <text x="180" y="96" class="brand-title">Beruang</text>
  <text x="182" y="128" class="brand-tagline">AKSELERATOR KELAYAKAN UMKM</text>
</svg>"""

# Variations:
# r = 36 (Original)
# r = 29 (-19.4% reduction, ~20%)
# r = 27 (-25.0% reduction, midpoint)
# r = 26 (-27.8% reduction, optical golden ratio)
# r = 25 (-30.5% reduction, ~30%)

variants = {
    "vault-original-r36": (36, 16, "Original (r=36)"),
    "vault-refined-r29": (29, 16, "Refined -20% (r=29)"),
    "vault-refined-r27": (27, 16, "Refined -25% (r=27)"),
    "vault-refined-r26": (26, 15, "Refined -28% (r=26, diamond=15)"),
    "vault-refined-r25": (25, 15, "Refined -30% (r=25, diamond=15)"),
}

for key, (r, dia, label) in variants.items():
    svg_content = build_svg(r, diamond_r=dia, title=label)
    with open(os.path.join(OUT_DIR, f"{key}.svg"), "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    lockup_content = build_lockup(svg_content, title=f"Beruang - {label}")
    with open(os.path.join(OUT_DIR, f"{key}-lockup.svg"), "w", encoding="utf-8") as f:
        f.write(lockup_content)

print("SVGs created in", OUT_DIR)
