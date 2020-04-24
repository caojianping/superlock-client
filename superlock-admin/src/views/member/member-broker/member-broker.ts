import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IBrokerPageParameters, ISelectOption } from '@/ts/interfaces';
import { BrokerModel, BrokerFormModel, RateFormModel, QuotaFormModel } from '@/ts/models';

import SecondVerify from '@/components/common/second-verify';
import BrokerModal from '@/components/member/broker-modal';
import QuotaModal from '@/components/member/quota-modal';
import RateModal from '@/components/member/rate-modal';

const memberModule = namespace('member');

const enum SecondVerifyType {
    Broker = 1,
    Rate = 2,
    Quota = 3
}

@Component({
    name: 'MemberBroker',
    components: { SecondVerify, BrokerModal, QuotaModal, RateModal }
})
export default class MemberBroker extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('isSecondVerifyShow') isSecondVerifyShow!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('carrierOptions') carrierOptions!: Array<ISelectOption>;
    @Action('fetchCarrierOptions') fetchCarrierOptions!: () => any;

    @memberModule.State('brokerParameters') brokerParameters!: IPageParameters<IBrokerPageParameters>;
    @memberModule.State('totalCount') totalCount!: number;
    @memberModule.State('list') list!: Array<BrokerModel>;
    @memberModule.State('projectOptions') projectOptions!: Array<any>;
    @memberModule.State('brokerForm') brokerForm!: BrokerFormModel;
    @memberModule.State('rateForm') rateForm!: RateFormModel;
    @memberModule.State('quotaForm') quotaForm!: QuotaFormModel;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('fetchBrokers') fetchBrokers!: () => any;
    @memberModule.Action('exportBrokers') exportBrokers!: () => any;
    @memberModule.Action('fetchProjectTypes') fetchProjectTypes!: () => any;
    @memberModule.Action('addBroker') addBroker!: (isCode: boolean) => any;
    @memberModule.Action('setRate') setRate!: (isCode: boolean) => any;
    @memberModule.Action('addQuota') addQuota!: (isCode: boolean) => any;

    type: number = 0;
    isBrokerShow: boolean = false;
    isRateShow: boolean = false;
    isQuotaShow: boolean = false;
    currentBroker: BrokerModel = new BrokerModel();
    currentType: SecondVerifyType = SecondVerifyType.Broker; // 当前二次验证类型

    columns: Array<any> = [];

    // 运营商过滤选项
    carrierFilterOption(input: string, option: any) {
        let text = option.componentOptions.children[0].text.toLowerCase(),
            tinput = input.toLowerCase();
        return text.indexOf(tinput) > -1;
    }

    // 处理表单change事件
    handleFormChange(key: string, value: string) {
        let brokerParameters = Utils.duplicate(this.brokerParameters);
        brokerParameters.conditions[key] = value;
        this.setStates({ brokerParameters });
    }

    // 搜索
    async search() {
        try {
            let brokerParameters = Utils.duplicate(this.brokerParameters);
            brokerParameters.pageNum = 1;
            this.setStates({ brokerParameters });
            await this.fetchBrokers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 导出报表
    async exportReport() {
        try {
            let url = await this.exportBrokers();
            if (!url) Prompt.error('导出失败');
            else window.location.href = url;
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 打开券商模态框
    openBrokerModal() {
        this.isBrokerShow = true;
        this.currentType = SecondVerifyType.Broker;
    }

    // 打开利率模态框
    openRateModal(broker: BrokerModel) {
        this.isRateShow = true;
        this.currentBroker = broker;
        this.currentType = SecondVerifyType.Rate;
    }

    // 打开额度模态框
    openQuotaModal(broker: BrokerModel) {
        this.isQuotaShow = true;
        this.currentBroker = broker;
        this.currentType = SecondVerifyType.Quota;
    }

    // 私有函数：提交券商信息
    async _submitBroker(brokerForm: BrokerFormModel, isCode: boolean) {
        try {
            this.setStates({ brokerForm });
            let result = await this.addBroker(isCode);
            if (!result) Prompt.error('券商添加失败');
            else await this.fetchBrokers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理券商模态框submit事件
    async handleBrokerSubmit(brokerForm: BrokerFormModel) {
        await this._submitBroker(brokerForm, false);
    }

    // 私有函数：提交利率信息
    async _submitRate(rateForm: RateFormModel, isCode: boolean) {
        try {
            this.setStates({ rateForm });
            let result = await this.setRate(isCode);
            if (!result) Prompt.error('利率设置失败');
            else await this.fetchBrokers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理利率商模态框submit事件
    async handleRateSubmit(rateForm: RateFormModel) {
        await this._submitRate(rateForm, false);
    }

    // 私有函数：提交额度信息
    async _submitQuota(quotaForm: QuotaFormModel, isCode: boolean) {
        try {
            this.setStates({ quotaForm });
            let result = await this.addQuota(isCode);
            if (!result) Prompt.error('额度添加失败');
            else await this.fetchBrokers();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    // 处理额度商模态框submit事件
    async handleQuotaSubmit(quotaForm: QuotaFormModel) {
        await this._submitQuota(quotaForm, false);
    }

    // 处理二次验证submit事件
    async handleSecondVerifySubmit() {
        let type = this.currentType;
        if (type === SecondVerifyType.Broker) {
            await this._submitBroker(this.brokerForm, true);
        } else if (type === SecondVerifyType.Rate) {
            await this._submitRate(this.rateForm, true);
        } else if (type === SecondVerifyType.Quota) {
            await this._submitQuota(this.quotaForm, true);
        }
    }

    // 处理页码change事件
    handlePageNumChange(page: number, pageSize: number) {
        let brokerParameters = Utils.duplicate(this.brokerParameters);
        brokerParameters.pageNum = page;
        brokerParameters.pageSize = pageSize;
        this.setStates({ brokerParameters });
        this.fetchBrokers();
    }

    // 处理页尺寸change事件
    handlePageSizeChange(current: number, pageSize: number) {
        let brokerParameters = Utils.duplicate(this.brokerParameters);
        brokerParameters.pageNum = 1;
        brokerParameters.pageSize = pageSize;
        this.setStates({ brokerParameters });
        this.fetchBrokers();
    }

    // 初始化数据
    initData(params: any) {
        let type = isNaN(Number(params.type)) ? 0 : Number(params.type);
        this.type = type;
        this.setStates({
            brokerParameters: {
                conditions: {
                    type: String(type),
                    uid: '',
                    parent: '',
                    mobileNumber: '',
                    email: '',
                    carrierName: ''
                },
                pageNum: 1,
                pageSize: 10
            }
        });
        this.columns =
            type === 0
                ? [
                      {
                          title: 'UID',
                          dataIndex: 'uid'
                      },
                      {
                          title: '手机号',
                          dataIndex: 'mobile'
                      },
                      {
                          title: '邮箱',
                          dataIndex: 'email'
                      },
                      {
                          title: '用户来源',
                          dataIndex: 'userSource'
                      },
                      {
                          title: '账户资产(BCB)',
                          dataIndex: '',
                          key: 'amount',
                          scopedSlots: { customRender: 'amount' }
                      },
                      {
                          title: '总额度(DC)',
                          dataIndex: '',
                          key: 'totalDegree',
                          scopedSlots: { customRender: 'totalDegree' }
                      },
                      {
                          title: '剩余额度(DC)',
                          dataIndex: '',
                          key: 'remainingCredit',
                          scopedSlots: { customRender: 'remainingCredit' }
                      },
                      {
                          title: '个人锁仓总量(BCB)',
                          dataIndex: '',
                          key: 'totalLockReward',
                          scopedSlots: { customRender: 'totalLockReward' }
                      },
                      {
                          title: '个人锁仓收益(BCB)',
                          dataIndex: '',
                          key: 'lockReward',
                          scopedSlots: { customRender: 'lockReward' }
                      },
                      {
                          title: '解锁奖励收益(BCB)',
                          dataIndex: '',
                          key: 'subRewardValue',
                          scopedSlots: { customRender: 'subRewardValue' }
                      },
                      {
                          title: '创建时间',
                          dataIndex: '',
                          key: 'createTime',
                          scopedSlots: { customRender: 'createTime' }
                      },
                      {
                          title: '下级',
                          dataIndex: '',
                          key: 'child',
                          scopedSlots: { customRender: 'child' }
                      },
                      {
                          title: '操作',
                          dataIndex: '',
                          key: 'operation',
                          scopedSlots: { customRender: 'operation' }
                      }
                  ]
                : [
                      {
                          title: 'UID',
                          dataIndex: 'uid'
                      },
                      {
                          title: '手机号',
                          dataIndex: 'mobile'
                      },
                      {
                          title: '邮箱',
                          dataIndex: 'email'
                      },
                      {
                          title: '用户来源',
                          dataIndex: 'userSource'
                      },
                      {
                          title: '上级UID',
                          dataIndex: 'parent'
                      },
                      {
                          title: '账户资产(BCB)',
                          dataIndex: '',
                          key: 'amount',
                          scopedSlots: { customRender: 'amount' }
                      },
                      {
                          title: '个人锁仓总量(BCB)',
                          dataIndex: '',
                          key: 'totalLockReward',
                          scopedSlots: { customRender: 'totalLockReward' }
                      },
                      {
                          title: '个人锁仓收益(BCB)',
                          dataIndex: '',
                          key: 'lockReward',
                          scopedSlots: { customRender: 'lockReward' }
                      },
                      {
                          title: '解锁奖励收益(BCB)',
                          dataIndex: '',
                          key: 'subRewardValue',
                          scopedSlots: { customRender: 'subRewardValue' }
                      },
                      {
                          title: '代理下级',
                          dataIndex: '',
                          key: 'child',
                          scopedSlots: { customRender: 'child' }
                      },
                      {
                          title: '激活时间',
                          dataIndex: '',
                          key: 'createTime',
                          scopedSlots: { customRender: 'createTime' },
                          width: '100px'
                      }
                  ];
    }

    // 获取数据
    async fetchData() {
        try {
            await this.fetchCarrierOptions();
            await this.fetchBrokers();
            await this.fetchProjectTypes();
        } catch (error) {
            Prompt.error(error.message || error);
        }
    }

    created() {
        this.clearStates();
        this.initData(this.$route.params);
    }

    mounted() {
        Utils.jumpTop();
        this.fetchData();
    }

    @Watch('$route')
    watchRoute(route: any) {
        this.clearStates();
        this.initData(route.params);
        this.fetchData();
    }
}
