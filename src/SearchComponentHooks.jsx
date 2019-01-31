import React, { useRef, useEffect, useReducer } from "react";
import { useSearchContext, useSearchStateObservable } from "./search-hooks";
import SearchComponent from "./SearchComponent";
import * as api from "./api";

const SearchComponentHooks = props => {
  const {state, handlers} = useSearchContext(props);
  return (
    <SearchComponent
      title={"Phil's-osophies Hooks"}
      loading={state.loading}
      searchText={state.searchText}
      list={state.list}
      handleUpdateSearchText={handlers.handleUpdateSearchText}
      handleResetSearchText={handlers.handleResetSearchText}
    />
  );
};
export default SearchComponentHooks;
