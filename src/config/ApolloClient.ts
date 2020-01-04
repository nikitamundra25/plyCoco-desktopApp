import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { AppConfig } from './AppConfig';

const cache: any = new InMemoryCache();
const link: any = new HttpLink({
  uri: AppConfig.GRAPHQL_ENDPOINT,
});

export const client: any = new ApolloClient({
  cache,
  link,
});
