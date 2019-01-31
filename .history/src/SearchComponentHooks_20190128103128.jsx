import React, { useEffect, useReducer, useRef } from "react";
import SearchComponent from "./SearchComponent";
import * as api from "./api";
import { useSearchContext, useSearchReducer, useSearchState } from "./search-hooks";

/*
1. functional component
2. use state reducer
3. use state in component
4. use effect
5. use handlers
6. use handlers in code
7. safe setState useRef
8. refactor out hooks to useSearchState
9. useContext instead

 */
const SearchComponentHooks = props => {
  const [state, handlers] = useSearchState();
  const [updateCallback, value] = useEventCallback((event$: Observable<React.SyntheticEvent<HTMLButtonElement>>) =>
    event$.pipe(
      mapTo(1000)
    )
  )
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
