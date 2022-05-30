import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const cache = new InMemoryCache();

const endpoint = "https://api.github.com/graphql";
const httpLink = new HttpLink({
  uri: endpoint,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  cache: cache,
  link: ApolloLink.from([authMiddleware, httpLink]),
});

export default client;
