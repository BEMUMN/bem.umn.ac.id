# BEM UMN GEN XVI

Website BEM Universitas Multimedia Nusantara, dibangun dengan Next.js, React, TypeScript, dan Tailwind CSS.

## Menjalankan lokal

```sh
npm ci
npm run dev
```

Buka http://localhost:3000. Hentikan server dengan Ctrl+C.

## Pemeriksaan

```sh
npm run lint
npm run build
```

Pemeriksaan browser opsional memakai Playwright yang sudah terpasang di lingkungan alat:

```sh
PLAYWRIGHT_MODULE=/absolute/path/to/playwright \
CHROME_PATH=/absolute/path/to/chrome \
QA_URL=http://localhost:3000 \
node scripts/qa/original-polish.cjs
```

Hasil tes dan screenshot ditulis ke `coverage/browser/` (diabaikan Git). Gunakan `QA_OUTPUT` untuk mengganti lokasi hasil.

## Struktur

- `app/`: halaman dan layout Next.js.
- `layouts/`: navbar, footer, dan section beranda.
- `components/`: komponen profil, direktori, dan kegiatan.
- `constants/`: data anggota, divisi, kegiatan, dan kontak.
- `public/`: aset yang dipakai serta referensi informasi dan identitas resmi.

## Build produksi standalone

```sh
npm run build
mkdir -p .next/standalone/public .next/standalone/.next/static
cp -R public/. .next/standalone/public/
cp -R .next/static/. .next/standalone/.next/static/
PORT=3000 HOSTNAME=127.0.0.1 node .next/standalone/server.js
```

## Foto pengurus

Potret disimpan di `public/pngs/members/anggota/<divisi>/` dan dipetakan melalui `constants/divisionMembers.ts`. `imageUrl` menjadi foto utama; `photos` berisi pilihan foto pada detail profil. Nama file mempertahankan nama anggota dan nomor pose dari ZIP sumber. Sebanyak 21 anggota memiliki foto; foto Josyca Nauli P. belum tersedia dan ditampilkan sebagai inisial. Pilihan produksi mencakup 41 foto WebP, lebar maksimal 800 px; arsip asli tetap berada di luar repo.

Untuk memeriksa pemetaan dan interaksi foto, jalankan `scripts/qa/member-photos.cjs` dengan variabel lingkungan Playwright/Chrome seperti contoh di atas. Hasilnya disimpan di `coverage/member-photos/`.

Pemeriksaan UI: `scripts/qa/original-polish.cjs` mencakup 10 halaman pada lima lebar layar. `scripts/qa/ui-polish.cjs` memeriksa pencarian pengurus, pemulihan fokus, filter kegiatan, dialog, dan kategori beranda. Keduanya memakai variabel lingkungan alat yang sama seperti contoh di atas.

Foto grup divisi memakai crop tampilan yang diatur per divisi di `components/DivisionPhoto.tsx`. File asli tidak diubah; pengguna dapat membuka foto utuh atau ukuran aslinya. Pemeriksaan komponen ini tersedia melalui `scripts/qa/division-photos.cjs`, dengan hasil di `coverage/division-photos/`.

Gerak halaman: navbar bersembunyi saat scroll turun dan muncul saat scroll naik. Filter kegiatan mengikuti alur halaman. Logo dekoratif beranda memakai kembali ukuran, posisi, animasi masuk, dan animasi scroll versi semula. Dekorasi disembunyikan saat bagian Program & Kegiatan masuk layar hingga footer, dan tampil kembali saat kembali ke bagian sebelumnya. Konten memakai reveal sekali saat masuk layar; dialog memakai transisi singkat. Preferensi reduced-motion dihormati. Pemeriksaan khusus tersedia di `scripts/qa/scroll-motion.cjs`.
