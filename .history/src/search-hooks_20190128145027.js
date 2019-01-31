import { initialState, mapDispatchToHandlers, searchReducer } from "./reducer";
import { useContext, useEffect, useReducer, useRef } from "react";
import * as api from "./api";
import { RootStateContext } from "./RootStateProvider";
import { useObservable } from "rxjs-hooks";
import { interval, of } from "rxjs";
import { map, delay, withLatestFrom, tap } from "rxjs/operators";

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
  const setState = useSafeSetState(setUnsafeState);
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

const useCallApiEffect = (searchText, setState) => {
  useEffect(
    () => {
      // on mount
      // when the search text changes
      setState({ loading: true });
      api.search(searchText).then(list => setState({ list, loading: false }));
    },
    [searchText]
  );
};

const useCallApiObservable = (searchText, setState) => {
  useObservable(
    input$ =>
      input$.pipe(
        delay(1000),
        tap(() => setState({ loading: true })),
        of(api.search(searchText)).pipe(
          map(list => setState({ list, loading: false }))
        )
      ),
    searchText,
    [searchText]
  );
};
export const mapStateToHandlers = setState => ({
  handleUpdateSearchText: e => setState({ searchText: e.target.value }),
  handleResetSearchText: () => setState({ searchText: "" })
});
export const useSearchState = () => {
  const [state, setState] = useSearchReducerState();
  useCallApiEffect(state.searchText, setState);
  const handlers = mapStateToHandlers(setState);
  return [state, handlers];
};
