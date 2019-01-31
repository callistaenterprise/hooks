import { initialState, mapDispatchToHandlers, searchReducer } from "./reducer";
import { useContext, useEffect, useReducer, useRef } from "react";
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

export const useSearchContext = () => useContext(RootStateContext);

export const useSearchReducer = props => {
  const [state, dispatch] = useReducer(searchReducer, initialState(props));
  return { state, actions: mapDispatchToHandlers(dispatch) };
};

export const useSafeSet = setState => {
  const mountRef = useRef(false);
  useEffect(() => {
    // component did mount, first time
    mountRef.current = true;
    // compoent will unmount, callback
    return () => (mountRef.current = false);
  }, []);
  const safeSetState = (...args) => mountRef.current && setState(...args);
  return safeSetState;
};

export const useSearchReducerState = () => {
  const [state, setUnsafeState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      searchText: "",
      list: [],
      loading: false,
      error: undefined
    }
  );
  const setState = useSafeSetState(setStateUnsafe);
  return [state, setState];
};
export const useSafeSetState = setState => {
  const mountRef = useRef(false);
  useEffect(() => {
    // component did mount, first time
    mountRef.current = true;
    // compoent will unmount, callback
    return () => (mountRef.current = false);
  }, []);
  const safeSetState = (...args) => mountRef.current && setState(...args);
  return safeSetState;
};
export const useSearchState = () => {
  const [state, setStateUnsafe] = useSearchReducerState();
  const setState = useSafeSetState(setStateUnsafe);

  useEffect(
    () => {
      // on mount
      // when the search text changes
      safeSetState({ loading: true });
      api
        .search(state.searchText)
        .then(list => safeSetState({ list, loading: false }));
    },
    [state.searchText]
  );
  const handlers = {
    handleUpdateSearchText: e => safeSetState({ searchText: e.target.value }),
    handleResetSearchText: () => safeSetState({ searchText: "" })
  };
  return [state, handlers];
};
