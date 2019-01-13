import React, { ChangeEvent } from "react";
import * as api from "./api";
import SearchComponent from "./SearchComponent";
import { IItem } from "./list-mock";

interface IProps {
  loading?: boolean;
}

interface IState {
  searchText: string;
  list: IItem[];
}

class SearchComponentClass extends React.Component<IProps, IState> {
  state = {
    searchText: "",
    list: []
  };
  handleUpdateSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };
  handleResetSearchText = () => {
    this.setState({ searchText: "" });
  };
  componentDidMount(): void {
    api.search(this.state.searchText).then(list => this.setState({ list }));
  }
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    if (prevState.searchText !== this.state.searchText) {
      api.search(this.state.searchText).then(list => this.setState({ list }));
    }
  }

  render() {
    const { loading = false } = this.props;
    const { searchText, list } = this.state;

    return (
      <SearchComponent
        title={"Search Class"}
        loading={loading}
        searchText={searchText}
        list={list}
        handleUpdateSearchText={this.handleUpdateSearchText}
        handleResetSearchText={this.handleResetSearchText}
      />
    );
  }
}

export default SearchComponentClass;
