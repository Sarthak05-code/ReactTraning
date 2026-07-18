# React + Tailwind CSS Project

[![React CI/CD](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/react-ci.yml/badge.svg)](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/react-ci.yml)
[![CodeQL](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/codeql.yml/badge.svg)](https://github.com/Sarthak05-code/ReactTraning/actions/workflows/codeql.yml)

A modern, highly responsive frontend application built with **React**, **Vite**, and **Tailwind CSS**.

The project demonstrates modular frontend architecture, robust state management, and automated continuous integration, security scanning, and dependency management using GitHub Actions.

---

## Features

- Responsive layout and interface
- Modern React + Vite setup
- Tailwind CSS v4 styling architecture
- Highly interactive UI and component state management
- Automatic deployment pipeline to GitHub Pages
- Automated code quality checks
- Security analysis using CodeQL
- Automatic dependency updates with Dependabot

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- pnpm
- GitHub Actions
- GitHub Pages

---

## Automation

This repository includes automated GitHub workflows to ensure codebase stability and security:

| Workflow      | Purpose                                                    |
| ------------- | ---------------------------------------------------------- |
| React CI/CD   | Validates builds and automatically deploys the application |
| CodeQL        | Automated vulnerability and security flaw scanning        |
| Dependabot    | Keeps dependencies securely up to date                    |

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Sarthak05-code/ReactTraning.git
cd ReactTraning
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Create a production build:

```bash
pnpm build
```

---

## Project Structure

```
.
├── .github/
│   └── workflows/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## Roadmap

- [ ] Implement advanced interactive game mechanics and dashboard layout
- [ ] Add unit tests with Vitest
- [ ] Add React Testing Library configuration
- [ ] Connect custom domain and hosting setups
- [ ] Improve transitions, animations, and accessibility guidelines

---

## License

This project is licensed under the MIT License.