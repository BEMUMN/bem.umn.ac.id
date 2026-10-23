# Pose khas divisi

20 foto pose tangan dipilih dari ZIP sumber berdasarkan kesamaan gestur per divisi. Background diedit memakai imagegen bawaan, satu foto per panggilan. Referensi warna: `public/pngs/members/anggota/bph/caroline-sandra-chen-02-studio.webp`. Hasil disimpan sebagai WebP 800 × 1200, kualitas 85.

Potret biasa tampil pertama, lalu pose khas divisi, berulang setiap lima detik dengan crossfade 700 ms. Satu timer pada roster menyelaraskan semua kartu. Tombol jeda tersedia; pergantian berhenti ketika roster di luar layar, tab tidak aktif, atau dialog terbuka. Reduced motion mempertahankan potret biasa. Dialog menyediakan hanya dua versi studio, tanpa pilihan foto mentah. Nama panggilan memakai nama depan; Instagram dan LinkedIn yang kosong ditampilkan sebagai “Belum ada”.

Velice hanya memiliki satu foto sumber, sehingga tetap statis. Josyca belum memiliki foto. `gestureCrop` mengatur framing 4:5; pose dengan tangan melebar memakai framing lebih luas agar gestur dan badge tetap terlihat. Potret biasa tidak diubah.

## Prompt

Use case: identity-preserve. Edit ONLY image 1. Replace the architectural background with the clean muted cool slate-blue studio gradient from image 2. Image 2 is BACKGROUND COLOR REFERENCE ONLY, never copy its person or pose. Preserve image 1 person's identity, exact facial features, expression, hair, glasses, skin texture, body shape, clothing folds and UMN blazer badge. CRITICAL preserve the exact hand gesture and finger positions from image 1, do not modify the hands. Keep original 2:3 framing and subject scale with entire original pose visible. No beautification, no added text, no props. Output one studio portrait.

## Aset

| Anggota | Foto sumber | Aset produksi |
| --- | --- | --- |
| Josephin Narumi Setiawan | Josephin Narumi Setiawan - 14.webp | `public/pngs/members/anggota/bph/josephin-narumi-setiawan-gesture-studio.webp` |
| Caroline Sandra Chen | Caroline Sandra Chen - 04.webp | `public/pngs/members/anggota/bph/caroline-sandra-chen-gesture-studio.webp` |
| Nicho Febrianto | Nicho Febrianto - 03.webp | `public/pngs/members/anggota/bph/nicho-febrianto-gesture-studio.webp` |
| Ranita Ivana Kols | Ranita Ivana Kols - 03.webp | `public/pngs/members/anggota/bph/ranita-ivana-kols-gesture-studio.webp` |
| Fransiscus Natadhika Joe Marco | Fransiscus Natadhika Joe Marco - 04.webp | `public/pngs/members/anggota/sukm/fransiscus-natadhika-joe-marco-gesture-studio.webp` |
| Nobel Joseph Taroreh | Nobel Joseph Taroreh - 05.webp | `public/pngs/members/anggota/sukm/nobel-joseph-taroreh-gesture-studio.webp` |
| Zahra Ariestya Sennova | Zahra Ariestya Sennova - 02.webp | `public/pngs/members/anggota/sukm/zahra-ariestya-sennova-gesture-studio.webp` |
| Asri Ainun Utami | Asri Ainun Utami - 03.webp | `public/pngs/members/anggota/sukm/asri-ainun-utami-gesture-studio.webp` |
| Rafly Tandean | Rafly Tandean - 06.webp | `public/pngs/members/anggota/sufak/rafly-tandean-gesture-studio.webp` |
| Valerie Oryza Gunawan | Valerie Oryza Gunawan - 02.webp | `public/pngs/members/anggota/sufak/valerie-oryza-gunawan-gesture-studio.webp` |
| Helen Christian Effendi | Helen Christian Effendi - 03.webp | `public/pngs/members/anggota/sufak/helen-christian-effendi-gesture-studio.webp` |
| Muhammad Kynan Khalfani | Muhammad Kynan Khalfani - 05.webp | `public/pngs/members/anggota/sulso/muhammad-kynan-khalfani-gesture-studio.webp` |
| Kevin Lim | Kevin Lim - 03.webp | `public/pngs/members/anggota/pr/kevin-lim-gesture-studio.webp` |
| Excellin Alodia Joymarlin | Excellin Alodia Joymarlin - 02.webp | `public/pngs/members/anggota/pr/excellin-alodia-joymarlin-gesture-studio.webp` |
| Sonny Ferdinand | Sonny Ferdinand - 03.webp | `public/pngs/members/anggota/sukma/sonny-ferdinand-gesture-studio.webp` |
| Vassel Goleyu | Vassel Goleyu - 05.webp | `public/pngs/members/anggota/sukma/vassel-goleyu-gesture-studio.webp` |
| Cornellius Susanto | Cornellius Susanto - 03.webp | `public/pngs/members/anggota/sukma/cornellius-susanto-gesture-studio.webp` |
| Hanna Pauline Haryono | Hanna Pauline Haryono - 04.webp | `public/pngs/members/anggota/sukma/hanna-pauline-haryono-gesture-studio.webp` |
| Selena Clarisa Lesmana | Selena Clarisa Lesmana - 02.webp | `public/pngs/members/anggota/sukma/selena-clarisa-lesmana-gesture-studio.webp` |
| Gven Carrey Gunawan | Gven Carrey Gunawan - 03.webp | `public/pngs/members/anggota/sukma/gven-carrey-gunawan-gesture-studio.webp` |
