import Qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import { Toast } from 'vant';

import Router from '@/router';
import store from '@/store';
import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { CaxiosType, CONSTANTS, ResponseCode } from '@/ts/config';
import { ResponseResult, BusinessError, TokenInfo } from '@/ts/models';
import { Prompt } from './prompt';
import { Token } from './token';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

const isIE9 = Utils.isIE9();

window['cancelAxios'] = null;

export class Caxios {
    // 通用选项
    private static commonOptions: any = {
        responseType: 'json',
        timeout: CONSTANTS.TIMEOUT
    };

    // 设置headers
    private static setHeaders(type: CaxiosType = CaxiosType.Default, options: any = {}) {
        if (!options['headers']) {
            options['headers'] = {};
        }

        if (type === CaxiosType.Token || type === CaxiosType.LoadingToken) {
            let tokenInfo: TokenInfo = Token.getTokenInfo();
            options['headers'][CONSTANTS.TOKEN_HEADER] = tokenInfo.token;
        }

        if (options['method'] === 'POST') {
            // 设置默认请求头内容类型
            if (!options['headers']['Content-Type']) {
                options['headers']['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            }

            // 转换请求数据
            let data = options['data'];
            if (options['headers']['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1 && !Utils.isNullOrUndefined(data)) {
                options['data'] = Qs.stringify(data);
            }
        }

        return options;
    }

    // 设置loading
    private static setLoading(type: CaxiosType, isShow: boolean): void {
        if (type === CaxiosType.Loading || type === CaxiosType.LoadingToken) {
            isShow ? Toast.loading({ mask: true, duration: 0, message: i18n.tc('COMMON.LOADING') }) : Toast.clear();
        }
    }

    // axios调用
    public static async invoke<T>(options: AxiosRequestConfig, type: CaxiosType = CaxiosType.Default): Promise<T> {
        if (!options) return Promise.reject(i18n.tc('VALIDATES.AXIOS_REQUEST_PARAMETER_NOT_NULL'));

        options = Caxios.setHeaders(type, options);

        let method = options.method || 'GET',
            instance = axios.create(Caxios.commonOptions);
        // 请求拦截器
        instance.interceptors.request.use(
            request => {
                Caxios.setLoading(type, true);
                if (isIE9 && method === 'POST') {
                    request.data = JSON.stringify(request.data);
                }
                return request;
            },
            err => {
                Caxios.setLoading(type, false);
                return Promise.reject(err);
            }
        );

        // 响应拦截器
        instance.interceptors.response.use(
            response => {
                Caxios.setLoading(type, false);
                return response;
            },
            err => {
                let result = err;
                // 取消处理
                if (err instanceof axios.Cancel) {
                    result = ''; // 返回空时，Prompt不提示
                }
                // 网络异常处理
                const errMsg = err.message || '';
                if (errMsg.indexOf('Network Error') > -1) {
                    result = i18n.tc('COMMON.SYSTEM_BUSY_RETRY_LATER');
                } else if (errMsg.indexOf('timeout of') > -1) {
                    result = i18n.tc('COMMON.SYSTEM_BUSY_RETRY_LATER');
                }
                Caxios.setLoading(type, false);
                return Promise.reject(result);
            }
        );

        options.cancelToken = new axios.CancelToken(cancel => {
            window['cancelAxios'] = cancel;
        });

        // axios调用、处理响应数据
        let response = await instance.request(options);

        // 兼容IE9
        if (isIE9) {
            let request = response.request;
            if (request && request.responseType === 'json' && request.responseText) {
                response.data = JSON.parse(request.responseText);
            }
        }

        let resp = response.data;
        if (!resp) throw new BusinessError(9999, i18n.tc('CODES.9999'));

        let result = new ResponseResult<T>(Number(resp.code), resp.data, resp.message);
        if (!result) throw new BusinessError(9999, i18n.tc('CODES.9999'));

        let code: number = result.code,
            data: any = result.data,
            message: string = result.message;
        if (code === 0) {
            return data as T;
        } else if (code === ResponseCode.TokenExpired) {
            Token.removeTokenInfo();
            store.commit(TYPES.CLEAR_STATES);

            // 登录页面，Router.push会报NavigatorDuplicated异常，提示在UI层处理
            let hash = window.location.hash;
            if (hash.indexOf('/user/login') < 0) {
                Prompt.error(message);
                Router.push({ path: '/user/login' });
                return Promise.reject('');
            } else {
                throw new BusinessError(code, message);
            }
        } else {
            // 其他异常
            throw new BusinessError(code, message);
        }
    }

    // GET方法请求
    public static async get<T>(options: AxiosRequestConfig, type: CaxiosType = CaxiosType.Default): Promise<T> {
        if (!options) return Promise.reject(i18n.tc('VALIDATES.AXIOS_REQUEST_PARAMETER_NOT_NULL'));

        options['method'] = 'GET';
        return await Caxios.invoke<T>(options, type);
    }

    // POST方法请求
    public static async post<T>(options: AxiosRequestConfig, type: CaxiosType = CaxiosType.Default): Promise<T> {
        if (!options) return Promise.reject(i18n.tc('VALIDATES.AXIOS_REQUEST_PARAMETER_NOT_NULL'));

        options['method'] = 'POST';
        return await Caxios.invoke<T>(options, type);
    }
}
