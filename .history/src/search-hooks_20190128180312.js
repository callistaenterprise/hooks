import { initialState, mapDispatchToHandlers, searchReducer } from "./reducer";
import { useContext, useEffect, useReducer, useRef } from "react";
import * as api from "./api";
import { RootStateContext } from "./RootStateProvider";
import { useObservable, useEventCallback } from 'rxjs-hooks'
import { from } from 'rxjs'
import { map, delay, debounceTime, switchMap, withLatestFrom, tap } from 'rxjs/operators'

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
  return [state, setState]
}
export const useSafeSetState = (setState) => {
  const mountRef = useRef(false);
  useEffect(() => {
    // component did mount, first time
    mountRef.current = true;
    // compoent will unmount, callback
    return () => (mountRef.current = false);
  }, []);
  const safeSetState = (...args) => mountRef.current && setState(...args);
  return safeSetState;
}

const useCallApiEffect = (searchText, setState) => {
  useEffect(
    () => {
      // on mount
      // when the search text changes
      setState({ loading: true });
      api
        .search(searchText)
        .then(list => setState({ list, loading: false }));
    },
    [searchText]
  );
}

const useCallApiObservable = (searchText, setState) => {
  useObservable(input$ => input$.pipe(
    debounceTime(1000),
    map($input => $input[0]),
    tap(st => setState({ loading: true })),
    switchMap(st => from(api
      .search(st)).pipe(
        map(list => {
          console.log("----- list", st, list);
          setState({ list, loading: false })
          return list;
        })
      ))
  ), searchText, [searchText]);
}
const useCallApiEventObservable = (searchText, setState) => {
  const [handleUpdateSearchText, [searchText, loading, list, error]] = useEventCallback(
    (event$, input$, state$) => input$.pipe(
      map(event => [event.target.value]),
      combineLatest(inputs$),
      withLatestFrom(state$),
      debounceTime(1000),
      switchMap([eventAndInput, state] => from(api
        .search(eventAndInput[1][0])).pipe(
          map(list => {
            const [[searchText, loading, listp, error], [searchTextInupt]] = eventAndInput;
            console.log("----- list", list, listp);
            return [searchTextInupt, loading, list, error];
          })
        ))), ["", false, [], undefined], [searchText]);
return [handleUpdateSearchText, [searchText, loading, list, error]];
}
export const mapStateToHandlers = (setState) => ({
  handleUpdateSearchText: e => setState({ searchText: e.target.value }),
  handleResetSearchText: () => setState({ searchText: "" })
});
export const mapStateToObservableHandlers = (setState) => ({
  handleUpdateSearchText: e => setState({ searchText: e.target.value }),
  handleResetSearchText: () => setState({ searchText: "" })
});
export const useSearchState = () => {
  const [state, setState] = useSearchReducerState();
  // useCallApiEffect(state.searchText, setState);
  useCallApiObservable(state.searchText, setState);
  const handlers = mapStateToHandlers(setState);
  return [state, handlers];
};
