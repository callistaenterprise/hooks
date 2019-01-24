import React, { useEffect, useReducer, useRef } from "react";
import SearchComponent from "./SearchComponent";
import * as api from "./api";
import { useSearchContext } from "./search-hooks";

const useSearchState = () => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      searchText: "",
      list: [],
      loading: false,
      error: undefined
    }
  );

  const mountRef = useRef(false);
  useEffect(() => {
    // component did mount, first time
    mountRef.current = true;
    // compoent will unmount, callback
    return () => (mountRef.current = false);
  }, []);
  const safeSetState = (...args) => mountRef.current && setState(...args)

  useEffect(
    () => {
      // on mount
      // when the search text changes
      safeSetState({ loading: true });
      api
        .search(state.searchText)
        .then(list => safeSetState({ list, loading: false }));
    },
    [state.searchText]
  );
  const handlers = {
    handleUpdateSearchText: e => safeSetState({ searchText: e.target.value }),
    handleResetSearchText: () => safeSetState({ searchText: "" })
  };
  return [state, handlers];
}

const SearchComponentHooks = props => {
  const {state, handlers} = useSearchContext();
  return (
    <SearchComponent
      title={"Phil's-osophies Component"}
      loading={state.loading}
      searchText={state.searchText}
      list={state.list}
      handleUpdateSearchText={handlers.handleUpdateSearchText}
      handleResetSearchText={handlers.handleResetSearchText}
    />
  );
};

export default SearchComponentHooks;
