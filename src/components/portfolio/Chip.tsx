export function DependencyChip({ name, version }: { name: string; version: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-border bg-panel/60 px-2.5 py-1.5 font-mono text-[12px] leading-none text-foreground/90 transition-colors hover:border-ember/50">
      <span className="text-foreground">{name}</span>
      <span className="text-muted-foreground">{version}</span>
    </span>
  );
}

export function TechChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-panel/60 px-2 py-1 font-mono text-[11px] text-muted-foreground">
      {label}
    </span>
  );
}
