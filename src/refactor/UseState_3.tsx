import React, { ChangeEvent, useState } from "react";
import SearchComponent from "../SearchComponent";
import { ISearchProps, ISearchState } from "../reducer";

// ---- add state with useState
/*
1. Create handlers for the state updater
2. handleUpdateSearchText
3. handleResetSearchText
4. Tests: we now have one failing test which is the change text test, we now need to use and effect!
*/
// ---- component

const initialState = ({
  loading = false,
  error = undefined
}: ISearchProps): ISearchState => ({
  searchText: "",
  list: [],
  loading,
  error
});
type TsetSearchState = (state: ISearchState) => void;
const mapStateToHandlers = (
  searchState: ISearchState,
  setSearchState: TsetSearchState
) => ({
  handleUpdateSearchText: (event: ChangeEvent<HTMLInputElement>) =>
    setSearchState({ ...searchState, searchText: event.target.value }),
  handleResetSearchText: () =>
    setSearchState({ ...searchState, searchText: "" })
});
const SearchContainerHooks: React.FC<ISearchProps> = props => {
  const [searchState, setSearchState] = useState<ISearchState>(
    initialState(props)
  );
  const handlers = mapStateToHandlers(searchState, setSearchState);
  return (
    <SearchComponent
      title={"Search Class"}
      loading={searchState.loading}
      searchText={searchState.searchText}
      list={searchState.list}
      handleUpdateSearchText={handlers.handleUpdateSearchText}
      handleResetSearchText={handlers.handleResetSearchText}
    />
  );
};

export default SearchContainerHooks;
