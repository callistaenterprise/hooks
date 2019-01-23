import React, { useEffect, useReducer, useRef } from "react";
import * as api from "../api";
import SearchComponent from "../SearchComponent";

// ---- add state with useState
/*
1. Create handlers for the state updater
2. handleUpdateSearchText
3. handleResetSearchText
4. Tests: we now have one failing test which is the change text test, we now need to use and effect!
*/
// ---- component

const initialState = ({ loading = false, error = undefined }) => ({
  searchText: "",
  list: [],
  loading,
  error
});
const mapStateToHandlers = (searchState, setSearchState) => ({
  handleUpdateSearchText: ({ target: { value: searchText } }) =>
    searchText !== searchState.searchText && setSearchState({ searchText }),
  handleResetSearchText: () => setSearchState({ searchText: "" }),
  handleRequestSearchList: () => setSearchState({ loading: true }),
  handleSuccessSearchList: list => setSearchState({ list, loading: false }),
  handleFailureSearchList: error => setSearchState({ error, loading: false })
});

const SearchContainerHooks = props => {
  // useReducer returns state and dispatch, we can rename dispatch to setSearchState
  // with this we can just update the state with a blob of state.
  const [searchState, setSearchState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState(props)
  );

  const mountedRef = useRef(false);

  // useEffect will be run before mount, the returned function will run on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const safeSetState = (...args) => mountedRef.current && setSearchState(...args);

  const handlers = mapStateToHandlers(searchState, safeSetState);

  useEffect(
    () => {
      handlers.handleRequestSearchList(searchState.searchText);
      api
        .search(searchState.searchText)
        .then(list => handlers.handleSuccessSearchList(list))
        .catch(err => handlers.handleFailureSearchList(err));
    },
    [searchState.searchText]
  );
  return (
    <SearchComponent
      title={"Search useReducer as State"}
      loading={searchState.loading}
      searchText={searchState.searchText}
      list={searchState.list}
      handleUpdateSearchText={handlers.handleUpdateSearchText}
      handleResetSearchText={handlers.handleResetSearchText}
    />
  );
};

export default SearchContainerHooks;
