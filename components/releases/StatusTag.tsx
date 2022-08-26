import { Release } from "./Release";

interface Props {
  release: Release;
}

export function StatusTag({ release }: Props) {
  if (!release.statuses.nodes.length) {
    return null;
  }

  return (
    <span
      className={`rounded border bg-${getColor(release)}-100 text-${getColor(
        release
      )} border-${getColor(release)} px-3 py-1 text-xs font-semibold`}
    >
      {formatText(release)}
    </span>
  );
}

function getColor(release: Release): string {
  const status = release.statuses.nodes[0];

  switch (status.slug) {
    case "launched":
    case "archived":
      return "dollabillz";
    case "in-development":
      return "royal";
    case "planning":
      return "lapis";
    case "ideation":
      return "sunset";
    default:
      return "neutral";
  }
}

function formatText(release: Release): string {
  const status = release.statuses.nodes[0];

  switch (status.slug) {
    case "launched":
    case "archived":
      return `${
        status.releaseStatusFields.displayName ?? status.name
      } - ${formatDate(release.date)}`;
    default:
      return status.releaseStatusFields.displayName ?? status.name;
  }
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
  });
}
