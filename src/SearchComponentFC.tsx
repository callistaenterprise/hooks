import "symbol-observable";
import React, { ChangeEvent } from "react";
import {
  compose,
  withReducer,
  withHandlers,
  lifecycle,
  setObservableConfig,
  componentFromStream,
  createEventHandler,
  mapPropsStream,
  withStateHandlers,
  StateHandler,
  StateHandlerMap,
  pure
} from "recompose";
// import rxjsConfig from "recompose/rxjsObservableConfig";
import { from, merge, combineLatest } from "rxjs";
import {
  map,
  switchMap,
  delay,
  startWith,
  combineAll,
  tap,
  scan,
  mergeMap
} from "rxjs/operators";
import * as api from "./api";
import { IItem } from "./list-mock";

// ---- rxjs recompose
setObservableConfig({
  // @ts-ignore
  fromESObservable: from
});

// ---- types
interface IOuterProps {
  loading?: boolean;
  error?: string;
}
interface ISearchState {
  searchText: string;
  list: IItem[];
  loading: boolean;
  error?: string;
}
interface ISearchProps extends ISearchHandlers, ISearchBar {
  searchState: ISearchState;
}

enum ESearchActions {
  UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT",
  REQUEST_SEARCH_LIST = "REQUEST_SEARCH_LIST",
  SUCCESS_SEARCH_LIST = "SUCCESS_SEARCH_LIST",
  FAILURE_SEARCH_LIST = "FAILURE_SEARCH_LIST"
}

interface IUpdateSearchText {
  type: ESearchActions.UPDATE_SEARCH_TEXT;
  payload: { searchText: string };
}
interface IRequestSearchList {
  type: ESearchActions.REQUEST_SEARCH_LIST;
  payload: { searchText: string };
}
interface ISuccessSearchList {
  type: ESearchActions.SUCCESS_SEARCH_LIST;
  payload: { list: IItem[] };
}
interface IFailureSearchList {
  type: ESearchActions.FAILURE_SEARCH_LIST;
  payload: { error: string };
}
type SearchActions =
  | IRequestSearchList
  | ISuccessSearchList
  | IFailureSearchList
  | IUpdateSearchText;

// ---- actions
const updateSearchAction = (searchText: string): IUpdateSearchText => ({
  type: ESearchActions.UPDATE_SEARCH_TEXT,
  payload: { searchText }
});
const requestSearchListAction = (searchText: string): IRequestSearchList => ({
  type: ESearchActions.REQUEST_SEARCH_LIST,
  payload: { searchText }
});
const successSearchListAction = (list: IItem[]): ISuccessSearchList => ({
  type: ESearchActions.SUCCESS_SEARCH_LIST,
  payload: { list }
});
const failureSearchListAction = (error: string): IFailureSearchList => ({
  type: ESearchActions.FAILURE_SEARCH_LIST,
  payload: { error }
});
// ---- state
const withSearchReducer = withReducer(
  "searchState",
  "dispatchSearch",
  (state: ISearchState, action: SearchActions) => {
    switch (action.type) {
      case ESearchActions.UPDATE_SEARCH_TEXT:
        state = { ...state, ...action.payload };
      case ESearchActions.REQUEST_SEARCH_LIST:
        state = { ...state, ...action.payload, loading: true };
      case ESearchActions.SUCCESS_SEARCH_LIST:
        state = { ...state, ...action.payload, loading: false };
      case ESearchActions.FAILURE_SEARCH_LIST:
        state = { ...state, ...action.payload, loading: false };
    }
    return state;
  },
  ({ loading = false, error }: IOuterProps): ISearchState => ({
    searchText: "",
    list: [],
    loading,
    error
  })
);

// ---- handlers
interface ISearchReducerProps {
  searchState: ISearchState;
  dispatchSearch: (action: SearchActions) => void;
}
interface ISearchStateX {
  searchTextX: string;
}
type ISearchStateHandlers = StateHandlerMap<ISearchStateX> & {
  handleUpdateSearchText: StateHandler<ISearchStateX>;
  handleResetSearchText: StateHandler<ISearchStateX>;
};
interface ISearchHandlers {
  handleRequestSearchList: (searchText: string) => void;
  handleSuccessSearchList: (list: IItem[]) => void;
  handleFailureSearchList: (error: string) => void;
}
const withSearchHandlers = withHandlers<ISearchReducerProps, ISearchHandlers>({
  handleRequestSearchList: ({ dispatchSearch }) => (searchText: string) =>
    dispatchSearch(requestSearchListAction(searchText)),
  handleSuccessSearchList: ({ dispatchSearch }) => (list: IItem[]) =>
    dispatchSearch(successSearchListAction(list)),
  handleFailureSearchList: ({ dispatchSearch }) => (error: string) =>
    dispatchSearch(failureSearchListAction(error))
});

const withSearchStateHandlers = withStateHandlers<
  ISearchStateX,
  ISearchStateHandlers
