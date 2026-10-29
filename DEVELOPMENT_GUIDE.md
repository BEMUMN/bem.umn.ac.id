# DEVELOPMENT_GUIDE.md — Website BEM UMN Generasi XVI

> **Status:** Rekonstruksi, 29 Oktober 2026. Bukan salinan verbatim dokumen yang hilang. Validasi seluruh detail terhadap repository sebelum digunakan sebagai acuan final.

## 1. Tujuan dokumen
Panduan onboarding dan pengembangan untuk developer website BEM UMN Generasi XVI (`bem.umn.ac.id`). `AGENTS.md` mengatur perilaku coding agent; dokumen ini menjelaskan cara memahami, menjalankan, mengembangkan, menguji, dan mengintegrasikan proyek.

## 2. Teknologi yang tercatat
- Next.js 15.4.3, App Router; React 19.1.0; TypeScript 5.9.
- Tailwind CSS v4.1.12 (CSS-first).
- GSAP 3.13, `@gsap/react`, ScrollTrigger; Lenis 1.3.9; Swiper 11.2.10.
- ESLint 9.34 dan Prettier.
- Font lokal melalui `next/font/local`: Apple Garamond dan Bricolage Grotesque.

**Penting:** versi di atas merupakan snapshot percakapan sebelumnya, bukan hasil pemeriksaan repository terkini. `package.json` dan lockfile menjadi acuan aktual.

## 3. Persiapan lingkungan
1. Clone repository resmi `BEMUMN/bem.umn.ac.id` dan masuk ke direktori proyek.
2. Pastikan Node.js sesuai persyaratan `package.json`/`engines` jika tersedia. Lingkungan yang pernah dipakai adalah Windows dengan Node v26.7.0; versi tersebut bukan syarat minimum yang terverifikasi.
3. Instal dependensi menggunakan package manager dan lockfile yang digunakan repository (contoh `npm ci` bila memakai `package-lock.json`).
4. Jalankan `npx next dev` untuk development lokal. Pada lingkungan sebelumnya, perintah ini berjalan setelah opsi Turbopack tidak digunakan.
5. Buka `http://localhost:3000` dan periksa error terminal/browser.
6. Jangan memasukkan rahasia, kredensial, atau file `.env` ke commit.

## 4. Struktur proyek yang diketahui
| Lokasi | Fungsi |
| --- | --- |
| `app/` | App Router, halaman dan layout Next.js |
| `app/globals.css` | Global styling dan token CSS |
| `layouts/home-page/` | Bagian homepage seperti Hero dan Work |
| `components/` | Komponen UI yang dipakai bersama |
| `constants/divisionIndex.ts` | Indeks data divisi |
| `constants/divisionMembers.ts` | Data anggota/pengurus |
| `constants/workIndex.ts` | Data kegiatan atau program unggulan |
| `constants/galleryIndex.ts` | Indeks galeri |
| `constants/contactIndex.ts` | Informasi kontak |
| `public/svgs/`, `public/pngs/` | Aset visual lokal |

Struktur bisa berubah; selalu verifikasi file aktual sebelum mengedit.

## 5. Halaman dan tujuan konten
- `/`: landing page, pengenalan singkat, nilai kabinet, kegiatan unggulan, CTA ke subhalaman.
- `/tentang-kami`: profil institusional yang lebih mendalam.
- `/divisi`: direktori dan struktur divisi.
- `/divisi/[id]`: detail divisi dan anggota.
- `/kegiatan`: daftar kegiatan dan tautan terkait.
- `/members/[division]`: pernah tercatat sebagai redirect; pastikan status implementasi terbaru.

Navigasi utama: **Beranda, Tentang Kami, Divisi, Kegiatan**. Hindari mengulang isi lengkap Tentang Kami di homepage.

## 6. Identitas visual dan konten
Sumber kebenaran visual: Graphic Standard Manual (GSM), Figma yang telah disetujui, dan aset resmi BEM UMN Gen XVI.

| Token | Warna |
| --- | --- |
| Dark Navy | `#0F1E3F` |
| Primary Blue | `#2F486D` |
| Azure | `#B3C3D1` |
| Cream Linen | `#EEE5D9` |
| Camel Brown | `#997953` |
| Pale Taupe | `#D2C7B8` |
| Gray Brown | `#6C4D38` |

- Tagline: `#InclusiveforInnovation`.
- Teks hero: **Badan Eksekutif Mahasiswa** (tanpa tambahan “(BEM)”).
- CTA hero yang pernah disepakati: **Kenali BEM Gen XVI**.
- Pertahankan logo, supergrafik, tipografi, dan aset resmi; jangan menggantinya demi tren visual.
- Jangan menambah efek glass, gradien, dekorasi, atau animasi tanpa tujuan yang jelas.

## 7. Pola implementasi frontend
- Gunakan TypeScript dengan tipe yang eksplisit pada batas komponen dan data penting.
- Ikuti pola Server/Client Components yang sudah digunakan; tambahkan `use client` hanya ketika perlu interaksi/browser API.
- Utamakan komponen yang reusable tanpa membuat abstraksi berlebihan.
- Gunakan token styling dan pola Tailwind v4 yang benar; verifikasi utility class, jangan berasumsi class tersedia.
- Untuk gambar, pertimbangkan `next/image`, ukuran intrinsik, dan layout responsif.
- Pastikan struktur heading semantik (termasuk satu heading utama yang jelas pada homepage).
- Hindari placeholder atau tautan kosong yang tampak seperti fitur siap pakai.

