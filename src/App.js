import React from "react";
import QueryVisualizer from "./components/QueryVisualizer";

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error(
    "REACT_APP_GRAPHQL_ENDPOINT environment variable not defined"
  );
}

const App = () => <QueryVisualizer />;

export default App;
