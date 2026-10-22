# Rencana penyempurnaan UI BEM UMN

Status: diterapkan pada branch `feature/original-design-polish`.

## Arah

Pertahankan desain navy yang sudah dipilih: logo kabinet sebagai pusat hero, navbar kapsul, font saat ini, supergrafik resmi, foto asli, serta kartu potret anggota yang baru. Perubahan dilakukan per bagian, bukan mengganti identitas seluruh situs.

## 1. Direktori dan detail divisi — prioritas pertama

Tujuan: foto pengurus menjadi fokus, sementara alur mencari divisi dan anggota tetap jelas.

- Rapikan header detail divisi: seimbangkan ukuran foto grup dengan judul dan deskripsi, kurangi panel kecil yang mengulang informasi.
- Tinjau kepadatan daftar pada tablet dan ponsel; pertahankan ukuran wajah serta keterbacaan nama panjang sebelum menambah jumlah kolom.
- Samakan jarak judul, deskripsi, pencarian, dan daftar anggota antara direktori interaktif dan halaman detail divisi.
- Pertahankan kartu potret dan pilihan foto yang baru. Periksa crop setiap anggota pada ukuran nyata; koreksi posisi individual hanya bila diperlukan.
- Buat tombol kembali dan posisi hasil pencarian lebih mudah ditemukan setelah pengguna memilih divisi.

## 2. Beranda — poles hierarki, bukan ganti konsep

Tujuan: pengunjung memahami identitas BEM dan menemukan tujuan utama dengan cepat.

- Tinjau ruang kosong hero pada layar pendek. Jaga logo, penjelasan, dan tombol utama tetap nyaman terlihat tanpa saling berhimpitan.
- Periksa kekuatan foto latar, overlay navy, serta supergrafik agar dekorasi tidak bersaing dengan teks.
- Rapikan ritme jarak antar-section, terutama pergantian profil, nilai kabinet, dan kegiatan.
- Kurangi badge, garis, atau efek bayangan yang mengulang fungsi; pertahankan elemen yang membantu hierarki.
- Jangan menambah section baru tanpa tujuan dan konten yang tersedia.

## 3. Kegiatan — perjelas pemindaian informasi

Tujuan: pengguna cepat membedakan KEGMA dan program kerja serta membuka rinciannya.

- Selaraskan penempatan logo, judul, ringkasan, dan tombol pada kartu.
- Periksa kartu dengan judul panjang supaya tinggi serta posisi tombol tetap rapi.
- Rapikan filter dan pencarian pada ponsel; buat kategori aktif serta hasil kosong mudah dipahami.
- Tinjau panjang detail kegiatan: tampilkan informasi utama terlebih dahulu dan hindari pengulangan antara kartu dan dialog.

## 4. Konsistensi seluruh halaman

- Samakan ukuran tombol, radius, border, warna teks sekunder, serta jarak komponen sejenis.
- Tinjau profil organisasi dan footer untuk paragraf terlalu lebar atau ruang kosong yang tidak membantu pembacaan.
- Pastikan hover, fokus keyboard, reduced-motion, dan perilaku dialog konsisten.
- Gunakan data yang sudah ada. Foto Josyca, kontak, dan informasi lain yang belum tersedia tidak diisi dengan data rekaan.

## Cara mengerjakan setelah rencana disepakati

1. Ambil screenshot kondisi sekarang sebagai pembanding di folder QA yang diabaikan Git.
2. Kerjakan direktori/detail divisi sebagai satu bagian pertama; nilai hasilnya sebelum menerapkan gaya yang sama ke halaman lain.
3. Lanjutkan beranda, kegiatan, lalu konsistensi komponen bersama sesuai temuan visual.
4. Batasi perubahan pada masalah yang terlihat; bila bagian sudah bekerja dan terlihat baik, pertahankan.
5. Simpan perubahan per bagian agar mudah dibandingkan atau dikembalikan.

## Kriteria selesai

- Identitas navy dan komposisi utama tetap dikenali sebagai desain yang disukai pengguna.
- Foto wajah tidak terpotong secara mengganggu; nama dan jabatan terbaca tanpa overflow.
- Tampilan diperiksa pada 320, 390, 768, 1024, dan 1440 px.
- Navigasi, pencarian, filter, foto alternatif, dialog, Escape, Tab, dan pemulihan fokus tetap bekerja.
- Build dan lint lulus. Performa diperiksa jika perubahan menambah aset atau animasi; tidak menggunakan skor laporan desain lama.
- Tidak ada penambahan dependency, perubahan data institusi, push, atau deploy tanpa kebutuhan dari tugas berikutnya.

## Hasil penerapan

- Header divisi bersama menampilkan foto grup utuh; pencarian anggota dan hasil kosong konsisten pada direktori maupun halaman detail. Tombol kembali memulihkan fokus.
- Hero lebih jelas, ruang pada layar pendek disesuaikan, dan jarak section serta bayangan dikurangi. Logo, font, warna navy, foto, dan urutan section dipertahankan.
- Kartu KEGMA memakai susunan logo/judul/ringkasan yang seragam; kartu program kerja sejajar. Filter kategori memiliki status aktif dan hasil kosong yang benar untuk setiap kategori.
- Dialog kegiatan memakai fokus keyboard, Escape, backdrop, dan pemulihan fokus. Footer serta tautan navigasi diperjelas; jumlah pengurus diturunkan dari data aktif, bukan angka tetap.
- Tidak ada dependency atau aset baru. Seluruh data anggota, foto, program, serta URL resmi dipertahankan.
- Bukti visual lokal berada di `coverage/ui-polish/` (diabaikan Git); skrip pemeriksaan ada di `scripts/qa/`.

Validasi: build dan lint lulus tanpa warning; 50 kombinasi halaman/viewport lulus; 22 profil dan 41 foto diperiksa pada enam divisi; alur pencarian, filter, dialog, serta keyboard diperiksa pada 320 dan 1440 px. Pengujian browser menggunakan Chrome lokal.
