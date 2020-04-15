import TYPES from '@/store/types';
import { IActionContext, IGoogleState } from '@/store/interfaces';
import { Token, Prompt } from '@/ts/common';
import { TokenInfo, LoginFormModel } from '@/ts/models';
import { GoogleService } from '@/ts/services';

const googleState: IGoogleState = {
    googlePlayUrl:
        'https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8',
    appStoreUrl:
        'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2',

    qrcode: '',
    gakey: '',
    gacode: '',

    isLoading: false
};

const googleService = new GoogleService();

export default {
    namespaced: true,
    state: googleState,
    getters: {
        isDisabled: (state: IGoogleState) => {
            return (state.gacode || '').length < 6;
        }
    },
    mutations: {
        [TYPES.SET_STATES](state: IGoogleState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IGoogleState) {
            state.qrcode = '';
            state.gakey = '';
            state.gacode = '';
            state.isLoading = false;
        }
    },
    actions: {
        // 获取谷歌认证密钥
        async fetchGoogleKey(
            context: IActionContext<IGoogleState>,
            loginForm: LoginFormModel
        ): Promise<void> {
            const commit = context.commit;
            try {
                let gakey = await googleService.fetchGoogleKey(loginForm);
                commit(TYPES.SET_STATES, {
                    qrcode: `otpauth://totp/fnwI8EGFbOHVttelpoqjKL329ww6H5vT?secret=${gakey}`,
                    gakey: gakey
                });
            } catch (error) {
                commit(TYPES.SET_STATES, {
                    qrcode: '',
                    gakey: ''
                });
                Prompt.error(error.message || error);
            }
        },

        // 绑定谷歌认证
        async bindGoogle(
            context: IActionContext<IGoogleState>,
            loginForm: LoginFormModel
        ): Promise<boolean> {
            const { commit, state } = context;
            try {
                commit(TYPES.SET_STATES, { isLoading: true });
                loginForm.code = state.gacode;
                let token = await googleService.bindGoogle(loginForm);
                if (!token) return Promise.reject('绑定失败');

                commit(TYPES.CLEAR_STATES);
                let tokenInfo = new TokenInfo(token, loginForm.username);
                Token.setTokenInfo(tokenInfo);
                commit(TYPES.SET_STATES, { tokenInfo }, { root: true });
                return true;
            } catch (error) {
                commit(TYPES.SET_STATES, { isLoading: false });
                return Promise.reject(error);
            }
        },

        // 解除谷歌认证
        async unbindGoogle(
            context: IActionContext<IGoogleState>,
            gacode: string
        ): Promise<boolean> {
            return await googleService.unbindGoogle(gacode);
        }
    }
};
