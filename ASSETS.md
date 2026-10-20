# Manifest aset — Lembar Terbuka

Semua aset produksi disimpan lokal. Tidak ada hotlink, stok baru, wajah sintetis, atau dokumentasi kegiatan buatan. Foto dan identitas resmi bersumber dari repo pada commit 3227a0d; hak atas materi institusi tetap mengikuti sumber semula, bukan diklaim sebagai aset bebas.

## Keluarga dan fungsi

| Keluarga | Fungsi dan lokasi | Pembuatan dan lisensi |
| --- | --- | --- |
| Pelantikan | Dokumentasi asli pada hero | public/pngs/gallery/background.webp; resize/encode, tanpa mengubah isi |
| Enam foto grup divisi | Direktori, profil divisi, preview BPH | public/pngs/members/divisi/; foto asli, crop presentasi melalui CSS |
| Shared sheets | Gagasan lembar terbuka di belakang foto hero | Built-in image_gen; satu karya terpilih, bukan dokumentasi |
| Enam logo KEGMA | Identifikasi kegiatan | public/svgs/logo_kegma/; resize fit-inside, proporsi dan warna dipertahankan |
| Logo BEM, UMN, kabinet dan empat supergrafik | Navigasi, footer, filosofi dan nilai | SVG asli repo tidak diubah |
| Ikon UI | Arah, pencarian, buka/tutup | lucide-react yang sudah terpasang; ISC, node_modules/lucide-react/LICENSE |
| Ilustrasi 404 | Status alamat tidak ditemukan | SVG inline deterministik di app/not-found.tsx; variabel CSS, dekoratif |
| Sepuluh gambar OG | Pratinjau setiap halaman aktif | Script deterministik, judul repo + logo resmi + bidang kertas; teks halaman tetap HTML |
| Favicon dan app icons | Identifikasi tab/perangkat | Rasterisasi proporsional LOGO_BEM.svg, bentuk/warna tidak diubah |
| LQIP | Mengisi ruang foto selama pemuatan | WebP 16 px inline dari sumber asli; constants/photo-placeholders.json |

## Tipografi

