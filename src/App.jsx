import React from "react";
// @ts-ignore
import "./App.css";
import RootStateProvider from "./RootStateProvider";
import SearchComponentClass from "./SearchComponentHooks";
import SearchComponentContext from "./SearchComponentSuspense";
const App = props => (
  <RootStateProvider>
    <div className="App">
      <SearchComponentClass />
      <SearchComponentContext title={"Search With context"}/>
    </div>
  </RootStateProvider>
);

export default App;
