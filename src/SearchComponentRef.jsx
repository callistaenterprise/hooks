import React, { useEffect, useReducer, useRef } from "react";
import SearchComponent from "./SearchComponent";
import * as api from "./api";

const useSearchState = () => {
  const [state, setUnsafeState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      list: [],
      searchText: "",
      loading: false,
      error: undefined
    }
  );

  const mountRef = useRef(false);
  useEffect(() => {
    mountRef.current = true; // on mount
    return () => (mountRef.current = false); // on unmount
  });
  const setState = (...args) => mountRef.current && setUnsafeState(...args);
  return [state, setState];
};
const useSearchRequest = (state, setState) =>
  useEffect(
    () => {
      setState({ loading: true });
      api
        .search(state.searchText)
        .then(list => setState({ list, loading: false }));
    },
    [state.searchText]
  );
const SearchComponentHooks = props => {
  const [state, setState] = useSearchState();
  useSearchRequest(state, setState);
  return (
    <SearchComponent
      title={"Phil's-osophies Component Ref"}
      loading={state.loading}
      searchText={state.searchText}
      list={state.list}
      handleUpdateSearchText={({ target: { value: searchText } }) =>
        setState({ searchText })
      }
      handleResetSearchText={() => setState({ searchText: "" })}
    />
  );
};

export default SearchComponentHooks;
