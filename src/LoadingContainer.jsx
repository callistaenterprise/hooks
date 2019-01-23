import React, { useEffect, useState } from "react";
// @ts-ignore
import MaterialIcon from "material-icons-react";
// @ts-ignore
import MDSpinner from "react-md-spinner";
import { userSearchContext } from "./search-hooks";
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
        <MaterialIcon icon={"clear"} />
      </div>
    )}
  </PropFlash>
);

export const LoadingContainer = () => {
  const {
    actions,
    state: { loading }
  } = userSearchContext();
  console.log("--- flash state", loading);
  return (
    <Loading
      loading={loading}
      handleResetSearchText={actions.handleResetSearchText}
    />
  );
};
