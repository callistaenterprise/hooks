import list from "./list-mock";

export const search = (searchText = "", timeout = 300) =>
  new Promise(resolve => {
    console.log("-----API CALL");
    const filteredList = list.filter(
      ({ name }) => name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
    );
    setTimeout(() => {
      resolve(filteredList);
    }, timeout);
  });
