import React from "react";
// @ts-ignore
import MaterialIcon from "material-icons-react";
// @ts-ignore
import MDSpinner from "react-md-spinner";
import PropFlash from "./PropFlash";

// ---------------------------- Loading
export const Loading = ({ loading, handleResetSearchText }) => (
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
        <MaterialIcon color={"#ffffff"} icon={"clear"} />
      </span>
    )}
  </PropFlash>
);

// ---------------------------- SearchBar
export const SearchBar = ({ searchText, handleUpdateSearchText, children }) => (
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
export const SearchList = ({ list }) => (
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

// --- SearchComponent
export const SearchComponent = props => (
  <div className={"Search"} data-testid="search-container">
    <h2 style={{fontStyle:"italic"}}>{props.title}</h2>
    <SearchBar {...props}>
      <Loading {...props} />
    </SearchBar>
    <SearchList {...props} />
  </div>
);
export default SearchComponent;
