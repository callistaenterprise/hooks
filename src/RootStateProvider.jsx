import React from "react";
import { useSearchState, useSearchStateObservable } from "./search-hooks";

export const RootStateContext = React.createContext();

const RootStateProvider = props => {
  // --- hooks
  const [state, actions] = useSearchState(props);
  // const [state, actions] = useSearchStateObservable(props);
  return (
    <RootStateContext.Provider value={{ state, actions, handlers: actions }}>
      {props.children}
    </RootStateContext.Provider>
  );
};

export default RootStateProvider;

