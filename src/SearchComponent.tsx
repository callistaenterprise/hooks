import React, { ChangeEvent } from "react";
import * as api from "./api";
import { IItem } from "./list-mock";

interface IProps {
  loading?: boolean;
}

interface IState {
  searchText: string;
  list: IItem[];
}

class SearchComponent extends React.Component<IProps, IState> {
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
    const { loading } = this.props;
    const { searchText, list } = this.state;

    return (
      <div data-testid="search-container">
        <div data-testid="search-bar">
          <input
            data-testid="search-bar-input"
            placeholder={"Search"}
            value={searchText}
            onChange={this.handleUpdateSearchText}
          />
          {loading ? (
            <div data-testid="loading-icon">loading</div>
          ) : (
            <div data-testid="reset-icon" onClick={this.handleResetSearchText}>
              reset
            </div>
          )}
        </div>
        <div data-testid="search-list">
          search list
          <ul data-testid="search-list-ul">
            {list &&
              list.map((item: IItem) => (
                <li key={`item-key-${item.id}`} data-testid={`item-${item.id}`}>
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        Search Container
      </div>
    );
  }
}

export default SearchComponent;
