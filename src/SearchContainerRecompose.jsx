import React from "react";
import { compose, withReducer, withHandlers, lifecycle } from "recompose";
import * as api from "./api";

// ---- types

const ESearchActions = {
  UPDATE_SEARCH_TEXT: "UPDATE_SEARCH_TEXT",
  REQUEST_SEARCH_LIST: "REQUEST_SEARCH_LIST",
  SUCCESS_SEARCH_LIST: "SUCCESS_SEARCH_LIST",
  FAILURE_SEARCH_LIST: "FAILURE_SEARCH_LIST"
};

// ---- actions
const updateSearchAction = searchText => ({
  type: ESearchActions.UPDATE_SEARCH_TEXT,
  payload: { searchText }
});
const requestSearchListAction = searchText => ({
  type: ESearchActions.REQUEST_SEARCH_LIST,
  payload: { searchText }
});
const successSearchListAction = list => ({
  type: ESearchActions.SUCCESS_SEARCH_LIST,
  payload: { list }
});
const failureSearchListAction = error => ({
  type: ESearchActions.FAILURE_SEARCH_LIST,
  payload: { error }
});
// ---- state
const withSearchReducer = withReducer(
  "searchState",
  "dispatchSearch",
  (state, action) => {
    switch (action.type) {
      case ESearchActions.UPDATE_SEARCH_TEXT:
        return { ...state, ...action.payload };
      case ESearchActions.REQUEST_SEARCH_LIST:
        return { ...state, ...action.payload, loading: true };
      case ESearchActions.SUCCESS_SEARCH_LIST:
        return { ...state, ...action.payload, loading: false };
      case ESearchActions.FAILURE_SEARCH_LIST:
        return { ...state, ...action.payload, loading: false };
      default:
        return state;
    }
  },
  ({ loading = false, error }) => ({
    searchText: "",
    list: [],
    loading,
    error
  })
);

// ---- mapDispatchToHandlers
const withSearchHandlers = withHandlers({
  handleUpdateSearchText: ({ dispatchSearch }) => event =>
    dispatchSearch(updateSearchAction(event.target.value)),
  handleResetSearchText: ({ dispatchSearch }) => () =>
    dispatchSearch(updateSearchAction("")),
  handleRequestSearchList: ({ dispatchSearch }) => searchText =>
    dispatchSearch(requestSearchListAction(searchText)),
  handleSuccessSearchList: ({ dispatchSearch }) => list =>
    dispatchSearch(successSearchListAction(list)),
  handleFailureSearchList: ({ dispatchSearch }) => error =>
    dispatchSearch(failureSearchListAction(error))
});

// ---- lifecylce
const withRequestSearch = lifecycle({
  componentDidUpdate(prevProps) {
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
const SearchComponent = props => {
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
            list.map(item => (
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

export default compose(
  withSearchReducer,
  withSearchHandlers,
  withRequestSearch
)(SearchComponent);
