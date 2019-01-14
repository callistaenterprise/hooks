import React, { Suspense } from "react";
import LoadingMessage from "./LoadingMessage";
// @ts-ignore
const SearchBar = React.lazy(() => import("./SearchBarContainer"));
// @ts-ignore
const SearchList = React.lazy(() => import("./SearchListContainer"));
interface ISearchProps {
  title: string;
}
const SearchComponent: React.FC<ISearchProps> = props => (
  <div className={"Search"} data-testid="search-container">
    <h2>{props.title}</h2>
    <Suspense fallback={<LoadingMessage message={"Search Bar"} />}>
      <SearchBar />
    </Suspense>
    <Suspense fallback={<LoadingMessage message={"Search List"} />}>
      <SearchList />
    </Suspense>
  </div>
);
export default SearchComponent;
