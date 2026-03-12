# Hugo Trier - Chapter 1

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite)

**Hugo Trier - Chapter 1** is a time-loop decision RPG with meta-progression, inspired by *Majora's Mask* and *Reigns*. A personal learning project focused on **React 18**, **TypeScript**, and **Redux Toolkit** — professional architecture applied to an indie game.

You have 16 hours to save who you love.

---

## 🎮 About the Game

Hugo Trier is a 16-year-old boy trapped in a temporal loop on the day his village is destroyed by a royal army. Each death sends him back to 6:00 AM, but fragments of memory crystallize into **Reality Points** — the only currency that persists between loops.

Use these points to unlock permanent upgrades: attributes, proficiencies, memories, and utilities. Discover secrets, forge relationships, and try to change the inevitable. Will you save your family? Your love? Or just yourself?

### Key Features

- ⏰ **Time as Resource**: 960 minutes of game time. Every action costs precious minutes.
- 🔄 **Temporal Loop**: Die, learn, upgrade, repeat. Meta-progression carries forward.
- 🎯 **5 Endings**: Good, Neutral, Bad, Secret (canonical), and one hidden mystery.
- 📖 **Decision-Based**: No real-time combat. Choices, dice rolls, and consequences.
- 🎨 **Stylized Visuals**: Cartoon aesthetic inspired by *Samurai Jack* and *Child of Light*.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Language | TypeScript 5 |
| State Management | Redux Toolkit 2 |
| Build Tool | Vite 4 |
| Styling | CSS Modules + SCSS |
| i18n | react-i18next |
| Testing | Vitest + React Testing Library |

### Architecture Highlights

- **Feature-based slices**: Domain-driven Redux structure (ducks pattern)
- **Memoized selectors**: Optimized re-renders with Reselect
- **Async thunks**: Controlled side effects for timed actions
- **Strict TypeScript**: Zero `any`, complete type safety
- **i18n-ready**: All strings externalized for localization

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-username]/hugo-trier.git
cd hugo-trier

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

**Eder Borella** — Developer & Creator of Hugo Trier

| Platform | Link |
|----------|------|
| 🐙 **GitHub** | [@EderBorella](https://github.com/EderBorella) |
| 📧 **Email** | [ederlederlopesborella@gmail.com](mailto:ederlederlopesborella@gmail.com) |
| 💼 **LinkedIn** | [/in/eder-borella/](https://linkedin.com/in/eder-borella/) |
