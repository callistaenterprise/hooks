import React from "react";
import logo from "./logo.svg";

export interface ISearchBar {
  loading: boolean;
  searchText?: string;
  updateSearchText: (e: React.FormEvent<HTMLInputElement>) => void;
}
export const SearchBar: React.FC<ISearchBar> = ({
  loading,
  searchText,
  updateSearchText
}) => (
  <div>
    <input type={"text"} onChange={updateSearchText} value={searchText} />
    {loading && <img src={logo} className="App-logo" alt="logo" />}
  </div>
);

export interface IListItem {
  id: string;
  name: string;
}
export interface ISearchList {
  list: IListItem[];
}
export const SearchList: React.FC<ISearchList> = ({ list }) => (
  <ul>
    {list.map(({ id, name }) => (
      <li key={id}>{name}</li>
    ))}
  </ul>
);

export type ISearchWrapper = ISearchBar & ISearchList & {title: string};
export const SearchWrapper: React.FC<ISearchWrapper> = props => (
  <div className="Search">
    <div>{props.title}</div>
    <SearchBar {...props} />
    <SearchList {...props} />
  </div>
);
