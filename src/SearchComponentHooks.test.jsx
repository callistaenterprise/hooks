import React from "react";
import { render, cleanup, fireEvent, wait, flushEffects } from "react-testing-library";
import "jest-dom/extend-expect";

import SearchComponentHooks from "./SearchComponentHooks";
import RootStateProvider from "./RootStateProvider";

const SearchComponent = () =><RootStateProvider><SearchComponentHooks/></RootStateProvider>;

jest.mock("./api", () => ({
  search: jest.fn(searchText =>
    Promise.resolve(searchText ? [{ id: "1", name: "testuser" }] : [])
  )
}));
describe("SearchComponent-Refactor", () => {
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
      it("SIDE EFFECT - change text", async () => {
        const { getByTestId } = render(<SearchComponent />);
        flushEffects();
        // flush effects enables our effects to run synchronously
        // normally the effects will run asynchronously or at least after the initial render
        const searchBarInput = getByTestId("search-bar-input");
        console.log("##################### fire event - cause a side effect!");
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
        flushEffects();
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
        flushEffects();
        expect(queryByTestId("reset-icon")).toBeNull();
      });
      it("reset text", async () => {
        const { getByTestId, queryByTestId } = render(<SearchComponent />);
        flushEffects();
        const searchBarInput = getByTestId("search-bar-input");
        fireEvent.change(searchBarInput, { target: { value: "testuser" } });
        expect(searchBarInput.value).toEqual("testuser");
        let resetSearchText;
        await wait(() => {
          resetSearchText = getByTestId("reset-icon");
          fireEvent.click(resetSearchText);
        });
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

