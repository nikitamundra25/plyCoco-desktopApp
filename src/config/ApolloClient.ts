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
  const token = localStorage.getItem('adminToken');
  const language = localStorage.getItem('language');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
      language: language === 'en' ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYW5ndWFnZSI6ImVuIiwiaWF0IjoxNTg2MzI3Mjg0fQ.NVRXn14BuJjkMd465TPpZHjIUYdOTu3ErrwFUaA8sLs' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYW5ndWFnZSI6ImRlIiwiaWF0IjoxNTg2MzI3Mjg0fQ.m_gUJnzgPm1uA2ojH7QAIN0YYSlsnsSmo0ZG-xd6BOY'
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
