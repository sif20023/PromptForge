# PromptForge - Setup & Guide

> A secure project repository with comprehensive protection against secret leaks and vulnerabilities.

---

## Part 1: Installing from GitHub

1. Open your terminal

2. Clone the repository:
   ```bash
   git clone https://github.com/sif20023/PromptForge.git
   ```

3. Navigate into the folder:
   ```bash
   cd PromptForge
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Copy the example env file:
   ```bash
   copy .env.example .env
   ```

6. Open `.env` in any text editor and replace the placeholder values with your actual API keys and database credentials.

7. Done. The project is ready to use.

---

## Part 2: How to Use

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm test` | Run tests |
| `npm run security:scan` | Run security scan |
| `npm run lint` | Run linter |
| `npm run format` | Format code |
| `npm run type-check` | Type check |

**To upload future changes to GitHub:**
```bash
git add .
git commit -m "your message"
git push
```

> **WARNING:** NEVER commit the `.env` file. The `.gitignore` already blocks it.

---

## Part 3: Every Feature Explained

---

### Section A: Security Infrastructure

PromptForge was built with security as the foundation. Every aspect of this project has been designed to prevent secret leaks, catch vulnerabilities early, and enforce best practices through automation.

---

#### A1: The `.gitignore` File

This is your first line of defense. The `.gitignore` file tells Git which files to never track or commit.

**Environment Files:**
- `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local`, `.env*.local`, `.env.bak`, `.env.old`
- These files contain your actual secrets. They stay on your computer only.

**API Keys and Tokens:**
- `*.key`, `*.pem`, `*.p12`, `*.pfx`, `*.jks`, `*.keystore`
- Any private key or certificate file is blocked.

**Credentials and Secrets:**
- `secrets.json`, `secrets.yml`, `secrets.yaml`, `credentials.json`, `credentials.yml`, `service-account*.json`
- Any file that might contain API keys or passwords.

**Private Keys:**
- `id_rsa*`, `id_ed25519*`, `*.private`, `*.secret`, `*.password`, `*.passwd`
- SSH keys and private key files.

**Database Files:**
- `*.db`, `*.sqlite`, `*.sqlite3`, `*.sql`, `*.dump`
- Local database files that might contain sensitive data.

**AMV Files (Your Specific Request):**
- `.amv`, `.amv.f`, `*.amv`, `*.amv.f`
- These are blocked from ever being committed.

**Cloud Provider Credentials:**
- `.aws/`, `.gcloud/`, `service-account*.json`, `azure*`, `*.azureauth`
- Cloud credentials that could give access to your infrastructure.

**Build Artifacts and Temp Files:**
- `node_modules/`, `dist/`, `build/`, `out/`, `*.tmp`, `*.temp`, `logs/`
- Compiled code and temporary files that shouldn't be in version control.

> **Why this matters:** Without this file, it's incredibly easy to accidentally commit a file containing your database password or API key. Once pushed to a public repo, those secrets are compromised. This file prevents that.

---

#### A2: The `.env.example` File

This is a template for your actual `.env` file. It shows you what environment variables the project expects without containing any real values.

**How to use it:**
1. Copy `.env.example` to `.env`
2. Open `.env` in your text editor
3. Replace `your_xxx_here` with your actual values
4. Never rename or delete `.env.example` (other dependencies need it)

**Example:**
```bash
# In .env.example:
DATABASE_URL=your_database_url_here

# In .env (your actual file):
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydb
```

> The `.env.example` file is safe to commit to GitHub. The `.env` file is **not**.

---

#### A3: Pre-Commit Hooks (`.pre-commit-config.yaml`)

Pre-commit hooks are automated checks that run every time you try to commit code. If any check fails, the commit is blocked. This prevents accidental secret commits before they even happen.

**Configured Hooks:**

| # | Hook | What It Does |
|---|------|--------------|
| 1 | Trailing Whitespace | Removes extra spaces at the end of lines |
| 2 | End-of-File Fixer | Ensures every file ends with a newline |
| 3 | Check-YAML / Check-JSON | Validates YAML and JSON files are properly formatted |
| 4 | Check-Added-Large Files | Prevents accidentally committing huge files |
| 5 | Detect-Private-Key | Scans staged files for private keys |
| 6 | Detect-AWS-Credentials | Looks for AWS access keys and secret keys |
| 7 | Detect-GCP-Credentials | Looks for Google Cloud Platform credentials |
| 8 | Detect-Azure-Credentials | Looks for Azure credentials and connection strings |
| 9 | No-Commit-To-Main | Prevents direct commits to the main branch |
| 10 | Secretlint | Comprehensive secret detection tool |
| 11 | Gitleaks | Industry-standard secret scanning tool |
| 12 | Bandit (Python) | Python security linter for common issues |
| 13 | Semgrep | Static analysis tool for security vulnerabilities |
| 14 | ESLint Security Plugin | JavaScript/TypeScript linting with security-focused rules |

