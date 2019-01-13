import React from "react";
import SearchComponent from "../SearchComponent";
import { ISearchProps } from "../reducer";

// ---- hooks
/*
1. convert class component to functional component
2. State and handlers have gone so now we need use some hooks to replace this.
3. Again rember that Hooks can only be used with Functional components
4. Tests: the tests for behaviour are now failing
*/
// ---- component
const SearchContainerHooks: React.FC<ISearchProps> = () => {
  return (
    <SearchComponent
      title={"Search Class"}
      loading={false}
      searchText={""}
      list={[]}
      handleUpdateSearchText={() => {}}
      handleResetSearchText={() => {}}
    />
  );
};

export default SearchContainerHooks;
