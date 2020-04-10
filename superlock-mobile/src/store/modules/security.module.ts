import TYPES from '@/store/types';
import { IActionContext, ISecurityState } from '@/store/interfaces';
import { SecurityFormModel } from '@/ts/models';
import { SecurityService } from '@/ts/services';

const assetState: ISecurityState = {
    securityForm: new SecurityFormModel()
};

const securityService = new SecurityService();

export default {
    namespaced: true,
    state: assetState,
    mutations: {
        [TYPES.SET_STATES](state: ISecurityState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: ISecurityState) {
            state.securityForm = new SecurityFormModel();
        }
    },
    actions: {
        // 修改登录密码
        async modifyLoginPassword(context: IActionContext<ISecurityState>): Promise<boolean> {
            let state = context.state;
            return await securityService.modifyLoginPassword(state.securityForm);
        },

        // 设置资金密码
        async setFundPassword(context: IActionContext<ISecurityState>): Promise<boolean> {
            let state = context.state;
            return await securityService.setFundPassword(state.securityForm);
        },

        // 修改资金密码
        async modifyFundPassword(context: IActionContext<ISecurityState>): Promise<boolean> {
            let state = context.state;
            return await securityService.modifyFundPassword(state.securityForm);
        }
    }
};
