import React, { useEffect, useState } from "react";
import { IListItem, ISearchBar, SearchWrapper } from "./Search";
import _list from "./list-mock";

const _filterList = (searchText: string, list: IListItem[]) =>
  list.filter(
    ({ name }) => name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
  );

interface ISearchTextChange {
  searchText: string;
  setLoading: (loading: boolean) => void;
  setList: (list: IListItem[]) => void;
}

// ----------- the hook
const useSearchTextChange = ({
  searchText,
  setLoading,
  setList
}: ISearchTextChange) =>
  useEffect(
    () => {
      setLoading(true);
      const t = setTimeout(() => {
        setList(_filterList(searchText, _list));
        setLoading(false);
      }, 400);
      return () => {
        clearTimeout(t);
      };
    },
    [searchText]
  );

// ----------- the component
const SearchContainer = () => {
  const [list, setList] = useState<IListItem[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useSearchTextChange({ searchText, setList, setLoading });

  const updateSearchText: ISearchBar["updateSearchText"] = e =>
    setSearchText((e.target as HTMLInputElement).value);

  return (
    <SearchWrapper
      title={"useState"}
      loading={loading}
      searchText={searchText}
      updateSearchText={updateSearchText}
      list={list}
    />
  );
};

export default SearchContainer;

const Donut = ({ sparkles, handleEat }) => (
  <div onClick={handleEat}>
    Sparkles on
    {sparkles.map(sparkle => (
      <div>{sparkle}</div>
    ))}
    Donut!
  </div>
);

const SprinkledDonut = () => {
  const [sparkles, setSparkles] = useState([]);
  useEffect(() => api.fetchSparkles.then(sparkles => setSparkles(sparkles)));
  const eatSparkles = () => setSparkles("");
  return <Donut sprinkles={sprinkles} handleEat={handleEat} />;
};

const SprinkledDonut = compose(
  withFetchSparkles,
  withEat
)(Donut);

class DonutRP extends Component {
  handleEat: () => {};
  componentDidMount() {
    fetchSparkles.then(sparkles => setState({ sparkles }));
  }
  render() {
    const { children, sparkles } = this.props;
    return children({ sparkles, handleEat: this.handleEat });
  }
}

const WrappedDonut = props => (
  <DonutRP>
    {({ sparkles, handleEat }) => (
      <Donut sparkles={sparkles} handleEat={handleEat} />
    )}
  </DonutRP>
);
