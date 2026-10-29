# AGENTS.md — BEM UMN Generasi XVI Website

> **Status:** Rekonstruksi berdasarkan konteks proyek dan instruksi yang terdokumentasi hingga 29 Oktober 2026. **Bukan salinan verbatim** AGENTS.md lama (289 baris). Jika ada konflik, konfirmasikan dengan pemilik proyek.

## 1. Project context

- Project: Website BEM UMN Generasi XVI (`bem.umn.ac.id`).
- Framework: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4.
- Animation: GSAP, ScrollTrigger, Lenis, Swiper (hanya bila relevan).
- Pages: `/`, `/tentang-kami`, `/divisi`, `/divisi/[id]`, `/kegiatan`.
- Brand tagline: `#InclusiveforInnovation`.
- Primary navigation: Beranda, Tentang Kami, Divisi, Kegiatan.
- CMS direction (planned, not assumed implemented): custom admin dashboard, MySQL, visual editing and preview.

## 2. Sources of truth and priority

1. Instruksi eksplisit pengguna untuk task saat ini dan batasan keselamatan/engineering.
2. GSM resmi BEM UMN Gen XVI, desain Figma yang disetujui, dan aset resmi.
3. Requirement produk dan perilaku yang telah disepakati.
4. Struktur, dependensi, dan pola kode aktual dalam repository.
5. Rekomendasi skill dan preferensi desain agent; jangan terapkan jika bertentangan dengan poin di atas.

Jangan mengubah logo, font, warna brand, supergrafik, atau karakter visual resmi tanpa persetujuan. Jangan menganggap semua aturan generik dari skill berlaku mutlak jika bertentangan dengan GSM/Figma.

## 3. Visual identity

- Dark Navy `#0F1E3F`
- Primary Blue `#2F486D`
- Azure `#B3C3D1`
- Cream Linen `#EEE5D9`
- Camel Brown `#997953`
- Pale Taupe `#D2C7B8`
- Gray Brown `#6C4D38`
- Brand fonts: Apple Garamond (serif) dan Bricolage Grotesque (sans), gunakan font lokal yang sudah tersedia.

Utamakan hierarki visual, ritme spacing, tipografi, dan komposisi yang disengaja. Hindari AI-slop, dekorasi generik, glassmorphism, gradient, animasi, atau komponen tambahan yang tidak mendukung konten. Jangan menghapus elemen khas yang memang disetujui, termasuk floating pill navigation atau supergrafik.

## 4. Scope and safety

- Baca file terkait dan `AGENTS.md` sebelum melakukan perubahan.
- Periksa `git status`, branch aktif, dan diff terlebih dahulu.
- Jangan menimpa perubahan lokal, melakukan `git reset --hard`, `git clean`, stash, force push, merge, atau commit tanpa izin eksplisit.
- Jangan memodifikasi file di luar scope tanpa alasan yang dijelaskan.
- Jangan melakukan refactor besar, menambah dependency, atau mengganti arsitektur hanya demi polishing.
- Jangan menganggap fitur CMS/backend telah diimplementasikan sebelum diverifikasi.
- Jangan mengubah konten resmi atau mengarang data pengurus, kegiatan, dan aset.
- Pertahankan pemisahan halaman, komponen, dan data constants yang ada kecuali perubahan memang dibutuhkan.

## 5. Agent skills workflow

Sebelum menggunakan skill, temukan file `SKILL.md` yang benar-benar tersedia dan baca instruksi relevannya. Jangan mengklaim skill dijalankan hanya karena namanya disebut dalam prompt atau pernah dibaca di sesi sebelumnya.

- `design-taste-frontend`: art direction, komposisi, tipografi, dan hierarki visual.
- `impeccable`: refinement spacing, konsistensi UI, responsive behavior, dan edge cases.
- `apple-design`: prinsip usability, interaksi, feedback, keyboard, touch target, dan aksesibilitas web; **bukan** instruksi mengubah situs menjadi gaya Apple.
- `fullstack-webdev-architect`: engineering/arsitektur bila skill masih tersedia dan relevan.
- PStack: gunakan skill spesifik yang benar-benar terpasang dan relevan; jangan mengasumsikan seluruh katalog PStack tersedia pada sesi aktif.

Pilih skill sesuai task. Jangan memanggil semuanya secara otomatis. Untuk audit, mulai read-only, klasifikasikan temuan, lalu usulkan solusi terkecil. Untuk implementasi, ikuti scope dan keputusan pengguna.

## 6. Design and motion requirements

