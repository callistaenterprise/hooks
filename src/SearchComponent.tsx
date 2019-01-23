import React from "react";
// @ts-ignore
import MaterialIcon from "material-icons-react";
// @ts-ignore
import MDSpinner from "react-md-spinner";
import { ISearchHandlers, ISearchState, ISearchTextHandlers } from "./reducer";
import PropFlash from "./PropFlash";

// ---------------------------- Loading
interface ILoadingProps {
  loading: boolean;
  handleResetSearchText: ISearchHandlers["handleResetSearchText"];
}
export const Loading: React.FC<ILoadingProps> = ({
  loading,
  handleResetSearchText
}) => (
  <PropFlash prop={loading}>
    {loading ? (
      <span data-testid="loading-icon" className={"SearchIndicator"}>
        <MDSpinner singleColor={"grey"} size={18} />
      </span>
    ) : (
      <span
        data-testid="reset-icon"
        onClick={handleResetSearchText}
        className={"SearchClear"}
      >
        <MaterialIcon icon={"clear"} />
      </span>
    )}
  </PropFlash>
);

// ---------------------------- SearchBar
interface ISearchBarProps {
  searchText: ISearchState["searchText"];
  handleUpdateSearchText: ISearchHandlers["handleUpdateSearchText"];
  children: React.ReactNode;
}
export const SearchBar: React.FC<ISearchBarProps> = ({
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

// ---------------------------- SearchList
interface ISearchListProps {
  list: ISearchState["list"];
}
export const SearchList: React.FC<ISearchListProps> = ({ list }) => (
  <div data-testid="search-list">
    <ul data-testid="search-list-ul">
      {list &&
        list.map(({ id, name }) => (
          <li key={`item-key-${id}`} data-testid={`item-${id}`}>
            {name}
          </li>
        ))}
    </ul>
  </div>
);

interface ISearchProps extends ISearchState, ISearchTextHandlers {
  title: string;
}

// --- SearchComponent
export const SearchComponent: React.FC<ISearchProps> = props => (
  <div className={"Search"} data-testid="search-container">
    <h2>{props.title}</h2>
    <SearchBar {...props}>
      <Loading {...props} />
    </SearchBar>
    <SearchList {...props} />
  </div>
);
export default SearchComponent;
