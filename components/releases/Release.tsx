import { gql } from "@apollo/client";
import { CallToAction } from "./CallToAction";
import { ContextualLinks } from "./ContextualLinks";
import { StatusTag } from "./StatusTag";

interface Props {
  release: Release;
}

export function ReleaseCard({ release }: Props) {
  const hasContextualLinks = !!release.customFields.contextualLinks?.length;
  const hasReleaseTiming =
    !!release.customFields.releaseDate ||
    !!release.customFields.expectedRelease;
  const hasCta =
    release.customFields.callToAction.url &&
    release.customFields.callToAction.label;

  return (
    <div className="flex items-center justify-center my-6 lg:my-12 first:mt-0 last:mb-0">
      <div
        className="rounded-sm border p-5 xl:w-1/2 mx-2 bg-white"
        style={{
          boxShadow:
            "0px 4px 8px rgba(89, 118, 127, 0.48), 0px 0px 1px rgba(0, 40, 56, 0.32)",
        }}
      >
        <div className="flex w-full items-center justify-between border-b pb-3 flex-wrap md:flex-nowrap">
          <div className="">
            <p className="text-xs text-soot">
              {release.products.nodes[0].name}
            </p>
            <h2 className="text-2xl font-bold text-black">{release.title}</h2>
            {hasContextualLinks && <ContextualLinks release={release} />}
          </div>
          <div className="flex items-center justify-end mt-2 md:mt-0">
            <StatusTag release={release} />
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div
            className="text-sm text-neutral-600"
            dangerouslySetInnerHTML={{ __html: release.content }}
          />
        </div>

        {(hasReleaseTiming || hasCta) && (
          <footer className="flex justify-between items-center flex-wrap">
            {hasReleaseTiming && (
              <p className="text-soot text-center lg:text-left w-full lg:w-auto mb-2 lg:mb-0">
                <em>
                  {!!release.customFields.releaseDate
                    ? "Released"
                    : "Expected release"}
                  :{" "}
                  {!!release.customFields.releaseDate
                    ? new Date(
                        release.customFields.releaseDate
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : release.customFields.expectedRelease}
                </em>
              </p>
            )}
            {hasCta && <CallToAction release={release} />}
          </footer>
        )}
      </div>
    </div>
  );
}

export interface Release {
  id: string;
  title: string;
  date: string;
  content: string;
  statuses: {
    nodes: Array<{
      slug: string;
      name: string;
      releaseStatusFields: { order: number; displayName: string | null };
    }>;
  };
  products: {
    nodes: Array<{ slug: string; name: string }>;
  };
  customFields: {
    releaseDate: string;
    expectedRelease: string;
    callToAction: { label: string | null; url: string | null };
    contextualLinks: null | Array<{
      type: string;
      label: string | null;
      url: string;
    }>;
  };
}

export const ReleaseFragment = gql`
  fragment ReleaseFields on Release {
    id
    title
    date
    content
    statuses {
      nodes {
        slug
        name
        releaseStatusFields {
          displayName
          order
        }
      }
    }
    products {
      nodes {
        slug
        name
      }
    }
    customFields {
      releaseDate
      expectedRelease
      contextualLinks {
        type
        label
        url
      }
      callToAction {
        label
        url
      }
    }
  }
`;
