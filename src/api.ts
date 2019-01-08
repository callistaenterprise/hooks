import list, { IItem } from "./list-mock";

export const search = async (searchText = "", timeout = 200) =>
  await new Promise<IItem[]>(resolve => {
    const filteredList = list.filter(
      ({ name }) => name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
    );
    setTimeout(() => resolve(filteredList), timeout);
  });
