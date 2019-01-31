import React, { useEffect, useState } from "react";
import { useObservable } from "./rxjs-hooks";
import posed from "react-pose";
import { map,delay, debounceTime, tap } from "rxjs/operators";

const Flash = posed.div({
  change: { background: "rgba(253, 189, 78, 1)" },
  finished: { background: "rgba(255, 255, 255, 0)" }
});

const useLoadingFlash = loading => {
  const [loadingFlashState, setLoadingFlashState] = useState("finished");
  const [timeoutState, setTimeoutState] = useState(-1);
  useEffect(
    () => {
      if (timeoutState > -1) clearTimeout(timeoutState);
      setLoadingFlashState("change");
      const to = setTimeout(() => setLoadingFlashState("finished"), 500);
      // @ts-ignore
      setTimeoutState(to);
    },
    [loading]
  );
  return loadingFlashState;
};
const useLoadingFlashObservable = loading => {
  const [loadingFlashState, setLoadingFlashState] = useState("finished");
  useObservable(
    input$ =>
      input$.pipe(
        tap(() => setLoadingFlashState("change")),
        debounceTime(500),
        tap(() => setLoadingFlashState("finished")),
      ),
    "finished",
    [loading] // creates a stream from the changing property
  );
  return loadingFlashState;
};
const PropFlash = ({ prop, children }) => {
  const flashState = useLoadingFlashObservable(prop);
  return (
    <Flash
      pose={flashState}
      style={{
        flex: "0.18 1 0%",
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        borderRadius: "5px"
      }}
    >
      {children}
    </Flash>
  );
};
export default PropFlash;
