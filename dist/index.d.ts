import { Action } from 'redux';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
export interface AxiosAction extends Action {
    axios: AxiosRequestConfig;
}
export interface AxiosSentAction extends Action {
    axios: Promise<void>;
}
export interface AxiosCompleteAction<T> extends Action {
    res: AxiosResponse<T>;
}
export interface AxiosFailedAction extends Action {
    err: AxiosError;
}
export interface AxiosActionSuffixes {
    Sent: string;
    Complete: string;
    Failed: string;
}
export declare const DefaultAxiosSuffixes: AxiosActionSuffixes;
export declare const axiosMiddleware: (axiosInstance?: any, actionSuffixes?: AxiosActionSuffixes) => any;
