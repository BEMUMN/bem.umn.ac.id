# QA redesain Lembar Terbuka

Tanggal: 20–21 Oktober 2026, Asia/Jakarta. Build produksi lokal, Node 25.2.1, Next 15.4.3, Chrome 155.0.8059.85. Branch feature/lembar-terbuka-redesign berasal dari 3227a0d. Source aplikasi yang diuji: 96f6ade. Tidak ada push atau deployment.

## Pemeriksaan fungsi dan aksesibilitas

Script yang dapat diulang: scripts/qa/browser.cjs. Playwright dan axe-core dipakai dari cache alat di luar dependency aplikasi. Tidak ada perubahan package.json atau package-lock.json.

- 10 halaman × 390/768/1024/1440/1920 px: satu h1, metadata tersedia, tidak ada overflow horizontal atau gambar rusak. Screenshot beranda viewport/full pada kelima ukuran; halaman lain full pada 390/768/1440.
- Axe WCAG 2 A/AA dan 2.1 AA pada 10 halaman seluler: tidak ada pelanggaran terdeteksi. Ini audit otomatis, bukan sertifikasi aksesibilitas.
- Keyboard: skip link, menu dan Escape, kategori dengan panah/Home/End, dialog Tab/Shift+Tab, Escape dan pemulihan fokus, navigasi kembali ke divisi.
- Direktori: pilih divisi, pencarian nama/jabatan/jurusan, hasil kosong dan reset, rincian anggota. Nama, jabatan, program studi, NIM, kutipan dan tautan sosial tetap dari data asli.
- Kegiatan: semua 6 KEGMA dan 6 program tampil, pencarian/filter/reset, disclosure deskripsi penuh, dialog dan tautan resmi, deep-link kategori.
- Beranda: next/previous, pemilihan judul, gesture swipe dan kategori. Tidak ada auto-advance yang mengganggu pembacaan.
- Keenam /members/[division] dialihkan ke URL detail lama yang sesuai; alamat tak dikenal dan divisi tak dikenal tetap HTTP 404.
- Native View Transition dipanggil pada navigasi yang didukung, fokus berpindah ke main tujuan. Reduced-motion dan Save-Data meniadakan motion ekspresif.
- Foto/data asli, seluruh constants konten, SVG resmi, konfigurasi deploy, package.json dan lockfile dibandingkan dengan 3227a0d: tidak berubah.

Target sentuh pendek pada breadcrumb, navigasi “Divisi”, dan pilihan “SAA” ditemukan saat QA lalu diperluas hingga minimal 44×44 px. Kesalahan harness menunggu FontFaceSet dan konstruksi Touch juga diperbaiki; keduanya bukan error situs.

Hasil mesin: [browser-results.json](after/browser-results.json). Kelima belas endpoint logo/OG/ikon juga mengembalikan HTTP 200 dengan byte sesuai manifest: [asset-http-results.json](after/asset-http-results.json). Build final dan lint lengkap lulus tanpa warning; log build ada di [build-report.txt](after/build-report.txt). Tes tidak membuka situs eksternal atau mengirim pesan/form; URL integrasi diperiksa terhadap data repo.

## Lighthouse mobile

Pengukuran sebelum/sesudah memakai Lighthouse 13.5.0, viewport 412×823, DPR 1.75, simulasi jaringan seluler dan CPU 4×, server produksi lokal. Baseline memiliki satu run. Setelah optimasi terakhir, tiga run dilakukan berurutan; laporan utama adalah run tengah berdasarkan skor Performance, bukan run terbaik. Angka metrik pada tabel berasal dari laporan tersebut, bukan gabungan angka terbaik antar-run. Seluruh run disimpan di performance-series/. Riwayat iterasi, termasuk pengukuran awal dan seri sebelum setiap optimasi, disimpan di performance-iterations/.

Hasil lab dapat berubah menurut perangkat, beban host, jaringan dan hosting. Benchmark CPU baseline 2929.5; selama iterasi turun ke 1219.5 lalu 887.5. Perbedaan ini membuat skor sebelum/sesudah tidak menjadi eksperimen terkontrol pada kondisi host identik. Throttling tidak diturunkan untuk menaikkan skor.

