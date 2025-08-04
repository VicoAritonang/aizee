# 🚀 Deployment Guide - Aizee

Panduan lengkap untuk deployment project Aizee ke GitHub dan Vercel.

## 📋 Prerequisites

Sebelum deployment, pastikan Anda memiliki:

- ✅ Akun GitHub
- ✅ Akun Vercel
- ✅ Akun Supabase (sudah setup)
- ✅ Environment variables siap

## 🔧 Step 1: GitHub Setup

### 1.1 Buat Repository Baru

1. Buka [GitHub](https://github.com)
2. Klik "New repository"
3. Isi detail:
   - **Repository name**: `aizee`
   - **Description**: `Agentic AI untuk Rumah Masa Depan`
   - **Visibility**: Public (atau Private sesuai preferensi)
   - ✅ Add a README file
   - ✅ Add .gitignore (Node)
   - ✅ Choose a license (MIT)

### 1.2 Clone dan Push Code

```bash
# Clone repository
git clone https://github.com/yourusername/aizee.git
cd aizee

# Copy semua file project ke folder ini
# (pastikan .env.local TIDAK ter-copy)

# Add semua file
git add .

# Commit pertama
git commit -m "Initial commit: Aizee landing page with Supabase integration"

# Push ke GitHub
git push origin main
```

### 1.3 Pastikan File Penting Ter-upload

✅ File yang harus ada di repository:
- `src/` - Semua source code
- `public/` - Static assets
- `package.json` - Dependencies
- `tailwind.config.ts` - TailwindCSS config
- `postcss.config.js` - PostCSS config
- `next.config.js` - Next.js config
- `vercel.json` - Vercel config
- `README.md` - Documentation
- `supabase-setup-final.sql` - Database setup
- `fix-counter-functions.sql` - Counter functions

❌ File yang TIDAK boleh ter-upload:
- `.env.local` - Environment variables
- `node_modules/` - Dependencies
- `.next/` - Build files

## 🌐 Step 2: Vercel Deployment

### 2.1 Connect ke Vercel

1. Buka [Vercel](https://vercel.com)
2. Sign in dengan GitHub
3. Klik "New Project"
4. Import repository `aizee`
5. Klik "Import"

### 2.2 Konfigurasi Project

**Project Settings:**
- **Project Name**: `aizee` (atau sesuai preferensi)
- **Framework Preset**: Next.js (otomatis terdeteksi)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### 2.3 Environment Variables

**Tambahkan environment variables:**

1. Klik "Environment Variables"
2. Tambahkan satu per satu:

```
NEXT_PUBLIC_SUPABASE_URL=https://wvwqtkbiwbrajgadgzsb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2d3F0a2Jpd2JyYWpnYWRnenNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjg2MTksImV4cCI6MjA2OTgwNDYxOX0.F-kTFG5R-6yOeRM2wOHdNx0paPYMz3fh7w51BY3Lx8Y
```

**Settings untuk setiap variable:**
- ✅ Production
- ✅ Preview
- ✅ Development

### 2.4 Deploy

1. Klik "Deploy"
2. Tunggu proses build selesai (2-3 menit)
3. Website akan live di URL: `https://aizee.vercel.app`

## 🔍 Step 3: Verifikasi Deployment

### 3.1 Test Website

1. **Homepage**: Pastikan landing page tampil dengan benar
2. **Navigation**: Test semua link dan menu
3. **Authentication**: Test register dan login
4. **Dashboard**: Pastikan dashboard berfungsi
5. **Counter**: Test visitor counter
6. **Payment**: Test tombol payment di dashboard

### 3.2 Test Database

1. **Register user baru** di website
2. **Cek di Supabase** apakah data tersimpan
3. **Test counter functions** apakah berjalan
4. **Test payment simulation** apakah status berubah

### 3.3 Performance Check

1. **Lighthouse Score**: Minimal 90+
2. **Mobile Responsive**: Test di berbagai device
3. **Loading Speed**: Pastikan cepat (< 3 detik)
4. **SEO**: Meta tags dan favicon

## 🔧 Step 4: Custom Domain (Optional)

### 4.1 Setup Custom Domain

1. Di Vercel Dashboard, klik "Settings"
2. Pilih "Domains"
3. Tambahkan domain Anda (misal: `aizee.com`)
4. Follow instruksi DNS setup

### 4.2 DNS Configuration

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

## 📊 Step 5: Monitoring & Analytics

### 5.1 Vercel Analytics

1. Di Vercel Dashboard, enable Analytics
2. Monitor performance dan errors
3. Track user behavior

### 5.2 Supabase Monitoring

1. Monitor database usage
2. Check authentication logs
3. Monitor API calls

## 🚨 Troubleshooting

### Common Issues

**1. Build Error**
```bash
# Check logs di Vercel
# Pastikan semua dependencies terinstall
npm install
npm run build
```

**2. Environment Variables Error**
```bash
# Pastikan variables sudah diset di Vercel
# Check di Supabase apakah URL dan key benar
```

**3. Database Connection Error**
```bash
# Pastikan Supabase project aktif
# Check RLS policies
# Verify API keys
```

**4. Image Loading Error**
```bash
# Pastikan domain imgur.com sudah di-whitelist
# Check next.config.js image domains
```

### Debug Commands

```bash
# Local build test
npm run build

# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL

# Test database connection
npm run dev
# Coba register user baru
```

## 📈 Post-Deployment

### 1. SEO Optimization

- ✅ Meta tags sudah optimal
- ✅ Favicon sudah diset
- ✅ Open Graph tags sudah ada
- ✅ Sitemap (optional)

### 2. Performance Optimization

- ✅ Images optimized
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Caching headers

### 3. Security

- ✅ HTTPS enabled
- ✅ Security headers
- ✅ Environment variables protected
- ✅ RLS enabled di Supabase

## 🎉 Success!

Website Aizee sudah live di:
- **URL**: `https://aizee.vercel.app`
- **GitHub**: `https://github.com/yourusername/aizee`
- **Supabase**: `https://supabase.com/dashboard/project/your-project`

### Next Steps

1. **Share URL** dengan tim
2. **Test semua fitur** secara menyeluruh
3. **Monitor performance** dan errors
4. **Setup monitoring** dan analytics
5. **Plan untuk scaling** jika diperlukan

---

**🎯 Deployment Checklist:**

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] First deployment successful
- [ ] All features tested
- [ ] Performance verified
- [ ] Security checked
- [ ] Documentation updated

**Aizee** - Agentic AI untuk Rumah Masa Depan 🏠✨ 