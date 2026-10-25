import os

OUT_DIR = "public/branding/vault_redesign"
os.makedirs(OUT_DIR, exist_ok=True)

# -------------------------------------------------------------
# STYLE 1: THE CALM GUARDIAN (Sculpted Head + Friendly Calm Eyes, like Ref 1 & 4)
# -------------------------------------------------------------
# Continuous outer contour with ears flowing directly into cheeks.
# Real negative-space cutout for the muzzle and eyes.
style_1_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-s1">
  <title id="title-s1">Beruang - The Calm Guardian</title>
  <!-- Main Head Silhouette with Ear-to-Cheek Continuous Flow & EvenOdd Cutouts -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 72
      C 106 72 96 52 82 42
      C 66 32 48 42 46 64
      C 44 84 50 102 46 124
      C 40 158 54 192 84 214
      C 102 226 120 228 128 228
      C 136 228 154 226 172 214
      C 202 192 216 158 210 124
      C 206 102 212 84 210 64
      C 208 42 190 32 174 42
      C 160 52 150 72 128 72 Z

      M 128 112
      C 152 112 170 128 170 150
      C 170 172 152 188 128 188
      C 104 188 86 172 86 150
      C 86 128 104 112 128 112 Z

      M 80 114
      C 80 108 92 108 92 114
      C 92 120 80 120 80 114 Z

      M 164 114
      C 164 108 176 108 176 114
      C 176 120 164 120 164 114 Z
    "
  />
  <!-- Emerald Growth Nose inside Muzzle -->
  <path
    fill="#00AA13"
    d="
      M 128 132
      C 138 132 144 137 144 144
      C 144 152 136 158 128 158
      C 120 158 112 152 112 144
      C 112 137 118 132 128 132 Z
    "
  />
</svg>
"""

# -------------------------------------------------------------
# STYLE 2: THE MINIMAL ICONIC SILHOUETTE (Directly inspired by Ref 4)
# -------------------------------------------------------------
# Strong, bold, institutional contour. Flat dip at top, round high ears,
# clean circular vault muzzle with a prominent horizontal oval nose.
style_2_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-s2">
  <title id="title-s2">Beruang - The Pure Vault Silhouette</title>
  <!-- Bold Sculpted Contour (Ref 4 style) with clean negative space muzzle -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 128 78
      L 98 78
      C 82 78 72 64 68 50
      C 62 34 46 36 44 52
      C 42 70 48 88 44 110
      C 38 148 52 186 86 212
      C 104 226 120 228 128 228
      C 136 228 152 226 170 212
      C 204 186 218 148 212 110
      C 208 88 214 70 212 52
      C 210 36 194 34 188 50
      C 184 64 174 78 158 78
      L 128 78 Z

      M 128 106
      C 154 106 174 124 174 150
      C 174 176 154 194 128 194
      C 102 194 82 176 82 150
      C 82 124 102 106 128 106 Z
    "
  />
  <!-- Emerald Growth Nose (Horizontal rounded pebble) -->
  <path
    fill="#00AA13"
    d="
      M 112 144
      C 112 137 119 133 128 133
      C 137 133 144 137 144 144
      C 144 151 137 155 128 155
      C 119 155 112 151 112 144 Z
    "
  />
</svg>
"""

# -------------------------------------------------------------
# STYLE 3: THE CHILL TECH VAULT (Capsule Squoval Head inspired by Ref 5 & Ref 1)
# -------------------------------------------------------------
# Modern pill/capsule shape, ears with notch separation,
# confident calm eyes, and rounded rectangular vault snout.
style_3_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="title-s3">
  <title id="title-s3">Beruang - The Modern Tech Bear</title>
  <!-- Left Ear -->
  <path
    fill="#0081A0"
    d="
      M 54 84
      C 44 72 46 44 64 36
      C 82 28 94 48 92 62
      C 76 66 62 74 54 84 Z
    "
  />
  <!-- Right Ear -->
  <path
    fill="#0081A0"
    d="
      M 202 84
      C 212 72 210 44 192 36
      C 174 28 162 48 164 62
      C 180 66 194 74 202 84 Z
    "
  />
  <!-- Capsule Head with Cutouts -->
  <path
    fill="#0081A0"
    fill-rule="evenodd"
    d="
      M 80 56
      C 112 52 144 52 176 56
      C 202 60 208 92 208 128
      C 208 174 198 220 168 226
      C 144 230 112 230 88 226
      C 58 220 48 174 48 128
      C 48 92 54 60 80 56 Z

      M 76 112
      C 76 106 88 106 96 110
      C 88 116 76 118 76 112 Z

      M 180 112
      C 180 106 168 106 160 110
      C 168 116 180 118 180 112 Z

      M 110 120
      C 110 112 118 106 128 106
      C 138 106 146 112 146 120
      L 146 164
      C 146 172 138 178 128 178
      C 118 178 110 172 110 164 Z
    "
  />
  <!-- Emerald Growth Nose & Smile Arc -->
  <path
    fill="#00AA13"
    d="
      M 120 126
      C 120 120 124 116 128 116
      C 132 116 136 120 136 126
      C 136 132 124 132 120 126 Z

      M 122 152
      C 122 156 134 156 134 152
      C 134 148 122 148 122 152 Z
    "
  />
</svg>
"""

with open(os.path.join(OUT_DIR, "style-1.svg"), "w", encoding="utf-8") as f:
    f.write(style_1_svg.strip() + "\n")

with open(os.path.join(OUT_DIR, "style-2.svg"), "w", encoding="utf-8") as f:
    f.write(style_2_svg.strip() + "\n")

with open(os.path.join(OUT_DIR, "style-3.svg"), "w", encoding="utf-8") as f:
    f.write(style_3_svg.strip() + "\n")

print("Generated style-1.svg, style-2.svg, style-3.svg")
