// import { ApolloClient } from 'apollo-client';
import ApolloClient from 'apollo-boost';


// export const client = new ApolloClient({
//   cache,
//   link,
// });

export const client: any = new ApolloClient({
  uri: 'http://192.168.2.138:3005/graphql',
});