**How to install:**
```bash
pip install pre-commit
pre-commit install
```

After installation, every `git commit` will automatically run these checks.

---

#### A4: Secrets Baseline (`.secrets.baseline`)

This file is used by the `detect-secrets` tool. It maintains a baseline of known secrets (or false positives) so the tool doesn't re-flag the same things every time.

**When to update:**
- After adding new dependencies that trigger false positives
- After genuinely fixing a secret that was detected
- Do not manually edit this file unless you know what you're doing

---

#### A5: GitAttributes (`.gitattributes`)

This file tells Git how to handle different file types.

**Key Features:**
- **Text files:** Normalized line endings (LF) across all platforms
- **Binary files:** Marked as binary so Git doesn't try to diff them
- **AMV files:** Explicitly marked as binary to prevent corruption

> **Why this matters:** Without this, Git might try to merge conflicts in binary files, corrupting them. The AMV files you mentioned are protected here.

---

### Section B: GitHub Actions Workflows

GitHub Actions are automated workflows that run on GitHub's servers. They trigger on pushes, pull requests, or on a schedule. PromptForge includes **14 security-focused workflows**.

---

#### B1: `security.yml` - Main Security Scanning

**Triggers:** Every push and pull request to main/develop branches.

**Runs:**
- **Secret Scanning:** Scans entire repo history for leaked secrets
- **Dependency Scanning:** Checks npm/pip packages for known vulnerabilities
- **SAST (Static Application Security Testing):** Analyzes source code for security issues without running the program
- **Container Scanning:** Scans Docker images and filesystem for CVEs
- **License Scanning:** Ensures no GPL/AGPL dependencies snuck in

> **Why this is important:** This is your primary security gate. If any push introduces a secret or vulnerability, this workflow will catch it and flag the commit.

---

#### B2: `secret-scanning.yml` - Dedicated Secret Detection

**Triggers:** Every push, pull request, and weekly schedule.

**Runs Three Tools:**
1. **Gitleaks:** Industry-standard tool that scans git history for patterns matching known secret formats (AWS keys, GitHub tokens, etc.)
2. **Detect-Secrets:** Yelp's secret detection tool with custom rules
3. **Secretlint:** Node.js-based secret scanner with configurable rules

> **Why three tools:** No single tool is perfect. By using three, you get overlapping coverage. If one misses something, another will catch it.

---

#### B3: `codeql-analysis.yml` - CodeQL SAST

**Triggers:** Every push, pull request, and weekly schedule.

**What is CodeQL:** CodeQL is GitHub's own code analysis engine. It treats your code as a database and writes queries to find vulnerabilities.

**What it finds:**
- SQL Injection
- Cross-Site Scripting (XSS)
- Path Traversal
- Remote Code Execution
- Insecure Deserialization
- And hundreds more vulnerability patterns

It analyzes both JavaScript/TypeScript and Python code in this project.

---

#### B4: `semgrep.yml` - Semgrep SAST

**Triggers:** Every push, pull request, and weekly schedule.

**What is Semgrep:** Semgrep is a fast, open-source static analysis tool. It uses pattern matching to find security issues. It's like grep but for code logic.

**Advantage over CodeQL:** Semgrep is faster and easier to write custom rules for. It's great for finding project-specific security patterns that generic tools might miss.

---

#### B5: `snyk.yml` - Snyk Dependency Scanning

**Triggers:** Every push, pull request, and weekly schedule.

**What is Snyk:** Snyk is a commercial-grade dependency scanning tool (free for open source). It checks your npm, pip, and other package manager dependencies against a database of known vulnerabilities.

**What it catches:**
- Outdated packages with known CVEs
- Transitive dependency vulnerabilities
- License compliance issues

