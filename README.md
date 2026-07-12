# React Portfolio 🚀

[![React CI/CD](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/react-cicd.yml/badge.svg)](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/react-cicd.yml)
[![Lighthouse CI](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/lighthouse.yml)
[![CodeQL Security](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/codeql.yml/badge.svg)](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/codeql.yml)

A modern, high-performance personal portfolio built with React and heavily automated using enterprise-grade CI/CD and DevOps best practices.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Package Manager:** pnpm (v10)
- **Deployment:** GitHub Pages
- **Code Quality:** ESLint, Lighthouse CI

---

## 🤖 Automated Workflows & CI/CD

This repository operates on a fully automated GitOps pipeline to ensure code security, optimal performance, and up-to-date dependencies:

### 1. Build & Deployment (`react-cicd.yml`)
- Triggered on every `push` or `pull_request` to `main`.
- Runs parallel dependency caching via `pnpm` to maximize action speeds.
- Automatically handles type-checking, building, and seamless compilation delivery directly to GitHub Pages.

### 2. Quality Control (`lighthouse.yml` & `lighthouserc.json`)
- Runs Google Lighthouse audits autonomously on incoming pull requests.
- Measures thresholds across **Performance, Accessibility, Best Practices, and SEO**.
- Enforces performance budgets to strictly block code that degrades user experience.

### 3. Dependency Management & Autopilot (`dependabot.yml`)
- Scans for dependency upgrades weekly.
- Implements a **3-day cooldown matrix** on new library releases to avoid zero-day breaks and buggy updates.
- Uses automated testing routines to merge verified package upgrades securely without manual click intervention.

### 4. Static Code Security (`codeql.yml`)
- Executes standard semantic vulnerability parsing.
- Schedules isolated execution sequences out of critical path loops to minimize daily build queue friction.

---

## 🚀 Local Development

To run this project locally, ensure you have **Node.js (v24)** and **pnpm (v10)** installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sarthak05-code/ReactTraning.git
   cd ReactTraning
   ```

2. **Install dependencies:**
   ```bash
   pnpm install --frozen-lockfile
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Build for production:**
   ```bash
   pnpm build
   ```