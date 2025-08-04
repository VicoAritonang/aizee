# Support

We love our users and we're here to help! 🎉

## Getting Help

### 📚 Documentation
- **[README.md](README.md)** - Complete project documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guides
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CHANGELOG.md](CHANGELOG.md)** - Recent changes and updates

### 🐛 Bug Reports & Feature Requests
- **[Bug Report](https://github.com/aizee/aizee/issues/new?template=bug_report.md)** - Report a bug
- **[Feature Request](https://github.com/aizee/aizee/issues/new?template=feature_request.md)** - Request a new feature

### 💬 Community Support
- **[GitHub Discussions](https://github.com/aizee/aizee/discussions)** - Ask questions and share ideas
- **[GitHub Issues](https://github.com/aizee/aizee/issues)** - Report bugs and request features

### 📧 Direct Contact
- **Email**: hello@aizee.id
- **Website**: https://aizee.id
- **Security Issues**: security@aizee.id

## Common Issues & Solutions

### Setup Issues

**Q: I'm getting "Module not found" errors**
A: Make sure you've installed all dependencies:
```bash
npm install
```

**Q: Environment variables not working**
A: Check that your `.env.local` file exists and contains the correct Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Q: Build fails with TypeScript errors**
A: Run type checking to see specific errors:
```bash
npm run type-check
```

### Authentication Issues

**Q: Google OAuth not working**
A: Make sure you've configured Google OAuth in your Supabase project:
1. Go to Supabase Dashboard > Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth credentials

**Q: Users can't register/login**
A: Check your Supabase Auth settings:
1. Verify email confirmation is configured correctly
2. Check RLS policies are set up properly
3. Ensure your site URL is added to allowed redirect URLs

### Database Issues

**Q: Database tables not created**
A: Run the SQL setup script in Supabase:
1. Go to Supabase Dashboard > SQL Editor
2. Copy and paste the contents of `supabase-setup.sql`
3. Execute the script

**Q: Visit counter not working**
A: Make sure the `site_stats` table exists and has the correct structure:
```sql
SELECT * FROM site_stats WHERE id = 1;
```

### Deployment Issues

**Q: Vercel deployment fails**
A: Check your build logs and ensure:
1. All environment variables are set in Vercel
2. Node.js version is 18+ (check `.nvmrc`)
3. Build command is correct: `npm run build`

**Q: Docker container won't start**
A: Verify your Docker setup:
```bash
docker build -t aizee .
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... aizee
```

## Performance Tips

### Development
- Use `npm run dev` for development with hot reload
- Enable Turbo mode for faster builds
- Use VS Code with recommended extensions

### Production
- Enable Next.js optimizations
- Use CDN for static assets
- Monitor performance with Vercel Analytics

## Security Best Practices

- Never commit `.env.local` files
- Use strong passwords for Supabase
- Enable 2FA when available
- Keep dependencies updated
- Monitor for security vulnerabilities

## Troubleshooting Checklist

Before asking for help, please check:

- [ ] All dependencies installed (`npm install`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Supabase project set up correctly
- [ ] Database tables created
- [ ] Node.js version 18+ installed
- [ ] No console errors in browser
- [ ] Network requests working
- [ ] Build succeeds locally (`npm run build`)

## Still Need Help?

If you've tried everything above and still need assistance:

1. **Search existing issues** - Your question might already be answered
2. **Create a detailed issue** - Include error messages, steps to reproduce, and environment details
3. **Join our community** - Connect with other users in GitHub Discussions
4. **Contact us directly** - Email hello@aizee.id for urgent issues

## Contributing to Support

Want to help others? Here's how:

- **Answer questions** in GitHub Discussions
- **Improve documentation** by submitting PRs
- **Report bugs** you encounter
- **Suggest improvements** to the support process
- **Share your experience** and use cases

---

**Thank you for using Aizee!** 🏠✨

We're committed to making smart home technology accessible to everyone. 