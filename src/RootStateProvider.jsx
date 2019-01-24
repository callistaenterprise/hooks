import React, { useReducer } from "react";
import { initialState, mapDispatchToHandlers, searchReducer } from "./reducer";
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

