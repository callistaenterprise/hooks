import React from "react";
import ReactDOM from "react-dom";
import AppXX from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AppXX />, div);
  ReactDOM.unmountComponentAtNode(div);
});
