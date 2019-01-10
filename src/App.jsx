import React, { Component } from "react";
// @ts-ignore
import "./App.css";
import RootStateProvider from "./RootStateProvider";
// import SearchUseContext from "./UseContext";
// import SearchUseContextPropsDown from "./UseContextPropsDown";
// import SearchContainerUseState from "./SearchContainerUseState";
import SearchComponentFC from "./SearchComponentFC";
class App extends Component {
  render() {
    return (
      <RootStateProvider>
        <div className="App">
          <SearchComponentFC />
        </div>
      </RootStateProvider>
    );
  }
}

export default App;
