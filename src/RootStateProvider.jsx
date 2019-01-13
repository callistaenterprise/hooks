import React, { useReducer } from "react";
import { initialState, mapDispatchToHandlers, searchReducer } from "./reducer";
import { useSearchRequest } from "./search-hooks";

export const RootStateContext = React.createContext();

const RootStateProvider = props => {
  // --- hooks
  const [state, dispatch] = useReducer(searchReducer, initialState(props));

  // --- bind mapDispatchToHandlers to dispatch
  const actions = mapDispatchToHandlers(dispatch);

  // --- side effect
  useSearchRequest(state, actions);
  return (
    <RootStateContext.Provider value={{ state, actions }}>
      {props.children}
    </RootStateContext.Provider>
  );
};

export default RootStateProvider;
