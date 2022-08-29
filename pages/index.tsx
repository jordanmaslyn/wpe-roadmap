import client from "client";
import { GetStaticPropsContext } from "next";
import { gql } from "@apollo/client";
import {
  Release,
  ReleaseCard,
  ReleaseFragment,
} from "components/releases/Release";
import { Layout, MenuItem, MenuItemFragment } from "components/global/Layout";
import { MouseEvent, useState } from "react";

const RELEASES_PER_PAGE = 3;

interface Props {
  releases: Release[];
  releasePagination: {
    hasNextPage: boolean;
    endCursor: string;
  };
  menuItems: MenuItem[];
}

export default function Page({
  menuItems,
  releases,
  releasePagination: { hasNextPage, endCursor },
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [latestHasNextPage, setLatestHasNextPage] = useState(hasNextPage);
  const [latestEndCursor, setLatestEndCursor] = useState(endCursor);
  const [latestReleases, setLatestReleases] = useState(releases);

  const loadMoreReleases = (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    client
      .query({
        query: gql`
          query GetNextPageOfReleases($perPage: Int, $after: String) {
            releases(
              first: $perPage
              after: $after
              where: {
                orderby: [
                  { field: MENU_ORDER, order: ASC }
                  { field: DATE, order: DESC }
                ]
              }
            ) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                ...ReleaseFields
              }
            }
          }
          ${ReleaseFragment}
        `,
        variables: {
          perPage: RELEASES_PER_PAGE,
          after: latestEndCursor,
        },
      })
      .then((response) => {
        setLatestEndCursor(response.data.releases.pageInfo.endCursor);
        setLatestHasNextPage(response.data.releases.pageInfo.hasNextPage);

        setLatestReleases([...latestReleases, ...response.data.releases.nodes]);

        setIsLoading(false);
      });
  };

  return (
    <Layout menuItems={menuItems}>
      <div className="min-h-screen bg-polar py-6 lg:py-12">
        {latestReleases.map((release) => (
          <ReleaseCard release={release} key={release.id} />
        ))}
        {latestHasNextPage && (
          <div className="text-center">
            <button
              type="button"
              onClick={loadMoreReleases}
              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-royal hover:bg-royal-800 transition ease-in-out duration-150"
            >
              {isLoading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              <span>{isLoading ? "Loading More ..." : "Load More"}</span>
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const response = await client.query({
    query: gql`
      query GetFrontPage {
        siteGeneralSettings {
          siteSettings {
            launchedReleaseArchivalPeriod
          }
        }
        menu(idType: LOCATION, id: "primary") {
          menuItems {
            nodes {
              ...MenuItem
            }
          }
        }
        releases(first: ${RELEASES_PER_PAGE}, where: {orderby: [{field: MENU_ORDER, order: ASC}, {field: DATE, order:DESC}]}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ...ReleaseFields
          }
        }
      }
      ${ReleaseFragment}
      ${MenuItemFragment}
    `,
  });

  return {
    props: {
      menuItems: response.data.menu.menuItems.nodes,
      releases: [...response.data.releases.nodes],
      releasePagination: {
        hasNextPage: response.data.releases.pageInfo.hasNextPage,
        endCursor: response.data.releases.pageInfo.endCursor,
      },
      settings: response.data.siteGeneralSettings.siteSettings,
    },
  };
}
