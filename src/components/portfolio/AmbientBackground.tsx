import { motion, useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  const glowAnimate = reduceMotion
    ? undefined
    : { opacity: [0.75, 1, 0.75], scale: [1, 1.08, 1] };
  const glowTransition = { duration: 5, repeat: Infinity, ease: "easeInOut" as const };

  const ambientAnimate = reduceMotion ? undefined : { opacity: [0.5, 0.65, 0.5] };
  const ambientTransition = { duration: 7, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* left-column vignette — radial, centered nearer the name text itself (not just a
          top-left corner wash), brighter white core illuminating the BG right behind the text,
          fading to black outward for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 620px 480px at 24% 42%, rgba(215,211,204,0.4) 0%, rgba(110,105,98,0.18) 40%, rgba(20,18,16,0.05) 65%, rgba(6,5,4,0.45) 100%)",
        }}
      />

      {/* bright hot core — reduced ~30%, whiter and larger-proportioned center */}
      <motion.div
        className="absolute"
        animate={glowAnimate}
        transition={glowTransition}
        style={{
          top: "34%",
          left: "62%",
          width: "266px",
          height: "266px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #FFFFFF 0%, #FFFFFF 20%, #FFE3CF 45%, #FF8A4D 75%, rgba(255, 138, 77, 0) 100%)",
          filter: "blur(31px)",
          opacity: 0.95,
        }}
      />
      {/* ambient wash — reduced ~30% in size, still orange-red with a grey falloff */}
      <motion.div
        className="absolute"
        animate={ambientAnimate}
        transition={ambientTransition}
        style={{
          top: "32%",
          left: "60%",
          width: "770px",
          height: "770px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #FF8A4D 0%, #FF5C33 28%, #B23A1A 45%, #7A756F 62%, rgba(122, 117, 111, 0.22) 72%, rgba(15, 13, 11, 0) 88%)",
          filter: "blur(84px)",
          opacity: 0.58,
        }}
      />
    </div>
  );
}
