import React from "react";
// @ts-ignore
import "./App.css";
import RootStateProvider from "./RootStateProvider";
import SearchComponentClass from "./SearchComponentRef";
const App = props => (
  <RootStateProvider>
    <div className="App">
      <SearchComponentClass />
    </div>
  </RootStateProvider>
);

export default App;
