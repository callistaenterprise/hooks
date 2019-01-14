import React from "react";
import { ISearchHandlers, ISearchState } from "./reducer";
import { userSearchContext } from "./search-hooks";
import { LoadingContainer } from "./LoadingContainer";
interface ISearchBarProps {
  searchText: ISearchState["searchText"];
  handleUpdateSearchText: ISearchHandlers["handleUpdateSearchText"];
  children: React.ReactNode;
}
const SearchBar: React.FC<ISearchBarProps> = ({
  searchText,
  handleUpdateSearchText,
  children
}) => (
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
  const { actions, state } = userSearchContext();
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
