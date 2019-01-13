// ---- types
// ---- base types
// ---- redux
import { IItem } from "./list-mock";
import { ChangeEvent } from "react";

export interface IBaseAction<AT extends string, T extends {}> {
  type: AT;
  payload: T;
}

export type Dispatch<A> = (value: A) => void;

type IReducer<S, A> = (state: S, action: A) => S;
interface IUseReducerWithActions<S extends {}, A> {
  reducer: IReducer<any, any>;
  actions: Record<string, A>;
  initialState: S;
}

function bindAction(action: any, dispatch: any) {
  return function() {
    return dispatch(action.apply(null, arguments));
  };
}

const bindActions = (actions: Record<string, Function>, dispatch: Function) =>
  Object.keys(actions).reduce(
    (a: Record<string, Function>, k: string) => ({
      ...a,
      [k]: bindAction(actions[k], dispatch)
    }),
    {}
  );

export interface ISearchState {
  searchText?: string;
  list?: IItem[];
  loading?: boolean;
  error?: string;
}
export interface ISearchProps {
  loading?: boolean;
  error?: string;
}

// ------ actions
export enum ESearchActions {
  UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT",
  REQUEST_SEARCH_LIST = "REQUEST_SEARCH_LIST",
  SUCCESS_SEARCH_LIST = "SUCCESS_SEARCH_LIST",
  FAILURE_SEARCH_LIST = "FAILURE_SEARCH_LIST"
}

type IUpdateSearchText = IBaseAction<
  ESearchActions.UPDATE_SEARCH_TEXT,
  { searchText: string }
>;
type IRequestSearchList = IBaseAction<
  ESearchActions.REQUEST_SEARCH_LIST,
  { searchText: string }
>;
type ISuccessSearchList = IBaseAction<
  ESearchActions.SUCCESS_SEARCH_LIST,
  { list: IItem[] }
>;
type IFailureSearchList = IBaseAction<
  ESearchActions.FAILURE_SEARCH_LIST,
  { error: string }
>;
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
const requestSearchListAction = (searchText?: string): IRequestSearchList => ({
  type: ESearchActions.REQUEST_SEARCH_LIST,
  payload: { searchText: searchText ? searchText : "" }
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
export const searchReducer = (state: ISearchState, action: SearchActions) => {
  console.log("---- searchReducer action", action);
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
};
export const initialState = ({
  loading = false,
  error = undefined
}: ISearchProps): ISearchState => ({
  searchText: "",
  list: [],
  loading,
  error
});

// ---- mapDispatchToHandlers
export interface ISearchRequestHandlers {
  handleRequestSearchList: (searchText?: string) => void;
  handleSuccessSearchList: (list: IItem[]) => void;
  handleFailureSearchList: (error: string) => void;
}
export interface ISearchTextHandlers {
  handleUpdateSearchText: (event: ChangeEvent<HTMLInputElement>) => void;
  handleResetSearchText: () => void;
}
export type ISearchHandlers = ISearchRequestHandlers & ISearchTextHandlers;

export const mapDispatchToHandlers = (dispatch: Function): ISearchHandlers => ({
  handleUpdateSearchText: (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(updateSearchAction(event.target.value)),
  handleResetSearchText: () => dispatch(updateSearchAction("")),
  handleRequestSearchList: (searchText?: string) =>
    dispatch(requestSearchListAction(searchText)),
  handleSuccessSearchList: (list: IItem[]) =>
    dispatch(successSearchListAction(list)),
  handleFailureSearchList: (error: string) =>
    dispatch(failureSearchListAction(error))
});
