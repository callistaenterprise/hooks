import React, { Component } from "react";
// @ts-ignore
import "./App.css";
import RootStateProvider from "./RootStateProvider";
import SearchContainerUseContext from "./SearchContainerUseContext";
import SearchContainerUseContextSuspense from "./SearchContainerUseContextSuspense";
import SearchComponentHooks from "./SearchContainerHooks";
import SearchComponentClass from "./SearchComponentClass";
class App extends Component {
  render() {
    return (
      <RootStateProvider>
        <div className="App">
          <SearchComponentClass/>
          <SearchComponentHooks />
          <SearchContainerUseContext />
          <SearchContainerUseContextSuspense/>
        </div>
      </RootStateProvider>
    );
  }
}

export default App;
