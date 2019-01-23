import React, { useEffect, useState } from "react";
import SearchComponent from "../SearchComponent";
import * as api from "../api";
// ---- add effect useEffect
/*
The function passed to useEffect will run after the
render is committed to the screen. Think of effects as an escape hatch from React’s purely functional world into the imperative world.
By default, effects run after every completed render, but you can choose to fire it only when certain values have changed
 */
/*
1. We need to add an effect to initiate an api call when the searchText state updates
2. useEffect takes a function and an array of props/state, that on changes they initiate a call to the function
3. So, for every change of the searchText state the api is called
4. import the api
5. implement use effect
6. We need to implement some more handlers that cover, request, success and error
7. request : set loading to true
8. success: loading: false, list: with the response
9. failure: loading: false, error: with the error response
. Tests: we now have one failing test which is the change text test, we now need to use and effect!
*/
// ---- component

const mapStateToHandlers = ({
  loading,
  setLoading,
  list,
  setList,
  searchText: searchTextState,
  setSearchText,
  error,
  setError
}) => {
  return {
    handleUpdateSearchText: ({ target: { value: searchText } }) => {
      return searchText !== searchTextState && setSearchText(searchText);
    },
    handleResetSearchText: () => setSearchText(""),
    handleRequestSearchList: () => {
      setLoading(true);
    },
    handleSuccessSearchList: list => {
      setList(list);
      setLoading(false);
    },
    handleFailureSearchList: error => {
      setError(error);
      setLoading(false);
    }
  };
};

const SearchContainerHooks = props => {
  // use useState
  const [loading, setLoading] = useState(
    props.loading === undefined ? false : props.loading
  );
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(undefined);
  const handlers = mapStateToHandlers({
    loading,
    setLoading,
    list,
    setList,
    searchText,
    setSearchText,
    error,
    setError
  });
  // use useEffect to initiate an api call on
  useEffect(
    () => {
      api
        .search(searchText)
        .then(list => {
          handlers.handleSuccessSearchList(list);
        })
        .catch(error => handlers.handleFailureSearchList(error));
    },
    [searchText]
  );
  // use useState
  return (
    <SearchComponent
      title={"Search Class"}
      loading={loading}
      searchText={searchText}
      list={list}
      handleUpdateSearchText={handlers.handleUpdateSearchText}
      handleResetSearchText={handlers.handleResetSearchText}
    />
  );
};

export default SearchContainerHooks;
