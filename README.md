# Quanta SaaS Landing Page

A modern, high-performance, interactive SaaS landing page created with React 18, Vite, OGL (WebGL), Motion, and custom Canvas animations.

![Preview](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![WebGL](https://img.shields.io/badge/WebGL-OGL-990000?style=for-the-badge&logo=webgl)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- 🧊 **3D Glass Graphics**: Real-time WebGL glass torus with raycasting and reflection using [OGL](https://github.com/oframe/ogl).
- 🌊 **Fluid Backgrounds**: Canvas-driven interactive elastic mesh and animated gradient waves.
- ✨ **Interactive Spark FX**: Particle spark explosion effects on user clicks.
- 🔤 **Dynamic Text Effects**: Cyberpunk text decryption scramble and staggered blur-in text reveals.
- 🎴 **Glassmorphic UI**: Mouse-tracking spotlight card glow effects and custom border highlights.
- ⚡ **Lightning Fast**: Built on Vite 5 with minimal bundle footprint.
- 📱 **Fully Responsive**: Seamless layout adaptivity across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite 5](https://vitejs.dev/) |
| **3D & WebGL** | [OGL](https://github.com/oframe/ogl) |
| **Animations** | [Motion (Framer Motion v13)](https://motion.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Styling** | Vanilla CSS3 (Design Tokens, Glassmorphism, CSS Grid/Flexbox) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository** (or extract the source folder):
   ```bash
   git clone https://github.com/your-username/quanta-saas-landing.git
   cd quanta-saas-landing
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Scripts

- `npm run dev` — Starts local development server on port `5173` with HMR.
- `npm run build` — Bundles production-ready assets into the `dist/` folder.
- `npm run preview` — Previews the production build locally.

---

## 📂 Project Structure

```text
├── assets/             # Static brand & media assets
├── public/             # Public static assets
├── src/
│   ├── components/     # Interactive components & WebGL scripts
│   │   ├── GlassTorus3D.jsx   # 3D WebGL Torus (OGL)
│   │   ├── ElasticMesh.jsx    # Canvas interactive elastic grid
│   │   ├── GradientWaves.jsx  # Fluid background waves canvas
│   │   ├── DecryptedText.jsx  # Matrix scramble text component
│   │   ├── BlurText.jsx       # Motion blur-in text reveal
│   │   ├── SpotlightCard.jsx  # Mouse-tracking glowing card
│   │   ├── BorderGlow.jsx     # Gradient glowing border panel
│   │   ├── ClickSpark.jsx     # Click particle sparks
│   │   └── CountUp.jsx        # Scroll counter component
│   ├── App.jsx         # Main Landing Page Layout
│   ├── main.jsx        # Application entry point
│   └── index.css       # Core CSS design system & tokens
├── index.html          # HTML entry point
├── package.json        # Project dependencies and scripts
└── vite.config.js      # Vite configuration file
```

---

## 🌐 Deployment

### Deploy to GitHub Pages

1. In `vite.config.js`, set `base: '/<repository-name>/'`.
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy the `dist` folder using `gh-pages` or GitHub Actions.

### Deploy to Vercel

1. Push your code to GitHub.
2. Import your repository into [Vercel](https://vercel.com).
3. Vercel automatically detects Vite — click **Deploy**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
