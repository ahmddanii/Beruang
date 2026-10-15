import os
import subprocess

HTML_PATH = "public/branding/v5_two_eyes/overview.html"
PNG_PATH = "public/branding/v5_two_eyes/two-eyes-overview.png"

def read_svg(name):
    with open(os.path.join("public/branding/v5_two_eyes", name), "r", encoding="utf-8") as f:
        return f.read()

v1 = read_svg("v1-dual-rhomboid.svg")
v2 = read_svg("v2-dual-circular.svg")
v3 = read_svg("v3-dual-slit.svg")
v4 = read_svg("v4-dual-emerald-eyes.svg")
v5 = read_svg("v5-polaris-facets.svg")

# Read previous Concept A for direct comparison
with open("public/branding/v4_refinement/vault-refined-r27.svg", "r", encoding="utf-8") as f:
    v_old = f.read()

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Solusi Karakteristik Dua Mata (Anti-Mata Satu)</title>
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
      max-width: 1320px;
      margin: 0 auto 32px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 24px;
    }}

    .badge-alert {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(239, 68, 68, 0.15);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #F87171;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 12px;
    }}

    .badge-pill {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(5, 150, 105, 0.15);
      border: 1px solid rgba(5, 150, 105, 0.4);
      color: #34D399;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 12px;
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
      max-width: 1320px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }}

    /* Before vs After Notice Box */
    .notice-box {{
      background: #131B2A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 20px 24px;
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 24px;
      align-items: center;
    }}

    .notice-old-preview {{
      background: #FFFFFF;
      border-radius: 10px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }}

    .notice-old-preview svg {{
      width: 80px;
      height: 80px;
    }}

    .notice-text h3 {{
      font-size: 15px;
      color: #F87171;
      margin-bottom: 6px;
    }}

    .notice-text p {{
      font-size: 13px;
      color: #94A3B8;
      line-height: 1.5;
    }}

    /* Grid of 5 Variants */
    .grid-variants {{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }}

    .card {{
      background: #131B2A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }}

    .card.star {{
      border: 2px solid #059669;
      background: linear-gradient(180deg, #162438 0%, #101826 100%);
      box-shadow: 0 10px 30px -5px rgba(5, 150, 105, 0.3);
    }}

    .badge-card {{
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }}

    .badge-card.top {{
      background: #059669;
      color: #FFFFFF;
    }}

    .badge-card.opt {{
      background: rgba(148, 163, 184, 0.15);
      color: #94A3B8;
    }}

    .preview-box {{
      width: 100%;
      height: 170px;
      background: #FFFFFF;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
      padding: 12px;
    }}

    .preview-box svg {{
      width: 120px;
      height: 120px;
    }}

    .card-title {{
      font-size: 14px;
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
      font-size: 11px;
      color: #94A3B8;
      text-align: center;
      line-height: 1.45;
    }}

    /* Micro-scale row */
    .scale-strip {{
      background: #131B2A;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 20px 24px;
    }}

    .scale-title {{
      font-size: 14px;
      font-weight: 600;
      color: #F1F5F9;
      margin-bottom: 14px;
    }}

    .scale-row {{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
    }}

    .scale-cell {{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }}

    .scale-box {{
      width: 64px;
      height: 64px;
      background: #FFFFFF;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }}

    .scale-box svg {{
      width: 44px;
      height: 44px;
    }}

    .favicon-box {{
      width: 28px;
      height: 28px;
      background: #FFFFFF;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }}

    .favicon-box svg {{
      width: 16px;
      height: 16px;
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
    <div style="display: flex; gap: 10px;">
      <div class="badge-alert">Koreksi Kritis: Anti-Mata Satu / Anti-Dajjal</div>
      <div class="badge-pill">Karakteristik 2 Mata Beruang Biologis & Geometris</div>
    </div>
    <h1>Beruang — Rekonstruksi Karakteristik Dua Mata (Two-Eyed Anatomy)</h1>
    <p class="subtitle">
      Kekhawatiran Anda 100% tepat dan sangat sensitif bagi audiens: lingkaran tunggal di tengah pada konsep sebelumnya tidak sengaja memicu persepsi "mata satu / dajjal / cyclops". Sekarang, struktur wajah telah direkonstruksi secara benar: memiliki <strong>DUA MATA geometris yang jelas di posisi kiri & kanan</strong>, serta <strong>SATU hidung/brankas zamrud di bagian bawah</strong>.
    </p>
  </div>

  <div class="container">

    <!-- Notice Box -->
    <div class="notice-box">
      <div class="notice-old-preview">
        {v_old}
        <div style="font-size: 10px; color: #EF4444; font-weight: 700; margin-top: 6px;">KONSEP SEBELUMNYA</div>
      </div>
      <div class="notice-text">
        <h3>Penyebab Masalah Persepsi: Pareidolia Mata Satu</h3>
        <p>
          Pada konsep sebelumnya, niat desain adalah membuat rongga brankas kas (vault aperture) dengan batu penjuru zamrud di tengah. Namun karena berada di dalam siluet kepala tanpa adanya mata di kiri-kanan, alam bawah sadar manusia otomatis membaca lingkaran tengah itu sebagai <strong>SATU BOLA MATA (Cyclops / Dajjal)</strong>.
          <br><br>
          <strong>Solusi Mutlak:</strong> Memisahkan fungsi optik dengan tegas. Dua mata biologis beruang ditempatkan di posisi atas (kiri & kanan), dan rongga brankas/hidung zamrud berada di bawah.
        </p>
      </div>
    </div>

    <!-- 5 Variants Grid -->
    <div>
      <div style="font-size: 16px; font-weight: 600; color: #F8FAFC; margin-bottom: 14px;">
        5 Pilihan Gaya Dua Mata Beruang (Tetap Solid, Geometris & Bebas Kesan Kartun)
      </div>
      <div class="grid-variants">
        
        <!-- V1 -->
        <div class="card star">
          <span class="badge-card top">★ REKOMENDASI 1</span>
          <div class="preview-box">
            {v1}
          </div>
          <div class="card-title">V1: Discerning Guardian</div>
          <div class="card-meta">Dual Rhomboid Eyes + Emerald Vault</div>
          <div class="card-desc">
            Dua mata berlian geometris miring 15° menatap tajam dan waspada. Moncong brankas di bawah melindungi permata zamrud.
          </div>
        </div>

        <!-- V2 -->
        <div class="card star">
          <span class="badge-card top">★ REKOMENDASI 2</span>
          <div class="preview-box">
            {v2}
          </div>
          <div class="card-title">V2: Modernist Precision</div>
          <div class="card-meta">Dual Circular Eyes + Snout Aperture</div>
          <div class="card-desc">
            Pendekatan Bauhaus/Swiss. Dua mata lingkaran presisi murni + brankas koin zamrud. Sangat bersih dan terbaca jelas di 16px.
          </div>
        </div>

        <!-- V3 -->
        <div class="card">
          <span class="badge-card opt">OPSI 3</span>
          <div class="preview-box">
            {v3}
          </div>
          <div class="card-title">V3: Calm Executive</div>
          <div class="card-meta">Dual Horizontal Slit Eyes</div>
          <div class="card-desc">
            Mata slit horizontal yang tenang, dewasa, dan penuh perhitungan analitis. Moncong brankas vertikal dengan batu zamrud.
          </div>
        </div>

        <!-- V4 -->
        <div class="card star">
          <span class="badge-card top">★ DUAL EMERALD</span>
          <div class="preview-box">
            {v4}
          </div>
          <div class="card-title">V4: Dual Emerald Vision</div>
          <div class="card-meta">Kedua Mata Permata Zamrud</div>
          <div class="card-desc">
            Kedua matanya adalah permata hijau zamrud (#059669) yang bersinar! Memberi makna "Visi Pertumbuhan Modal". Hidung berupa brankas monolitik.
          </div>
        </div>

        <!-- V5 -->
        <div class="card">
          <span class="badge-card opt">OPSI 5</span>
          <div class="preview-box">
            {v5}
          </div>
          <div class="card-title">V5: Polaris Facets</div>
          <div class="card-meta">Geometric Sharp Eyes + Snout</div>
          <div class="card-desc">
            Gaya facet geometris murni (ala GitLab/Polestar). Sudut mata tajam ke arah tengah hidung.
          </div>
        </div>

      </div>
    </div>

    <!-- Scalability Strip: Squircle (64px) & Favicon (16px) -->
    <div class="scale-strip">
      <div class="scale-title">Uji Keterbacaan Anatomi Dua Mata pada Ikon Aplikasi (64px) & Favicon (16px)</div>
      <div class="scale-row">
        
        <div class="scale-cell">
          <div class="scale-box">{v1}</div>
          <div class="favicon-box">{v1}</div>
          <div class="scale-lbl">V1 (Rhomboid)</div>
        </div>

        <div class="scale-cell">
          <div class="scale-box">{v2}</div>
          <div class="favicon-box">{v2}</div>
          <div class="scale-lbl">V2 (Circular)</div>
        </div>

        <div class="scale-cell">
          <div class="scale-box">{v3}</div>
          <div class="favicon-box">{v3}</div>
          <div class="scale-lbl">V3 (Slit)</div>
        </div>

        <div class="scale-cell">
          <div class="scale-box">{v4}</div>
          <div class="favicon-box">{v4}</div>
          <div class="scale-lbl">V4 (Dual Emerald)</div>
        </div>

        <div class="scale-cell">
          <div class="scale-box">{v5}</div>
          <div class="favicon-box">{v5}</div>
          <div class="scale-lbl">V5 (Polaris)</div>
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
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", HTML_PATH, "-o", PNG_PATH, "--width", "1380", "--height", "1550"]
subprocess.run(cmd, check=True)
print(f"Rendered {PNG_PATH}")
