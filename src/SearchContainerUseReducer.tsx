import React, { useEffect, useReducer, useState } from "react";
import { IListItem, ISearchBar, SearchWrapper } from "./Search";
import _list from "./list-mock";

enum ActionTypes {
  UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT",
  LOADING = "LOADING",
  UPDATE_LIST = "UPDATE_LIST"
}
interface BaseAction<AT extends ActionTypes, T extends {}> {
  type: AT;
  payload: T;
}

interface IUpdateSearchText {
  searchText: string;
}
interface ILoading {
  loading: boolean;
}
interface IUpdateList {
  list: IListItem[];
}
type UpdateSearchText = BaseAction<
  ActionTypes.UPDATE_SEARCH_TEXT,
  IUpdateSearchText
>;
type Loading = BaseAction<ActionTypes.LOADING, ILoading>;
type UpdateList = BaseAction<ActionTypes.UPDATE_LIST, IUpdateList>;

const _actionUpdateSearchText = (
  payload: IUpdateSearchText
): UpdateSearchText => ({ type: ActionTypes.UPDATE_SEARCH_TEXT, payload });
const _actionLoading = (payload: ILoading): Loading => ({
  type: ActionTypes.LOADING,
  payload
});
const _actionUpdateList = (payload: IUpdateList): UpdateList => ({
  type: ActionTypes.UPDATE_LIST,
  payload
});

interface ISearchState {
  loading: boolean;
  searchText: string;
  list: IListItem[];
}

const initialState = {
  loading: true,
  searchText: "",
  list: []
};

type Actions = UpdateSearchText | Loading | UpdateList;
const searchReducer = (state: ISearchState, action: Actions) => {
  console.log(action.payload);
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

const _filterList = (searchText: string, list: IListItem[]) =>
  list.filter(
    ({ name }) => name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
  );

type Dispatch<A> = (value: A) => void;

// ---------------- Use Functions
const useListFilter = (state: ISearchState, dispatch: Dispatch<Actions>) =>
  useEffect(
    () => {
      const t = setTimeout(
        () =>
          dispatch({
            type: ActionTypes.UPDATE_LIST,
            payload: { list: _filterList(state.searchText, _list) }
          }),
        1000
      );
      return () => {
        clearTimeout(t);
      };
    },
    [state.searchText]
  );

const useSearchTextChange = (
  state: ISearchState,
  dispatch: Dispatch<Actions>
) =>
  useEffect(
    () => {
      dispatch(_actionLoading({ loading: true }));
    },
    [state.searchText]
  );

const useListChange = (state: ISearchState, dispatch: Dispatch<Actions>) =>
  useEffect(
    () => {
      dispatch(_actionLoading({ loading: false }));
    },
    [state.list]
  );
const SearchContainer = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  useListFilter(state, dispatch);
  useSearchTextChange(state, dispatch);
  useListChange(state, dispatch);

  const updateSearchText: ISearchBar["updateSearchText"] = e =>
    dispatch(
      _actionUpdateSearchText({
        searchText: (e.target as HTMLInputElement).value
      })
    );

  return (
    <SearchWrapper
      title={"useReducer"}
      searchText={state.searchText}
      updateSearchText={updateSearchText}
      list={state.list}
      loading={state.loading}
    />
  );
};

export default SearchContainer;
