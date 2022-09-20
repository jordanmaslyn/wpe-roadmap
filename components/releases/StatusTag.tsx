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
      className={`rounded-full border-2 bg-${getBackgroundColor(
        release
      )} text-${getColor(release)} border-${getColor(release)} px-3 py-1`}
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

function getBackgroundColor(release: Release): string {
  const status = release.statuses.nodes[0];

  switch (status.slug) {
    case "launched":
    case "archived":
      return "polar";
    case "in-development":
      return "royal-100";
    case "planning":
      return "lapis-100";
    case "ideation":
      return "sunset-100";
    default:
      return "neutral-100";
  }
}

function formatText(release: Release): string {
  const status = release.statuses.nodes[0];

  switch (status.slug) {
    // case "launched":
    // case "archived":
    //   return `${
    //     status.releaseStatusFields.displayName ?? status.name
    //   } - ${formatDate(release.date)}`;
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
