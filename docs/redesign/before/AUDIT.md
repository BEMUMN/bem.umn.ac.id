# Audit baseline BEM UMN — 20 Oktober 2026

Fase 0, tanpa perubahan source, konfigurasi, dependency manifest, lockfile, atau konten. Artefak audit berada di direktori sementara ini. Tidak ada commit atau push. Branch baru dibuat setelah persetujuan Fase 1, sebelum implementasi.

## Checkout dan stack

- Commit: `3227a0d` — `feat: major redesign and content update for BEM UMN Gen XVI website`.
- Branch: `menyala-abangkuh-codingan-gw-panas-sampe-laptop-gw-meledak-tetap-ilmu-padi`. Nama branch tidak memberi identitas kabinet tambahan.
- Next.js 15.4.3 App Router, React/React DOM 19.1.0, TypeScript 5, Tailwind CSS 4 + PostCSS; styling utility classes dan CSS global. Build default Next; dev Turbopack.
- npm dengan package-lock.json; Node lokal v25.2.1, npm 11.6.2. Tidak ditemukan pin runtime Node/.nvmrc/engines tingkat proyek; @types/node ^20 bukan pin runtime.
- Library: GSAP ^3.13.0, @gsap/react ^2.1.2, Lenis ^1.3.8, Swiper ^11.2.10, lucide-react ^0.541.0; ESLint 9, Prettier 3.
- `next.config.ts`: output standalone. Tidak disentuh.
- Konten: konstanta TypeScript di constants/ dan teks inline JSX; dua dokumen identitas di public/info dan public/graphic-standard-manual. Tidak ditemukan CMS, fetch API, backend form, route API, atau i18n. HTML lang=id.
- Integrasi berupa tautan eksternal Instagram, LinkedIn, Google Maps, dan enam situs KEGMA. Tujuan tautan dicatat dari repo; ketersediaan layanan pihak ketiga belum diuji.
- Meta judul/deskripsi global, profil, katalog kegiatan, direktori dan detail divisi tersedia. Favicon di app/favicon.ico, sekitar 158 KB. Tidak ditemukan OG per halaman, sitemap/robots khusus, atau custom 404.

## Route dan perilaku yang dipertahankan

| Route | Isi/perilaku | Hasil browser baseline |
| --- | --- | --- |
| / | Hero → Tentang → Nilai → carousel program/KEGMA/naungan → footer | Tampil pada 390/768/1440; tidak ada pageerror/overflow horizontal |
| /tentang-kami | Sejarah, visi/misi, filosofi logo, empat nilai, divisi | HTTP 200 |
| /divisi | Direktori enam divisi, pilihan Gen XVI, buka anggota, pencarian dalam divisi, modal anggota | HTTP 200 |
| /divisi/[id] | Detail, foto grup, anggota/modal, tautan divisi lain | BPH/SUKM/SUFAK/SULSO/PR/SUKMA semua HTTP 200 |
| /kegiatan | Enam KEGMA + enam proker, tab kategori, pencarian, empty/reset, modal KEGMA dan tautan eksternal | HTTP 200 |
| /members/[division] | Redirect lama ke /divisi/{division.toLowerCase()} | /members/BPH berakhir di /divisi/bph |
| route tidak dikenal | 404 bawaan Next | /divisi/invalid menghasilkan HTTP 404 |

Anchor homepage `#hero`, `#tentang`, `#nilai`, `#kegiatan`; halaman profil `#sejarah-section`, `#visi-misi-section`; katalog `#kegma-section`, `#proker-section` harus tetap hidup. Pemeriksaan route bukan bukti seluruh interaksi/keyboard telah lulus; QA interaksi penuh dilakukan pada slice/rollout.

## Komponen: semua modul tampilan

