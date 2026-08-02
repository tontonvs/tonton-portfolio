import { AnimatePresence, motion } from "framer-motion";
import { Home, FolderGit2, Layers, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
];

function useActiveSection() {
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

  return [active, setActive] as const;
}

function PillItems({
  active,
  onSelect,
  layoutId,
}: {
  active: string;
  onSelect: (id: string) => void;
  layoutId: string;
}) {
  return (
    <>
      {items.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => onSelect(id)}
            className="relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative z-10 inline-flex items-center gap-1.5 ${
                isActive ? "text-background" : "text-muted-foreground"
              }`}
            >
              <Icon size={13} />
              {label}
            </span>
          </a>
        );
      })}
    </>
  );
}

export function NavPill() {
  const [active, setActive] = useActiveSection();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [inlineVisible, setInlineVisible] = useState(true);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInlineVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* original inline pill — stays exactly where it is, shrinks into a bubble and vanishes
          once it's about to scroll out of view */}
      <div ref={sentinelRef}>
        <AnimatePresence>
          {inlineVisible && (
            <motion.nav
              aria-label="Section navigation"
              initial={false}
              exit={{ scale: 0.2, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 1, 1] }}
              className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-foreground/10 p-1 backdrop-blur-md"
              style={{ transformOrigin: "center" }}
            >
              <PillItems active={active} onSelect={setActive} layoutId="nav-pill-active-inline" />
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* floating docked pill — mounts only once the inline pill has left view,
          unravels into place: clip-path grows from a point at the center out to the full pill */}
      <AnimatePresence>
        {!inlineVisible && (
          <motion.nav
            aria-label="Section navigation (docked)"
            initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0, scale: 0.92 }}
            animate={{ clipPath: "circle(farthest-corner at 50% 50%)", opacity: 1, scale: 1 }}
            exit={{ clipPath: "circle(0% at 50% 50%)", opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-4 z-50 inline-flex -translate-x-1/2 items-center gap-1 rounded-full border border-foreground/15 bg-foreground/10 p-1 shadow-lg shadow-background/40 backdrop-blur-md"
          >
            <PillItems active={active} onSelect={setActive} layoutId="nav-pill-active-floating" />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
