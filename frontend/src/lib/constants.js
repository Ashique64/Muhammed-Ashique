export const CONFIG = {
  profile: {
    name: "MUHAMMED ASHIQUE",
    title: "Full Stack Developer",
    tagline: "Here's my take, whether it's building software or products.",
    philosophyTag: "Design. Develop. Deliver.",
    githubUsername: "Ashique64",
    location: "Kerala, India",
    speedCounter: {
      value: 11.0,
      label: "Faster",
      sublabel: "Optimized Performance"
    },
    stats: [
      { value: "3+", label: "Years Building" },
      { value: "20+", label: "Projects Shipped" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "∞", label: "Curiosity" },
    ],
  },
  
  philosophy: [
    {
      id: "asking",
      heading: "Asking questions is important, finding absolute answers is critical.",
      highlight: ["important,", "critical."],
      description: "Deep research is the driver of clean engineering. Every variable, every design decision, must have a clear 'why'."
    },
    {
      id: "reliability",
      heading: "Reliability comes from consistency, not convenience.",
      highlight: ["consistency,", "convenience."],
      description: "We build features fast, but we build architecture to last. Robust tests, deterministic pipelines, and strict type safety."
    },
    {
      id: "ai-code",
      heading: "Yes AI can code, but humans design solutions.",
      highlight: ["design", "solutions."],
      description: "Code is just syntax. Real impact lies in understanding constraints, scaling bottlenecks, and translating human needs into reliable systems."
    },
    {
      id: "code-need",
      heading: "Do we need more code..? or actual solutions?",
      highlight: ["more", "code..?", "solutions?"],
      description: "The best line of code is the one that didn't need to be written. Minimalism in software design prevents modern clutter."
    },
    {
      id: "change",
      heading: "Change is part of building; resilience is surviving it.",
      highlight: ["building;", "surviving"],
      description: "Tech stacks evolve. The ability to abstract core business logic away from volatile dependencies guarantees product longevity."
    },
    {
      id: "cause-effect",
      heading: "Cause & Effect.",
      highlight: ["Cause", "Effect."],
      description: "Every action has a system reaction. Good engineers optimize local processes; great engineers optimize global systems."
    },
    {
      id: "cta",
      heading: "You be the perception, I'll be the tool.",
      highlight: ["perception,", "tool."],
      description: "Let's build something exceptional together.",
      ctaLink: "/about",
      ctaLabel: "Let's Connect"
    }
  ],

  work: [
    {
      id: "w1",
      company: "Full Stack Development & Freelancing",
      role: "Full Stack Developer",
      period: "2023 — Present",
      bullets: [
        "Architected responsive Single Page Applications (SPAs) using React and Vite, achieving 40% improvements in page load speeds.",
        "Integrated secure REST API endpoints with Node.js and Express, guaranteeing high-performance data processing pipelines.",
        "Implemented pixel-perfect styling using Tailwind CSS, strictly following semantic layout principles and responsive designs.",
        "Leveraged Git and GitHub to maintain structured version control branches and review team pull requests."
      ],
      skills: ["React.js", "Vite", "JavaScript (ES6+)", "Tailwind CSS", "Node.js", "Express", "REST APIs", "Git", "GitHub"]
    },
    {
      id: "w2",
      company: "Interactive Web Projects",
      role: "Frontend Developer",
      period: "2022 — 2023",
      bullets: [
        "Designed modular UI components utilizing modern CSS flexbox and grid styling properties.",
        "Refactored legacy vanilla CSS markup into optimized, responsive HTML structures.",
        "Developed custom interactive cards and dynamic content layouts using React hooks.",
        "Managed GitHub repository releases, creating descriptive documentation templates and blog layouts."
      ],
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Git", "GitHub", "Responsive Design"]
    }
  ],

  about: {
    photo: "/avatar.png",
    bio: [
      "I am a Full Stack Developer and React Specialist passionate about crafting highly responsive, performant, and pixel-perfect web experiences.",
      "My development philosophy revolves around architectural minimalism and clean code standards. I believe digital interfaces should feel lightweight, run with hardware acceleration, and look aesthetically flawless.",
      "With a strong foundation in modern JavaScript, React ecosystem tooling (like Vite), and Tailwind CSS styling systems, I strive to turn complex designs into functional, highly-intuitive user experiences."
    ],
    socials: [
      { name: "GitHub", url: "https://github.com/Ashique64", username: "@Ashique64", icon: "github" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammed-ashique-k-p-9a03b0267/", username: "Muhammed Ashique K P", icon: "linkedin" },
      { name: "Email", url: "mailto:ashiquekp64@gmail.com", username: "ashiquekp64@gmail.com", icon: "email" },
      { name: "Twitter / X", url: "https://x.com", username: "@Ashique64", icon: "twitter" }
    ]
  },

  skills: [
    // Core Frontend
    { name: "React",      category: "frontend", color: "#61DAFB", size: 1.4 },
    { name: "Next.js",   category: "frontend", color: "#FFFFFF", size: 1.3 },
    { name: "TypeScript",category: "frontend", color: "#3178C6", size: 1.2 },
    { name: "JavaScript",category: "frontend", color: "#F7DF1E", size: 1.2 },
    { name: "Tailwind",  category: "frontend", color: "#38BDF8", size: 1.1 },
    { name: "GSAP",      category: "frontend", color: "#88CE02", size: 1.0 },
    // Backend
    { name: "Node.js",   category: "backend",  color: "#339933", size: 1.3 },
    { name: "Express",   category: "backend",  color: "#FFFFFF", size: 1.1 },
    { name: "Python",    category: "backend",  color: "#3776AB", size: 1.1 },
    { name: "REST APIs", category: "backend",  color: "#FF6B35", size: 1.0 },
    // Database
    { name: "MongoDB",   category: "database", color: "#47A248", size: 1.1 },
    { name: "SQL",       category: "database", color: "#4479A1", size: 1.0 },
    // Tools
    { name: "Git",       category: "tools",    color: "#F05032", size: 1.1 },
    { name: "Docker",    category: "tools",    color: "#2496ED", size: 1.0 },
    { name: "Vercel",    category: "tools",    color: "#FFFFFF", size: 0.9 },
    // AI / Blockchain
    { name: "AI/ML",     category: "emerging", color: "#A78BFA", size: 1.2 },
    { name: "Web3",      category: "emerging", color: "#F59E0B", size: 1.1 },
    { name: "Three.js",  category: "emerging", color: "#049EF4", size: 1.0 },
  ],
};
