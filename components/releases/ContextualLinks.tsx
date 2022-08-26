import { Release } from "./Release";

interface Props {
  release: Release;
}

export function ContextualLinks({ release }: Props) {
  return (
    <div>
      <div className="flex items-center justify-start text-slate-500 text-sm">
        <div>
          {release.customFields.contextualLinks?.map((link) => (
            <a
              href={link.url}
              target="_blank"
              className="inline-block border-r pr-3 mr-3 last:pr-0 last:mr-0 last:border-r-0 text-mirage-500 hover:text-sunset transition-colors border-mirage-500"
              key={link.url}
            >
              {
                link.label ??
                  unslugify(
                    link.type
                  ) /* Unslugify needed because of ACF WPGQL bug */
              }
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function unslugify(source: string): string {
  return source
    .replace(/-/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
}