| Ukuran | Sebelum | Sesudah | Status |
| --- | ---: | ---: | --- |
| Performance | 75 | 97 | ≥90: lulus |
| Accessibility | 96 | 100 | Audit otomatis |
| Best Practices | 100 | 100 | Audit otomatis |
| SEO | 100 | 100 | Audit otomatis |
| FCP | 0.91 s | 0.76 s | Lab |
| LCP | 11.72 s | 2.529 s | <2.5 s: belum tercapai konsisten |
| TBT | 35 ms | 32 ms | Bukan INP lapangan |
| CLS | 0 | 0 | <0.1: lulus |
| Transfer awal | 2237 KiB | 243 KiB | Termasuk HTML, CSS, JS, font, gambar |
| First-load JS (Next build) | 201 kB | 111 kB | Perkiraan build; metode berbeda dari transfer Lighthouse |

Seri final, tanpa mengubah throttling:

| Run | Performance | LCP | TBT | Benchmark CPU |
| --- | ---: | ---: | ---: | ---: |
| 1 | 94 | 2.868 s | 110.6 ms | 1385.5 |
| 2 (laporan utama) | 97 | 2.529 s | 32.0 ms | 1913.5 |
| 3 | 97 | 2.519 s | 26.5 ms | 1819 |

Target LCP <2.5 s tetap terbuka. Nilai mentah laporan utama adalah 2529.4 ms, meskipun UI Lighthouse membulatkannya menjadi 2.5 s. Perbaikan berikutnya perlu diverifikasi pada host stabil dan perangkat/hosting produksi; laporan ini tidak mengklaim target tersebut sudah lulus. Tidak ada fitur, konten, atau pengaturan throttling yang dikurangi untuk menaikkan skor.

Seluruh transfer awal hanya sekitar 243 KiB, sehingga batas 500 KB untuk aset tambahan terpenuhi bahkan bila HTML/JS/CSS ikut dihitung. Tidak ada request pihak ketiga pada halaman. Semua raster baru berada di bawah batas individual 150 KB; detail ada di ASSETS.md.


Laporan: [sebelum](before/lighthouse-mobile.report.html), [sesudah](after/lighthouse-mobile.report.html). Konfigurasi dan angka mentah tersedia di before/baseline-summary.json dan after/lighthouse-summary.json. INP lapangan belum tersedia; TBT lab bukan pengganti INP. Tidak ada telemetry baru dipasang.

## Tes kualitas dan audit anti-slop

| Tes | Hasil dan bukti |
| --- | --- |
| Swap | Lipatan dari filosofi XVI, palet GSM, empat supergrafik resmi, foto pengurus dan dokumentasi asli membuat identitas tetap terkait BEM UMN. Tipografi dan grid sendiri bukan bukti keunikan; foto dan motif kontekstual memegang peran utama. |
| Squint | Screenshot ukuran kecil mempertahankan judul dominan, massa foto, bidang program gelap dan pergantian ritme. Teks penjelas berada di tingkat berikutnya, tanpa dekorasi yang lebih dominan. |
| Template | Hero asimetris, daftar program terpilih, statement/mission, foto direktori, motif nilai, dan footer tipografis memiliki susunan berbeda. Tidak memakai pola hero tengah + grid tiga kartu ikon. |
| Fungsi | Profil, katalog dan direktori berada satu klik dari nav desktop; pada seluler menu + tujuan dua klik. Kontak memiliki anchor langsung. Uji ini memeriksa jalur navigasi, bukan riset waktu tugas dengan peserta. Kabar/aspirasi belum memiliki data atau route asli, sehingga target itu tetap TODO konten. |
| Asset A | Artwork hero, seluruh gambar ber-alt kosong, dan motif nilai dimatikan: headline, isi, link, tombol, program dan kontak tetap terbaca. Kontrol pergantian program juga diuji saat aset tersebut dimatikan. Screenshot after/home-390-no-decoration-reduced-motion.png. |
| Asset B | [Contact sheet](asset-contact-sheet.webp): bidang navy/azure/linen, lipatan dan motif konsisten. Dokumentasi asli dipertahankan sebagai fotografi; tidak diganti visual buatan atau dipakai untuk klaim kegiatan lain. Hanya satu karya raster tambahan dipakai. |
| AI-tell | Tiga kandidat dilihat berdampingan: tidak tampak teks palsu, anatomi, permukaan plastik atau tepi meleleh. Shared sheets memiliki crease yang paling jelas pada ukuran kecil. Klaim ini inspeksi visual, bukan alat pendeteksi otomatis. |
| Anti-slop | Tidak ada gradient orb, glassmorphism, emoji dekoratif, statistik buatan, maskot baru, testimonial rekaan, kartu membulat seragam atau reveal scroll berulang. Statistik yang tampil berasal dari repo dan tetap membutuhkan konfirmasi institusi. |

