import React, { useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink
} from "@apollo/client";

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_HASURA_GRAPHQL_URL,
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
      }
    }),
    cache: new InMemoryCache()
  });
};

const SakuraProvider = ({ children }) => {
  const [client] = useState(createApolloClient());
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default SakuraProvider;
