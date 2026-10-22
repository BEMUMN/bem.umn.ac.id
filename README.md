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
