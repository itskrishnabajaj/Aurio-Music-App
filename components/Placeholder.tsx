/* Placeholder surfaces for assets the studio has not supplied yet.

   They deliberately share the site's radius, elevation and reveal language so
   they read as designed slots rather than unfinished work — a neutral grey
   accent keeps them from competing with the brand gradient, and every one is
   labelled so a client can see exactly what belongs there. */

type MediaProps = {
  label: string;
  hint?: string;
  ratio?: string;
  icon?: keyof typeof ICONS;
  className?: string;
};

const ICONS = {
  image: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="M21 16.5 16 12l-5.5 6.5" />
    </>
  ),
  portrait: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </>
  ),
  map: (
    <>
      <path d="m9 3.5-5 2v15l5-2 6 2 5-2v-15l-5 2-6-2Z" />
      <path d="M9 3.5v15M15 5.5v15" />
    </>
  ),
  play: <path d="M9.5 7.8v8.4l7-4.2-7-4.2Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
};

function Glyph({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ph__glyph">
      {ICONS[name]}
    </svg>
  );
}

export function MediaPlaceholder({
  label,
  hint,
  ratio = "4 / 5",
  icon = "image",
  className,
}: MediaProps) {
  return (
    <figure
      className={`ph ph--media reveal${className ? ` ${className}` : ""}`}
      style={{ "--ratio": ratio } as React.CSSProperties}
    >
      <span className="ph__badge">Placeholder</span>
      <Glyph name={icon} />
      <figcaption className="ph__label">
        {label}
        {hint && <span className="ph__hint">{hint}</span>}
      </figcaption>
    </figure>
  );
}

export function VideoPlaceholder({ label, hint, ratio = "16 / 9", className }: MediaProps) {
  return (
    <figure
      className={`ph ph--media ph--video reveal${className ? ` ${className}` : ""}`}
      style={{ "--ratio": ratio } as React.CSSProperties}
    >
      <span className="ph__badge">Placeholder</span>
      <span className="ph__play" aria-hidden="true">
        <svg viewBox="0 0 24 24">{ICONS.play}</svg>
      </span>
      <figcaption className="ph__label">
        {label}
        {hint && <span className="ph__hint">{hint}</span>}
      </figcaption>
    </figure>
  );
}

export function AvatarPlaceholder({ label }: { label: string }) {
  return (
    <span className="ph ph--avatar" role="img" aria-label={`${label} — placeholder`}>
      <Glyph name="portrait" />
    </span>
  );
}

/* Inline chip for a single missing value, sized to sit inside real content
   without disturbing the surrounding rhythm. */
export function FieldPlaceholder({
  label,
  icon,
  tone,
}: {
  label: string;
  icon?: keyof typeof ICONS;
  tone?: "light";
}) {
  return (
    <span className={`ph ph--field${tone === "light" ? " ph--on-dark" : ""}`}>
      {icon && <Glyph name={icon} />}
      {label}
    </span>
  );
}
