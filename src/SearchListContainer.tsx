import React from "react";
import { ISearchState } from "./reducer";
import { userSearchContext } from "./search-hooks";
interface ISearchListProps {
  list: ISearchState["list"];
}
const SearchList: React.FC<ISearchListProps> = ({ list }) => (
  <div data-testid="search-list">
    <ul data-testid="search-list-ul">
      {list &&
        list.map(({ id, name }) => (
          <li key={`item-key-${id}`} data-testid={`item-${id}`}>
            {name}
          </li>
        ))}
    </ul>
  </div>
);

const SearchListContainer = () => {
  const { state } = userSearchContext();
  return <SearchList list={state.list} />;
};

export default SearchListContainer;
