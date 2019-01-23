// ---- types
// ---- base types
// ---- redux

function bindAction(action, dispatch) {
  return function() {
    return dispatch(action.apply(null, arguments));
  };
}

const bindActions = (actions, dispatch) =>
  Object.keys(actions).reduce(
    (a, k) => ({
      ...a,
      [k]: bindAction(actions[k], dispatch)
    }),
    {}
  );

// ------ actions
export const ESearchActions = {
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
  payload: { searchText: searchText ? searchText : "" }
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
export const searchReducer = (state, action) => {
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
};
export const initialState = ({ loading = false, error = undefined }) => ({
  searchText: "",
  list: [],
  loading,
  error
});

// ---- mapDispatchToHandlers

export const mapDispatchToHandlers = dispatch => ({
  handleUpdateSearchText: event =>
    dispatch(updateSearchAction(event.target.value)),
  handleResetSearchText: () => dispatch(updateSearchAction("")),
  handleRequestSearchList: searchText =>
    dispatch(requestSearchListAction(searchText)),
  handleSuccessSearchList: list => dispatch(successSearchListAction(list)),
  handleFailureSearchList: error => dispatch(failureSearchListAction(error))
});
