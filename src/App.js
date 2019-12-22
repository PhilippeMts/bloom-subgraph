import React, { Component } from "react";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error(
    "REACT_APP_GRAPHQL_ENDPOINT environment variable not defined"
  );
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div />
      </ApolloProvider>
    );
  }
}

export default App;
