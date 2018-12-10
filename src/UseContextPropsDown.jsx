import React, { useContext } from "react";
import { SearchWrapper } from "./SearchWrapper";
import { RootStateContext } from "./RootStateProvider";

const SearchUseContextPropsDown= () => {
  const {searchActions, state} = useContext(RootStateContext);
  return (
    <SearchWrapper
      searchText={state.searchText}
      updateSearchText={searchActions.updateSearchText}
      list={state.list}
      loading={state.loading}
    />
  );
};

export default SearchUseContextPropsDown;
