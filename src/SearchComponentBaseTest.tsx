import React from "react";
import { render, cleanup, fireEvent, wait } from "react-testing-library";
import "jest-dom/extend-expect";
import { ISearchProps } from "./reducer";

jest.mock("./api", () => ({
  search: jest.fn(searchText =>
    Promise.resolve(searchText ? [{ id: "1", name: "testuser" }] : [])
  )
}));
let SearchComponent: React.FC<ISearchProps>;
let testName: string = "SearchComponent";
export const setSearchComponent = (
  _testName: string,
  _SearchComponent: React.FC<ISearchProps>
) => {
  testName = `${testName}${_testName}`;
  SearchComponent = _SearchComponent;
};

describe(testName, () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  describe("rendering", () => {
    it("render", () => {
      const { getByTestId } = render(<SearchComponent />);
      expect(getByTestId("search-container")).not.toBeUndefined();
    });
  });
  describe("Search bar", () => {
    it("it exists", () => {
      const { getByTestId } = render(<SearchComponent />);
      expect(getByTestId("search-bar")).not.toBeUndefined();
    });
    describe("Search bar input", () => {
      it("it exists", () => {
        const { getByTestId } = render(<SearchComponent />);
        expect(getByTestId("search-bar-input")).not.toBeUndefined();
      });
      it("placeholder", () => {
        const { getByTestId } = render(<SearchComponent />);
        expect(getByTestId("search-bar-input")).toHaveAttribute(
          "placeholder",
          "Search"
        );
      });
      it("change text", async () => {
        const { getByTestId } = render(<SearchComponent />);
        const searchBarInput = getByTestId(
          "search-bar-input"
        ) as HTMLInputElement;
        console.log("##################### fire event");
        fireEvent.change(searchBarInput, { target: { value: "testuser" } });
        expect(searchBarInput.value).toEqual("testuser");
        await wait(() =>
          expect(getByTestId("item-1")).toHaveTextContent("testuser")
        );
      });
    });
    describe("Loading", () => {
      it("it shows when loading", () => {
        const { getByTestId } = render(<SearchComponent loading={true} />);
        expect(getByTestId("loading-icon")).not.toBeUndefined();
      });
      it("it hides when loading is false", () => {
        const { queryByTestId } = render(<SearchComponent loading={false} />);
        expect(queryByTestId("loading-icon")).toBeNull();
      });
    });
    describe("Reset", () => {
      it("shows when not loading", () => {
        const { getByTestId } = render(<SearchComponent loading={false} />);
        expect(getByTestId("reset-icon")).not.toBeUndefined();
      });
      it("it hides when loading is true", () => {
        const { queryByTestId } = render(<SearchComponent loading={true} />);
        expect(queryByTestId("reset-icon")).toBeNull();
      });
      it("reset text", async () => {
        const { getByTestId, queryByTestId } = render(<SearchComponent />);
        const searchBarInput = getByTestId(
          "search-bar-input"
        ) as HTMLInputElement;
        fireEvent.change(searchBarInput, { target: { value: "testuser" } });
        expect(searchBarInput.value).toEqual("testuser");
        const resetSearchText = getByTestId("reset-icon") as HTMLInputElement;
        fireEvent.click(resetSearchText);
        expect(searchBarInput.value).toEqual("");
        await wait(() => expect(queryByTestId("item-1")).toBeNull());
      });
    });
  });
  describe("Search list", () => {
    it("it exists", () => {
      const { getByTestId } = render(<SearchComponent />);
      expect(getByTestId("search-list")).not.toBeUndefined();
    });
  });
});
