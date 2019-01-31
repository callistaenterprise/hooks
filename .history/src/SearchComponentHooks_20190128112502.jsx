import React from "react";
import { useSearchState } from "./search-hooks";
import SearchComponent from "./SearchComponent";
import { delay, map } from "rxjs/operators";
import { useEventCallback } from "rxjs-hooks";
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
  const [handleUpdateSearchText, searchText] = useEventCallback(
    (event$) =>
      event$.pipe(
        map((event) => console.log(event))
      )
  )
  console.log("---- searchTexxt", searchText);
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
