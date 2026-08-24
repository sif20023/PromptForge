# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability within ProjectForge, please send an email to security@projectforge.com. All security vulnerabilities will be promptly addressed.

## Security Practices

### Secret Management
1. **Never commit secrets** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate secrets** regularly
4. **Use .env.example** as a template without actual values

### Git Security
1. **Pre-commit hooks** - Use tools like `pre-commit` to detect secrets
2. **Git history scanning** - Regularly scan git history for leaked secrets
3. **Branch protection** - Require PR reviews for main branch
4. **Signed commits** - Use GPG signing for commits

### File Protection
1. **.gitignore** - Comprehensive ignore patterns for sensitive files
2. **Binary file handling** - Proper handling of binary files
3. **Environment isolation** - Separate dev/staging/prod environments

### Development Environment
1. **Local development** - Use `.env.local` for local development
2. **IDE security** - Don't save secrets in IDE configurations
3. **Temporary files** - Ensure temp files are not committed

### Code Review Checklist
- [ ] No hardcoded secrets or API keys
- [ ] No credentials in configuration files
- [ ] No sensitive data in logs
- [ ] Proper error handling without information leakage
- [ ] Input validation and sanitization

## Sensitive File Types

The following file types are automatically ignored by `.gitignore`:
- Environment files (`.env*`)
- Key files (`.key`, `.pem`, `.p12`)
- Database files (`*.db`, `*.sqlite`)
- Credentials (`secrets.json`, `credentials.json`)
- AMV files (`.amv`, `.amv.f`)
- Cloud provider configs (`.aws/`, `.gcloud/`)

## Best Practices

1. **Use a secrets manager** (AWS Secrets Manager, HashiCorp Vault, etc.)
2. **Implement least privilege access**
3. **Enable 2FA** for all accounts
4. **Regular security audits**
5. **Keep dependencies updated**

## Compliance

This project follows security best practices for:
- OWASP Top 10
- SANS Top 25
- CIS Benchmarks
