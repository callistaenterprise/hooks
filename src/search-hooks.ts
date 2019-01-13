import {
  initialState,
  ISearchHandlers,
  ISearchProps,
  ISearchRequestHandlers,
  ISearchState,
  mapDispatchToHandlers,
  searchReducer
} from "./reducer";
import { useContext, useEffect, useReducer } from "react";
import * as api from "./api";
import { RootStateContext } from "./RootStateProvider";

export const useSearchRequest = (
  state: ISearchState,
  requestHandlers: ISearchRequestHandlers
) =>
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

export const userSearchContext = (): {
  state: ISearchState;
  actions: ISearchHandlers;
} => useContext(RootStateContext);

export const useSearchReducer = (props: ISearchProps) => {
  const [state, dispatch] = useReducer(searchReducer, initialState(props));
  return { state, actions: mapDispatchToHandlers(dispatch) };
};
