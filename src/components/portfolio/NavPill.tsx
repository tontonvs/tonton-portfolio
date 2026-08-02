import { AnimatePresence, motion } from "framer-motion";
import { Home, FolderGit2, Layers, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "skills", label: "Skills", icon: Layers },
  { id: "projects", label: "Projects", icon: FolderGit2 },
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

/** Small scatter of dash particles that burst outward and fade — a comic-glitch
 * "disappearance" cue, remounted (and thus re-triggered) whenever `trigger` changes. */
function DashBurst({ trigger }: { trigger: number }) {
  const dashesRef = useRef(
    Array.from({ length: 9 }, () => ({
      angle: Math.random() * 360,
      distance: 16 + Math.random() * 20,
      length: 5 + Math.random() * 7,
      delay: Math.random() * 0.06,
    })),
  );

  return (
    <AnimatePresence>
      <motion.div
        key={trigger}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {dashesRef.current.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-ember"
              style={{ width: d.length, height: 2 }}
              initial={{ opacity: 0, x: 0, y: 0, rotate: d.angle }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.cos(rad) * d.distance,
                y: Math.sin(rad) * d.distance,
              }}
              transition={{ duration: 0.42, delay: d.delay, ease: "easeOut" }}
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export function NavPill() {
  const [active, setActive] = useActiveSection();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [inlineVisible, setInlineVisible] = useState(true);
  const [dockedExpanded, setDockedExpanded] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

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

  // whenever visibility flips, fire a dash burst and (re)stage the docked pill's
  // collapsed -> expanded sequence
  useEffect(() => {
    setBurstKey((k) => k + 1);
    if (!inlineVisible) {
      setDockedExpanded(false);
      const t = setTimeout(() => setDockedExpanded(true), 220);
      return () => clearTimeout(t);
    }
  }, [inlineVisible]);

  const ActiveIcon = items.find((i) => i.id === active)?.icon ?? Home;

  return (
    <>
      {/* original inline pill — stays exactly where it is, shrinks into a bubble and
          vanishes (with a dash-glitch burst) once it's about to scroll out of view */}
      <div ref={sentinelRef}>
        <AnimatePresence>
          {inlineVisible && (
            <motion.nav
              aria-label="Section navigation"
              initial={false}
              exit={{ scale: 0.25, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.4, 0, 1, 1] }}
              style={{ transformOrigin: "center" }}
              className="relative inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-foreground/10 backdrop-blur-md"
            >
              <PillItems active={active} onSelect={setActive} layoutId="nav-pill-active-inline" />
              {!inlineVisible ? null : burstKey > 0 && <DashBurst trigger={burstKey} />}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* floating docked pill — mounts collapsed to a small bubble (roughly the size of the
          active selector), bursts with dashes, then extends into the full bar via a layout
          animation (transform-based, not a manual width animation) */}
      <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <AnimatePresence>
          {!inlineVisible && (
            <motion.nav
              aria-label="Section navigation (docked)"
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, duration: 0.25 }}
              className="relative inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-foreground/10 shadow-lg shadow-background/40 backdrop-blur-md"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {dockedExpanded ? (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex items-center gap-1"
                  >
                    <PillItems
                      active={active}
                      onSelect={setActive}
                      layoutId="nav-pill-active-floating"
                    />
                  </motion.div>
                ) : (
                  <motion.span
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-background"
                    style={{ backgroundColor: "var(--foreground)" }}
                  >
                    <ActiveIcon size={13} />
                  </motion.span>
                )}
              </AnimatePresence>
              <DashBurst trigger={burstKey} />
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
