import os
import subprocess

HTML_PATH = "public/branding/v11_rupiah_bear/overview.html"
PNG_PATH = "public/branding/v11_rupiah_bear/rupiah-bear-overview.png"

def read_svg(name):
    with open(os.path.join("public/branding/v11_rupiah_bear", name), "r", encoding="utf-8") as f:
        return f.read()

v1 = read_svg("v1-serene-rupiah-blue.svg")
v2 = read_svg("v2-confident-rupiah-blue.svg")
v3 = read_svg("v3-squircle-app-icon.svg")
v4 = read_svg("v4-golden-honey-rupiah.svg")

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Beruang - Adaptasi Flat Vektor Memegang Uang Lembar Rupiah</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    
    body {{
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #080C14;
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

    /* 4 Options Grid */
    .grid-options {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }}

    .card {{
      background: #0F1626;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }}

    .card.highlight {{
      border: 2px solid #00AA13;
      background: linear-gradient(180deg, #13241F 0%, #0D1620 100%);
      box-shadow: 0 12px 36px -8px rgba(0, 170, 19, 0.35);
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
      background: #00AA13;
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

    .preview-box.dark-bg {{
      background: #080C14;
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

    /* Comparison Banner with Reference */
    .compare-banner {{
      background: #0F1626;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 24px;
      display: grid;
      grid-template-columns: 1fr 2.5fr;
      gap: 28px;
      align-items: center;
    }}

    .ref-card {{
      background: #1A2234;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }}

    .ref-card img {{
      width: 120px;
      height: 120px;
      border-radius: 28px;
      object-fit: cover;
      margin-bottom: 10px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }}

    .transform-specs h3 {{
      font-size: 16px;
      color: #34D399;
      font-weight: 700;
      margin-bottom: 8px;
    }}

    .transform-specs ul {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 13px;
      color: #CBD5E1;
    }}

    .transform-specs li {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}

    .transform-specs li span.check {{
      color: #10B981;
      font-weight: 700;
    }}

    /* Scalability Strip */
    .scale-strip {{
      background: #0F1626;
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

    .display-row {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}

    .app-icon-wrap {{
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
      <div class="badge-pill badge-green">✓ Eksekusi Flat Vector Clean</div>
      <div class="badge-pill badge-green">✓ Memegang Uang Lembar Rupiah (Bukan Koin/Daun)</div>
      <div class="badge-pill badge-blue">✓ Warna Selaras Beranda (#0066D6 & #00AA13)</div>
    </div>
    <h1>Beruang — Adaptasi Flat Vektor Memegang Uang Lembar Rupiah</h1>
    <p class="subtitle">
      Dibuat langsung merujuk pada gambar referensi Anda: figur beruang yang menggemaskan, ramah, dan bersahaja, namun dieksekusi dalam bentuk <strong>flat vector murni yang bersih (clean)</strong>, mengganti koin & daun menjadi <strong>selembar uang kertas Rupiah hijau</strong>, dan menyelaraskan warnanya dengan palet proyek.
    </p>
  </div>

  <div class="container">

    <!-- Comparison Banner with Reference Image -->
    <div class="compare-banner">
      <div class="ref-card">
        <img src="ref_user.png" alt="Gambar Referensi Pengguna" />
        <div style="font-size: 11px; font-weight: 700; color: #F59E0B;">REFERENSI PENGGUNA</div>
        <div style="font-size: 10px; color: #94A3B8; margin-top: 2px;">Clay 3D / Oranye / Koin & Daun</div>
      </div>
      <div class="transform-specs">
        <h3>Transformasi Desain Sesuai Arahan Anda:</h3>
        <ul>
          <li><span class="check">✔</span> <strong>Gaya Flat Vector Clean:</strong> Menghilangkan tekstur clay/3D glossy berlebih, diubah menjadi bentuk vektor geometris yang presisi dan tajam.</li>
          <li><span class="check">✔</span> <strong>Uang Lembar Rupiah Hijau:</strong> Menghilangkan koin emas & daun; kini kedua tangan beruang memegang selembar uang kertas Rupiah hijau pertumbuhan modal (#00AA13) dengan lambang "Rp".</li>
          <li><span class="check">✔</span> <strong>Harmonisasi Warna:</strong> Mengadopsi palet resmi aplikasi (GoPay Vibrant Blue #0066D6, Fresh Green #00AA13, dan Deep Blue #0052B3).</li>
        </ul>
      </div>
    </div>

    <!-- 4 Options Grid -->
    <div class="grid-options">

      <!-- V1 -->
      <div class="card highlight">
        <span class="badge-card primary">★ OPSI 1: SERENE BLUE</span>
        <div class="preview-box">
          {v1}
        </div>
        <div class="card-title">Opsi 1: The Serene Rupiah Bear</div>
        <div class="card-meta">Biru Proyek + Mata Tenang Referensi</div>
        <div class="card-desc">
          Paling mirip dengan ekspresi referensi asli: mata terpejam tenang dan damai, telinga bundar ramah, memegang uang lembar rupiah hijau (#00AA13) dengan lambang "Rp".
        </div>
      </div>

      <!-- V2 -->
      <div class="card">
        <span class="badge-card sec">OPSI 2: CONFIDENT</span>
        <div class="preview-box">
          {v2}
        </div>
        <div class="card-title">Opsi 2: The Confident Bear</div>
        <div class="card-meta">Mata Terbuka Cerdas & Ramah</div>
        <div class="card-desc">
          Pose yang sama memegang uang kertas Rupiah, namun dengan sepasang mata terbuka yang cerdas, optimis, dan siap membimbing UMKM.
        </div>
      </div>

      <!-- V3 -->
      <div class="card highlight">
        <span class="badge-card primary">★ OPSI 3: APP ICON SQUIRCLE</span>
        <div class="preview-box dark-bg">
          {v3}
        </div>
        <div class="card-title">Opsi 3: The Squircle App Icon</div>
        <div class="card-meta">Format Full Squircle Seperti Referensi</div>
        <div class="card-desc">
          Membungkus figur beruang ke dalam kanvas squircle gelap elegan (#0C121D) dengan ambient glow biru. Siap menjadi ikon aplikasi mobile berkelas dunia.
        </div>
      </div>

      <!-- V4 -->
      <div class="card">
        <span class="badge-card sec">OPSI 4: GOLDEN HONEY</span>
        <div class="preview-box">
          {v4}
        </div>
        <div class="card-title">Opsi 4: The Golden Honey Bear</div>
        <div class="card-meta">Warna Emas Asli + Rupiah Hijau</div>
        <div class="card-desc">
          Mempertahankan warna hangat emas/madu (#F59E0B) dari gambar asli Anda, namun tetap flat clean dan memegang uang lembar Rupiah hijau.
        </div>
      </div>

    </div>

    <!-- Scalability Strip -->
    <div class="scale-strip">
      <div class="scale-title">Uji Keterbacaan Ikon Aplikasi Seluler & Favicon 16px (True Micro-Scale Test)</div>
      <div class="scale-grid">

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{v1}</div>
            <div class="favicon-wrap">{v1}</div>
          </div>
          <div class="scale-lbl"><strong>Opsi 1</strong> (Serene Blue)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{v2}</div>
            <div class="favicon-wrap">{v2}</div>
          </div>
          <div class="scale-lbl"><strong>Opsi 2</strong> (Confident Open)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{v3}</div>
            <div class="favicon-wrap">{v3}</div>
          </div>
          <div class="scale-lbl"><strong>Opsi 3</strong> (Squircle Tile)</div>
        </div>

        <div class="scale-item">
          <div class="display-row">
            <div class="app-icon-wrap">{v4}</div>
            <div class="favicon-wrap">{v4}</div>
          </div>
          <div class="scale-lbl"><strong>Opsi 4</strong> (Golden Honey)</div>
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
cmd = ["python", ".agents/skills/logo-design/scripts/render_png.py", HTML_PATH, "-o", PNG_PATH, "--width", "1380", "--height", "1750"]
subprocess.run(cmd, check=True)
print(f"Rendered {PNG_PATH}")
