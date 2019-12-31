import { ApolloClient } from 'apollo-client';
// import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { AppConfig } from "./AppConfig";

const cache: any = new InMemoryCache();
const link: any = new HttpLink({
  uri: AppConfig.GRAPHQL_ENDPOINT,
});

export const client: any = new ApolloClient({
  cache,
  link,
});

// export const client: any = new ApolloClient({
//   uri: 'http://192.168.2.138:3005/graphql',
// });
