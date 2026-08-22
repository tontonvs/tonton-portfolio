import graceConnectHome from "@/assets/grace-connect-home.jpg";
import labiancaHome from "@/assets/labianca-home.png";
import yoglaitDesktop from "@/assets/yoglait.png";
import yoglaitMobile1 from "@/assets/yoglait1.jpg";
import yoglaitMobile2 from "@/assets/yoglait2.jpg";
import novenHome from "@/assets/noven-home.png";

export type Project = {
  slug: string;
  tag: string;
  title: string;
  tagline: string;
  about: string;
  achievements: string[];
  tech: string[];
  liveUrl: string;
  image: string;
  imageFit?: "cover" | "contain";
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "grace-connect",
    tag: "Mobile App",
    title: "Grace Connect",
    tagline:
      "An offline-first community app for churches to chat, share, and stay connected.",
    about:
      "Grace Connect is a React and TypeScript mobile app built with Capacitor and Supabase, designed for church communities to message, join groups, and follow live streams and posts from one place. The biggest technical challenge was making it reliable on unreliable connections: I built a WhatsApp-style offline-first architecture using local SQLite storage that syncs in the background, so chats stay usable even when the network drops. Feed and chat views use full virtualization to stay smooth with large message histories, and the whole UI follows a consistent glassmorphism design system with deliberate, restrained motion.",
    achievements: [
      "Built a local-first SQLite sync layer, replacing a fragile navigator.onLine check with a Promise.race timeout pattern for reliable connectivity detection",
      "Implemented full list virtualization for chat and feed views to keep scroll performance smooth at scale",
      "Designed and shipped a consistent glassmorphism UI system across navigation, chat, search, and settings screens",
      "Set up CI/CD with GitHub Actions to automate Android APK builds",
    ],
    tech: ["react", "typescript", "capacitor", "supabase", "sqlite", "tailwindcss"],
    liveUrl: "https://grace-connect-streams.lovable.app",
    image: graceConnectHome,
    images: [graceConnectHome],
  },
  {
    slug: "labianca-frost",
    tag: "Marketing Website",
    title: "Labianca Frost",
    tagline:
      "A modern marketing site for a Ghanaian frozen foods company, built for clarity and a premium feel.",
    about:
      "Labianca Frost needed a website that felt as premium as the product itself. I built it with React, TypeScript, TanStack Router, and Tailwind CSS, with every interaction driven by a strict motion design system: scroll-triggered reveals, a recognition timeline, an accordion FAQ, and a glassmorphism navbar, all built to respect prefers-reduced-motion and avoid layout-shifting animations.",
    achievements: [
      "Designed and built a recognition timeline component to showcase company milestones",
      "Built an accessible FAQ accordion and a glassmorphism navbar redesign",
      "Established a motion design system with strict rules (no height/width animation, reduced-motion support) applied consistently site-wide",
    ],
    tech: ["react", "typescript", "@tanstack/router", "tailwindcss", "framer-motion"],
    liveUrl: "https://labianca.mensahtonton.workers.dev/",
    image: labiancaHome,
    imageFit: "contain",
    images: [labiancaHome],
  },
  {
    slug: "yoglait",
    tag: "Marketing + E-commerce",
    title: "Yoglait",
    tagline:
      "A playful ordering site for a Ghanaian yoghurt brand: flavour menu, Paystack checkout, and rider dispatch.",
    about:
      "Yoglait needed more than a marketing page: a full ordering flow for a yoghurt brand based in Tema, Ghana. I built it with React, TypeScript, TanStack Router, and Supabase, with a cart-to-checkout flow backed by Paystack for payments and a WhatsApp ordering fallback for customers who prefer to order that way. A staff dashboard handles order management, rider assignment, and delivery dispatch, sitting behind its own auth flow. The whole site follows a bold, bouncy brand system: Fredoka/Baloo display type over Poppins body text, a floating glassmorphic pill nav, and flavour-coded product cards, built mobile-first for low-end devices and slower connections.",
    achievements: [
      "Built the cart-to-checkout flow with Paystack payments and a WhatsApp order fallback for the Ghanaian market",
      "Built a staff dashboard for order management, rider assignment, and delivery dispatch with its own auth flow",
      "Set up Supabase for products, orders, and staff sessions",
      "Designed a playful, flavour-coded UI system (pill nav, rounded display type, staggered motion) optimized for fast loads on slower connections",
    ],
    tech: ["react", "typescript", "@tanstack/router", "supabase", "paystack", "framer-motion", "tailwindcss"],
    liveUrl: "https://yoglait.mensahtonton.workers.dev/",
    image: yoglaitDesktop,
    imageFit: "cover",
    images: [yoglaitMobile1, yoglaitMobile2],
  },
  {
    slug: "noven",
    tag: "Startup / Dev Studio",
    title: "noven",
    tagline:
      "My own fullstack development studio, building offline-first apps and modern websites for African businesses.",
    about:
      "noven is my startup: a Ghana-based fullstack development studio building offline-first mobile apps, custom in-organisation software, cloud management services, and agentic automation workflows for clients who need reliable, affordable digital products. The site is built around an affordability-first pitch, with transparent starting pricing rather than a hidden quote process, and a clean, focused service breakdown so potential clients immediately understand what we build and why it fits their budget.",
    achievements: [
      "Defined noven's core service lines: offline-first mobile apps, custom in-organisation software, cloud management, and agentic automation workflows",
      "Built the site around a transparent, affordability-first pricing pitch instead of a hidden-quote model",
      "Designed a clean single-page structure that gets visitors from problem to service to pricing quickly",
    ],
    // TODO: swap in real noven stack/tech once finalized
    tech: ["react", "typescript", "tailwindcss"],
    liveUrl: "https://noven-digital.mensahtonton.workers.dev/",
    // TODO: add more noven screenshots to src/assets as you get them (e.g. mobile views, work page)
    image: novenHome,
    imageFit: "cover",
    images: [novenHome],
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
  "AI & Agentic": [
    ["claude-code", "agentic"],
    ["ai-coding-agents", "directed"],
  ],
} as const;