## Screenshot

| Lebar | Sebelum | Sesudah |
| --- | --- | --- |
| 390 | [Full](before/home-390-full-reduced.png) | [Viewport](after/home-390.png) · [Full](after/home-390-full.png) |
| 768 | [Full](before/home-768-full-reduced.png) | [Viewport](after/home-768.png) · [Full](after/home-768-full.png) |
| 1024 | [Full](before/home-1024-full-reduced.png) | [Viewport](after/home-1024.png) · [Full](after/home-1024-full.png) |
| 1440 | [Full](before/home-1440-full-reduced.png) | [Viewport](after/home-1440.png) · [Full](after/home-1440-full.png) |
| 1920 | [Full](before/home-1920-full-reduced.png) | [Viewport](after/home-1920.png) · [Full](after/home-1920-full.png) |

Baseline full memakai reduced-motion karena implementasi lama memiliki reveal yang menyembunyikan konten pada tangkapan penuh. Screenshot sesudah memakai motion normal, setelah gambar lazy dimuat dengan scroll. Tinggi viewport 390 adalah 844; ukuran lainnya 1000. Detail metodologi baseline ada di before/AUDIT.md.

## Menjalankan ulang

```sh
npm ci
npm run build
npm run lint
./node_modules/.bin/eslint app components layouts constants

mkdir -p .next/standalone/public .next/standalone/.next/static
cp -R public/. .next/standalone/public/
cp -R .next/static/. .next/standalone/.next/static/
PORT=3100 HOSTNAME=127.0.0.1 node .next/standalone/server.js
```

Di terminal terpisah, gunakan instalasi alat QA yang tersedia:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright \
CHROME_PATH=/absolute/path/to/chrome \
AXE_PATH=/absolute/path/to/axe.min.js \
node scripts/qa/browser.cjs

lighthouse http://127.0.0.1:3100/ \
  --chrome-flags='--headless --no-sandbox' \
  --output=json --output=html \
  --output-path=docs/redesign/after/lighthouse-mobile --quiet

# Three-run series, preserving every result and selecting the middle score:
LIGHTHOUSE_CLI=/absolute/path/to/lighthouse/cli/index.js \
node scripts/qa/lighthouse.cjs
```

AXE_PATH wajib untuk mengulang audit otomatis aksesibilitas; bila tidak diberikan, script hanya menjalankan matriks/interaksi. Tidak perlu menambah Playwright/Lighthouse ke dependency produksi. Jalankan Lighthouse setelah browser QA ditutup agar tidak bersaing CPU.

## Batasan dan TODO

Safari/iOS dan perangkat Android fisik belum diuji dalam lingkungan ini; cakupan browser adalah Chrome. View Transition memiliki fallback tautan Next biasa; modal memakai dialog native. Pengujian tidak menilai reliabilitas layanan eksternal.

Potret individu, kanal kontak yang masih placeholder, sumber kabar/aspirasi, periode/nama kegiatan yang tidak konsisten, deskripsi motif dan klaim institusional menunggu konfirmasi pengurus. Daftar lengkap ada di ../../CHANGELOG-REDESIGN.md. Ini tidak diganti dengan data rekaan.
