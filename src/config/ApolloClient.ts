import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { AppConfig } from './AppConfig';

const cache: any = new InMemoryCache();
//   {
//   dataIdFromObject: o => o.id
// }

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const link: any = createUploadLink({
  uri: AppConfig.GRAPHQL_ENDPOINT,
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(link),
  assumeImmutableResults: true,
});
