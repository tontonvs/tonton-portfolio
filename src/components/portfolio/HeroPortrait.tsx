import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import portraitImg from "@/assets/tonton-portrait.png";

export function HeroPortrait() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // pointer-driven tilt — subtle, spring-damped, disabled under reduced motion
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
      className="pointer-events-none fixed z-[-5]"
      style={{
        top: "30%",
        left: "68%",
        transform: "translate(-50%, -50%)",
        perspective: 1200,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="pointer-events-auto relative inline-block"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <motion.img
          src={portraitImg}
          alt="Portrait of Tonton Mensah"
          className="h-[820px] w-auto object-contain sm:h-[975px] md:h-[1092px]"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        />

        {/* signature terminal detail */}
        <motion.div
          className="pointer-events-none absolute bottom-4 left-0"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <div className="glass-panel rounded-lg p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
            <div>
              <span className="text-ember">$</span> whoami
            </div>
            <div className="text-foreground">tonton — fullstack, offline-first</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
