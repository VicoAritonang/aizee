# Aizee - Agentic AI untuk Rumah Masa Depan

![Aizee Logo](https://i.imgur.com/DtxyEY6.png)

Aizee adalah platform smart home berbasis Agentic AI yang membangun ekosistem rumah masa depan yang cerdas, personal, dan manusiawi melalui teknologi Internet of Things.

## 🌟 Fitur Utama

- **Agentic AI**: AI yang adaptif dan kontekstual untuk memahami perilaku pengguna
- **Smart Home Integration**: Integrasi dengan 1000+ perangkat smart home
- **Real-time Monitoring**: Dashboard real-time untuk monitoring dan kontrol
- **User Authentication**: Sistem autentikasi yang aman dengan Supabase
- **Subscription Management**: Manajemen langganan dengan tracking otomatis
- **QR Code Setup**: Integrasi mudah dengan aplikasi Tuya Smart
- **Responsive Design**: Tampilan yang responsif untuk semua perangkat

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS 3.4.17
- **Backend**: Supabase (Auth, PostgreSQL, Real-time)
- **Deployment**: Vercel
- **QR Code**: react-qr-code
- **Icons**: Heroicons (SVG)

## 📋 Prerequisites

Sebelum menjalankan project ini, pastikan Anda memiliki:

- Node.js 18+ 
- npm atau yarn
- Akun Supabase
- Akun Vercel (untuk deployment)

## 🛠️ Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/aizee.git
   cd aizee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Buat file `.env.local` di root project:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Setup Supabase Database**
   - Buka Supabase Dashboard
   - Jalankan script SQL dari `supabase-setup-final.sql`
   - Jalankan script `fix-counter-functions.sql` untuk memperbaiki counter

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Buka [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

### 1. Jalankan Script Utama
```sql
-- Jalankan supabase-setup-final.sql di Supabase SQL Editor
```

### 2. Perbaiki Counter Functions
```sql
-- Jalankan fix-counter-functions.sql di Supabase SQL Editor
```

### 3. Struktur Database
- **profiles**: Data pengguna dan status langganan
- **site_stats**: Statistik website (pengunjung, user terdaftar, user berlangganan)
- **Functions**: increment_visitors(), update_registered_users_count(), update_subscribed_users_count()

## 🚀 Deployment

### Deploy ke Vercel

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Import project dari GitHub
   - Tambahkan environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy**
   - Vercel akan otomatis deploy setiap kali ada push ke main branch
   - Atau deploy manual dari Vercel Dashboard

### Environment Variables di Vercel

Pastikan environment variables berikut sudah diset di Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 📁 Project Structure

```
aizee/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   ├── api/
│   │   │   └── visit-counter/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── Footer.tsx
│   └── lib/
│       └── supabase.ts
├── public/
├── .env.local
├── package.json
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

## 🎨 Customization

### Mengubah Logo
- Logo utama: `https://i.imgur.com/DtxyEY6.png`
- Logo di komponen: Header, Footer, Auth pages, Dashboard

### Mengubah Warna
- Primary: Cyan-Blue gradient
- Accent: Yellow untuk text "Aizee"
- Background: Blue-Purple gradient

### Mengubah Konten
- Team info: `src/components/AboutSection.tsx`
- Contact info: Footer dan About section
- Pricing: Dashboard dan Stats section

## 🔧 Available Scripts

- `npm run dev` - Development server
- `npm run build` - Build untuk production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Features

### Authentication
- Email/Password login
- Google OAuth
- Protected routes
- Auto-redirect to dashboard

### Dashboard
- Subscription status
- Payment simulation
- QR Code for Tuya integration
- Usage guides

### Statistics
- Real-time visitor counter
- Registered users count
- Subscribed users count
- Auto-update on page load

## 🤝 Contributing

1. Fork project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Vico Winner Sebastian Aritonang** - CEO
- **Ardian Ryslam** - CTO

## 📞 Contact

- **Email**: vicoaritonang.2611@gmail.com
- **Phone**: +62 822 7399 2724
- **Address**: Depok, Indonesia

## 🙏 Acknowledgments

- Supabase untuk backend services
- Vercel untuk hosting
- TailwindCSS untuk styling
- Next.js team untuk framework

---

**Aizee** - Membangun ekosistem rumah masa depan yang cerdas, personal, dan manusiawi.
