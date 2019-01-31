"use strict";
exports.__esModule = true;
var react_1 = require("react");
var rxjs_1 = require("rxjs");
function useEventCallback(callback, initialState, inputs) {
    var initialValue = (typeof initialState !== "undefined"
        ? initialState
        : null);
    var inputSubject$ = new rxjs_1.BehaviorSubject(typeof inputs === "undefined" ? null : inputs);
    var stateSubject$ = new rxjs_1.BehaviorSubject(initialValue);
    var _a = react_1.useState(initialValue), state = _a[0], setState = _a[1];
    var _b = react_1.useState(function () { return rxjs_1.noop; }), returnedCallback = _b[0], setEventCallback = _b[1];
    var state$ = react_1.useState(stateSubject$)[0];
    var inputs$ = react_1.useState(inputSubject$)[0];
    react_1.useMemo(function () {
        inputs$.next(inputs);
    }, inputs || []);
    react_1.useEffect(function () {
        var event$ = new rxjs_1.Subject();
        function eventCallback(e) {
            return event$.next(e);
        }
        setState(initialValue);
        setEventCallback(function () { return eventCallback; });
        var value$;
        if (!inputs) {
            value$ = callback(event$, state$);
        }
        else {
            value$ = callback(event$, inputs$, state$);
        }
        var subscription = value$.subscribe(function (value) {
            state$.next(value);
            setState(value);
        });
        return function () {
            subscription.unsubscribe();
            state$.complete();
            inputs$.complete();
            event$.complete();
        };
    }, []); // immutable forever
    return [returnedCallback, state];
}
exports.useEventCallback = useEventCallback;
