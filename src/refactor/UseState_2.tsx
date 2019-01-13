import React, { useState } from "react";
import SearchComponent from "../SearchComponent";
import { ISearchProps, ISearchState } from "../reducer";

// ---- add state with useState
/*
1. add State with use state
2. useState - use state accepts an initial state and returns this state with a state updater.
3. Again remeber that Hooks can only be used with Functional components
4. SearchComponent props now need to map to the searchState
5. Tests - 2 failing as props and state are now linked
6. We need to now add the behaviour
*/
// ---- component

export const initialState = ({
  loading = false,
  error = undefined
}: ISearchProps): ISearchState => ({
  searchText: "",
  list: [],
  loading,
  error
});
const SearchContainerHooks: React.FC<ISearchProps> = props => {
  const [searchState, setSearchState] = useState<ISearchState>(
    initialState(props)
  );
  return (
    <SearchComponent
      title={"Search Class"}
      loading={searchState.loading}
      searchText={searchState.searchText}
      list={searchState.list}
      handleUpdateSearchText={() => {}}
      handleResetSearchText={() => {}}
    />
  );
};

export default SearchContainerHooks;
