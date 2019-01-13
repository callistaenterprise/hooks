import React, { ChangeEvent } from "react";
import { compose, withReducer, withHandlers, lifecycle } from "recompose";
import * as api from "./api";
import { IItem } from "./list-mock";

// ---- types
interface IOuterProps {
  loading?: boolean;
  error?: string;
}
interface ISearchState {
  searchText: string;
  list: IItem[];
  loading: boolean;
  error?: string;
}
interface ISearchProps extends ISearchHandlers {
  searchState: ISearchState;
}

enum ESearchActions {
  UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT",
  REQUEST_SEARCH_LIST = "REQUEST_SEARCH_LIST",
  SUCCESS_SEARCH_LIST = "SUCCESS_SEARCH_LIST",
  FAILURE_SEARCH_LIST = "FAILURE_SEARCH_LIST"
}

interface IUpdateSearchText {
  type: ESearchActions.UPDATE_SEARCH_TEXT;
  payload: { searchText: string };
}
interface IRequestSearchList {
  type: ESearchActions.REQUEST_SEARCH_LIST;
  payload: { searchText: string };
}
interface ISuccessSearchList {
  type: ESearchActions.SUCCESS_SEARCH_LIST;
  payload: { list: IItem[] };
}
interface IFailureSearchList {
  type: ESearchActions.FAILURE_SEARCH_LIST;
  payload: { error: string };
}
type SearchActions =
  | IRequestSearchList
  | ISuccessSearchList
  | IFailureSearchList
  | IUpdateSearchText;

// ---- actions
const updateSearchAction = (searchText: string): IUpdateSearchText => ({
  type: ESearchActions.UPDATE_SEARCH_TEXT,
  payload: { searchText }
});
const requestSearchListAction = (searchText: string): IRequestSearchList => ({
  type: ESearchActions.REQUEST_SEARCH_LIST,
  payload: { searchText }
});
const successSearchListAction = (list: IItem[]): ISuccessSearchList => ({
  type: ESearchActions.SUCCESS_SEARCH_LIST,
  payload: { list }
});
const failureSearchListAction = (error: string): IFailureSearchList => ({
  type: ESearchActions.FAILURE_SEARCH_LIST,
  payload: { error }
});
// ---- state
const withSearchReducer = withReducer(
  "searchState",
  "dispatchSearch",
  (state: ISearchState, action: SearchActions) => {
    switch (action.type) {
      case ESearchActions.UPDATE_SEARCH_TEXT:
        state = { ...state, ...action.payload };
      case ESearchActions.REQUEST_SEARCH_LIST:
        state = { ...state, ...action.payload, loading: true };
      case ESearchActions.SUCCESS_SEARCH_LIST:
        state = { ...state, ...action.payload, loading: false };
      case ESearchActions.FAILURE_SEARCH_LIST:
        state = { ...state, ...action.payload, loading: false };
    }
    return state;
  },
  ({ loading = false, error }: IOuterProps): ISearchState => ({
    searchText: "",
    list: [],
    loading,
    error
  })
);

// ---- mapDispatchToHandlers
interface ISearchReducerProps {
  searchState: ISearchState;
  dispatchSearch: (action: SearchActions) => void;
}
interface ISearchHandlers {
  handleUpdateSearchText: (event: ChangeEvent<HTMLInputElement>) => void;
  handleResetSearchText: () => void;
  handleRequestSearchList: (searchText: string) => void;
  handleSuccessSearchList: (list: IItem[]) => void;
  handleFailureSearchList: (error: string) => void;
}
const withSearchHandlers = withHandlers<ISearchReducerProps, ISearchHandlers>({
  handleUpdateSearchText: ({ dispatchSearch }) => (
    event: ChangeEvent<HTMLInputElement>
  ) => dispatchSearch(updateSearchAction(event.target.value)),
  handleResetSearchText: ({ dispatchSearch }) => () =>
    dispatchSearch(updateSearchAction("")),
  handleRequestSearchList: ({ dispatchSearch }) => (searchText: string) =>
    dispatchSearch(requestSearchListAction(searchText)),
  handleSuccessSearchList: ({ dispatchSearch }) => (list: IItem[]) =>
    dispatchSearch(successSearchListAction(list)),
  handleFailureSearchList: ({ dispatchSearch }) => (error: string) =>
    dispatchSearch(failureSearchListAction(error))
});

// ---- lifecylce
const withRequestSearch = lifecycle({
  componentDidUpdate(prevProps: Readonly<ISearchProps>): void {
    if (
      prevProps.searchState.searchText !== this.props.searchState.searchText
    ) {
      this.props.handleRequestSearchList(this.props.searchState.searchText);
      api
        .search(this.props.searchState.searchText)
        .then(list => this.props.handleSuccessSearchList(list));
    }
  }
});

// ---- component
const SearchComponent: React.FC<ISearchProps> = props => {
  const { searchText, list, loading } = props.searchState;
  const { handleUpdateSearchText, handleResetSearchText } = props;
  return (
    <div data-testid="search-container">
      <div data-testid="search-bar">
        <input
          data-testid="search-bar-input"
          placeholder={"Search"}
          value={searchText}
          onChange={handleUpdateSearchText}
        />
        {loading ? (
          <div data-testid="loading-icon">loading</div>
        ) : (
          <div data-testid="reset-icon" onClick={handleResetSearchText}>
            reset
          </div>
        )}
      </div>
      <div data-testid="search-list">
        search list
        <ul data-testid="search-list-ul">
          {list &&
            list.map((item: IItem) => (
              <li key={`item-key-${item.id}`} data-testid={`item-${item.id}`}>
                {item.name}
              </li>
            ))}
        </ul>
      </div>
      Search Container
    </div>
  );
};

export default compose<ISearchProps, IOuterProps>(
  withSearchReducer,
  withSearchHandlers,
  withRequestSearch
)(SearchComponent);
