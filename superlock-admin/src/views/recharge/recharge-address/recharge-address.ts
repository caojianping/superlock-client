import Vue from 'vue';
import { namespace, State } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { ISelectOption, IPageParameters, IRechargeAddressPageParameters } from '@/ts/interfaces';
import { RechargeAddressModel } from '@/ts/models';

const rechargeModule = namespace('recharge');

@Component({
    name: 'RechargeAddress',
    components: {}
})
export default class RechargeAddress extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('coinOptions') coinOptions!: Array<ISelectOption>;

    @rechargeModule.State('addressParameters') addressParameters!: IPageParameters<IRechargeAddressPageParameters>;
    @rechargeModule.State('totalCount') totalCount!: number;
    @rechargeModule.State('list') list!: Array<RechargeAddressModel>;
    @rechargeModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @rechargeModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @rechargeModule.Action('fetchRechargeAddresses') fetchRechargeAddresses!: () => any;
    @rechargeModule.Action('exportRechargeAddresses') exportRechargeAddresses!: () => any;

    columns: Array<any> = [
        {
            title: 'UID',
            dataIndex: 'uid'
        },
        {
            title: '手机号',
            dataIndex: 'mobile'
        },
        {
            title: '充值币种名称',
            dataIndex: 'coinCode'
        },
        {
            title: '充值币种地址',
            dataIndex: 'address'
        }
    ];

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let addressParameters = Utils.duplicate(this.addressParameters);
        addressParameters.conditions[key] = value;
        this.setStates({ addressParameters });
    }

    // 搜索
    async search() {
        try {
            let addressParameters = Utils.duplicate(this.addressParameters);
            addressParameters.pageNum = 1;
            this.setStates({ addressParameters });
            await this.fetchRechargeAddresses();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportRechargeAddresses();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let addressParameters = Utils.duplicate(this.addressParameters);
        addressParameters.pageNum = page;
        addressParameters.pageSize = pageSize;
        this.setStates({ addressParameters });
        this.fetchRechargeAddresses();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let addressParameters = Utils.duplicate(this.addressParameters);
        addressParameters.pageNum = 1;
        addressParameters.pageSize = pageSize;
        this.setStates({ addressParameters });
        this.fetchRechargeAddresses();
    }

    created() {
        this.clearStates();
    }

    mounted() {
        Utils.jumpTop();
        this.fetchRechargeAddresses();
    }
}
