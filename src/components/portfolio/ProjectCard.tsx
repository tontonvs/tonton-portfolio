import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "./data";
import { TechChip } from "./Chip";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group glass-panel relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-200 hover:scale-[1.015] hover:border-ember/40"
    >
      <div className="mb-6 h-40 overflow-hidden rounded-xl border border-border bg-background/40">
        <div
          aria-hidden
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 0%, color-mix(in oklab, var(--ember) 35%, transparent), transparent 60%), linear-gradient(180deg, #1E1815 0%, #14100D 100%)",
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-ember">
          {project.tag}
        </span>
        <ArrowUpRight
          size={18}
          className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
        />
      </div>
      <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{project.tagline}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>
    </Link>
  );
}
