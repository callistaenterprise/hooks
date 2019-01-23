import React, { useEffect, useState } from "react";
import { SearchWrapper } from "./Search";
import _list from "./list-mock";

const _filterList = (searchText, list) =>
  list.filter(
    ({ name }) => name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
  );

// ----------- the hook
const useSearchTextChange = ({ searchText, setLoading, setList }) =>
  useEffect(
    () => {
      setLoading(true);
      const t = setTimeout(() => {
        setList(_filterList(searchText, _list));
        setLoading(false);
      }, 400);
      return () => {
        clearTimeout(t);
      };
    },
    [searchText]
  );

// ----------- the component
const SearchContainer = () => {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useSearchTextChange({ searchText, setList, setLoading });

  const updateSearchText = e => setSearchText(e.target.value);

  return (
    <SearchWrapper
      title={"useState"}
      loading={loading}
      searchText={searchText}
      updateSearchText={updateSearchText}
      list={list}
    />
  );
};

export default SearchContainer;
