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
      {/* left-column vignette — a neutral light-grey-to-black wash behind the name/title text,
          separate from the orange glow, giving that text area its own subtle depth */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: "62%",
          background:
            "linear-gradient(165deg, rgba(178,173,166,0.16) 0%, rgba(60,56,52,0) 42%, rgba(8,7,6,0.4) 100%)",
        }}
      />

      {/* bright hot core — repositioned lower, nearer vertical center of the name, gently breathing */}
      <motion.div
        className="absolute"
        animate={glowAnimate}
        transition={glowTransition}
        style={{
          top: "34%",
          left: "78%",
          width: "380px",
          height: "380px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #FFFFFF 0%, #FFE3CF 30%, #FF8A4D 65%, rgba(255, 138, 77, 0) 100%)",
          filter: "blur(44px)",
          opacity: 0.85,
        }}
      />
      {/* ambient wash — shifted more orange-red (less yellow), still fades through a
          desaturated grey haze before dissolving into the page background */}
      <motion.div
        className="absolute"
        animate={ambientAnimate}
        transition={ambientTransition}
        style={{
          top: "32%",
          left: "74%",
          width: "1100px",
          height: "1100px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, #FF8A4D 0%, #FF5C33 28%, #B23A1A 45%, #7A756F 62%, rgba(122, 117, 111, 0.22) 72%, rgba(15, 13, 11, 0) 88%)",
          filter: "blur(120px)",
          opacity: 0.58,
        }}
      />
    </div>
  );
}
