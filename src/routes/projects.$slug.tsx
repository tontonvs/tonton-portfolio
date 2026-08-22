import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { projects } from "@/components/portfolio/data";
import { TechChip } from "@/components/portfolio/Chip";
import { Reveal } from "@/components/portfolio/Reveal";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} | Tonton Mensah` },
        { name: "description", content: project.tagline },
        { property: "og:title", content: `${project.title} | Tonton Mensah` },
        { property: "og:description", content: project.tagline },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl">Project not found.</p>
        <Link to="/" className="mt-4 inline-block text-ember">
          ← Back home
        </Link>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const otherProjects = projects.filter((p) => p.slug !== project.slug);

  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
      <Link
        to="/"
        hash="projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-ember"
      >
        <ArrowLeft size={14} /> back to projects
      </Link>

      <Reveal>
        <div className="mt-8">
          <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-ember">
            {project.tag}
          </span>
          <h1 className="mt-2 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {project.tagline}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="glass-panel relative mt-10 h-64 overflow-hidden rounded-2xl sm:h-80">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 30% 20%, color-mix(in oklab, var(--ember) 35%, transparent), transparent 60%), linear-gradient(180deg, #1E1815 0%, #14100D 100%)",
            }}
          />
          {project.image && (
            <div className="relative h-full w-full">
              <img
                src={project.image}
                alt={`${project.title} desktop screenshot`}
                className={`h-full w-full ${project.imageFit === "contain" ? "object-contain" : "object-cover"} object-top`}
              />
            </div>
          )}
        </div>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              About the project
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{project.about}</p>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Achievements
            </h2>
            <ul className="mt-4 space-y-3">
              {project.achievements.map((a: string) => (
                <li key={a} className="flex gap-3 text-muted-foreground">
                  <Check
                    size={16}
                    className="mt-1 shrink-0 text-ember"
                    aria-hidden
                  />
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="glass-panel h-fit rounded-2xl p-6">
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ember">
              Tech
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t: string) => (
                <TechChip key={t} label={t} />
              ))}
            </div>
          </aside>
        </Reveal>
      </div>

      {otherProjects.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Other Projects
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {otherProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
