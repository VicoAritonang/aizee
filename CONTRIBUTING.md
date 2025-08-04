# Contributing to Aizee

Terima kasih atas minat Anda untuk berkontribusi pada project Aizee! 🎉

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm atau yarn
- Git

### Setup Development Environment

1. **Fork repository**
   ```bash
   # Fork repository di GitHub, kemudian clone
   git clone https://github.com/YOUR_USERNAME/aizee.git
   cd aizee
   ```

2. **Setup project**
   ```bash
   npm run setup
   ```

3. **Configure environment**
   - Copy `.env.local` dan isi dengan credentials Supabase Anda
   - Setup database menggunakan script di `supabase-setup.sql`

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Gunakan **TypeScript** untuk semua file
- Ikuti **ESLint** rules yang sudah dikonfigurasi
- Gunakan **Prettier** untuk formatting
- Gunakan **TailwindCSS** untuk styling

### Component Structure
```typescript
// components/ComponentName.tsx
'use client'

import { useState, useEffect } from 'react'

interface ComponentProps {
  // Define props here
}

export default function ComponentName({ ...props }: ComponentProps) {
  // Component logic here
  
  return (
    // JSX here
  )
}
```

### File Naming
- Components: `PascalCase.tsx`
- Pages: `page.tsx` (dalam folder)
- API routes: `route.ts`
- Utilities: `camelCase.ts`

### Git Commit Messages
Gunakan conventional commits:
```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## 🐛 Bug Reports

### Before Submitting
1. Check existing issues
2. Reproduce bug di development environment
3. Check browser console untuk errors

### Bug Report Template
```markdown
**Bug Description**
Brief description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Node.js: [e.g. 18.17.0]

**Additional Context**
Screenshots, logs, etc.
```

## 💡 Feature Requests

### Before Submitting
1. Check existing feature requests
2. Ensure feature aligns dengan project goals
3. Consider implementation complexity

### Feature Request Template
```markdown
**Feature Description**
Brief description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this be implemented?

**Alternative Solutions**
Other ways to solve this problem

**Additional Context**
Screenshots, mockups, etc.
```

## 🔧 Pull Request Process

### Before Submitting PR
1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Test changes**
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push changes**
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Guidelines
- **Title**: Clear, descriptive title
- **Description**: Detailed description of changes
- **Screenshots**: If UI changes are involved
- **Tests**: Include tests for new features
- **Documentation**: Update README/docs if needed

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🧪 Testing

### Running Tests
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### Writing Tests
- Gunakan **Jest** dan **React Testing Library**
- Test user interactions, not implementation details
- Aim for good test coverage

## 📚 Documentation

### Updating Documentation
- Update README.md untuk perubahan besar
- Update inline comments untuk complex logic
- Update API documentation untuk new endpoints

### Documentation Standards
- Gunakan clear, concise language
- Include code examples
- Keep documentation up-to-date

## 🎨 Design Contributions

### Design Guidelines
- Follow existing design system
- Use TailwindCSS classes
- Ensure responsive design
- Maintain accessibility standards

### Design Resources
- **Colors**: See design system di README
- **Typography**: Inter font family
- **Icons**: Heroicons atau custom SVG
- **Spacing**: TailwindCSS spacing scale

## 🔒 Security

### Security Guidelines
- Never commit sensitive data
- Use environment variables
- Validate all inputs
- Follow OWASP guidelines

### Reporting Security Issues
- **DO NOT** create public issue
- Email security issues ke: security@aizee.id
- Include detailed description dan steps to reproduce

## 🏷️ Labels

### Issue Labels
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

### PR Labels
- `ready for review`: Ready for maintainer review
- `work in progress`: Still being worked on
- `needs review`: Requires review from maintainers

## 📞 Getting Help

### Resources
- **Documentation**: README.md
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: hello@aizee.id

### Community Guidelines
- Be respectful dan inclusive
- Help others learn
- Share knowledge
- Follow code of conduct

## 🎉 Recognition

### Contributors
- All contributors will be listed di README
- Significant contributions will be highlighted
- Contributors will be mentioned in release notes

### Contribution Levels
- **Bronze**: 1-5 contributions
- **Silver**: 6-15 contributions
- **Gold**: 16+ contributions
- **Platinum**: Core maintainer level

---

**Terima kasih untuk berkontribusi pada Aizee!** 🏠✨

Your contributions help make smart home technology more accessible to everyone. 