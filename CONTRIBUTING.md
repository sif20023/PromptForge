# Contributing to ProjectForge

Thank you for your interest in contributing! This document provides guidelines and information about contributing to this project.

## Security Guidelines

### Before Contributing
1. **Read the Security Policy** - Review `SECURITY.md` thoroughly
2. **Never commit secrets** - Use environment variables for all sensitive data
3. **Use .env.example** as template - Don't create actual `.env` files
4. **Scan your code** - Run security scans before submitting PRs

### Secret Management
- **Never hardcode** API keys, passwords, or tokens
- **Use environment variables** for all configuration
- **Rotate secrets regularly** - Especially after team member changes
- **Use secrets managers** when available (AWS Secrets Manager, HashiCorp Vault, etc.)

### Code Review Requirements
All submissions require:
1. **Security review** - Check for hardcoded secrets
2. **Dependency review** - No vulnerable dependencies
3. **Code quality** - Follow coding standards
4. **Tests** - Include appropriate tests

### Sensitive File Types
The following files should NEVER be committed:
- `.env` files (any environment)
- API keys (`.key`, `.pem`)
- Database files (`*.db`, `*.sqlite`)
- Credentials (`secrets.json`, `credentials.json`)
- AMV files (`.amv`, `.amv.f`)
- Cloud provider configs (`.aws/`, `.gcloud/`)
- Private keys (`id_rsa*`, `id_ed25519*`)

### Pre-commit Checks
Before committing, run:
```bash
pre-commit run --all-files
```

### PR Template
When submitting a PR, please include:
- Description of changes
- Security implications
- Testing performed
- Checklist:
  - [ ] No hardcoded secrets
  - [ ] No sensitive data in logs
  - [ ] Dependencies are secure
  - [ ] Code follows style guidelines
  - [ ] Tests pass locally

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/projectforge.git
   cd projectforge
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your local settings
   ```

3. **Install dependencies**
   ```bash
   npm install  # For JavaScript/TypeScript
   pip install -r requirements.txt  # For Python
   ```

4. **Run security checks**
   ```bash
   pre-commit run --all-files
   ```

## Code Style

### General
- Use consistent indentation (2 spaces for JS/TS, 4 spaces for Python)
- Write meaningful commit messages
- Keep functions small and focused
- Comment complex logic

### Security-Specific
- Validate all inputs
- Use parameterized queries
- Implement proper error handling
- Follow principle of least privilege
- Use secure defaults

## Reporting Issues

### Security Issues
If you discover a security vulnerability:
1. **Do NOT open a public issue**
2. **Email security@projectforge.com** with details
3. **Include steps to reproduce** if possible
4. **Wait for response** before public disclosure

### General Issues
For non-security issues:
1. **Check existing issues** first
2. **Use issue templates** when available
3. **Provide detailed information**
4. **Include reproduction steps**

## Testing

### Unit Tests
```bash
npm test  # JavaScript/Python
pytest    # Python
```

### Integration Tests
```bash
npm run test:integration
```

### Security Tests
```bash
npm run test:security
bandit -r .  # Python security testing
```

## Release Process

1. **Update version** in package.json/setup.py
2. **Update CHANGELOG.md**
3. **Run full test suite**
4. **Security review**
5. **Create release PR**
6. **Merge to main**
7. **Tag release**

## Questions?

If you have questions about contributing:
- Check the `SECURITY.md` file
- Open a discussion issue
- Email security@projectforge.com

Thank you for helping keep ProjectForge secure!