| Aset | Ukuran | Sumber/lisensi | Pemakaian |
| --- | ---: | --- | --- |
| public/fonts/redesign/newsreader-latin.woff2 | 22808 B | [Newsreader / Production Type](https://github.com/productiontype/Newsreader), SIL OFL 1.1; newsreader-OFL.txt | Display, judul, angka besar |
| public/fonts/redesign/bricolage-grotesque-latin.woff2 | 41456 B | [Bricolage / Atelier Triay](https://github.com/ateliertriay/bricolage), SIL OFL 1.1; bricolage-grotesque-OFL.txt | Teks dan kontrol |

Kedua font merupakan subset Latin WOFF2 yang diunduh melalui Google Fonts dan di-host sendiri. next/font/local menyediakan swap dan preload. Newsreader dibatasi ke bobot 400 yang dipakai, dengan optical size 48 untuk display; sumber CSS: https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@48,400&display=swap. Bricolage memakai optical size 18 untuk teks, tetap variable weight 400–700; sumber CSS: https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@18,400..700&display=swap. TTF Bricolage asli dipakai generator OG. Apple Garamond lama tetap tersimpan sebagai sumber warisan, tetapi tidak dimuat oleh halaman; lisensinya belum terdokumentasi.

## Seleksi dan pascaproduksi

Tiga kandidat menggunakan style lock identik. Semuanya sudah ditampilkan kepada pengguna; izin melanjutkan sampai akhir mencakup pemilihan. Shared sheets dipilih karena tiga bidang dan arah lipatannya terbaca pada ukuran kecil, sementara navy/azure menyambung ke palet resmi. Open leaf lebih menyerupai tumpukan produk; paper horizon memiliki variasi bidang yang kurang terbaca pada seluler. Inspeksi kandidat tidak menemukan huruf palsu, figur, tepi meleleh, atau benda tidak relevan. Pratinjau ada di docs/redesign/candidates/.

Satu master terpilih menghasilkan enam turunan produksi (tiga ukuran × dua format). Bersama tiga preview kandidat, jumlah raster hasil image generation tetap di bawah batas ±15 file. OG dan favicon dibuat dengan kode, bukan image generation.

Master resolusi penuh: assets-source/open-leaf.png, assets-source/shared-sheets.png, assets-source/paper-horizon.png. Ketiganya ada secara lokal dan diabaikan Git melalui assets-source/.gitignore. Salinan tool ada di /Users/jgo/.codex/generated_images/01a15a25-979a-7472-ae43-421bfbf20019/. File produksi dan preview dicatat Git sehingga checkout dapat dibangun tanpa master. Master tidak dapat direproduksi bit-identik dari prompt; tool tidak memberikan seed. Script optimasi dan geometri kode deterministik tanpa randomness.

Postproduction: rotate sesuai orientasi, resize maksimum sumber tanpa upscale, selected paper saturation 0.85 dan brightness 0.98, AVIF quality 44 dan WebP quality 68, metadata dibuang oleh sharp. Nama 1600 menunjukkan slot target; sumber 1446/1536 px tetap pada ukuran aslinya dan srcset memakai lebar sebenarnya. Foto dokumentasi tidak diberi grading yang mengubah isi. Logo KEGMA quality 80, fit-inside 320 px. Pelantikan memiliki tambahan kandidat 720 px agar perangkat seluler ber-DPR menengah tidak perlu mengunduh 960 px. LQIP 16 px untuk foto nonkritis, dimensi eksplisit, eager/prioritas tinggi untuk gambar utama, lazy-load sisanya. Native picture/img menampilkan foto tanpa menunggu hidrasi; foto hero tidak memakai placeholder yang harus dilepas oleh JavaScript. Foto memiliki alt sesuai subjek asli; gambar dekoratif memiliki alt kosong atau aria-hidden. Tidak ada teks informasi utama pada raster halaman.

## Reproduksi

Jalankan dari root setelah npm ci:

```sh
node scripts/assets/optimize.cjs
node scripts/assets/generate.cjs
```

Generator memakai sharp dan TypeScript yang sudah ada di dependency tree terkunci; tidak ada dependency tambahan atau perubahan lockfile. generate.cjs mengambil palet dari app/globals.css dan nama divisi dari constants/divisionIndex.ts. Geometri tetap, bukan acak. Versi encoder/font renderer berbeda dapat menghasilkan byte berbeda; source/palette/layout tetap sama. Tanpa master imagegen, optimize.cjs mempertahankan turunan yang dicatat. Gambar OG dapat memunculkan peringatan cache Fontconfig pada sandbox macOS, tetapi fontfile lokal diberikan eksplisit dan render sudah diperiksa.

LocalImage merender aset yang sudah dioptimasi sebagai img native, dengan dimensi, alt, lazy loading dan preload untuk aset prioritas. Pengecualian lint no-img-element dibatasi pada komponen ini karena optimasi dilakukan saat pembuatan aset; alt tetap diwajibkan oleh tipe dan linter aksesibilitas. Next Image tetap menangani potret individu nyata jika ditambahkan ke data nanti.

## Manifest produksi terperinci

Ukuran adalah byte file, bukan transfer gzip. Semua raster baru di bawah 150 KB. Foto teroptimasi maksimum 81,964 B. Inventaris sumber lama lengkap ada di docs/redesign/before/asset-inventory.json. SVG resmi di atas 15 KB dipertahankan byte-for-byte sebagai pengecualian demi keutuhan logo; berkas ini bukan aset baru.

| File publik | Dimensi | Byte | Sumber | Lokasi |
| --- | --- | ---: | --- | --- |
| /images/pelantikan-480.webp | 480×270 | 14866 | public/pngs/gallery/background.webp | Hero dokumentasi asli |
| /images/pelantikan-480.avif | 480×270 | 11130 | public/pngs/gallery/background.webp | Hero dokumentasi asli |
| /images/pelantikan-720.webp | 720×405 | 26312 | public/pngs/gallery/background.webp | Hero dokumentasi asli |
| /images/pelantikan-720.avif | 720×405 | 18134 | public/pngs/gallery/background.webp | Hero dokumentasi asli |
| /images/pelantikan-960.webp | 960×540 | 38914 | public/pngs/gallery/background.webp | Hero dokumentasi asli |
| /images/pelantikan-960.avif | 960×540 | 25317 | public/pngs/gallery/background.webp | Hero dokumentasi asli |
| /images/pelantikan-1600.webp | 1600×899 | 76656 | public/pngs/gallery/background.webp | Hero dokumentasi asli |
| /images/pelantikan-1600.avif | 1600×899 | 45378 | public/pngs/gallery/background.webp | Hero dokumentasi asli |
| /images/divisi-bph-480.webp | 480×855 | 15246 | public/pngs/members/divisi/DIVISI_BPH.webp | Beranda, direktori, detail BPH |
| /images/divisi-bph-480.avif | 480×855 | 9485 | public/pngs/members/divisi/DIVISI_BPH.webp | Beranda, direktori, detail BPH |
| /images/divisi-bph-960.webp | 960×1710 | 38630 | public/pngs/members/divisi/DIVISI_BPH.webp | Beranda, direktori, detail BPH |
| /images/divisi-bph-960.avif | 960×1710 | 20697 | public/pngs/members/divisi/DIVISI_BPH.webp | Beranda, direktori, detail BPH |
| /images/divisi-bph-1600.webp | 1446×2576 | 81934 | public/pngs/members/divisi/DIVISI_BPH.webp | Beranda, direktori, detail BPH |
| /images/divisi-bph-1600.avif | 1446×2576 | 44314 | public/pngs/members/divisi/DIVISI_BPH.webp | Beranda, direktori, detail BPH |
| /images/divisi-sukm-480.webp | 480×855 | 14088 | public/pngs/members/divisi/DIVISI_SUKM.webp | Direktori dan detail divisi |
| /images/divisi-sukm-480.avif | 480×855 | 9008 | public/pngs/members/divisi/DIVISI_SUKM.webp | Direktori dan detail divisi |
| /images/divisi-sukm-960.webp | 960×1710 | 36706 | public/pngs/members/divisi/DIVISI_SUKM.webp | Direktori dan detail divisi |
| /images/divisi-sukm-960.avif | 960×1710 | 19372 | public/pngs/members/divisi/DIVISI_SUKM.webp | Direktori dan detail divisi |
| /images/divisi-sukm-1600.webp | 1446×2576 | 73076 | public/pngs/members/divisi/DIVISI_SUKM.webp | Direktori dan detail divisi |
| /images/divisi-sukm-1600.avif | 1446×2576 | 37699 | public/pngs/members/divisi/DIVISI_SUKM.webp | Direktori dan detail divisi |
| /images/divisi-sufak-480.webp | 480×855 | 13440 | public/pngs/members/divisi/DIVISI_SUFAK.webp | Direktori dan detail divisi |
| /images/divisi-sufak-480.avif | 480×855 | 8182 | public/pngs/members/divisi/DIVISI_SUFAK.webp | Direktori dan detail divisi |
| /images/divisi-sufak-960.webp | 960×1710 | 33476 | public/pngs/members/divisi/DIVISI_SUFAK.webp | Direktori dan detail divisi |
| /images/divisi-sufak-960.avif | 960×1710 | 17352 | public/pngs/members/divisi/DIVISI_SUFAK.webp | Direktori dan detail divisi |
| /images/divisi-sufak-1600.webp | 1446×2576 | 59926 | public/pngs/members/divisi/DIVISI_SUFAK.webp | Direktori dan detail divisi |
| /images/divisi-sufak-1600.avif | 1446×2576 | 28223 | public/pngs/members/divisi/DIVISI_SUFAK.webp | Direktori dan detail divisi |
| /images/divisi-lso-480.webp | 480×855 | 13406 | public/pngs/members/divisi/DIVISI_LSO.webp | Direktori dan detail divisi |
| /images/divisi-lso-480.avif | 480×855 | 7989 | public/pngs/members/divisi/DIVISI_LSO.webp | Direktori dan detail divisi |
| /images/divisi-lso-960.webp | 960×1710 | 36160 | public/pngs/members/divisi/DIVISI_LSO.webp | Direktori dan detail divisi |
| /images/divisi-lso-960.avif | 960×1710 | 17584 | public/pngs/members/divisi/DIVISI_LSO.webp | Direktori dan detail divisi |
| /images/divisi-lso-1600.webp | 1446×2576 | 73364 | public/pngs/members/divisi/DIVISI_LSO.webp | Direktori dan detail divisi |
| /images/divisi-lso-1600.avif | 1446×2576 | 32573 | public/pngs/members/divisi/DIVISI_LSO.webp | Direktori dan detail divisi |
| /images/divisi-pr-480.webp | 480×855 | 15210 | public/pngs/members/divisi/DIVISI_PR.webp | Direktori dan detail divisi |
| /images/divisi-pr-480.avif | 480×855 | 9220 | public/pngs/members/divisi/DIVISI_PR.webp | Direktori dan detail divisi |
| /images/divisi-pr-960.webp | 960×1710 | 38722 | public/pngs/members/divisi/DIVISI_PR.webp | Direktori dan detail divisi |
| /images/divisi-pr-960.avif | 960×1710 | 20061 | public/pngs/members/divisi/DIVISI_PR.webp | Direktori dan detail divisi |
| /images/divisi-pr-1600.webp | 1446×2576 | 81964 | public/pngs/members/divisi/DIVISI_PR.webp | Direktori dan detail divisi |
| /images/divisi-pr-1600.avif | 1446×2576 | 43593 | public/pngs/members/divisi/DIVISI_PR.webp | Direktori dan detail divisi |
| /images/divisi-sukma-480.webp | 480×855 | 13486 | public/pngs/members/divisi/DIVISI_SUKMA.webp | Direktori dan detail divisi |
| /images/divisi-sukma-480.avif | 480×855 | 8399 | public/pngs/members/divisi/DIVISI_SUKMA.webp | Direktori dan detail divisi |
| /images/divisi-sukma-960.webp | 960×1710 | 33508 | public/pngs/members/divisi/DIVISI_SUKMA.webp | Direktori dan detail divisi |
| /images/divisi-sukma-960.avif | 960×1710 | 18168 | public/pngs/members/divisi/DIVISI_SUKMA.webp | Direktori dan detail divisi |
| /images/divisi-sukma-1600.webp | 1446×2576 | 63112 | public/pngs/members/divisi/DIVISI_SUKMA.webp | Direktori dan detail divisi |
| /images/divisi-sukma-1600.avif | 1446×2576 | 30963 | public/pngs/members/divisi/DIVISI_SUKMA.webp | Direktori dan detail divisi |
| /images/shared-sheets-480.webp | 480×320 | 3538 | assets-source/shared-sheets.png | Hero dekoratif |
| /images/shared-sheets-480.avif | 480×320 | 2021 | assets-source/shared-sheets.png | Hero dekoratif |
| /images/shared-sheets-960.webp | 960×640 | 12140 | assets-source/shared-sheets.png | Hero dekoratif |
| /images/shared-sheets-960.avif | 960×640 | 3827 | assets-source/shared-sheets.png | Hero dekoratif |
| /images/shared-sheets-1600.webp | 1536×1024 | 47036 | assets-source/shared-sheets.png | Hero dekoratif |
| /images/shared-sheets-1600.avif | 1536×1024 | 9707 | assets-source/shared-sheets.png | Hero dekoratif |
| /images/logo_maxima.webp | 320×320 | 14954 | public/svgs/logo_kegma/LOGO_MAXIMA.webp | Katalog kegiatan dan modal |
| /images/logo_mister_miss.webp | 320×320 | 9752 | public/svgs/logo_kegma/LOGO_MISTER_MISS.webp | Katalog kegiatan dan modal |
| /images/logo_starlight.webp | 320×320 | 31280 | public/svgs/logo_kegma/LOGO_STARLIGHT.webp | Katalog kegiatan dan modal |
| /images/logo_umn_eco.webp | 320×320 | 19190 | public/svgs/logo_kegma/LOGO_UMN_ECO.webp | Katalog kegiatan dan modal |
| /images/logo_umn_festival.webp | 267×320 | 23666 | public/svgs/logo_kegma/LOGO_UMN_FESTIVAL.webp | Katalog kegiatan dan modal |
| /images/logo_umn_next.webp | 320×320 | 16510 | public/svgs/logo_kegma/LOGO_UMN_NEXT.webp | Katalog kegiatan dan modal |

## Logo teroptimasi, gambar berbagi dan ikon

Navigasi memakai bem-mark.webp (128 px) dan logo kabinet hero memakai cabinet-mark.webp (336 px). Keduanya rasterisasi lossless dari SVG resmi dengan proporsi dan warna asli; bukan varian logo baru. Sumber SVG tetap utuh. Turunan ini menghindari unduhan SVG besar untuk logo yang tampil kecil.

| File | Dimensi | Byte | Sumber |
| --- | --- | ---: | --- |
| /images/bem-mark.webp | 128×128 | 8124 | public/svgs/LOGO_BEM.svg |
| /images/cabinet-mark.webp | 336×155 | 11864 | public/svgs/BEM_GEN_16_LOGO_DARK.svg |
| /images/social/home.png | 1200×630 | 11703 | Official logo, repository titles, deterministic paper geometry |
| /images/social/tentang-kami.png | 1200×630 | 12852 | Official logo, repository titles, deterministic paper geometry |
| /images/social/divisi.png | 1200×630 | 14064 | Official logo, repository titles, deterministic paper geometry |
| /images/social/kegiatan.png | 1200×630 | 16272 | Official logo, repository titles, deterministic paper geometry |
| /images/social/divisi-bph.png | 1200×630 | 15120 | Official logo, repository titles, deterministic paper geometry |
| /images/social/divisi-sukm.png | 1200×630 | 16718 | Official logo, repository titles, deterministic paper geometry |
| /images/social/divisi-sufak.png | 1200×630 | 15231 | Official logo, repository titles, deterministic paper geometry |
| /images/social/divisi-sulso.png | 1200×630 | 18275 | Official logo, repository titles, deterministic paper geometry |
| /images/social/divisi-pr.png | 1200×630 | 14109 | Official logo, repository titles, deterministic paper geometry |
| /images/social/divisi-sukma.png | 1200×630 | 18484 | Official logo, repository titles, deterministic paper geometry |
| app/icon.png | 512×512 | 20523 | public/svgs/LOGO_BEM.svg |
| app/apple-icon.png | 180×180 | 6429 | public/svgs/LOGO_BEM.svg |
| app/favicon.ico | 48×48 | 3307 | public/svgs/LOGO_BEM.svg |

## Prompt lengkap

Prompt asli juga tersedia secara terstruktur di scripts/assets/image-prompts.json.

### open-leaf

Use case: stylized-concept. Asset: original editorial paper artwork for a university student executive board website, NOT a logo and NOT a mockup.

STYLE LOCK: Editorial folded-paper compositions derived from the idea of opening a shared page: broad rectangular sheets, deliberate creases and crisp edges, matte uncoated paper with restrained fine grain, navy #0F1E3F and blue #2F486D against linen #EEE5D9, with sparse azure #B3C3D1. Soft directional light from the upper left, shallow physical relief, generous negative space and asymmetric balance. Tactile, youthful and institutional; no lettering, logos, people, glossy surfaces or decorative blobs.

SUBJECT: A single large blue sheet lifting its upper-right corner to reveal a cream sheet beneath, a confident diagonal crease, broad simple planes. Landscape composition with tactile folds concentrated on the right half and restful linen on the left; top-down oblique angle.

COMPOSITION: 3:2 landscape ratio, isolated paper composition filling the canvas, focus on physical creases, light from upper left, no UI or embedded typography.

PALETTE: dominant navy #0F1E3F and blue #2F486D, accent azure #B3C3D1, neutral linen #EEE5D9.

MEDIUM & TEXTURE: photographed matte uncoated cut paper, subtle fine paper grain, shallow tactile relief, clean edges, controlled soft lighting; real material tonal shading only.

NEGATIVE: no text, no letters, no logos, no watermarks, no faces, no hands, no extra fingers, no gradient orbs, no glossy 3D blobs, no neon circuitry, no stock-photo look, no corporate illustration style. No buildings, no people, no added objects.

### shared-sheets

Use case: stylized-concept. Asset: original editorial paper artwork for a university student executive board website, NOT a logo and NOT a mockup.

STYLE LOCK: Editorial folded-paper compositions derived from the idea of opening a shared page: broad rectangular sheets, deliberate creases and crisp edges, matte uncoated paper with restrained fine grain, navy #0F1E3F and blue #2F486D against linen #EEE5D9, with sparse azure #B3C3D1. Soft directional light from the upper left, shallow physical relief, generous negative space and asymmetric balance. Tactile, youthful and institutional; no lettering, logos, people, glossy surfaces or decorative blobs.

SUBJECT: Three broad navy and azure paper sheets opening outward from one shared lower-left crease, overlapping as a sculptural editorial still life, restrained asymmetry. Landscape, oversized cropped sheets and one continuous calm linen region, oblique overhead view.

COMPOSITION: 3:2 landscape ratio, isolated paper composition filling the canvas, focus on physical creases, light from upper left, no UI or embedded typography.

PALETTE: dominant navy #0F1E3F and blue #2F486D, accent azure #B3C3D1, neutral linen #EEE5D9.

MEDIUM & TEXTURE: photographed matte uncoated cut paper, subtle fine paper grain, shallow tactile relief, clean edges, controlled soft lighting; real material tonal shading only.

NEGATIVE: no text, no letters, no logos, no watermarks, no faces, no hands, no extra fingers, no gradient orbs, no glossy 3D blobs, no neon circuitry, no stock-photo look, no corporate illustration style. No buildings, no people, no added objects.

### paper-horizon

Use case: stylized-concept. Asset: original editorial paper artwork for a university student executive board website, NOT a logo and NOT a mockup.

STYLE LOCK: Editorial folded-paper compositions derived from the idea of opening a shared page: broad rectangular sheets, deliberate creases and crisp edges, matte uncoated paper with restrained fine grain, navy #0F1E3F and blue #2F486D against linen #EEE5D9, with sparse azure #B3C3D1. Soft directional light from the upper left, shallow physical relief, generous negative space and asymmetric balance. Tactile, youthful and institutional; no lettering, logos, people, glossy surfaces or decorative blobs.

SUBJECT: A wide navy sheet folded once into an angular shallow ridge across a linen paper ground; an azure underside exposed along the crease. Landscape with the crease traveling from lower left to upper right, a spare sculptural composition, overhead view.

COMPOSITION: 3:2 landscape ratio, isolated paper composition filling the canvas, focus on physical creases, light from upper left, no UI or embedded typography.

PALETTE: dominant navy #0F1E3F and blue #2F486D, accent azure #B3C3D1, neutral linen #EEE5D9.

MEDIUM & TEXTURE: photographed matte uncoated cut paper, subtle fine paper grain, shallow tactile relief, clean edges, controlled soft lighting; real material tonal shading only.

NEGATIVE: no text, no letters, no logos, no watermarks, no faces, no hands, no extra fingers, no gradient orbs, no glossy 3D blobs, no neon circuitry, no stock-photo look, no corporate illustration style. No buildings, no people, no added objects.

## TODO: konfirmasi konten

Foto individu belum tersedia: data lama mengarah ke tes_foto_anggota.webp. UI memakai inisial asli sebagai pengganti netral. Seluruh berkas/data asli dipertahankan. Dokumentasi kegiatan baru dan sumber kabar belum tersedia; foto pelantikan tidak dipakai untuk mengilustrasikan kegiatan lain.

## Master dan artefak review

| File | Dimensi | Byte | Penggunaan |
| --- | --- | ---: | --- |
| assets-source/open-leaf.png | 1536×1024 | 2701586 | Master lokal, diabaikan Git |
| docs/redesign/candidates/open-leaf.webp | 720×480 | 5212 | Review kandidat, bukan request halaman |
| assets-source/shared-sheets.png | 1536×1024 | 2790988 | Master lokal, diabaikan Git |
| docs/redesign/candidates/shared-sheets.webp | 720×480 | 8736 | Review kandidat, bukan request halaman |
| assets-source/paper-horizon.png | 1536×1024 | 2842894 | Master lokal, diabaikan Git |
| docs/redesign/candidates/paper-horizon.webp | 720×480 | 8668 | Review kandidat, bukan request halaman |
| docs/redesign/asset-contact-sheet.webp | 1600×1240 | 73640 | Review keluarga aset; scripts/assets/contact-sheet.cjs |

LQIP inline: constants/photo-placeholders.json (1418 B untuk seluruh peta; tidak diunduh sebagai request terpisah). Ilustrasi 404 adalah SVG inline di app/not-found.tsx, di bawah batas 15 KB dan memakai token CSS.