## 8. Motion dan interaksi
- GSAP/ScrollTrigger dipakai untuk motion yang terarah; cleanup animasi saat unmount.
- Lenis boleh dipertahankan untuk smooth scrolling, tetapi jangan memaksa snap atau scroll-jacking.
- Swiper dipakai pada carousel bila sesuai dengan komponen yang ada.
- Animasi masuk/keluar viewport tidak boleh membuat konten permanen tersembunyi.
- Hormati `prefers-reduced-motion`.
- Pastikan keyboard navigation, focus state, touch target, dan dialog/modal dapat diakses.
- Periksa overflow dan clipping pada mobile, tablet, desktop, serta viewport tinggi/rendah.

## 9. Data dan konten
- Saat ini sejumlah data konten tercatat dalam file `constants/`.
- Jangan mengganti sumber data atau skema tanpa mengecek seluruh konsumen data tersebut.
- Pada kartu anggota, data yang direncanakan mencakup nama, NIM opsional, jurusan, serta kontak Instagram/email/LinkedIn.
- Jangan memasukkan data pribadi pengurus yang belum disetujui untuk dipublikasikan.
- Foto placeholder harus ditandai sebagai placeholder dan diganti sebelum rilis sesuai persetujuan konten.

## 10. Rencana CMS dan backend (belum dianggap selesai)
Kebutuhan yang pernah disepakati: dashboard admin custom untuk mengelola logo, teks, gambar, warna tema, dan data pengurus; editor visual dengan preview; database MySQL sesuai hosting kampus.

Arah arsitektur yang perlu divalidasi sebelum implementasi:
- Next.js route handlers atau layanan Node terpisah hanya bila ada kebutuhan operasional yang jelas.
- MySQL untuk data terstruktur; rancangan tabel dan migrasi harus direview.
- Autentikasi dan otorisasi admin, validasi input, audit perubahan, serta keamanan upload.
- Strategi penyimpanan gambar dan deployment disesuaikan dengan kemampuan hosting kampus.
- Perubahan tema melalui token terkontrol, bukan CSS arbitrer dari input pengguna.
- Frontend dapat dikerjakan lebih dulu dengan kontrak data yang stabil.

**Jangan menganggap CMS, autentikasi, database, atau endpoint telah terimplementasi tanpa bukti kode.**

## 11. Git dan kolaborasi
Repository organisasi: `BEMUMN/bem.umn.ac.id`.

Riwayat branch yang diketahui:
- `main`: branch utama.
- `feat/bem-gen-xvi-redesign`: branch pekerjaan pengguna, menuju `main`.
- `menyala-abangkuh-codingan-gw-panas-sampe-laptop-gw-meledak-tetap-ilmu-padi`: branch kolaborator, direncanakan menuju branch redesign.
- `bem-gen-xvi-redesign`: branch lokal yang pernah dibuat untuk tracking pekerjaan redesign.

Alur yang disepakati: audit perbedaan dahulu, pilih perubahan yang diterima, integrasikan branch kolaborator ke branch redesign, verifikasi, kemudian PR redesign ke `main`. Jangan merge membabi buta atau menimpa perubahan lokal.

## 12. Pemeriksaan kualitas
Sesuaikan dengan skrip yang benar-benar ada pada `package.json`:

```bash
git status
git diff --check
npx tsc --noEmit
npm run lint
npm run build
```

- Perintah di atas merupakan contoh pemeriksaan; beberapa skrip mungkin berbeda atau tidak tersedia.
- Verifikasi perubahan pada viewport relevan (contoh historis: 375×812, 390×844, 768×1024, 1366×768, 1920×1080, 2560×1440).
- Uji navigasi, carousel, modal, animasi, dan kondisi reduced-motion jika lingkungan pengujian tersedia.
- Laporkan dengan jelas mana yang benar-benar dijalankan, gagal, atau belum diuji.
- Pisahkan temuan P0 blocker, P1 penting, P2 minor/peningkatan.

## 13. Masalah historis untuk diverifikasi ulang
Temuan audit terdahulu, **bukan klaim bug yang masih ada saat ini**:
- Homepage pernah tidak memiliki `<h1>`.
- Utility `border-l-3`, `group-hover:scale-115`, dan `-z-15` perlu diverifikasi terhadap konfigurasi Tailwind v4 aktual.
- CSS `.gallery-column-fade` pernah memiliki nilai `top: -30` / `bottom: -30` tanpa satuan.
- Banner divisi pernah memakai supergrafik COLLABORATIVE secara hardcoded.
- Sejumlah foto anggota pernah masih menggunakan placeholder berulang.

## 14. Dokumentasi lokal dan pengecualian Git
Sesuai keputusan 18 Oktober 2026, `DEVELOPMENT_GUIDE.md` dan `DEVELOPMENT_HANDOFF_18_OKTOBER_2026.md` **tidak untuk di-commit** ke repository. Pastikan `.gitignore` aktual memuat pengecualian yang diinginkan; aturan ignore tidak otomatis menghapus file yang sudah tracked.

Dokumen ini bisa disimpan secara lokal sebagai catatan kerja. Hindari memasukkan password, token, API key, atau informasi rahasia organisasi.

## 15. Protokol sebelum perubahan
1. Baca `AGENTS.md`, panduan ini, dan skill relevan jika digunakan.
2. Pastikan branch dan status working tree.
3. Tinjau kebutuhan, sumber desain, dan file yang akan terdampak.
4. Untuk perubahan besar atau ambigu, ajukan rencana dan minta keputusan.
5. Lakukan perubahan kecil yang dapat diverifikasi.
6. Jalankan pemeriksaan yang tersedia dan review diff.
7. Laporkan file yang berubah, hasil pengujian, risiko, dan langkah lanjutan.

---

**Catatan pemulihan:** Dokumen ini disusun dari konteks percakapan dan referensi proyek yang tersedia hingga 29 Oktober 2026. Bukan file asli yang dipulihkan dari disk atau Git. Setiap detail implementasi wajib dicocokkan dengan repository saat ini.
