import { Release } from "./Release";

interface Props {
  release: Release;
}

export function CallToAction({ release }: Props) {
  return (
    <div className="flex items-center justify-start ml-auto rounded bg-royal hover:opacity-80 transition-opacity text-white px-4 py-1 text-sm font-semibold">
      <a href={release.customFields.callToAction.url as string} target="_blank">
        {release.customFields.callToAction.label}
      </a>
    </div>
  );
}
