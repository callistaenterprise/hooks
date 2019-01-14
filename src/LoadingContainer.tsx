import React from "react";
// @ts-ignore
import MaterialIcon from "material-icons-react";
// @ts-ignore
import MDSpinner from "react-md-spinner";
import { ISearchHandlers } from "./reducer";
import { userSearchContext } from "./search-hooks";

interface ILoadingProps {
  loading: boolean;
  handleResetSearchText: ISearchHandlers["handleResetSearchText"];
}
export const Loading: React.FC<ILoadingProps> = ({
  loading,
  handleResetSearchText
}) =>
  loading ? (
    <span data-testid="loading-icon" className={"SearchIndicator"}>
      <MDSpinner singleColor={"grey"} size={18} />
    </span>
  ) : (
    <span
      data-testid="reset-icon"
      onClick={handleResetSearchText}
      className={"SearchClear"}
    >
      <MaterialIcon icon={"clear"} />
    </span>
  );

export const LoadingContainer = () => {
  const {
    actions,
    state: { loading }
  } = userSearchContext();
  return (
    <Loading
      loading={loading}
      handleResetSearchText={actions.handleResetSearchText}
    />
  );
};
