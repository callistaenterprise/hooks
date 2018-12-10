import React, { useEffect, useReducer } from "react";
import _list from "./list-mock";

export const RootStateContext = React.createContext();

const ActionTypes = {
  UPDATE_SEARCH_TEXT: "UPDATE_SEARCH_TEXT",
  LOADING: "LOADING",
  UPDATE_LIST: "UPDATE_LIST"
};

const _actionUpdateSearchText = payload => ({
  type: ActionTypes.UPDATE_SEARCH_TEXT,
  payload
});
const _actionLoading = payload => ({
  type: ActionTypes.LOADING,
  payload
});
const _actionUpdateList = payload => ({
  type: ActionTypes.UPDATE_LIST,
  payload
});

const initialState = {
  loading: true,
  searchText: "",
  list: []
};

const searchReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case ActionTypes.UPDATE_SEARCH_TEXT:
      return { ...state, ...action.payload };
    case ActionTypes.LOADING:
      return { ...state, ...action.payload };
    case ActionTypes.UPDATE_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const _filterList = (searchText, list) =>
  list.filter(
    ({ name }) => name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
  );

// ---------------- User Functions
const useFilterList = ({ searchText }, { updateList, loading }) =>
  useEffect(
    () => {
      loading({ loading: true });
      const t = setTimeout(() => {
        updateList({ list: _filterList(searchText, _list) });
        loading({ loading: false});
      }, 1000);
      return () => {
        clearTimeout(t);
      };
    },
    [searchText]
  );

const useSearchTextChange = ({ searchText }, { loading }) =>
  useEffect(() => loading({ loading: true }), [searchText]);

const useListChange = ({ list }, { loading }) =>
  useEffect(() => loading({ loading: false }), [list]);

const mapDispatchToProps = (dispatch, state) => ({
  loading: payload => dispatch(_actionLoading(payload)),
  updateList: payload => dispatch(_actionUpdateList(payload)),
  updateSearchText: e =>
    dispatch(_actionUpdateSearchText({ searchText: e.target.value }))
});
const RootStateProvider = props => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const searchActions = mapDispatchToProps(dispatch, state);
  useFilterList(state, searchActions);
  // useListChange(state, searchActions);
  useSearchTextChange(state, searchActions);
  return (
    <RootStateContext.Provider value={{ state, searchActions }}>
      {props.children}
    </RootStateContext.Provider>
  );
};

export default RootStateProvider;
