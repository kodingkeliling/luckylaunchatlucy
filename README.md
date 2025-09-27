# Lucky Launch at Lucy

Website untuk acara "Lucky Launch at Lucy" yang menampilkan informasi acara fun run dan pendaftaran tenan untuk pop up market.

## Fitur

- Informasi acara fun run
- Jadwal dan aktivitas acara
- Peta lokasi dengan denah pop up market
- Informasi harga dan lokasi tenan
- Form pendaftaran tenan dengan integrasi Google Sheets

## Teknologi

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Google Sheets API (untuk penyimpanan data)

## Cara Menjalankan

1. Pastikan Node.js versi 20 terinstal:
   ```
   nvm use 20
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Jalankan server development:
   ```
   npm run dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser.

## Konfigurasi Google Sheets

Untuk mengaktifkan integrasi dengan Google Sheets, tambahkan URL Google Script di file `.env.local`:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Warna

- Primary: #d5df40 (Hijau Lime)
- Secondary: #2c4059 (Biru Tua)
- Accent: #be2625 (Merah)
- Light: #e5e5e5 (Abu-abu Terang)

## Font

- Raleway (Teks Utama)
- TT Chocolates (Angka dan Heading)

## Deployment

Website ini dapat di-deploy ke Vercel dengan konfigurasi default.

```
npm run build
```

## Struktur Folder

- `/src/app` - Halaman utama dan layout
- `/src/components` - Komponen React
- `/src/data` - Data mock untuk konten
- `/src/lib` - Utilitas dan integrasi API
- `/public` - Aset statis (gambar, font)
