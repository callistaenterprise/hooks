import React from "react";
import { useSearchState } from "./search-hooks";

export const RootStateContext = React.createContext();

const RootStateProvider = props => {
  // --- hooks
  const [state, actions] = useSearchState();
  return (
    <RootStateContext.Provider value={{ state, actions, handlers: actions }}>
      {props.children}
    </RootStateContext.Provider>
  );
};

export default RootStateProvider;

