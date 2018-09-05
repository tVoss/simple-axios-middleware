var axios_1 = require('axios');
exports.DefaultAxiosSuffixes = {
    Sent: '_SENT',
    Complete: '_COMPLETE',
    Failed: '_FAILED'
};
exports.axiosMiddleware = function (axiosInstance, actionSuffixes) {
    if (axiosInstance === void 0) { axiosInstance = axios_1.default; }
    if (actionSuffixes === void 0) { actionSuffixes = exports.DefaultAxiosSuffixes; }
    return function (api) { return function (next) { return function (action) {
        if (!action.axios) {
            return next(action);
        }
        var request = axiosInstance(action.axios)
            .then(function (res) {
            api.dispatch({
                type: action.type + actionSuffixes.Complete,
                res: res
            }, as, AxiosCompleteAction());
        })
            .catch(function (err) {
            api.dispatch({
                type: action.type + actionSuffixes.Failed,
                err: err
            }, as, AxiosFailedAction);
        });
        return next({
            type: action.type + actionSuffixes.Sent,
            axios: request
        }, as, AxiosSentAction);
    }; }; };
};
