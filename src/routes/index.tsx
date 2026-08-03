import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { NavPill } from "@/components/portfolio/NavPill";
import { ContactRow } from "@/components/portfolio/ContactRow";
import { HeroPortrait } from "@/components/portfolio/HeroPortrait";
import { DependencyChip } from "@/components/portfolio/Chip";
import { Reveal } from "@/components/portfolio/Reveal";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projects, stack } from "@/components/portfolio/data";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

function Portfolio() {
  return (
    <main className="relative mx-auto max-w-6xl overflow-x-hidden px-5 pb-24 pt-8 sm:px-8 sm:pt-12">
      {/* HERO */}
      <section
        id="home"
        className="grid gap-10 pt-8 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-14 md:pt-16"
      >
        <div className="pl-[5px]">
          <StaggerItem delay={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-panel/60 px-3 py-1 font-mono text-[0.6875rem] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-available opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-available" />
              </span>
              Open to work
            </span>
          </StaggerItem>

          <StaggerItem delay={0.06}>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-ember">
              Fullstack Developer
            </p>
          </StaggerItem>

          <StaggerItem delay={0.12}>
            <h1 className="mt-0.5 font-display text-[clamp(3.5rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-tight text-balance text-foreground">
              Tonton
              <br />
              Mensah.
            </h1>
          </StaggerItem>

          <StaggerItem delay={0.18}>
            <div className="mt-8 max-w-sm">
              <ContactRow />
            </div>
          </StaggerItem>

          <StaggerItem delay={0.24}>
            <div className="mt-8 max-w-full overflow-x-auto">
              <NavPill />
            </div>
          </StaggerItem>
        </div>

        <div className="relative flex flex-col items-start gap-6 md:items-end md:justify-end">
          <div className="md:absolute md:right-0 md:top-0 md:z-10">
            <a
              href="/resume.pdf"
              download="Tonton-Mensah-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2.5 text-xs font-semibold text-foreground shadow-lg shadow-ember/20 transition-transform hover:scale-[1.03]"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
          <HeroPortrait />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="mt-32">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Stack
          </h2>
          <p className="mt-2 text-muted-foreground">Tools I build with day to day.</p>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {Object.entries(stack).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.05}>
              <div className="glass-panel rounded-2xl p-6">
                <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ember">
                  {group}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map(([name, version]) => (
                    <DependencyChip key={name} name={name} version={version} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="mt-32">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Projects
          </h2>
          <p className="mt-2 text-muted-foreground">
            A couple of things I've shipped recently.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-32">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Let's work together.
          </h2>
          <p className="mt-2 text-muted-foreground">
            Open to fullstack and mobile development opportunities.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass-panel mt-10 rounded-2xl p-8 sm:p-10">
            <ContactRow />
          </div>
        </Reveal>
        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
          Tonton Mensah — Accra, GH
        </p>
      </section>
    </main>
  );
}

function StaggerItem({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
