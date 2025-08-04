# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Aizee seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to **security@aizee.id**.

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

### Information to Include

- **Type of issue** (buffer overflow, SQL injection, cross-site scripting, etc.)
- **Full paths of source file(s) related to the vulnerability**
- **The location of the affected source code (tag/branch/commit or direct URL)**
- **Any special configuration required to reproduce the issue**
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code (if possible)**
- **Impact of the issue, including how an attacker might exploit it**

This information will help us triage your report more quickly.

## Preferred Languages

We prefer all communications to be in **English** or **Indonesian**.

## Disclosure Policy

When we receive a security bug report, we will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

1. **Confirm the problem** and determine the affected versions.
2. **Audit code** to find any similar problems.
3. **Prepare fixes** for all supported versions. These fixes will be released as fast as possible to the public.

## Security Best Practices

### For Contributors

- Never commit sensitive data (API keys, passwords, etc.)
- Use environment variables for configuration
- Validate all user inputs
- Follow OWASP guidelines
- Keep dependencies updated
- Use HTTPS in production
- Implement proper authentication and authorization

### For Users

- Keep your Aizee installation updated
- Use strong, unique passwords
- Enable two-factor authentication when available
- Regularly review your account activity
- Report suspicious activity immediately

## Security Features

Aizee implements several security features:

- **Authentication**: Supabase Auth with secure session management
- **Authorization**: Row Level Security (RLS) policies
- **Input Validation**: Comprehensive form validation
- **HTTPS**: All communications encrypted in production
- **CORS**: Properly configured Cross-Origin Resource Sharing
- **Rate Limiting**: API rate limiting to prevent abuse
- **Data Encryption**: Sensitive data encrypted at rest and in transit

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and will be clearly marked in the changelog.

## Responsible Disclosure

We kindly ask that you:

- Give us reasonable time to respond to issues before any disclosure to the public or a third-party
- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service
- Not modify or access data that does not belong to you
- Not exploit a security issue you discover for any reason

## Recognition

We believe in recognizing security researchers who help us keep Aizee secure. If you report a valid security vulnerability, we will:

- Credit you in our security advisories (unless you prefer to remain anonymous)
- Add you to our security hall of fame
- Consider additional recognition for significant contributions

## Contact Information

- **Security Email**: security@aizee.id
- **General Support**: hello@aizee.id
- **Website**: https://aizee.id

---

**Thank you for helping keep Aizee secure!** 🛡️

Your contributions help make smart home technology safer for everyone. 