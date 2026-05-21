# Portfolio Walkthrough & Verification Guide

We have completed the implementation of your premium, high-contrast, editorial portfolio modeled after [rishabh-upadhyay.com](https://www.rishabh-upadhyay.com/). The entire codebase has been structured with Next.js 14+ (App Router), Tailwind CSS v4, Framer Motion, GSAP, and Lenis smooth scrolling.

All copy, roles, achievements, and configurations are centrally managed and completely dynamic.

---

## 🎨 System Walkthrough

Here is a summary of what has been built across each architectural layer:

### 1. Foundations & Design Tokens
* **[globals.css](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/app/globals.css)**: Implements custom CSS variables inside Tailwind v4's `@theme` directive, binding a deep `#0a0a0a` background, white accents, and elegant typography variables. Establishes a highly-premium **ambient SVG grain noise overlay** that floats statically in the background.
* **[layout.js](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/app/layout.js)**: Configures Google Fonts integration by mapping **Instrument Serif** (the high-contrast serif display font) alongside Geist Sans and Geist Mono. Wraps the routing viewport inside the smooth scroll context.

### 2. Core UI Frameworks
* **[SmoothScroll.jsx](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/components/ui/SmoothScroll.jsx)**: Establishes a client-side wrapper linking the Lenis scrolling thread into GSAP's `ScrollTrigger` updates and the global ticker loop, providing ultra-responsive momentum scrolling on desktops while preserving standard tactile momentum on touch screens.
* **[CustomCursor.jsx](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/components/ui/CustomCursor.jsx)**: Implements spring-based custom cursor shapes (dot + glass outer ring) using high-performance Framer Motion `MotionValues` that bypass React re-renders. Integrates hover listeners that morph, enlarge, and blend the outer cursor ring over interactive nodes.
* **[Navbar.jsx](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/components/ui/Navbar.jsx)**: Implements a fixed typographic initial brand logo on the left and a floating glassmorphic capsule menu on the right. Employs Framer Motion's `layoutId` layout transitions to slide the active bubble selector between routes.

### 3. Home Route (Hero & Philosophy Panels)
* **[Hero.jsx](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/components/home/Hero.jsx)**: Renders a large editorial layout splitting the developer's name on a 2-line structure (indented italicized serif). Features a hardware-accelerated Framer Motion decimal counter ticking up to `11.0` and a blinking terminal state cursor.
* **[PhilosophySection.jsx](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/components/home/PhilosophySection.jsx)**: Generates full-viewport (100vh) blocks that split content copy into arrays of words, triggering staggered GSAP `ScrollTrigger` entrances to slide characters up on entry. Automatically maps custom styling triggers on target words.
* **[ScrollMarquee.jsx](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/components/home/ScrollMarquee.jsx)**: Instantiates infinitely-scrolling horizontal text banners utilizing composite-layer CSS keyframe translations for maximum hardware acceleration.

### 4. Work Experience Page
* **[WorkCard.jsx](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/components/work/WorkCard.jsx)**: Implements an experience block featuring border highlights, top linear glowing beams on hover, structured achievements, and outline skill tags.
* **[work/page.js](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/app/work/page.js)**: Assembles the page header and maps all work cards dynamically.

### 5. Biography & About Page
* **[about/page.js](file:///c:/Users/hp/Desktop/Projects/Muhammed-Ashique/frontend/src/app/about/page.js)**: Configures a 2-column layout. The left column mounts a custom generative vector SVG tech canvas with drifting abstract particles and glowing nodes. The right column renders the biography text and structures a social links contact footer.

---

## 🛠️ Verification & local testing

To verify the build and explore your premium portfolio:

1. **Start the local Dev Server**:
   Open a terminal in your workspace `/frontend` folder and run:
   ```bash
   npm run dev
   ```
2. **Access local server**:
   Navigate your web browser to `http://localhost:3000`.

### Checklist of Items to Test:
* [ ] **Cursor Morphing**: Hover your mouse over the brand logo or navigation links in the header. The inner dot should scale away, while the outer ring expands into a semi-translucent glass circle with a sharp highlight.
* [ ] **Active Tab Underline**: Click on `[Work]` or `[About]`. The active tab's floating outline should slide and morph smoothly into the new selection.
* [ ] **Hero Speed Ticker**: Reload the home page. The counter on the bottom left should animate up to `11.0` using custom spring interpolation.
* [ ] **Scroll-Triggered Reveals**: Scroll down the Home page. Observe the large, bold philosophy text revealing word-by-word, fading in the description shortly after.
* [ ] **Infinite Marquees**: Verify the infinite text marquee is running smoothly without jumps or lag.
* [ ] **Work Card Interactions**: Hover over the cards on `/work`. The border outline should light up, and the card should lift up by `4px` with a subtle top light gradient.
