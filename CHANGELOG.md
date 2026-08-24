# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup
- Comprehensive `.gitignore` for secret protection
- Security policy and guidelines
- Pre-commit hooks for secret detection
- GitHub Actions workflows for security scanning
- Environment variable templates
- Contributing guidelines with security focus

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- Implemented comprehensive secret protection
- Added multiple secret scanning tools
- Created security scanning workflows
- Added dependency vulnerability scanning
- Implemented code scanning with CodeQL

## [0.1.0] - 2026-08-24

### Added
- Initial release
- Project structure
- Security configurations
- Documentation

### Security
- Comprehensive `.gitignore` covering:
  - Environment files (`.env*`)
  - API keys and tokens
  - Database files
  - Credentials and secrets
  - AMV files (`.amv`, `.amv.f`)
  - Cloud provider configs
  - Private keys
- Pre-commit hooks for:
  - Secret detection (Gitleaks, detect-secrets)
  - Code quality (ESLint, Prettier)
  - Security scanning (Bandit, Semgrep)
- GitHub Actions workflows for:
  - Secret scanning
  - Dependency scanning
  - Static application security testing (SAST)
  - Container scanning
  - License scanning
  - CodeQL analysis
- Security documentation:
  - SECURITY.md
  - CONTRIBUTING.md
  - Security policy workflow
