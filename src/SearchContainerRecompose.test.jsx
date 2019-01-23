import React from "react";
import SearchComponent from "./SearchContainerRecompose";
import { render, cleanup, fireEvent, wait } from "react-testing-library";
import "jest-dom/extend-expect";

jest.mock("./api", () => ({
  search: jest.fn(searchText =>
    Promise.resolve(searchText ? [{ id: "1", name: "testuser" }] : [])
  )
}));
describe.skip("<SearchComponent Recompose>", () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);
  describe("rendering", () => {
    it("render", () => {
      const { getByText, getByTestId } = render(<SearchComponent />);
      expect(getByTestId("search-container")).not.toBeUndefined();
      expect(getByText("Search Container")).not.toBeUndefined();
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
        const searchBarInput = getByTestId("search-bar-input");
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
        const searchBarInput = getByTestId("search-bar-input");
        fireEvent.change(searchBarInput, { target: { value: "testuser" } });
        expect(searchBarInput.value).toEqual("testuser");
        const resetSearchText = getByTestId("reset-icon");
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
