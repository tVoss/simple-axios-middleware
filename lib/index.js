"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
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
            });
        })
            .catch(function (err) {
            api.dispatch({
                type: action.type + actionSuffixes.Failed,
                err: err
            });
        });
        return next({
            type: action.type + actionSuffixes.Sent,
            axios: request
        });
    }; }; };
};
