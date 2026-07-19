import { motion } from "framer-motion";
import { Home, FolderGit2, Layers, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
];

export function NavPill() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = items.map((i) => i.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="glass-panel inline-flex items-center gap-1 rounded-full p-1"
    >
      {items.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => setActive(id)}
            className="relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill-active"
                className="absolute inset-0 rounded-full bg-ember"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 inline-flex items-center gap-1.5 ${
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon size={13} />
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
