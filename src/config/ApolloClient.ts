import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { split } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import { AppConfig } from './AppConfig';

import { WebSocketLink } from 'apollo-link-ws';

const SUBSCRIPTION_URL =
  AppConfig.GRAPHQL_SUBSCRIPTION_ENDPOINT ||
  `ws://localhost:8000/subscriptions`;

console.log(SUBSCRIPTION_URL, 'SUBSCRIPTION_URL');

const cache: any = new InMemoryCache();
//   {
//   dataIdFromObject: o => o.id
// }

const httpLink: any = createUploadLink({
  uri: AppConfig.GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('adminToken');
  const language = localStorage.getItem('language');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
      language:
        language === 'en'
          ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYW5ndWFnZSI6ImVuIiwiaWF0IjoxNTg2MzI3Mjg0fQ.NVRXn14BuJjkMd465TPpZHjIUYdOTu3ErrwFUaA8sLs'
          : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYW5ndWFnZSI6ImRlIiwiaWF0IjoxNTg2MzI3Mjg0fQ.m_gUJnzgPm1uA2ojH7QAIN0YYSlsnsSmo0ZG-xd6BOY',
    },
  };
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: SUBSCRIPTION_URL,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        authorization: localStorage.getItem('adminToken')
          ? localStorage.getItem('adminToken')
          : '',
        language:
          localStorage.getItem('language') === 'en'
            ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYW5ndWFnZSI6ImVuIiwiaWF0IjoxNTg2MzI3Mjg0fQ.NVRXn14BuJjkMd465TPpZHjIUYdOTu3ErrwFUaA8sLs'
            : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYW5ndWFnZSI6ImRlIiwiaWF0IjoxNTg2MzI3Mjg0fQ.m_gUJnzgPm1uA2ojH7QAIN0YYSlsnsSmo0ZG-xd6BOY',
      },
    },
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(link),
  assumeImmutableResults: true,
});