| Modul | Status dan peluang penggunaan ulang |
| --- | --- |
| app/layout.tsx | Font lokal, lang, metadata, body; fondasi global |
| app/page.tsx | Orkestrasi Lenis/GSAP homepage; terlalu banyak kerja client untuk halaman informasi |
| layouts/Navbar.tsx, Footer.tsx | Shared lintas halaman; pertahankan kontrak navigasi/kontak |
| layouts/home-page/Hero.tsx | Hero khusus homepage |
| layouts/home-page/AboutPreview.tsx | Preview profil; mengulang materi di TentangKamiContent |
| layouts/home-page/Values.tsx | Empat nilai; copy dan treatment mengulang halaman profil |
| layouts/home-page/Work.tsx | GSAP carousel desktop + Swiper mobile; DOM kartu terduplikasi dan item desktop digandakan tiga kali |
| layouts/home-page/Gallery.tsx | Tidak dipakai homepage aktif; GalleryColumn internal; 11 file foto sumber tidak ada |
| layouts/home-page/Member.tsx | Tidak dipakai homepage aktif; kartu flip desktop, MemberSwiper mobile |
| components/MemberSwiper.tsx | Dipakai hanya oleh Member yang tidak aktif |
| components/DivisionCard.tsx | Reusable direktori; sekaligus mengekspor mapping supergrafik |
| components/MemberCard.tsx | Reusable pada daftar dan detail divisi |
| components/MemberDetailModal.tsx | Reusable dialog anggota; Escape dan body lock; belum ada focus trap/restore eksplisit |
| components/DivisionListClient.tsx | State direktori, filter, modal |
| components/DivisionDetailClient.tsx | Daftar anggota dan modal di halaman detail |
| components/KegmaCard.tsx | Reusable dalam katalog kegiatan |
| components/KegiatanClient.tsx | Filter/tab/kartu proker/dialog KEGMA; pola dialog berulang dengan modal anggota |
| components/TentangKamiContent.tsx | Seluruh halaman profil; setup Lenis dan scroll reveal mengulang homepage |

Konstanta: index (navigasi), divisionIndex (6 divisi), divisionMembers (anggota), workIndex (6 proker, 6 KEGMA, 3 kelompok naungan), contactIndex (kontak), supergraphicIndex (4 motif), galleryIndex (referensi hilang). Data tetap pada sumber yang ada; tidak mengubah schema.

## Identitas dan konten

Acuan utama: public/graphic-standard-manual/bem-xvi.md dan public/info/INFO_ABOUT_BEM_XVI.md. Identitas GEN XVI, `Inclusive for Innovation`, `Commit. Solid. Integrated`; filosofi folded paper XVI: membuka lembaran dan ruang bagi perspektif beragam. Logo resmi tidak boleh diputar, dipotong, diwarnai ulang, atau diregangkan.

Palet resmi: navy #0F1E3F, blue #2F486D, steel #6D86A0, azure #B3C3D1, linen #EEE5D9, concrete #F2F2F2, brown #6C4D38, camel #997953, taupe #D2C7B8, white #FFFFFF. Font sekarang Apple Garamond regular/italic dan Bricolage Grotesque regular/medium/bold, semuanya TTF self-hosted melalui next/font/local dengan swap. Tidak ada berkas lisensi font di repo. Bricolage tersedia OFL dari pembuatnya; lisensi distribusi Apple Garamond belum terbukti di repo.

Empat supergrafik: Collaborative, Inclusive, Innovative, Solid. Tone Indonesia institusional, cukup panjang dan kadang repetitif. README masih GEN XV; halaman dan manual GEN XVI. Ada label periode 2026 dan 2026/2027. Dokumen info menyebut OMB, kode menampilkan UMN NEXT. Jangan menyelaraskan data ini diam-diam.

## Inventaris dan kelayakan aset

35 file media/font di public: 15 SVG, 15 WebP, 5 TTF; public termasuk dokumentasi berukuran 5.31 MB desimal. Manifest file rinci: asset-inventory.json. Contact sheet: assets-contact-sheet.png. Ukuran berikut adalah file sumber, bukan transfer gzip.

