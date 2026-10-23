# Potret studio pengurus

Dibuat melalui tool imagegen bawaan untuk mengganti latar foto utama 21 anggota. Foto sumber dan pose alternatif tetap tersedia; foto Josyca belum tersedia dan tidak dibuat secara fiktif.

Aset produksi: `public/pngs/members/anggota/<divisi>/*-studio.webp` (800 × 1200, WebP kualitas 85). Pemetaannya ada di `constants/divisionMembers.ts`; hasil studio menjadi foto utama, diikuti foto asli dan pose alternatif. Nama panggilan memakai nama depan sesuai persetujuan pengguna dan dapat diedit lewat field `nickname`.

Referensi gaya untuk seluruh potret adalah hasil studio Josephin. Edit AI diperiksa secara visual, tetapi tidak menjamin piksel wajah, kain, atau detail bordir identik dengan foto sumber. Foto asli disimpan untuk pembanding.

## Prompt bersama

Use case: identity-preserve. Asset: individual portrait for university student board website. Input 1 is the ONLY edit target; input 2 is ONLY a background color/lighting reference, NOT a face reference. Replace ONLY the architectural background in input 1 with the same clean muted cool slate-blue photographic studio backdrop as input 2, slightly brighter behind head, subtle falloff at edges. Preserve input 1's person EXACTLY: copy original face, expression, skin texture/tone, eyes, teeth, hair strands, body, hands, pose, clothing folds, buttons, embroidered UMN badge. Do not retouch, beautify, reshape, relight or redraw the person. Never blend identities from input 2. Keep original 2:3 framing and camera perspective. Remove building, floor and surroundings only. No new text, graphics, watermarks or objects. Output one edited portrait of the person in input 1.

## Ringkasan prompt contoh pertama (Josephin)

Replace only the architectural background with a clean photographic studio backdrop in muted cool slate blue (#64778b), subtly lighter behind the head, soft realistic falloff toward edges. Preserve the original person, expression, skin, hair, body, pose, hands, clothing and UMN badge. Keep 2:3 framing, no graphics, objects, text, or watermarks.

Total tambahan 21 aset studio: 659.834 byte (sekitar 644 KiB). Foto sumber tidak ditimpa.
