import React, {Component} from "react";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, {InMemoryCache} from "apollo-boost";
import "./App.css";
import MyQuery from "./components/MyQuery";

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
        <MyQuery/>
      </ApolloProvider>
    );
  }
}

export default App;
