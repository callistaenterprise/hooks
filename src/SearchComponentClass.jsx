import React from "react";
import * as api from "./api";
import SearchComponent from "./SearchComponent";

class SearchComponentClass extends React.Component {
  // --- state
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      list: [],
      loading: !!props.loading,
      error: undefined
    };
  }
  state = {searchText:"", loading: false}

  // --- behaviour
  handleUpdateSearchText = event => {
    this.setState({ searchText: event.target.value });
  };
  handleResetSearchText = () => {
    this.setState({ searchText: "" });
  };

  // --- lifecycle, side effects
  componentDidMount() {
    this.setState({ loading: true });
    api
      .search(this.state.searchText)
      .then(list => this.setState({ list, loading: false }));
  }
  componentDidUpdate(prevProps, prevState) {
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
