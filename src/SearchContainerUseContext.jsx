import React from "react";
import { SearchBarContainer, SearchListContainer } from "./SearchComponent";

export const SearchContainerUseContext = () => (
  <div className={"Search"}>
    <h2>Search Use Context</h2>
    <SearchBarContainer />
    <SearchListContainer />
  </div>
);

export default SearchContainerUseContext;
