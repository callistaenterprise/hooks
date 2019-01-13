import React from "react";
// @ts-ignore
import MaterialIcon from "material-icons-react";
// @ts-ignore
import MDSpinner from "react-md-spinner";
import { userSearchContext } from "./search-hooks";
import { ISearchHandlers, ISearchState, ISearchTextHandlers } from "./reducer";

// ---------------------------- Loading
interface ILoadingProps {
  loading: boolean;
  handleResetSearchText: ISearchHandlers["handleResetSearchText"];
}
export const Loading: React.FC<ILoadingProps> = ({
  loading,
  handleResetSearchText
}) =>
  loading ? (
    <span data-testid="loading-icon" className={"SearchIndicator"}>
      <MDSpinner singleColor={"grey"} size={18} />
    </span>
  ) : (
    <span
      data-testid="reset-icon"
      onClick={handleResetSearchText}
      className={"SearchClear"}
    >
      <MaterialIcon icon={"clear"} />
    </span>
  );

export const LoadingContainer = () => {
  const {
    actions,
    state: { loading }
  } = userSearchContext();
  return (
    <Loading
      loading={loading}
      handleResetSearchText={actions.handleResetSearchText}
    />
  );
};

// ---------------------------- SearchBar
interface ISearchBarProps {
  searchText: ISearchState["searchText"];
  handleUpdateSearchText: ISearchHandlers["handleUpdateSearchText"];
  children: React.ReactNode;
}
export const SearchBar: React.FC<ISearchBarProps> = ({
  searchText,
  handleUpdateSearchText,
  children
}) => (
  <div data-testid="search-bar" className={"SearchContainer"}>
    <input
      className={"SearchInput"}
      data-testid="search-bar-input"
      type={"text"}
      onChange={handleUpdateSearchText}
      value={searchText}
      placeholder={"Search"}
    />
    {children}
  </div>
);

export const SearchBarContainer = () => {
  const { actions, state } = userSearchContext();
  return (
    <SearchBar
      searchText={state.searchText}
      handleUpdateSearchText={actions.handleUpdateSearchText}
    >
      <LoadingContainer />
    </SearchBar>
  );
};

// ---------------------------- SearchList
interface ISearchListProps {
  list: ISearchState["list"];
}
export const SearchList: React.FC<ISearchListProps> = ({ list }) => (
  <div data-testid="search-list">
    <ul data-testid="search-list-ul">
      {list.map(({ id, name }) => (
        <li key={`item-key-${id}`} data-testid={`item-${id}`}>
          {name}
        </li>
      ))}
    </ul>
  </div>
);

export const SearchListContainer = () => {
  const { state } = userSearchContext();
  return <SearchList list={state.list} />;
};

interface ISearchProps extends ISearchState, ISearchTextHandlers {
  title: string;
}
export const SearchComponent: React.FC<ISearchProps> = props => (
  <div className={"Search"} data-testid="search-container">
    <h2>{props.title}</h2>
    <SearchBar {...props}>
      <Loading {...props} />
    </SearchBar>
    <SearchList {...props} />
  </div>
);
export default SearchComponent;
