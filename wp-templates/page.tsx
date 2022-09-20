import { gql } from "@apollo/client";
import { Layout } from "components/global/Layout";
import { MenuItemFragment } from "components/global/MenuItem";

const Component = (props: any) => {
  const { title, content } = props?.data?.page;
  const { nodes: menuItems } = props?.data?.menu.menuItems;
  return (
    <>
      <Layout menuItems={menuItems}>
        <div className="min-h-screen bg-polar py-6 lg:py-12">
          <div className="flex items-center justify-center my-12 first:mt-0 last:mb-0">
            <div className="rounded-xl border p-5 shadow-md xl:w-1/2 mx-2 bg-white">
              <h1 className="text-mirage text-5xl font-thin mb-7">{title}</h1>
              <div
                className="text-lg htmlContainer"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const variables = ({ uri }: any) => {
  return { uri };
};

const query = gql`
  query GetPage($uri: ID!) {
    menu(idType: LOCATION, id: "primary") {
      menuItems {
        nodes {
          ...MenuItem
        }
      }
    }
    page(id: $uri, idType: URI) {
      title
      content
    }
  }
  ${MenuItemFragment}
`;

export default { Component, variables, query };
