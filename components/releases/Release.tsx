import { gql } from "@apollo/client";
import { CallToAction } from "./CallToAction";
import { ContextualLinks } from "./ContextualLinks";
import { StatusTag } from "./StatusTag";

interface Props {
  release: Release;
}

export function ReleaseCard({ release }: Props) {
  const hasContextualLinks = !!release.customFields.contextualLinks?.length;
  const hasCta =
    release.customFields.callToAction.url &&
    release.customFields.callToAction.label;

  return (
    <div className="flex items-center justify-center my-6 lg:my-12 first:mt-0 last:mb-0">
      <div className="rounded-xl border p-5 shadow-md xl:w-1/2 mx-2 bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3 flex-wrap md:flex-nowrap">
          <div className="flex items-center space-x-3">
            <div className="text-lg font-bold text-slate-700">
              {release.title}
            </div>
          </div>
          <div className="flex items-center justify-end mt-2 md:mt-0">
            <span className="rounded border bg-neutral-100 px-3 py-1 mr-3 text-xs font-semibold">
              {release.products.nodes[0].name}
            </span>
            <StatusTag release={release} />
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div
            className="text-sm text-neutral-600"
            dangerouslySetInnerHTML={{ __html: release.content }}
          />
        </div>

        {(hasContextualLinks || hasCta) && (
          <footer className="flex justify-between items-center flex-wrap">
            {hasContextualLinks && <ContextualLinks release={release} />}
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
