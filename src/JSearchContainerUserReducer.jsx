import React, { useEffect, useReducer, useState } from "react";
import { SearchWrapper } from "./Search";
import  _list from "./list-mock";


const ActionTypes = {
  UPDATE_SEARCH_TEXT: "UPDATE_SEARCH_TEXT",
    LOADING:"LOADING",
    UPDATE_LIST:"UPDATE_LIST"
}
const _actionUpdateSearchText = payload => ({type: ActionTypes.UPDATE_SEARCH_TEXT, payload });
const _actionLoading = payload => ({type: ActionTypes.LOADING, payload});
const _actionUpdateList = payload => ({type: ActionTypes.UPDATE_LIST,payload});

const initialState = {
  loading: true,
  searchText: "",
  list: []
}

const searchReducer = (state, action) => {
  console.log(action.payload);
  switch(action.type){
    case ActionTypes.UPDATE_SEARCH_TEXT:
      return {...state, ...action.payload};
    case ActionTypes.LOADING:
      return {...state, ...action.payload};
    case ActionTypes.UPDATE_LIST:
      return {...state, ...action.payload};
    default:
      return state
  }
}

const _filterList = (searchText, list)=> list.filter(({name}) => name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0);

const SearchContainer = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState );
  useEffect(() => {
    const t = setTimeout(() =>
      dispatch(_actionUpdateList({list: _filterList(state.searchText, _list)}), 1000));
    return () => {
      clearTimeout(t)
    }
  }, [state.searchText]);
  useEffect(() => {
    dispatch(_actionLoading({loading: true}));
  }, [state.searchText]);
  useEffect(() => {
    dispatch(_actionLoading({loading: false}));
  }, [state.list]);

  const updateSearchText = e =>
    dispatch(_actionUpdateSearchText({searchText: e.target.value}));

  return <SearchWrapper searchText={state.searchText} updateSearchText={updateSearchText} list={state.list} loading={state.loading} title={"useReducer"} />;
};

export default SearchContainer;
