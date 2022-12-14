import { Release } from "./Release";

interface Props {
  release: Release;
}

export function CallToAction({ release }: Props) {
  return (
    <div className="flex w-full lg:w-auto items-center justify-start ml-auto rounded bg-white border-2 border-royal text-royal px-4 py-3 text-sm font-semibold hover:bg-royal hover:text-white transition-colors">
      <a
        href={release.customFields.callToAction.url as string}
        target="_blank"
        className="block w-full text-center"
      >
        {release.customFields.callToAction.label}
      </a>
    </div>
  );
}
