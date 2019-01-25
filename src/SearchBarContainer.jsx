import React from "react";
import { useSearchContext } from "./search-hooks";
import { LoadingContainer } from "./LoadingContainer";
const SearchBar = ({ searchText, handleUpdateSearchText, children }) => (
  <div data-testid="search-bar" className={"SearchContainer"}>
    <input
      className={"SearchInput"}
      data-testid="search-bar-input"
      type={"text"}
      onChange={handleUpdateSearchText}
      value={searchText}
      placeholder={"Search"}
    />
    {children}
  </div>
);

const SearchBarContainer = () => {
  const { state, actions } = useSearchContext();
  return (
    <SearchBar
      searchText={state.searchText}
      handleUpdateSearchText={actions.handleUpdateSearchText}
    >
      <LoadingContainer />
    </SearchBar>
  );
};

export default SearchBarContainer;
