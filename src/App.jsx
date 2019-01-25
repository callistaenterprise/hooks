import React from "react";
// @ts-ignore
import "./App.css";
import RootStateProvider from "./RootStateProvider";
import SearchComponentHooks from "./SearchComponentHooks";
import SearchComponentClass from "./SearchComponentClass";
import SearchComponentContext from "./SearchComponentSuspense";
const App = props => (
  <RootStateProvider>
    <div className="App">
      <SearchComponentClass title={"Search with class"}/>
      <SearchComponentHooks title={"Search ref"}/>
      <SearchComponentContext title={"Search With context"}/>
    </div>
  </RootStateProvider>
);

export default App;
