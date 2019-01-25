import React, { Suspense } from "react";
import LoadingMessage from "./LoadingMessage";
const SearchBar = React.lazy(() => import("./SearchBarContainer"));
const SearchList = React.lazy(() => import("./SearchListContainer"));
const SearchComponent = props => (
  <div className={"Search"} data-testid="search-container">
    <h2 style={{fontStyle:"italic"}} >{props.title}</h2>
    <Suspense fallback={<LoadingMessage message={"Search Bar"} />}>
      <SearchBar />
    </Suspense>
    <Suspense fallback={<LoadingMessage message={"Search List"} />}>
      <SearchList />
    </Suspense>
  </div>
);
export default SearchComponent;