- Pertahankan GSAP, ScrollTrigger, Lenis, dan Swiper yang masih digunakan; jangan menghapusnya secara sembarangan.
- Motion harus purposeful, ringan, dan tidak menghambat interaksi.
- Hindari forced scroll snapping dan scroll-jacking.
- Pastikan animasi memiliki cleanup saat unmount serta tidak menghasilkan event listener/GSAP instance ganda.
- Hormati `prefers-reduced-motion`.
- Jaga responsivitas mobile, tablet, desktop, dan wide desktop.
- Gunakan semantic HTML, heading hierarchy yang benar, focus visible, keyboard navigation, label aksesibel, kontras memadai, dan tombol/link yang benar-benar berfungsi.
- Hindari overflow, clipping, teks terpotong, serta animasi yang membuat konten tidak dapat diakses.

## 7. Content and page responsibilities

- Homepage: pengenalan singkat BEM Gen XVI, nilai kabinet, highlight kegiatan/program, CTA ke halaman lain. Jangan sekadar menduplikasi Tentang Kami.
- Tentang Kami: profil institusional lebih mendalam.
- Divisi: direktori, detail divisi, dan informasi anggota yang tersedia; jangan mengarang data personal.
- Kegiatan: highlight kegiatan serta tautan eksternal yang telah disetujui.
- Hero: gunakan frasa `Badan Eksekutif Mahasiswa` tanpa penambahan `(BEM)` jika mengikuti copy yang telah disetujui.

## 8. Audit protocol

Untuk audit read-only:

1. Jelaskan scope, branch, dan baseline yang diperiksa.
2. Baca kode, aset, referensi, dan skill yang relevan.
3. Bedakan fakta terverifikasi, dugaan, preferensi kreatif, dan pertanyaan terbuka.
4. Kelompokkan temuan: fungsional, mismatch GSM/Figma, visual, usability, accessibility, responsiveness, performance, dan engineering.
5. Catat lokasi file/komponen, bukti, dampak, prioritas P0/P1/P2, serta rekomendasi perbaikan minimal.
6. Jangan mengubah file, menjalankan formatter yang memodifikasi file, atau menginstal dependency pada audit read-only.
7. Tanyakan keputusan pengguna jika terdapat beberapa opsi yang berdampak pada identitas, UX, atau arsitektur.

P0 hanya untuk blocker atau masalah kritis; jangan menaikkan prioritas hanya karena persoalan estetika.

## 9. Implementation protocol

1. Nyatakan perubahan yang akan dibuat dan file yang diperkirakan terdampak.
2. Kerjakan perubahan kecil dan terfokus, mengikuti pola kode aktual.
3. Jaga kompatibilitas dengan Next.js App Router, React, TypeScript, dan Tailwind v4.
4. Gunakan token/theme dan aset resmi, bukan hardcoded replacement tanpa alasan.
5. Pertahankan perilaku komponen yang tidak termasuk scope.
6. Jika perlu keputusan visual yang subjektif, berikan 2–3 opsi beserta trade-off dan tunggu persetujuan bila dampaknya signifikan.
7. Jangan mengubah Git history atau melakukan merge/push tanpa perintah pengguna.

## 10. Verification and reporting

Jalankan yang relevan dan tersedia:

- `git diff --check`
- `npx tsc --noEmit`
- Lint sesuai script yang benar-benar ada di `package.json`.
- `npm run build` bila sesuai dan lingkungan mendukung.
- Uji visual/responsive, interaksi, keyboard, dan reduced motion bila browser/testing tool tersedia.

Jangan mengklaim build, browser test, screenshot review, atau skill execution berhasil jika tidak benar-benar dilakukan. Bedakan `passed`, `failed`, dan `not run` beserta alasan. Laporkan perubahan, risiko regresi, hasil verifikasi, keterbatasan, dan pekerjaan tersisa.

## 11. Repository hygiene

- Hormati `.gitignore` dan jangan memasukkan file internal yang sengaja dikecualikan.
- Secara historis `AGENTS.md`/`.agents` serta `DEVELOPMENT_GUIDE.md` dan `DEVELOPMENT_HANDOFF_18_OKTOBER_2026.md` pernah diminta tidak di-commit; cek kebijakan Git saat ini sebelum staging.
- Hindari menyimpan secret, token, credential, atau data pribadi di source code.
- Jangan mengubah branch target atau menyelesaikan konflik merge secara sepihak.

## 12. Required response format for substantive tasks

1. **Baseline:** file/halaman/branch dan konteks yang benar-benar diperiksa.
2. **Findings / plan:** masalah dan alasan perubahan, dengan prioritas bila audit.
3. **Changes:** daftar file dan perubahan yang dilakukan (jika implementasi).
4. **Verification:** perintah/pengujian dan hasil aktual.
5. **Open questions / limitations:** hal yang perlu keputusan pengguna atau belum dapat diverifikasi.

> Catatan pemulihan: dokumen ini adalah versi rekonstruksi yang dapat dipakai sebagai starting point. Bandingkan dengan file lama jika suatu saat ditemukan dari riwayat editor, backup, atau chat.
