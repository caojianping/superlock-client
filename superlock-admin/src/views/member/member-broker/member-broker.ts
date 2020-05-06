import Vue from 'vue';
import { namespace, State, Action } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';

import TYPES from '@/store/types';
import Utils from '@/ts/utils';
import { Prompt } from '@/ts/common';
import { IPageParameters, IBrokerPageParameters, ISelectOption } from '@/ts/interfaces';
import { BrokerModel } from '@/ts/models';

import BrokerModal from '@/components/member/broker-modal';
import QuotaModal from '@/components/member/quota-modal';
import RateModal from '@/components/member/rate-modal';
import MigrationModal from '@/components/member/migration-modal';

const memberModule = namespace('member');

@Component({
    name: 'MemberBroker',
    components: { BrokerModal, QuotaModal, RateModal, MigrationModal }
})
export default class MemberBroker extends Vue {
    @State('isPageLoading') isPageLoading!: boolean;
    @State('pageSizeOptions') pageSizeOptions!: Array<string>;
    @State('carrierOptions') carrierOptions!: Array<ISelectOption>;
    @Action('fetchCarrierOptions') fetchCarrierOptions!: () => any;

    @memberModule.State('brokerParameters') brokerParameters!: IPageParameters<IBrokerPageParameters>;
    @memberModule.State('totalCount') totalCount!: number;
    @memberModule.State('list') list!: Array<BrokerModel>;
    @memberModule.Mutation(TYPES.SET_STATES) setStates!: (payload: any) => any;
    @memberModule.Mutation(TYPES.CLEAR_STATES) clearStates!: () => any;
    @memberModule.Action('fetchBrokers') fetchBrokers!: () => any;
    @memberModule.Action('exportBrokers') exportBrokers!: () => any;

    type: number = 0;
    isBrokerShow: boolean = false;
    isRateShow: boolean = false;
    isQuotaShow: boolean = false;
    isMigrationShow: boolean = false;
    broker: BrokerModel = new BrokerModel();

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

    // 打开模态框
    openModal(key: string, broker?: BrokerModel) {
        this[key] = true;
        if (broker) {
            this.broker = broker;
        }
    }

    // 处理模态框submit事件
    handleModalSubmit() {
        this.fetchBrokers();
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