**Requires:** A `SNYK_TOKEN` (free to get at [snyk.io](https://snyk.io))

---

#### B6: `trivy.yml` - Container & Filesystem Scanning

**Triggers:** Every push, pull request, and weekly schedule.

**What is Trivy:** Trivy is a comprehensive security scanner by Aqua Security. It scans:
- Filesystems (your source code and dependencies)
- Docker images (if you have a Dockerfile)
- Kubernetes clusters
- Infrastructure as Code (Terraform, etc.)

It finds: CVEs, misconfigurations, secrets, and license issues.

---

#### B7: `bandit.yml` - Python Security Testing

**Triggers:** Every push, pull request, and weekly schedule.

**What is Bandit:** Bandit is a tool designed to find common security issues in Python code. It works by constructing an AST (Abstract Syntax Tree) of each Python file and testing nodes against a set of security checks.

**What it finds:**
- Use of insecure functions (`exec`, `eval`, etc.)
- Hardcoded passwords
- SQL injection vulnerabilities
- Insecure random number generation
- Weak cryptographic implementations

---

#### B8: `dependency-audit.yml` - Comprehensive Dependency Checking

**Triggers:** Every push, pull request, and weekly schedule.

**Runs:**
- `npm audit`: Checks Node.js dependencies for known vulnerabilities
- `pip-audit`: Checks Python dependencies for known vulnerabilities
- `license-checker`: Ensures no copyleft licenses (GPL, AGPL) are used

> **Why this matters:** Vulnerable dependencies are the #1 source of security breaches. This workflow ensures your dependencies are up to date and secure.

---

#### B9: `dependency-review.yml` - PR Dependency Review

**Triggers:** Every pull request to main/develop.

**What it does:** When someone submits a pull request that adds or updates dependencies, this workflow checks:
- If the new dependency has known vulnerabilities
- If the license is permissive (MIT, Apache, BSD) or restrictive (GPL)
- If the dependency is well-maintained and trusted

This prevents dangerous dependencies from being merged into your codebase.

---

#### B10: `security-headers.yml` - Security Headers Check

**Triggers:** Every push, pull request, and weekly schedule.

**What it checks:** If your project serves web pages, this ensures proper security headers are configured:

| Header | Purpose |
|--------|---------|
| `X-Content-Type-Options` | Prevents MIME sniffing |
| `X-Frame-Options` | Prevents clickjacking |
| `X-XSS-Protection` | Enables browser XSS filter |
| `Strict-Transport-Security` | Enforces HTTPS |
| `Content-Security-Policy` | Prevents XSS and data injection |
| `Referrer-Policy` | Controls referrer information leakage |
| `Permissions-Policy` | Restricts browser features |

---

#### B11: `security-policy.yml` - Policy Enforcement

**Triggers:** Every push, pull request, and weekly schedule.

**What it does:** Enforces organizational security policies by checking:
- `SECURITY.md` file exists and is properly formatted
- Secret rotation reminders (on schedule)
- Compliance checks against OWASP and other standards

---

#### B12: `owasp-zap.yml` - DAST Scanning

**Triggers:** Every push, pull request, and weekly schedule.

**What is OWASP ZAP:** OWASP ZAP (Zed Attack Proxy) is a Dynamic Application Security Testing tool. Unlike SAST (which analyzes source code), DAST actually runs your application and attacks it to find vulnerabilities.

**What it finds:**
- SQL Injection
- Cross-Site Scripting (XSS)
- Security misconfigurations
- Information disclosure
- Insecure server configurations

The `.zap/rules.tsv` file configures which vulnerabilities to check for and how aggressively to scan.

---

#### B13: `scorecard.yml` - OpenSSF Scorecard

**Triggers:** Weekly schedule.

**What is OpenSSF Scorecard:** An automated security health check for open source projects. It analyzes your repository and gives you a security score based on best practices.

**It checks:**
- Branch protection
- Code review requirements
- CI/CD tests
- Dependency update tooling
- Security policy
- And more

A high score indicates your project follows security best practices.

---

#### B14: `code-scanning.yml` - General Code Scanning

**Triggers:** Every push, pull request, and weekly schedule.

**What it does:** A combination of multiple code scanning tools that run in parallel:
- CodeQL analysis
- Security header checks
- CORS configuration checks
- Cookie security checks

This is your safety net that catches anything the individual workflows might miss.

---

### Section C: Configuration Files

---

#### C1: `package.json`

**Contains:**
- Project metadata (name, version, description)
- NPM scripts for common tasks
- Dev dependencies for linting, testing, and security

**Key Scripts:**

| Script | Command |
|--------|---------|
| Run tests | `npm test` |
| Check code style | `npm run lint` |
| Auto-format code | `npm run format` |
| Check vulnerable dependencies | `npm run security:audit` |
| Scan code for secrets | `npm run security:scan` |

---

#### C2: `tsconfig.json`

**TypeScript Configuration:**
- Target: ES2022 (modern JavaScript)
- Strict mode: Enabled (catches more bugs)
- Source maps: Enabled (helps with debugging)
- Output: `./dist` directory

---

#### C3: `.eslintrc.json`

**ESLint Configuration with Security Plugin:**
- Standard JavaScript/TypeScript rules
- Security plugin rules:
  - `detect-object-injection`: WARN
  - `detect-unsafe-regex`: ERROR
  - `detect-eval-with-expression`: ERROR
  - `detect-sql-injection`: ERROR
  - `detect-buffer-noassert`: ERROR

---

#### C4: `.prettierrc.json`

**Code Formatting Rules:**
- Semicolons: Yes
- Single quotes: Yes
- Trailing commas: ES5
- Print width: 88 characters
- Tab width: 2 spaces

---

#### C5: `.secretlintrc.json`

**Secret Lint Configuration:**
- Uses the recommended rule preset
- Can be customized to ignore false positives
- Scans all files for secret patterns

---

#### C6: `pyproject.toml`

**Python Project Configuration:**
- Bandit security testing config
- Pytest test configuration
- Ruff linter configuration
- Mypy type checking config

---

#### C7: `.github/dependabot.yml`

**Dependabot Configuration:**
- Automatically creates pull requests to update dependencies
- Checks npm, pip, GitHub Actions, and Docker dependencies
- Runs weekly on Mondays
- Labels PRs as "dependencies" and "security"
- Assigns reviewers automatically

---

#### C8: `.github/CODEOWNERS`

**Code Ownership:**
- Defines who owns which files
- Automatically requests reviews from owners on PRs
- Security files are owned by the project maintainer

---

#### C9: `.github/ISSUE_TEMPLATE/security-issue.md`

**Security Issue Template:**
- Guidelines for reporting security vulnerabilities
- Reminds users not to open public issues for secrets
- Provides email for private reporting

---

#### C10: `.github/PULL_REQUEST_TEMPLATE.md`

**PR Template:**
- Checklist for security (no hardcoded secrets, dependencies secure, etc.)
- Checklist for code quality
- Type of change selection
- Testing description

---

### Section D: Documentation Files

---

#### D1: `README.md`

Project overview with:
- Security features list
- Protected file types
- Getting started instructions
- Important security notes

---

#### D2: `SECURITY.md`

Comprehensive security documentation:
- How to report vulnerabilities
- Secret management best practices
- Git security practices
- File protection details
- Development environment security
- Code review checklist
- Sensitive file types list
- Compliance standards

---

#### D3: `CONTRIBUTING.md`

Contribution guidelines with security focus:
- Security guidelines for contributors
- Secret management rules
- Code review requirements
- Sensitive file types to never commit
- Pre-commit check instructions
- PR template requirements
- Development setup guide
- Code style guide
- Testing requirements
- Release process

---

#### D4: `CHANGELOG.md`

Version history:
- Tracks all changes by version
- Follows Keep a Changelog format
- Categories: Added, Changed, Deprecated, Removed, Fixed, Security

---

#### D5: `LICENSE`

MIT License:
- Permissive open source license
- Allows commercial use, modification, and distribution
- Requires license copyright notice

---

### Section E: Source Code

---

#### E1: `src/index.ts`

Main application entry point:
- Loads environment variables from `.env`
- Validates required environment variables exist
- Exports a config object with all settings
- Throws errors if required variables are missing

> This is a starter file. Replace it with your actual application code.

---

#### E2: `src/__tests__/index.test.ts`

Unit tests:
- Tests that config object is properly loaded
- Tests default values
- Ensures secrets are not logged in plaintext
- Uses Jest testing framework

---

## Quick Reference: Common Commands

### Setup
```bash
git clone https://github.com/sif20023/PromptForge.git
cd PromptForge
npm install
copy .env.example .env
# Edit .env with your secrets
```

### Development
```bash
npm run dev          # Start dev server
npm test             # Run tests
npm run lint         # Check code style
npm run format       # Auto-format code
npm run type-check   # TypeScript type checking
```

### Security
```bash
npm run security:audit  # Check dependencies for vulnerabilities
npm run security:scan   # Scan code for secrets
```

### Git
```bash
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub
git pull             # Pull latest changes
```

### Pre-Commit (after installing pre-commit)
```bash
pre-commit run --all-files  # Run all hooks manually
```

---

**[End of Guide]**
