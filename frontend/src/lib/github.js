/**
 * GitHub API helpers — used by ProjectsSection to fetch live repo data.
 * All fetches go through Next.js fetch() which caches by default (ISR).
 */

const GITHUB_API = "https://api.github.com";
const USERNAME = "Ashique64";

/**
 * Fetch all public repos for the portfolio owner, sorted by push date.
 * Returns an enriched array with language color, formatted date, etc.
 */
export async function fetchGithubRepos() {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=20&type=public`,
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

    return repos
      .filter((r) => !r.fork && !r.archived) // skip forks and archived
      .slice(0, 9) // max 9 cards
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description || "No description provided.",
        url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        languageColor: LANGUAGE_COLORS[r.language] || "#8B949E",
        stars: r.stargazers_count,
        forks: r.forks_count,
        topics: r.topics?.slice(0, 4) || [],
        updatedAt: new Date(r.updated_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        }),
      }));
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return FALLBACK_REPOS;
  }
}

/** Language → hex color map (GitHub's official palette subset) */
export const LANGUAGE_COLORS = {
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

/** Fallback repos shown if GitHub API is unavailable */
const FALLBACK_REPOS = [
  {
    id: 1,
    name: "portfolio",
    description: "Cinematic 3D portfolio built with Next.js, Three.js, and GSAP.",
    url: "https://github.com/Ashique64",
    homepage: null,
    language: "JavaScript",
    languageColor: "#F1E05A",
    stars: 0,
    forks: 0,
    topics: ["nextjs", "threejs", "gsap"],
    updatedAt: "May 2026",
  },
  {
    id: 2,
    name: "web3-dapp",
    description: "Decentralized application built on Ethereum with Solidity smart contracts.",
    url: "https://github.com/Ashique64",
    homepage: null,
    language: "Solidity",
    languageColor: "#AA6746",
    stars: 0,
    forks: 0,
    topics: ["ethereum", "solidity", "web3"],
    updatedAt: "Apr 2026",
  },
  {
    id: 3,
    name: "ai-dashboard",
    description: "Real-time AI analytics dashboard with Next.js and Python backend.",
    url: "https://github.com/Ashique64",
    homepage: null,
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    topics: ["python", "ai", "nextjs"],
    updatedAt: "Mar 2026",
  },
];
