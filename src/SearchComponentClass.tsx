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
  loading: boolean;
  error?: string;
}

class SearchComponentClass extends React.Component<IProps, IState> {
  // --- state
  constructor(props: IProps) {
    super(props);
    this.state = {
      searchText: "",
      list: [],
      loading: !!props.loading,
      error: undefined
    };
  }

  // --- behaviour
  handleUpdateSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };
  handleResetSearchText = () => {
    this.setState({ searchText: "" });
  };

  // --- lifecycle, side effects
  componentDidMount(): void {
    this.setState({ loading: true });
    api
      .search(this.state.searchText)
      .then(list => this.setState({ list, loading: false }));
  }
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>
  ): void {
    if (prevState.searchText !== this.state.searchText) {
      this.props.loading !== undefined && this.setState({ loading: true });
      api
        .search(this.state.searchText)
        .then(list => this.setState({ list, loading: false }));
    }
  }

  render() {
    const { searchText, list, loading } = this.state;
    return (
      <SearchComponent
        title={"Phil's-osophies Component"}
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
