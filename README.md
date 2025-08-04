# 🏠 Aizee - Agentic AI untuk Rumah Masa Depan

Platform smart home berbasis AI yang membangun ekosistem rumah masa depan yang cerdas, personal, dan manusiawi.

## ✨ Fitur Utama

- **Agentic AI**: AI yang adaptif dan kontekstual untuk rumah pintar
- **Integrasi IoT**: Koneksi dengan perangkat cerdas dan layanan digital
- **Dashboard Personal**: Kontrol dan monitoring perangkat rumah
- **Sistem Berlangganan**: Akses premium ke fitur-fitur canggih
- **QR Code Integration**: Integrasi mudah dengan Tuya app
- **Real-time Statistics**: Statistik pengunjung dan pengguna real-time

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **QR Code**: react-qr-code

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/VicoAritonang/aizee.git
cd aizee
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env.local` di root project:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Setup Database
1. Buka Supabase Dashboard
2. Jalankan SQL script `supabase-setup-final.sql`
3. Jalankan SQL script `fix-counter-functions.sql`

### 5. Run Development Server
```bash
npm run dev
```

Buka [https://aizee.vercel.app](https://aizee.vercel.app) di browser.

## 🌐 Deployment ke Vercel

### 1. Push ke GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy di Vercel
1. Buka [vercel.com](https://vercel.com)
2. Import project dari GitHub
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## 📁 Project Structure

```
aizee/
├── src/
│   ├── app/
│   │   ├── api/                 # API Routes
│   │   ├── auth/                # Auth pages
│   │   ├── dashboard/           # Dashboard page
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/              # React components
│   └── lib/                     # Utilities
├── public/                      # Static assets
├── .env.local                   # Environment variables
├── next.config.js               # Next.js config
├── tailwind.config.ts           # TailwindCSS config
└── package.json                 # Dependencies
```

## 🎨 Customization

### Mengubah Warna dan Tema
Edit `tailwind.config.ts` untuk mengubah color palette.

### Mengubah Konten
- **Hero Section**: Edit `src/components/HeroSection.tsx`
- **Features**: Edit `src/components/FeaturesSection.tsx`
- **About Us**: Edit `src/components/AboutSection.tsx`
- **Footer**: Edit `src/components/Footer.tsx`

### Mengubah Logo
Ganti URL logo di:
- `src/components/Header.tsx`
- `src/components/Footer.tsx`
- `src/app/auth/login/page.tsx`
- `src/app/auth/register/page.tsx`
- `src/app/dashboard/page.tsx`

## 📊 Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - ESLint check
- `npm run format` - Prettier format

## 👥 Team

- **Vico Winner Sebastian Aritonang** - CEO
- **Ardian Ryslam** - CTO

## 📞 Contact

- **Email**: vicoaritonang.2611@gmail.com
- **Phone**: +6282273992724
- **Address**: Depok, Indonesia

## 📄 License

MIT License - lihat [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

- Next.js team untuk framework yang luar biasa
- Supabase team untuk backend-as-a-service
- TailwindCSS team untuk utility-first CSS framework
- Vercel team untuk platform deployment yang mudah
