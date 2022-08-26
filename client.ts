import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import possibleTypes from "possibleTypes.json";
// import apolloLogger from "apollo-link-logger";

let client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  connectToDevTools: typeof window !== "undefined",
  link: ApolloLink.from([
    // apolloLogger,
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      fetchOptions: {
        method: "GET",
      },
    }),
  ]),
  cache: new InMemoryCache({
    possibleTypes,
    typePolicies: {
      RootQuery: {
        queryType: true,
      },
      RootMutation: {
        mutationType: true,
      },
    },
  }),
});

export default client;
