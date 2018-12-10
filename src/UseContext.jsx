import React from "react";
import { SearchBarContainer, SearchListContainer} from "./SearchWrapper";

export const SearchUseContext = () => (
  <div className={"Search"}>
    <div>useContext</div>
    <SearchBarContainer />
    <SearchListContainer/>
  </div>
);

export default SearchUseContext;
