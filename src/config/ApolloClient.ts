import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { AppConfig } from "./AppConfig";

const cache: any = new InMemoryCache({
  dataIdFromObject: o => o.id
});

const link: any = createUploadLink({
  uri: AppConfig.GRAPHQL_ENDPOINT
});

export const client: any = new ApolloClient({
  cache,
  link,
  assumeImmutableResults: true
});
