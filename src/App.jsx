import React, { Component } from "react";
// @ts-ignore
import "./App.css";
import RootStateProvider from "./RootStateProvider";
import SearchContainerUseContext from "./SearchContainerUseContext";
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
        </div>
      </RootStateProvider>
    );
  }
}

export default App;
