import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export function HeroPortrait() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // pointer-driven tilt on the terminal chip only — subtle, spring-damped, disabled under reduced motion
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), springConfig);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handlePointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      className="relative min-h-[7rem] w-full max-w-md md:aspect-[4/5]"
      style={{ perspective: 1200 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* signature terminal detail — the only remaining surface here, kept glassy on its own */}
      <motion.div
        className="pointer-events-none absolute bottom-4 left-4 right-4"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="glass-panel rounded-lg p-3 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
          <div>
            <span className="text-ember">$</span> whoami
          </div>
          <div className="text-foreground">tonton — fullstack, offline-first</div>
        </div>
      </motion.div>
    </div>
  );
}
