import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "./data";
import { TechChip } from "./Chip";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group glass-panel relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-200 hover:scale-[1.015] hover:border-ember/40"
    >
      <div className="relative mb-6 h-56 overflow-hidden rounded-xl border border-border bg-background/40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 0%, color-mix(in oklab, var(--ember) 35%, transparent), transparent 60%), linear-gradient(180deg, #1E1815 0%, #14100D 100%)",
          }}
        />
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className={
            project.imageFit === "contain"
              ? "relative h-full w-full object-contain p-4"
              : "relative h-full w-full object-cover object-top"
          }
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
      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <TechChip key={t} label={t} />
        ))}
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(project.liveUrl, "_blank", "noopener,noreferrer");
        }}
        className="relative z-10 mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-ember/40 hover:text-ember"
      >
        <ExternalLink size={12} />
        Visit live site
      </button>
    </Link>
  );
}
