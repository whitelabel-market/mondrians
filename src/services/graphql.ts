import {
  HttpLink,
  split,
  InMemoryCache,
  ApolloClient,
} from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
//import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client/core";

// create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:8000/subgraphs/name/whitelabel/mamo",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8001/subgraphs/name/whitelabel/mamo",
    lazy: true,
  })
);

// cache implementation
const cache = new InMemoryCache();

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// create the apollo client
export const client = new ApolloClient({
  link,
  cache,
});
