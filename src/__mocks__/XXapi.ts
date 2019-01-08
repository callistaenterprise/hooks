import list from "../list-mock";

export const search = (searchText: string) =>
  list.filter(({ name }) =>
    Promise.resolve(name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
  );