>(
  // @ts-ignore
  { searchTextX: "" },
  {
    handleUpdateSearchText: state => (searchTextX: string) =>
      state.searchTextX !== searchTextX
        ? {
            searchTextX
          }
        : state,
    handleResetSearchText: () => () => ({
      searchTextX: ""
    })
  }
);
// ---- lifecylce
const withRequestSearch = lifecycle({
  componentDidUpdate(prevProps: Readonly<ISearchProps>): void {
    if (
      prevProps.searchState.searchText !== this.props.searchState.searchText
    ) {
      this.props.handleRequestSearchList(this.props.searchState.searchText);
      api
        .search(this.props.searchState.searchText)
        .then(list => this.props.handleSuccessSearchList(list));
    }
  }
});

// ---- streams

// ---- component
interface ISearchList {
  list: IItem[];
}
const SearchList = (props: ISearchList) => (
  <ul data-testid="search-list-ul">
    {props.list &&
      props.list.map((item: IItem) => (
        <li key={`item-key-${item.id}`} data-testid={`item-${item.id}`}>
          {item.name}
        </li>
      ))}
  </ul>
);
interface ISearchBar$ {
  loading: boolean;
  handleResetSearchText: () => void;
  handleUpdateSearchText: (searchText: string) => void;
}
interface ISearchBar {
  loading: boolean;
  searchText: string;
  searchTextDelayed: string;
  onInput: () => void;
  onReset: () => void;
}
const SearchBar = ({
  searchText,
  searchTextDelayed,
  onInput,
  loading,
  onReset
}: ISearchBar) => {
  console.log("----- props", { searchText, onReset });
  return (
    <div data-testid="search-bar">
      <input
        data-testid="search-bar-input"
        placeholder={"Search"}
        onInput={onInput}
      />
      <span>{searchTextDelayed}</span>
      {loading ? (
        <div data-testid="loading-icon">loading</div>
      ) : (
        <div data-testid="reset-icon" onClick={onReset}>
          reset
        </div>
      )}
    </div>
  );
};

const searchInput$ = mapPropsStream(props$ => {
  const { stream: onInput$, handler: onInput } = createEventHandler();

  const textDelay$ = onInput$.pipe(
    map((e: ChangeEvent<HTMLInputElement>) => e.target.value),
    delay(500),
    startWith("")
  );
  const text$ = onInput$.pipe(
    map((e: ChangeEvent<HTMLInputElement>) => e.target.value),
    startWith("")
  );

  // const { stream: onReset$, handler: onReset } = createEventHandler();
  console.log("----- searchInput");
  // @ts-ignore
  return props$.pipe(
    switchMap(
      // @ts-ignore
      (props: ISearchBar$) =>
        combineLatest([text$, textDelay$]).pipe(
          map(([searchText, searchTextDelayed]) => ({
            searchText,
            searchTextDelayed
          })),

          tap((p: any) => {
            console.log("---- search text tap", { ...p });
            props.handleUpdateSearchText(p.searchText);
          })
        ),
      (props: ISearchBar$, { searchText, searchTextDelayed }) => {
        console.log("---- mps", { props, searchText, searchTextDelayed });
        return {
          ...props,
          searchText,
          searchTextDelayed,
          onInput
        };
      }
    )
  );
  //   v => v
});
const resetSearchText$ = mapPropsStream(props$ => {
  const { stream: onReset$, handler: onReset } = createEventHandler();
  // @ts-ignore
  return props$.pipe(
    switchMap((props: ISearchBar$) =>
      onReset$.pipe(map(() => props.handleResetSearchText()))
    )
  );
});

// const SearchBar$ = componentFromStream<ISearchBar$>(props$ => {
//   const { stream: onInput$, handler: onInput } = createEventHandler();
//   const text$ = onInput$.pipe(
//     map((e: ChangeEvent<HTMLInputElement>) => e.target.value),
//     delay(500),
//     startWith("")
//   );
//   const { stream: onReset$, handler: onReset } = createEventHandler();
//
//   // @ts-ignore
//   return props$.pipe(
//     switchMap<ISearchBar, ISearchBar$>((props: ISearchBar) =>
//       merge(
//         text$.pipe(
//           map((text: string) => {
//             return { ...props, searchText: text };
//           })
//         ),
//         onReset$.pipe(tap(c => console.log("---- reset clicked", c)))
//       ).pipe(
//         map(p => {
//           console.log("--- mapping p", p);
//           return { ...props, ...p, onInput, onReset };
//         }),
//         tap(c => console.log("-- tap props", c)),
//         // @ts-ignore
//         map(SearchBar)
//       )
//     )
//   );
const SearchComponent: React.FC<ISearchProps> = props => {
  const { list, loading } = props.searchState;
  const {
    onInput,
    searchText,
    searchTextDelayed,
    // @ts-ignore
    handleResetSearchText
  } = props;
  console.log("---- searchState", props);
  return (
    <div data-testid="search-container">
      <h2>Search Container</h2>
      <SearchBar
        onInput={onInput}
        searchText={searchText}
        searchTextDelayed={searchTextDelayed}
        onReset={handleResetSearchText}
        loading={loading}
      />
      <SearchList list={list} />
    </div>
  );
};

export default compose<ISearchProps, IOuterProps>(
  withSearchReducer,
  withSearchHandlers,
  withSearchStateHandlers,
  pure,
  // withRequestSearch,
  searchInput$
  // resetSearchText$
)(SearchComponent);
