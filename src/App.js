import React, {Component} from "react";
import QueryVisualizer from "./components/QueryVisualizer";

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error(
    "REACT_APP_GRAPHQL_ENDPOINT environment variable not defined"
  );
}

class App extends Component {
  render() {
    return (
        <QueryVisualizer/>
    );
  }
}

export default App;
