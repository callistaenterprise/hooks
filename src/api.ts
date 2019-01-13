import list, { IItem } from "./list-mock";

export const search = (searchText = "", timeout = 300) =>
  new Promise<IItem[]>(resolve => {
    const filteredList = list.filter(
      ({ name }) => name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
    );
    setTimeout(() => {
      console.log("--- about to resolve", filteredList);
      resolve(filteredList);
    }, timeout);
  });
