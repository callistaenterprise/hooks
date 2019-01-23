import React from "react";
import logo from "./logo.svg";

export const SearchBar = ({ loading, searchText, updateSearchText }) => (
  <div>
    <input type={"text"} onChange={updateSearchText} value={searchText} />
    {loading && <img src={logo} className="App-logo" alt="logo" />}
  </div>
);

export const SearchList = ({ list }) => (
  <ul>
    {list.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

export const SearchWrapper = props => (
  <div className="Search">
    <div>{props.title}</div>
    <SearchBar {...props} />
    <SearchList {...props} />
  </div>
);
