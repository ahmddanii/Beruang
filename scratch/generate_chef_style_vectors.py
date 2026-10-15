import os
import subprocess

OUT_DIR = "public/branding/chef_style"
os.makedirs(OUT_DIR, exist_ok=True)

# --------------------------------------------------------------------------
# OPTION 1: THE CHEF VAULT BEAR (Inspirasi Langsung Referensi Pengguna)
# Karakter beruang kuning membal, topi chef putih awan, mata tidur tebal damai,
# background squircle oranye cerah hangat.
# --------------------------------------------------------------------------
style_chef_1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c1">
  <title id="title-c1">Beruang - Chef Vault Bear</title>
  <defs>
    <clipPath id="squircle-c1">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <!-- Vibrant Orange Squircle Background -->
  <rect x="16" y="16" width="224" height="224" rx="56" fill="#FF7009" />

  <g clip-path="url(#squircle-c1)">
    <!-- Golden Bear Ears (behind head) -->
    <circle cx="78" cy="142" r="22" fill="#EFA300" />
    <circle cx="78" cy="142" r="13" fill="#D98A00" />

    <circle cx="178" cy="142" r="22" fill="#EFA300" />
    <circle cx="178" cy="142" r="13" fill="#D98A00" />

    <!-- Golden Doughy Bear Head emerging from bottom -->
    <path
      fill="#FFB600"
      d="
        M 44 240
        C 40 166 74 126 128 126
        C 182 126 216 166 212 240 Z
      "
    />

    <!-- Puffy White Cloud Chef Hat -->
    <!-- Hat Brim (Soft Shadow Grey) -->
    <path
      fill="#E5E7EB"
      d="
        M 86 146
        C 86 138 170 138 170 146
        L 168 155
        C 168 159 88 159 88 155 Z
      "
    />
    <!-- Hat Puffy Body -->
    <path
      fill="#FFFFFF"
      d="
        M 90 144
        C 70 144 58 116 76 98
        C 66 76 92 58 114 70
        C 124 50 148 50 158 68
        C 178 58 200 80 190 102
        C 206 120 194 144 174 144 Z
      "
    />

    <!-- Iconic Thick Peaceful Closed Eyes -->
    <path
      fill="none"
      stroke="#18181B"
      stroke-width="8.5"
      stroke-linecap="round"
      d="
        M 96 186
        C 102 194 114 194 120 186

        M 142 186
        C 148 194 160 194 166 186
      "
    />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# OPTION 2: THE BEAR-EARED CLOUD HAT (Topi Awan Bertelinga Beruang)
# Topi putih awan itu sendiri memiliki telinga beruang imut,
# menciptakan siluet unik khas karakter Sanrio / Line Friends.
# --------------------------------------------------------------------------
style_chef_2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c2">
  <title id="title-c2">Beruang - Bear-Eared Cloud Hat</title>
  <defs>
    <clipPath id="squircle-c2">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <rect x="16" y="16" width="224" height="224" rx="56" fill="#FF7009" />

  <g clip-path="url(#squircle-c2)">
    <!-- Golden Doughy Bear Head -->
    <path
      fill="#FFB600"
      d="
        M 44 240
        C 40 166 74 126 128 126
        C 182 126 216 166 212 240 Z
      "
    />

    <!-- Puffy White Cloud Hat with Bear Ears Built In -->
    <!-- Hat Brim -->
    <path
      fill="#E5E7EB"
      d="
        M 86 146
        C 86 138 170 138 170 146
        L 168 156
        C 168 160 88 160 88 156 Z
      "
    />
    <!-- Cloud Hat Body with Integrated Ears -->
    <path
      fill="#FFFFFF"
      d="
        M 90 144
        C 68 144 60 114 78 96
        C 66 76 80 50 102 54
        C 108 55 112 59 116 64
        C 124 58 132 58 140 64
        C 144 59 148 55 154 54
        C 176 50 190 76 178 96
        C 196 114 188 144 166 144 Z
      "
    />
    <!-- Inner Ear indentations on White Cloud Hat -->
    <circle cx="94" cy="74" r="8" fill="#E5E7EB" />
    <circle cx="162" cy="74" r="8" fill="#E5E7EB" />

    <!-- Iconic Thick Peaceful Closed Eyes -->
    <path
      fill="none"
      stroke="#18181B"
      stroke-width="8.5"
      stroke-linecap="round"
      d="
        M 96 186
        C 102 194 114 194 120 186

        M 142 186
        C 148 194 160 194 166 186
      "
    />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# OPTION 3: THE VAULT HELMET BEAR (Helm Brankas Kubah)
