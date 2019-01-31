import React from "react";
import { useSearchState } from "./search-hooks";
import SearchComponent from "./SearchComponent";
import { delay } from "rxjs"
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
        delay(500)
      )
  )
  return (
    <SearchComponent
      title={"Phil's-osophies Hooks"}
      loading={state.loading}
      searchText={value}
      list={state.list}
      handleUpdateSearchText={handleUpdateSearchText}
      handleResetSearchText={handlers.handleResetSearchText}
    />
  );
};
export default SearchComponentHooks;
