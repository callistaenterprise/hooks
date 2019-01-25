import React from "react";
import SearchBarContainer from "./SearchBarContainer";
import SearchListContainer from "./SearchListContainer";
export const SearchContainerUseContext = () => (
  <div className={"Search"}>
    <h2 style={{fontStyle:"italic"}}>Search Use Context</h2>
    <SearchBarContainer />
    <SearchListContainer />
  </div>
);

export default SearchContainerUseContext;
