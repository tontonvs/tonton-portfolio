import { Mail, Phone, Github, Linkedin, MapPin } from "lucide-react";

export function ContactRow({ compact = false }: { compact?: boolean }) {
  const items = [
    { icon: Mail, label: "mensahkbiz@gmail.com", href: "mailto:mensahkbiz@gmail.com" },
    { icon: Phone, label: "+233 548 456 600", href: "tel:+233548456600" },
    { icon: Github, label: "github.com/tontonvs", href: "https://github.com/tontonvs" },
    {
      icon: Linkedin,
      label: "linkedin.com/in/tonton-mensah",
      href: "https://www.linkedin.com/in/tonton-mensah-ab182b426",
    },
  ];
  return (
    <div className={compact ? "flex flex-col gap-2" : "flex flex-col gap-2.5"}>
      {items.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="group inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-ember"
        >
          <Icon size={15} className="opacity-80 group-hover:opacity-100" />
          <span>{label}</span>
        </a>
      ))}
      <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
        <MapPin size={12} />
        <span>Accra, GH</span>
      </div>
    </div>
  );
}
