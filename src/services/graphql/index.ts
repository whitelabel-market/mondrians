import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { MAMO_SUBGRAPH } from "@/utils/constants";

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: MAMO_SUBGRAPH,
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
