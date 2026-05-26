/**
 * GitHub API helpers — used by ProjectsSection to fetch live repo data.
 * All fetches go through Next.js fetch() which caches by default (ISR).
 */

import { CONFIG } from "./constants";

const GITHUB_API = "https://api.github.com";
const USERNAME = "Ashique64";

/** Custom description overrides for showcase projects */
const PROJECT_DESCRIPTIONS = {
  "cozech-agency": "A modern digital agency website built with a premium UI/UX experience, featuring smooth animations, responsive layouts, and performance-focused frontend architecture for showcasing services, projects, and brand identity.",
  "G-G-partner-Expense-Tracker": "A collaborative expense management system designed for business partners to track shared expenses, manage financial records, calculate balances, and simplify partnership accounting workflows efficiently.",
  "DRZ_Data_Collection": "A custom data collection and management platform developed to streamline structured data entry, organization, and processing with an efficient workflow-focused interface and scalable backend architecture.",
  "POS-Billing": "A Point of Sale (POS) billing system built for retail and business operations, featuring invoice generation, sales tracking, product management, and streamlined billing workflows for efficient store management.",
};

/** Custom topic (tag) overrides for showcase projects */
const PROJECT_TOPICS = {
  "cozech-agency": ["Next.js", "GSAP", "Tailwind", "SCSS"],
  "G-G-partner-Expense-Tracker": ["Supabase", "Tailwind", "SCSS", "PostgreSQL"],
  "DRZ_Data_Collection": ["PostgreSQL", "React.js", "Tailwind", "SCSS", "Django"],
  "POS-Billing": ["Django", "PostgreSQL"],
};

/** Custom language overrides for showcase projects */
const PROJECT_LANGUAGES = {
  "cozech-agency": "JavaScript, CSS",
  "G-G-partner-Expense-Tracker": "JavaScript, CSS",
  "DRZ_Data_Collection": "Python, JavaScript, CSS",
  "POS-Billing": "Python",
};

/**
 * Fetch all public repos for the portfolio owner, sorted by push date.
 * Returns an enriched array with language color, formatted date, etc.
 */
export async function fetchGithubRepos() {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=100&type=public`,
      {
        next: { revalidate: 3600 }, // revalidate every hour
        headers: {
          Accept: "application/vnd.github.v3+json",
          // If you add a GITHUB_TOKEN env var, uncomment below for higher rate limits:
          // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API returned ${res.status}`);
      return FALLBACK_REPOS;
    }

    const repos = await res.json();
    const selectedNames = CONFIG.profile?.selectedProjects || [
      "cozech-agency",
      "G-G-partner-Expense-Tracker",
      "DRZ_Data_Collection",
      "POS-Billing"
    ];

    const mapped = repos
      .filter((r) => selectedNames.includes(r.name))
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: PROJECT_DESCRIPTIONS[r.name] || r.description || "No description provided.",
        url: r.html_url,
        homepage: r.homepage,
        language: PROJECT_LANGUAGES[r.name] || r.language,
        languageColor: LANGUAGE_COLORS[PROJECT_LANGUAGES[r.name] || r.language] || "#8B949E",
        stars: r.stargazers_count,
        forks: r.forks_count,
        topics: PROJECT_TOPICS[r.name] || r.topics?.slice(0, 4) || [],
        updatedAt: new Date(r.updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }),
      }));

    // Sort to match the exact order specified in selectedProjects
    mapped.sort((a, b) => selectedNames.indexOf(a.name) - selectedNames.indexOf(b.name));

    // If some selected repos weren't found in the API response (e.g. if private/archived/deleted),
    // fill in from fallbacks to guarantee we always have 4 beautiful projects
    if (mapped.length < selectedNames.length) {
      const existingNames = mapped.map(m => m.name);
      const missingNames = selectedNames.filter(name => !existingNames.includes(name));
      
      missingNames.forEach(name => {
        const fallback = FALLBACK_REPOS.find(f => f.name === name);
        if (fallback) {
          mapped.push(fallback);
        }
      });
      
      // Re-sort again to ensure correct order
      mapped.sort((a, b) => selectedNames.indexOf(a.name) - selectedNames.indexOf(b.name));
    }

    return mapped.slice(0, 4);
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return FALLBACK_REPOS;
  }
}

/** Language → hex color map (GitHub's official palette subset) */
export const LANGUAGE_COLORS = {
  "JavaScript, CSS":  "#A78BFA",
  "JavaScript, SCSS": "#A78BFA",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Python:     "#3572A5",
  HTML:       "#E34C26",
  CSS:        "#563D7C",
  SCSS:       "#C6538C",
  Shell:      "#89E051",
  Go:         "#00ADD8",
  Rust:       "#DEA584",
  Java:       "#B07219",
  "C++":      "#F34B7D",
  C:          "#555555",
  Ruby:       "#CC342D",
  Swift:      "#F05138",
  Kotlin:     "#A97BFF",
  Solidity:   "#AA6746",
};

/** Fallback repos shown if GitHub API is unavailable or rate-limited */
const FALLBACK_REPOS = [
  {
    id: 1,
    name: "cozech-agency",
    description: "A modern digital agency website built with a premium UI/UX experience, featuring smooth animations, responsive layouts, and performance-focused frontend architecture for showcasing services, projects, and brand identity.",
    url: "https://github.com/Ashique64/cozech-agency",
    homepage: "https://cozech-agency-dz1m.vercel.app",
    language: "JavaScript, CSS",
    languageColor: "#A78BFA",
    stars: 0,
    forks: 0,
    topics: ["Next.js", "GSAP", "Tailwind", "SCSS"],
    updatedAt: "Jan 2026",
  },
  {
    id: 2,
    name: "G-G-partner-Expense-Tracker",
    description: "A collaborative expense management system designed for business partners to track shared expenses, manage financial records, calculate balances, and simplify partnership accounting workflows efficiently.",
    url: "https://github.com/Ashique64/G-G-partner-Expense-Tracker",
    homepage: null,
    language: "JavaScript, CSS",
    languageColor: "#A78BFA",
    stars: 0,
    forks: 0,
    topics: ["Supabase", "Tailwind", "SCSS", "PostgreSQL"],
    updatedAt: "Feb 2026",
  },
  {
    id: 3,
    name: "DRZ_Data_Collection",
    description: "A custom data collection and management platform developed to streamline structured data entry, organization, and processing with an efficient workflow-focused interface and scalable backend architecture.",
    url: "https://github.com/Ashique64/DRZ_Data_Collection",
    homepage: null,
    language: "Python, JavaScript, CSS",
    languageColor: "#A78BFA",
    stars: 0,
    forks: 0,
    topics: ["PostgreSQL", "React.js", "Tailwind", "SCSS", "Django"],
    updatedAt: "Jul 2024",
  },
  {
    id: 4,
    name: "POS-Billing",
    description: "A Point of Sale (POS) billing system built for retail and business operations, featuring invoice generation, sales tracking, product management, and streamlined billing workflows for efficient store management.",
    url: "https://github.com/Ashique64/POS-Billing",
    homepage: null,
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    topics: ["Django", "PostgreSQL"],
    updatedAt: "Oct 2024",
  },
];