| Aset | Dimensi/format | Bobot | Penilaian |
| --- | --- | --- | --- |
| Foto pelantikan background.webp | 2576×1448 WebP | 551,530 B | Foto asli layak dipertahankan; jangan digunakan seolah dokumentasi tiap proker |
| DIVISI_BPH | 1446×2576 WebP | 204,082 B | Layak; portrait berisi ruang auditorium, jangan crop wajah |
| DIVISI_LSO | 1446×2576 WebP | 221,456 B | Layak; dapat tampil lebih besar |
| DIVISI_PR | 1446×2576 WebP | 199,890 B | Layak |
| DIVISI_SUFAK | 1446×2576 WebP | 145,498 B | Layak |
| DIVISI_SUKM | 1446×2576 WebP | 186,372 B | Layak |
| DIVISI_SUKMA | 1446×2576 WebP | 150,794 B | Layak |
| tes_foto_anggota.webp | 328×328 WebP | 18,310 B | Gambar meme, bukan foto pengurus; dipakai berulang oleh profil. TODO konfirmasi pengganti |
| ASSET.webp | 3246×4056 WebP | 966,926 B | Tekstur navy layak sebagai bahan; terlalu berat untuk tile 220–320 px |
| Logo KEGMA (6) | 500×500–4500×4500 WebP; festival 2727×3266 | 77,002–547,834 B/file | Pertahankan identitas/aspek, resize sesuai kebutuhan |
| Logo/motif SVG (15) | Vektor; sebagian memiliki metadata dan data tertanam | 8,179–279,725 B/file | Pertahankan visual resmi; optimasi lossless perlu visual diff |
| LOGO_BEM.svg, logo GEN XVI light/dark | SVG | 191,834 / 84,046 / 97,381 B | Terlalu berat untuk ukuran tampil; tidak digambar ulang |
| Empat supergrafik | SVG 680×660 | 8,179–8,560 B | Layak dipakai apa adanya, terikat makna nilai |
| Apple Garamond regular/italic | TTF | 47,476 / 46,560 B | Lisensi belum terdokumentasi |
| Bricolage regular/medium/bold | TTF | 114,964 / 114,764 / 116,324 B | Layak; OFL harus disertakan, optimasi WOFF2 subset |

Tidak ada video. Folder dokumentasi aktual hanya public/pngs/gallery dengan satu foto pelantikan. galleryIndex menunjuk 11 JPG yang tidak ada; komponen Gallery saat ini tidak dirender. app/favicon.ico berada di luar public dan terunduh sekitar 158 KB dalam Lighthouse.

## Verifikasi baseline

- npm ci berhasil: 343 paket, lockfile tidak berubah. Percobaan pertama gagal DNS ENOTFOUND dalam sandbox, kemudian berhasil dengan akses jaringan yang diizinkan.
- npm run build berhasil; log build.log. First Load JS: homepage 201 kB, profil 172 kB, direktori 168 kB, detail 161 kB, kegiatan 159 kB.
- npm run lint berhasil, tanpa warning dalam cakupannya; lint.log.
- ESLint langsung app/components/layouts/constants: 0 error, 10 warning unused imports/variables pada Footer (2), AboutPreview (3), Gallery (2), Work (3); eslint.log. Cakupan lint default tidak mencakup seluruh layouts.
- Production preview http://127.0.0.1:3100 berhasil. next start memberi warning output standalone; tidak mengubah config untuk menutupinya.
- Screenshot viewport homepage 390×844, 768×1024, 1440×1000; file home-{width}.png. Section capture normal: home-{width}-{tentang,nilai,kegiatan}.png. Full page diberi label `full-reduced` karena diambil dengan prefers-reduced-motion agar konten reveal yang keluar viewport tidak hilang dari dokumentasi. Ini bukan screenshot full page motion normal.
- Browser findings: browser-findings.json. Tidak ada horizontal overflow atau pageerror pada homepage di tiga lebar. Pemeriksaan 10 route konten, redirect, dan 404 berhasil.
- Lighthouse 13.5.0, Chrome headless, satu run pada build produksi localhost, emulasi mobile 412×823/DPR 1.75, simulated throttling 1.638 Mbps/RTT 150 ms/CPU×4. Bukan pengukuran lapangan atau median beberapa run.

| Metrik | Baseline |
| --- | --- |
| Performance | 75 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |
| FCP | 0.9 s |
| LCP | 11.7 s |
| Speed Index | 1.8 s |
| Total Blocking Time | 35 ms (UI membulatkan 40 ms) |
| CLS | 0 |
| Total transfer | 2,290,541 B / 2,237 KiB |

LCP yang ditandai adalah logo GEN XVI hero. Temuan: prioritas request LCP, dependency network, CSS render blocking, dan aset besar. Tekstur (~967 KB transfer), foto background CSS (~552 KB), favicon (~158 KB) merupakan tiga resource terbesar. LCP simulated dan timeline asli dalam breakdown tidak boleh disamakan. INP belum diukur; TBT bukan pengganti INP lapangan.

## Masalah visual/UX prioritas

