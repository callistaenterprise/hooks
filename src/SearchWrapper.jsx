import React, { useContext } from "react";
import logo from "./logo.svg";
import { RootStateContext } from "./RootStateProvider";

// ---------------------------- Loading
export const Loading = () => {
  const {state} = useContext(RootStateContext);
  return state.loading ? <img src={logo} className="App-logo" alt="logo" /> : null
}


// ---------------------------- SearchBar
export const SearchBar = ({
  searchText,
  updateSearchText
}) => (
  <div >
    <input type={"text"} onChange={updateSearchText} value={searchText} />
    <Loading/>
  </div>
);

export const SearchBarContainer= () => {
  const {searchActions, state} = useContext(RootStateContext);
  return <SearchBar searchText={state.searchText} updateSearchText={searchActions.updateSearchText}/>
}


// ---------------------------- SearchList
export const SearchList= ({ list }) => (
  <ul>
    {list.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

export const SearchListContainer= () => {
  const {state} = useContext(RootStateContext);
  return <SearchList list={state.list}/>
}


export const SearchWrapper = props => (
  <div className={"Search"}>
    <div>useContext props down</div>
    <SearchBar {...props} />
    <SearchList {...props} />
  </div>
);
