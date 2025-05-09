import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Apollo Client setup
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/', // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;


