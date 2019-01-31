"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var react_1 = require("react");
function useObservable(inputFactory, initialState, inputs) {
    var _a = react_1.useState(typeof initialState !== "undefined" ? initialState : null), state = _a[0], setState = _a[1];
    var _b = react_1.useMemo(function () {
        var stateSubject$ = new rxjs_1.BehaviorSubject(initialState);
        var inputSubject$ = new rxjs_1.BehaviorSubject(inputs);
        return {
            state$: stateSubject$,
            inputs$: inputSubject$
        };
    }, []), state$ = _b.state$, inputs$ = _b.inputs$;
    react_1.useMemo(function () {
        inputs$.next(inputs);
    }, inputs || []);
    react_1.useEffect(function () {
        var output$;
        if (inputs) {
            output$ = inputFactory(inputs$, state$);
        }
        else {
            output$ = inputFactory(state$);
        }
        var subscription = output$.subscribe(function (value) {
            state$.next(value);
            setState(value);
        });
        return function () {
            subscription.unsubscribe();
            inputs$.complete();
            state$.complete();
        };
    }, []); // immutable forever
    return state;
}
exports.useObservable = useObservable;