# Menggabungkan gaya chef ref pengguna dengan konsep 'Vault' (helm kubah pengaman brankas)
# beraksen tombol kombinasi brankas lembut di atasnya.
# --------------------------------------------------------------------------
style_chef_3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c3">
  <title id="title-c3">Beruang - The Vault Helmet Bear</title>
  <defs>
    <clipPath id="squircle-c3">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <rect x="16" y="16" width="224" height="224" rx="56" fill="#FF7009" />

  <g clip-path="url(#squircle-c3)">
    <!-- Golden Bear Ears -->
    <circle cx="76" cy="140" r="22" fill="#EFA300" />
    <circle cx="76" cy="140" r="13" fill="#D98A00" />

    <circle cx="180" cy="140" r="22" fill="#EFA300" />
    <circle cx="180" cy="140" r="13" fill="#D98A00" />

    <!-- Golden Doughy Bear Head -->
    <path
      fill="#FFB600"
      d="
        M 44 240
        C 40 166 74 126 128 126
        C 182 126 216 166 212 240 Z
      "
    />

    <!-- White Smooth Vault Security Dome / Helmet -->
    <path
      fill="#FFFFFF"
      d="
        M 66 158
        C 66 94 92 68 128 68
        C 164 68 190 94 190 158
        C 190 164 182 166 176 166
        C 156 164 100 164 80 166
        C 74 166 66 164 66 158 Z
      "
    />
    <!-- Soft Helmet Visor Rim Shadow -->
    <path
      fill="#E5E7EB"
      d="
        M 66 158
        C 86 162 170 162 190 158
        L 188 165
        C 170 168 86 168 68 165 Z
      "
    />

    <!-- Soft Grey Minimalist Vault Dial on Helmet -->
    <circle cx="128" cy="116" r="20" fill="none" stroke="#D1D5DB" stroke-width="4" />
    <circle cx="128" cy="116" r="8" fill="none" stroke="#D1D5DB" stroke-width="3" />
    <circle cx="128" cy="116" r="4" fill="#00AA13" />

    <!-- Iconic Thick Peaceful Closed Eyes -->
    <path
      fill="none"
      stroke="#18181B"
      stroke-width="8.5"
      stroke-linecap="round"
      d="
        M 96 192
        C 102 200 114 200 120 192

        M 142 192
        C 148 200 160 200 166 192
      "
    />
  </g>
</svg>"""

# --------------------------------------------------------------------------
# OPTION 4: THE PURE DOUGHY BEAR WITH COIN (Karakter Murni Pemegang Kas)
# Karakter beruang kuning murni memegang koin emas & tunas hijau zamrud.
# --------------------------------------------------------------------------
style_chef_4_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-c4">
  <title id="title-c4">Beruang - The Pure Doughy Bear with Coin</title>
  <defs>
    <clipPath id="squircle-c4">
      <rect x="16" y="16" width="224" height="224" rx="56" />
    </clipPath>
  </defs>

  <rect x="16" y="16" width="224" height="224" rx="56" fill="#FF7009" />

  <g clip-path="url(#squircle-c4)">
    <!-- Golden Bear Ears -->
    <circle cx="76" cy="120" r="26" fill="#FFB600" />
    <circle cx="76" cy="120" r="15" fill="#EFA300" />

    <circle cx="180" cy="120" r="26" fill="#FFB600" />
    <circle cx="180" cy="120" r="15" fill="#EFA300" />

    <!-- Golden Doughy Bear Head -->
    <circle cx="128" cy="148" r="64" fill="#FFB600" />

    <!-- Cute Snout in slightly lighter yellow -->
    <ellipse cx="128" cy="162" rx="22" ry="16" fill="#FFCD38" />
    <path
      fill="#18181B"
      d="
        M 124 156
        C 124 152 126 150 128 150
        C 130 150 132 152 132 156
        C 132 160 130 162 128 162
        C 126 162 124 160 124 156 Z
      "
    />
    <path
      fill="none"
      stroke="#18181B"
      stroke-width="2.5"
      stroke-linecap="round"
      d="
        M 125 166
        Q 128 169 131 166
      "
    />

    <!-- Iconic Thick Peaceful Closed Eyes -->
    <path
      fill="none"
      stroke="#18181B"
      stroke-width="7.5"
      stroke-linecap="round"
      d="
        M 94 146
        C 99 153 109 153 114 146

        M 142 146
        C 147 153 157 153 162 146
      "
    />

    <!-- Cute Paws holding Gold Growth Coin & Emerald Leaf -->
    <ellipse cx="98" cy="222" rx="24" ry="18" fill="#EFA300" />
    <ellipse cx="158" cy="222" rx="24" ry="18" fill="#EFA300" />

    <!-- Gold Coin in Center -->
    <circle cx="128" cy="214" r="18" fill="#FDE047" stroke="#CA8A04" stroke-width="3" />
    <!-- Emerald Sprout / Leaf on coin -->
    <path
      fill="#00AA13"
      d="
        M 124 204
        C 124 196 132 194 136 194
        C 136 198 134 206 126 206 Z
      "
    />
  </g>
</svg>"""

# Lockup Builder
def make_lockup(symbol_inner, title):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 180" width="680" height="180" role="img" aria-labelledby="title-lockup">
  <title id="title-lockup">{title}</title>
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
        fill: #FF7009;
        letter-spacing: 2px;
      }}
    </style>
  </defs>
  <g transform="translate(24, 25) scale(0.5078)">
    {symbol_inner}
  </g>
  <text x="180" y="96" class="brand-title">Beruang</text>
  <text x="182" y="128" class="brand-tagline">AKSELERATOR KELAYAKAN UMKM</text>
</svg>"""

def get_inner(svg_str):
    start = svg_str.find(">") + 1
    end = svg_str.rfind("</svg>")
    return svg_str[start:end]

files = {
    "chef-style-1.svg": style_chef_1_svg,
    "chef-style-2.svg": style_chef_2_svg,
    "chef-style-3.svg": style_chef_3_svg,
    "chef-style-4.svg": style_chef_4_svg,
    "chef-style-1-lockup.svg": make_lockup(get_inner(style_chef_1_svg), "Beruang - Chef Vault Bear"),
    "chef-style-2-lockup.svg": make_lockup(get_inner(style_chef_2_svg), "Beruang - Bear Cloud Hat"),
    "chef-style-3-lockup.svg": make_lockup(get_inner(style_chef_3_svg), "Beruang - Vault Helmet Bear"),
    "chef-style-4-lockup.svg": make_lockup(get_inner(style_chef_4_svg), "Beruang - Doughy Bear with Coin"),
}

for name, content in files.items():
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("Generated all 4 chef-style vectors successfully!")
