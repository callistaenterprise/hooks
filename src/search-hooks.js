import { initialState, mapDispatchToHandlers, searchReducer } from "./reducer";
import { useContext, useEffect, useReducer } from "react";
import * as api from "./api";
import { RootStateContext } from "./RootStateProvider";

export const useSearchRequest = (state, requestHandlers) =>
  useEffect(
    () => {
      requestHandlers.handleRequestSearchList(state.searchText);
      api
        .search(state.searchText)
        .then(list => requestHandlers.handleSuccessSearchList(list))
        .catch(err => requestHandlers.handleFailureSearchList(err));
    },
    [state.searchText]
  );

export const userSearchContext = () => useContext(RootStateContext);

export const useSearchReducer = props => {
  const [state, dispatch] = useReducer(searchReducer, initialState(props));
  return { state, actions: mapDispatchToHandlers(dispatch) };
};
