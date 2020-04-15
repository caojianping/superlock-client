import TYPES from '@/store/types';
import { IActionContext, IRiskState } from '@/store/interfaces';
import { FreeTrialType } from '@/ts/config';
import { Prompt } from '@/ts/common';
import { FreeTrialModel } from '@/ts/models';
import { RiskService } from '@/ts/services';

const riskState: IRiskState = {
    type: FreeTrialType.Withdraw,
    freeTrial: new FreeTrialModel()
};

const riskService = new RiskService();

export default {
    namespaced: true,
    state: riskState,
    mutations: {
        [TYPES.SET_STATES](state: IRiskState, payload: any) {
            for (let key in payload) {
                let value = payload[key];
                state[key] = value;
            }
        },
        [TYPES.CLEAR_STATES](state: IRiskState) {
            state.type = FreeTrialType.Withdraw;
            state.freeTrial = new FreeTrialModel();
        }
    },
    actions: {
        // 获取小额免审信息
        async fetchFreeTrial(context: IActionContext<IRiskState>): Promise<void> {
            const commit = context.commit;
            try {
                let freeTrial = await riskService.fetchFreeTrial();
                commit(TYPES.SET_STATES, { freeTrial });
            } catch (error) {
                Prompt.error('小额免审信息获取失败');
            }
        },

        // 设置小额免审信息
        async setFreeTrial(context: IActionContext<IRiskState>, isCode: boolean = false): Promise<boolean> {
            let { type, freeTrial } = context.state,
                value = [freeTrial.withdrawLimit, freeTrial.everyrewardLimit, freeTrial.promotionrewardLimit, freeTrial.lockAmount][type - 1];
            return await riskService.setFreeTrial(type, value, isCode, freeTrial.code);
        }
    }
};
