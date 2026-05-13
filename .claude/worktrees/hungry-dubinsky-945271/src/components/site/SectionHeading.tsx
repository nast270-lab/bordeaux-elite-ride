interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}>
          <span className="gold-divider" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
          <span className="gold-divider" />
        </div>
      )}
      <h2 className="text-4xl md:text-5xl leading-tight">{title}</h2>
      {description && (
        <p className="mt-5 text-base text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
}
