import React from "react";
import SearchComponent from "../SearchComponent";
import { useSearchReducer, useSearchRequest } from "../search-hooks";
// ---- useReducer
/*
An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns the current state paired
with a dispatch method. (If you’re familiar with Redux, you already know how this works.)
 */
/*
1. We can replace useState with use reducer.
2. This mitigates the discursiveness of lots of useState functions,
3. conslidates state and actions
4. and helps us move towards redux if we feel that state should be global.
5. I prepared the reducer earlier so we should just be able to plug it into the container.
*/
// ---- component

const SearchContainerHooks = props => {
  // --- hooks
  const { state, actions } = useSearchReducer(props);
  // --- side effect
  useSearchRequest(state, actions);

  // use useState
  return (
    <SearchComponent
      title={"Search Class"}
      loading={state.loading}
      searchText={state.searchText}
      list={state.list}
      handleUpdateSearchText={actions.handleUpdateSearchText}
      handleResetSearchText={actions.handleResetSearchText}
    />
  );
};

export default SearchContainerHooks;
