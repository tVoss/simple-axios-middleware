import { Action, Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';

export interface AxiosAction extends Action {
    axios: AxiosRequestConfig
}

export interface AxiosSentAction extends Action {
    axios: Promise<void>
}

export interface AxiosCompleteAction<T> extends Action {
    res: AxiosResponse<T>
}

export interface AxiosFailedAction extends Action {
    err: AxiosError
}

export interface AxiosActionSuffixes {
    Sent: string
    Complete: string
    Failed: string
}

export const DefaultAxiosSuffixes: AxiosActionSuffixes = {
    Sent: '_SENT',
    Complete: '_COMPLETE',
    Failed: '_FAILED'
}

export const axiosMiddleware = (
    axiosInstance: AxiosInstance = Axios,
    actionSuffixes: AxiosActionSuffixes = DefaultAxiosSuffixes
): Middleware =>
    (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
        if (!action.axios) {
            return next(action);
        }
        
        const request = axiosInstance(action.axios)
            .then(res => {
                api.dispatch({
                    type: action.type + actionSuffixes.Complete,
                    res
                } as AxiosCompleteAction<any>)
            })
            .catch(err => {
                api.dispatch({
                    type: action.type + actionSuffixes.Failed,
                    err
                } as AxiosFailedAction)
            });

        return next({
            type: action.type + actionSuffixes.Sent,
            axios: request
        } as AxiosSentAction)
    }
