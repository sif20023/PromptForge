# ProjectForge

A secure project repository with comprehensive protection against secret leaks.

## Security Features

### Protected File Types
- Environment files (`.env`, `.env.local`, etc.)
- API keys and tokens (`.key`, `.pem`, `.p12`)
- Private keys (`id_rsa*`, `id_ed25519*`)
- Database files (`*.db`, `*.sqlite`)
- Credentials and secrets (`secrets.json`, `credentials.json`)
- AMV files (`.amv`, `.amv.f`)
- Cloudflare Wrangler config (`.wrangler/`, `.dev.vars`)
- AWS/GCP/Azure credentials

### .gitignore Coverage
This repository includes a comprehensive `.gitignore` that prevents accidental commits of:
- Sensitive configuration files
- API keys and tokens
- Database dumps
- Build artifacts
- IDE-specific files
- Temporary files

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your secrets
3. Never commit `.env` files or any files containing secrets

## Important Notes

- Always use environment variables for secrets
- Never hardcode API keys or passwords
- Use `.env.example` as a template (without actual values)
- Review `.gitignore` before adding new files
