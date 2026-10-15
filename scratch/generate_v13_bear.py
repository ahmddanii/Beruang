import os
import subprocess
import shutil

OUT_DIR = "public/branding/v13_authentic_bear"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(os.path.join(OUT_DIR, "dist"), exist_ok=True)

# -----------------------------------------------------------------------------
# MASTER SYMBOL SVG (V13 - AUTHENTIC BEAR ANATOMY)
# - Wide chubby bear head (1.6:1 ratio, 184px wide)
# - Low-profile tilted dome ears (tilted 38° outward at 10:30 and 1:30 positions)
# - Broad forehead crown (136px ear separation) - 100% genuine teddy bear, ZERO mouse vibe
# - Soft inner ear crescent following the dome angle
# - Peaceful serene closed eyes (⌒ ⌒)
# - Clean white snout with rounded blue nose
# - Holding Indonesian Rupiah banknote (#00AA13) with "Rp" emblem
# - Paws hugging banknote with clean white separation contours
# -----------------------------------------------------------------------------

def make_symbol_svg():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-ms">
  <title id="t-ms">Beruang - Authentic Chubby Rupiah Bear</title>

  <!-- Left Bear Ear: Low-profile dome angled -38° at outer cranial corner -->
  <g transform="translate(60, 62) rotate(-38)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-3" rx="9" ry="6" fill="#FFFFFF" />
  </g>

  <!-- Right Bear Ear: Low-profile dome angled 38° at outer cranial corner -->
  <g transform="translate(196, 62) rotate(38)">
    <ellipse cx="0" cy="0" rx="20" ry="16" fill="#0066D6" />
    <ellipse cx="0" cy="-3" rx="9" ry="6" fill="#FFFFFF" />
  </g>

  <!-- Chubby Bear Head & Body: Broad Forehead, Wide Cheeks (184px span) -->
  <path
    fill="#0066D6"
    d="
      M 72 64
      C 90 54 128 52 166 54
      C 184 64 212 86 218 116
      C 224 146 216 172 202 192
      C 188 212 166 218 128 218
      C 90 218 68 212 54 192
      C 40 172 32 146 38 116
      C 44 86 54 64 72 64 Z
    "
  />

  <!-- Peaceful Serene Curved Closed Eyes (Matching user reference) -->
  <path
    fill="#FFFFFF"
    d="
      M 88 114
      C 98 102 114 102 122 114
      C 114 106 98 106 88 114 Z
    "
  />
  <path
    fill="#FFFFFF"
    d="
      M 134 114
      C 142 102 158 102 168 114
      C 158 106 142 106 134 114 Z
    "
  />

  <!-- White Snout / Muzzle -->
  <ellipse cx="128" cy="136" rx="22" ry="17" fill="#FFFFFF" />

  <!-- Blue Rounded Bear Nose -->
  <path
    fill="#0066D6"
    d="
      M 121 131
      C 121 126 124 124 128 124
      C 132 124 135 126 135 131
      C 135 136 132 140 128 140
      C 124 140 121 136 121 131 Z
    "
  />

  <!-- Indonesian Rupiah Banknote (Tilted -8deg held snugly by paws) -->
  <g transform="translate(128, 174) rotate(-8) translate(-128, -174)">
    <!-- Banknote White Outline Base -->
    <rect x="72" y="150" width="112" height="54" rx="8" fill="#FFFFFF" />
    <!-- Banknote Green Body (#00AA13) -->
    <rect x="74" y="152" width="108" height="50" rx="6" fill="#00AA13" />
    <!-- Banknote White Guilloche Border -->
    <rect x="78" y="156" width="100" height="42" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
    <!-- Banknote Center Circle -->
    <circle cx="128" cy="177" r="14" fill="#FFFFFF" />
    <!-- 'R' -->
    <path fill="#00AA13" d="M 122 171 L 126 171 C 128.5 171 129.5 172.2 129.5 174 C 129.5 175.8 128.5 177 126 177 L 124 177 L 124 181 L 122 181 Z M 124 173 L 124 175.5 L 125.8 175.5 C 126.8 175.5 127.5 175 127.5 174 C 127.5 173 126.8 173 125.8 173 Z" />
    <path fill="#00AA13" d="M 125.5 176.5 L 128.5 181 L 126.2 181 L 124 177 Z" />
    <!-- 'p' -->
    <path fill="#00AA13" d="M 130.5 173.5 L 132.3 173.5 L 132.3 174.8 C 133 173.8 134 173.3 135.2 173.3 C 137 173.3 138.2 174.8 138.2 176.8 C 138.2 178.8 137 180.3 135.2 180.3 C 134 180.3 133 179.8 132.3 178.8 L 132.3 183 L 130.5 183 Z M 132.3 176.8 C 132.3 178 133.2 178.8 134.4 178.8 C 135.6 178.8 136.4 178 136.4 176.8 C 136.4 175.6 135.6 174.8 134.4 174.8 C 133.2 174.8 132.3 175.6 132.3 176.8 Z" />
  </g>

  <!-- Left Bear Paw Hugging Banknote with White Contour Separation -->
  <path
    d="
      M 68 152
      C 60 162 62 180 78 190
      C 90 198 102 194 108 182
      C 102 180 96 176 92 170
      C 82 166 76 160 68 152 Z
    "
    fill="#0066D6"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linejoin="round"
  />

  <!-- Right Bear Paw Hugging Banknote with White Contour Separation -->
  <path
    d="
      M 188 152
      C 196 162 194 180 178 190
      C 166 198 154 194 148 182
      C 154 180 160 176 164 170
      C 174 166 180 160 188 152 Z
    "
    fill="#0066D6"
    stroke="#FFFFFF"
    stroke-width="3"
    stroke-linejoin="round"
  />
</svg>"""

def make_squircle_svg():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-sq">
  <title id="t-sq">Beruang - Squircle App Icon</title>
  
  <defs>
    <clipPath id="sq-clip">
      <rect x="16" y="16" width="224" height="224" rx="54" />
    </clipPath>
  </defs>

  <!-- Squircle Canvas in Clean White / Subtle Ice-Blue Border -->
  <rect x="16" y="16" width="224" height="224" rx="54" fill="#FFFFFF" />
  <rect x="16" y="16" width="224" height="224" rx="54" fill="none" stroke="#E2E8F0" stroke-width="2" />

  <g clip-path="url(#sq-clip)" transform="translate(0, 10)">
    {make_symbol_svg()[make_symbol_svg().find('>')+1 : make_symbol_svg().rfind('</svg>')]}
  </g>
</svg>"""

def make_dark_squircle_svg():
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t-dsq">
  <title id="t-dsq">Beruang - Dark Squircle App Icon</title>
  
  <defs>
    <clipPath id="dsq-clip">
      <rect x="16" y="16" width="224" height="224" rx="54" />
    </clipPath>
    <linearGradient id="dsq-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
  </defs>

  <!-- Dark Squircle Canvas with subtle glow border -->
  <rect x="16" y="16" width="224" height="224" rx="54" fill="url(#dsq-bg)" />
  <rect x="16" y="16" width="224" height="224" rx="54" fill="none" stroke="#1E293B" stroke-width="2" />

  <g clip-path="url(#dsq-clip)" transform="translate(0, 10)">
    {make_symbol_svg()[make_symbol_svg().find('>')+1 : make_symbol_svg().rfind('</svg>')]}
  </g>
</svg>"""

def make_lockup_svg():
    # Convert 'Beruang' text into vector paths for 100% SVG audit compliance
    # (or include clean text with Poppins font declaration)
    inner_symbol = make_symbol_svg()[make_symbol_svg().find('>')+1 : make_symbol_svg().rfind('</svg>')]
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 96" width="460" height="96" role="img" aria-labelledby="t-lk">
  <title id="t-lk">Beruang - Akselerator Kelayakan UMKM</title>
  
  <g transform="translate(6, 4) scale(0.34)">
    {inner_symbol}
  </g>

  <!-- Brand Typography (Poppins) -->
  <text x="100" y="52" font-family="'Poppins', sans-serif" font-size="34" font-weight="700" fill="#0F172A" letter-spacing="-0.5">Beruang</text>
  
  <!-- Slogan / Subtitle Pill -->
  <rect x="102" y="62" width="194" height="18" rx="4" fill="#F1F5F9" />
  <text x="108" y="75" font-family="'Poppins', sans-serif" font-size="9" font-weight="600" fill="#0066D6" letter-spacing="0.4">AKSELERATOR KELAYAKAN UMKM</text>
</svg>"""

# Save SVGs
with open(os.path.join(OUT_DIR, "rupiah-bear-master.svg"), "w", encoding="utf-8") as f:
    f.write(make_symbol_svg())

with open(os.path.join(OUT_DIR, "rupiah-bear-squircle.svg"), "w", encoding="utf-8") as f:
    f.write(make_squircle_svg())

with open(os.path.join(OUT_DIR, "rupiah-bear-dark-squircle.svg"), "w", encoding="utf-8") as f:
    f.write(make_dark_squircle_svg())

with open(os.path.join(OUT_DIR, "rupiah-bear-lockup.svg"), "w", encoding="utf-8") as f:
    f.write(make_lockup_svg())

print("Saved all v13 SVGs to", OUT_DIR)
