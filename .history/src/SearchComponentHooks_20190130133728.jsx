import React, { useRef, useEffect, useReducer } from "react";
import { useSearchContext, useSearchStateObservable } from "./search-hooks";
import SearchComponent from "./SearchComponent";
import * as api from "./api";

const SearchComponentHooks = props => {
  return (
    <SearchComponent
      title={"Phil's-osophies Hooks"}
      loading={false}
      searchText={""}
      list={[]}
      handleUpdateSearchText={() => { }}
      handleResetSearchText={() => { }}
    />
  );
};
export default SearchComponentHooks;
