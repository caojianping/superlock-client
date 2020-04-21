import TYPES from '@/store/types';
import { IActionContext, ISecurityState } from '@/store/interfaces';
import { SecurityFormModel, EmailFormModel } from '@/ts/models';
import { SecurityService } from '@/ts/services';

const assetState: ISecurityState = {
    securityForm: new SecurityFormModel(),
    emailForm: new EmailFormModel()
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
            state.emailForm = new EmailFormModel();
        }
    },
    actions: {
        // 修改登录密码
        async modifyLoginPassword(context: IActionContext<ISecurityState>): Promise<boolean> {
            return await securityService.modifyLoginPassword(context.state.securityForm);
        },

        // 设置资金密码
        async setFundPassword(context: IActionContext<ISecurityState>): Promise<boolean> {
            return await securityService.setFundPassword(context.state.securityForm);
        },

        // 修改资金密码
        async modifyFundPassword(context: IActionContext<ISecurityState>): Promise<boolean> {
            return await securityService.modifyFundPassword(context.state.securityForm);
        },

        // 绑定邮箱
        async bindEmail(context: IActionContext<ISecurityState>): Promise<boolean> {
            return await securityService.bindEmail(context.state.emailForm);
        }
    }
};
