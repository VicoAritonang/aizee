# Setup Instructions untuk Aizee

## 1. Environment Variables
File `.env.local` sudah dibuat dengan credentials yang benar:
```
NEXT_PUBLIC_SUPABASE_URL=https://wvwqtkbiwbrajgadgzsb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2d3F0a2Jpd2JyYWpnYWRgenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjg2MTksImV4cCI6MjA2OTgwNDYxOX0.F-kTFG5R-6yOeRM2wOHdNx0paPYMz3fh7w51BY3Lx8Y
```

## 2. Setup Database Supabase

### Langkah-langkah:
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Buka **SQL Editor** di sidebar kiri
4. Copy seluruh isi file `supabase-setup-final.sql` (file final yang sederhana dan reliable)
5. Paste ke SQL Editor
6. Klik **Run** untuk menjalankan script
7. **Setelah itu**, jalankan script `fix-counter-functions.sql` untuk memperbaiki counter

**Catatan**: Script ini akan menghapus dan membuat ulang semua table, jadi pastikan tidak ada data penting yang akan hilang.

### Yang akan dibuat:
- Table `site_stats` untuk menyimpan counter
- Function `increment_visitors()` untuk menambah pengunjung
- Function `update_registered_users_count()` untuk update jumlah user terdaftar
- Function `update_subscribed_users_count()` untuk update jumlah user berlangganan
- Trigger untuk otomatis update counter saat ada user baru atau perubahan subscription

## 3. Restart Development Server
Setelah menjalankan SQL script, restart development server:
```bash
npm run dev
```

## 4. Test Fitur
- Buka website dan lihat counter di section "Aizee dalam Angka"
- Test register user baru
- Test login dan dashboard
- Test fitur payment untuk mengaktifkan subscription

## Troubleshooting
Jika masih ada error, pastikan:
1. SQL script sudah dijalankan dengan benar
2. Environment variables sudah benar
3. Development server sudah di-restart 