1. Identitas punya modal kuat tetapi tenggelam oleh gradient, capsule, blur, shadow, outline, micro-label, dan watermark yang berulang. Foto asli dibuat sangat gelap sementara teks panggung dalam foto masih bersaing dengan judul.
2. Program berada setelah profil dan nilai; homepage mobile sepanjang 5937 px pada viewport uji. Banyak konten kelembagaan muncul sebelum tugas mahasiswa. Struktur pengurus tidak punya section aktif di homepage.
3. Tombol hero teks putih di azure: kontras terukur 1.8:1, gagal AA. `--navy-dark` ada sebagai CSS variable tetapi tidak dipetakan menjadi `--color-navy-dark` dalam @theme; class text-navy-dark/bg-navy-dark/from-navy-dark tidak memperoleh utility warna yang dimaksud. Masalah serupa pada navy-blue.
4. Tombol menu 38×38 px, di bawah target brief 44 px; tidak punya aria-expanded. Accessible name beberapa link tidak memuat teks visual. Semua teks terkena user-select:none, menghambat salin alamat/nama.
5. Motion belum merata menghormati reduced-motion: homepage dan profil memeriksa preferensi, tetapi Navbar, Work, bounce/pulse dan perpindahan direktori masih punya gerak. Konten reveal menghilang lagi saat meninggalkan viewport. Lenis menggunakan syncTouch di homepage.
6. Kartu program menggunakan foto pelantikan yang sama, membuat program sulit dibedakan dan berisiko dibaca sebagai dokumentasi tiap kegiatan.
7. Banyak body/caption 10–14 px, panjang baris/kontras sekunder lemah, dan teks justify di layar kecil. Pada tablet, layout program memakai kolom sempit.
8. Semua foto individu adalah meme placeholder. Ini temuan konten bawaan, tidak boleh diganti dengan wajah generate.
9. Tidak ada sumber kabar/pengumuman atau form aspirasi. Kontak langsung email/LINE/WhatsApp, TikTok, Facebook masih placeholder. Situs tidak boleh menjanjikan kanal yang belum ada.

## Yang dipertahankan dan risiko

Pertahankan logo resmi dan varian yang sudah ada, empat supergrafik, foto grup/pelantikan, seluruh route/redirect/anchor, teks/nama/jabatan/program pada sumber aktif, metadata, tab/filter/search/reset/modal/carousel, tujuan tautan eksternal, dan lang=id. Infrastruktur/deploy tetap.

Risiko implementasi: global tokens dapat mengubah semua route sekaligus; shared Navbar/Footer harus diuji lintas halaman; GSAP/Lenis lifecycle dan fokus setelah navigasi/modal; import mapping dari client component pada server page perlu tetap kompatibel; font berbeda dapat mengubah line-wrap; SVG mengandung metadata/data tertanam sehingga optimasi tidak boleh merusak logo. Jangan upgrade framework untuk redesain ini.

## Panduan desain

Tidak ditemukan skill desain lengkap di ~/.agents/skills atau ~/.codex/skills. /Users/jgo/Downloads/SKILL.md adalah lampiran `design-taste-frontend`; dibaca sebagai panduan yang diminta. scripts/draw.mjs, inspect.mjs, lint.mjs, library dan references pendamping tidak tersedia. Tidak ada undian direction/seed atau skor inspector yang diklaim. Prinsip yang dipakai: ide dari identitas, hierarki ekstrem, dua font, komposisi berbeda antarseksi, foto asli, screenshot nyata, dan tanpa chrome dekoratif. Brief pengguna mengungguli aturan lampiran: palet linen resmi, pembatasan jumlah aset, larangan konten rekaan, dan gerbang persetujuan.

## TODO: konfirmasi konten

- Foto individual yang benar untuk mengganti meme; opsi sementara netral tanpa wajah perlu persetujuan.
- Kanal resmi aspirasi serta email/LINE/WhatsApp; sumber kabar/pengumuman jika fitur tersebut masuk scope.
- Periode 2026 vs 2026/2027, OMB vs UMN NEXT, ejaan nama yang tidak konsisten antar dokumen. Pertahankan data aktif sampai dikonfirmasi.
- Lisensi Apple Garamond; usulan Fase 1 menggunakan Newsreader OFL sebagai pengganti headline, dengan persetujuan deviasi tipografi GSM.

## Dev server dan status akhir

`npm run dev -- --hostname 127.0.0.1 --port 3101` berhasil (Turbopack ready 1028 ms). Homepage dikompilasi dalam 1974 ms dan GET / mengembalikan HTTP 200. Sandbox awal menolak bind/connect lokal; pengulangan dengan akses yang diizinkan berhasil. Tidak ada error aplikasi pada permintaan ini. Working tree tetap bersih setelah install/build/lint/dev/screenshot. File next-env.d.ts, node_modules, dan .next adalah keluaran tooling yang diabaikan Git.
