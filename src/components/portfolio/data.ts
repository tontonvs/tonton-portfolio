export type Project = {
  slug: string;
  tag: string;
  title: string;
  tagline: string;
  about: string;
  achievements: string[];
  tech: string[];
  liveUrl: string;
};

export const projects: Project[] = [
  {
    slug: "grace-connect",
    tag: "Mobile App",
    title: "Grace Connect",
    tagline:
      "An offline-first community app for churches to chat, share, and stay connected.",
    about:
      "Grace Connect is a React and TypeScript mobile app built with Capacitor and Supabase, designed for church communities to message, join groups, and follow live streams and posts from one place. The biggest technical challenge was making it reliable on unreliable connections — I built a WhatsApp-style offline-first architecture using local SQLite storage that syncs in the background, so chats stay usable even when the network drops. Feed and chat views use full virtualization to stay smooth with large message histories, and the whole UI follows a consistent glassmorphism design system with deliberate, restrained motion.",
    achievements: [
      "Built a local-first SQLite sync layer, replacing a fragile navigator.onLine check with a Promise.race timeout pattern for reliable connectivity detection",
      "Implemented full list virtualization for chat and feed views to keep scroll performance smooth at scale",
      "Designed and shipped a consistent glassmorphism UI system across navigation, chat, search, and settings screens",
      "Set up CI/CD with GitHub Actions to automate Android APK builds",
    ],
    tech: ["react", "typescript", "capacitor", "supabase", "sqlite", "tailwindcss"],
    liveUrl: "https://grace-connect-streams.lovable.app",
  },
  {
    slug: "labianca-frost",
    tag: "Marketing Website",
    title: "Labianca Frost",
    tagline:
      "A modern marketing site for a Ghanaian frozen foods company, built for clarity and a premium feel.",
    about:
      "Labianca Frost needed a website that felt as premium as the product itself. I built it with React, TypeScript, TanStack Router, and Tailwind CSS, with every interaction driven by a strict motion design system — scroll-triggered reveals, a recognition timeline, an accordion FAQ, and a glassmorphism navbar, all built to respect prefers-reduced-motion and avoid layout-shifting animations.",
    achievements: [
      "Designed and built a recognition timeline component to showcase company milestones",
      "Built an accessible FAQ accordion and a glassmorphism navbar redesign",
      "Established a motion design system with strict rules (no height/width animation, reduced-motion support) applied consistently site-wide",
    ],
    tech: ["react", "typescript", "@tanstack/router", "tailwindcss", "framer-motion"],
    liveUrl: "https://labianca-gh.lovable.app",
  },
];

export const stack = {
  Frontend: [
    ["react", "^18.3"],
    ["typescript", "^5.4"],
    ["tailwindcss", "^4.0"],
    ["@tanstack/router", "^1.17"],
    ["@tanstack/query", "^5.10"],
    ["framer-motion", "^12.4"],
  ],
  Mobile: [
    ["@capacitor/core", "^6.1"],
    ["android", "gradle+java"],
  ],
  "Backend & Data": [
    ["supabase-js", "^2.45"],
    ["postgresql", "^16"],
    ["@capacitor-community/sqlite", "^6.0"],
    ["row-level-security", "policies"],
  ],
  Tooling: [
    ["vite", "^7.0"],
    ["github-actions", "workflows"],
    ["git", "cli"],
  ],
} as const;
