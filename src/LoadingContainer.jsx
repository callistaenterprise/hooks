import React, { useEffect, useState } from "react";
// @ts-ignore
import MaterialIcon from "material-icons-react";
// @ts-ignore
import MDSpinner from "react-md-spinner";
import { useSearchContext } from "./search-hooks";
import PropFlash from "./PropFlash";

export const Loading = ({ loading, handleResetSearchText }) => (
  <PropFlash prop={loading}>
    {loading ? (
      <div data-testid="loading-icon" className={"SearchIndicator"}>
        <MDSpinner singleColor={"grey"} size={18} />
      </div>
    ) : (
      <div
        data-testid="reset-icon"
        onClick={handleResetSearchText}
        className={"SearchClear"}
      >
        <MaterialIcon color={"#ffffff"} icon={"clear"} />
      </div>
    )}
  </PropFlash>
);

export const LoadingContainer = () => {
  const {
    actions,
    state: { loading }
  } = useSearchContext();
  console.log("--- flash state", loading);
  return (
    <Loading
      loading={loading}
      handleResetSearchText={actions.handleResetSearchText}
    />
  );
};
