import React, { useState } from "react";
import SearchComponent from "../SearchComponent";

// ---- add state with useState
/*
1. add State with use state
2. useState - use state accepts an initial state and returns this state with a state updater.
3. Problem with use state is that we need to have individual useState hooks, which gets messy
3. Again remember that Hooks can only be used with Functional components
5. Tests - 2 failing as props and state are now linked
6. We need to now add the behaviour
*/
// ---- component

const SearchContainerHooks = props => {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <SearchComponent
      title={"Use state"}
      loading={loading}
      searchText={searchText}
      list={list}
      handleUpdateSearchText={({ target: { value } }) => setSearchText(value)}
      handleResetSearchText={() => setSearchText("")}
    />
  );
};

export default SearchContainerHooks;
