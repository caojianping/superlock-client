<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>用户中心</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link :to="`/member/broker${type}`">
                    {{ ['券商列表', '代理列表'][type] }}
                </router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">
                    {{ ['券商列表', '代理列表'][type] }}
                </h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="6">
                        <ant-form-item label="UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="parameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('uid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="6">
                        <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="parameters.conditions.mobileNumber"
                                allowClear
                                placeholder="请输入手机号"
                                @change="handleFormChange('mobileNumber', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="6">
                        <ant-form-item label="用户来源" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-auto-complete
                                :value="parameters.conditions.operatorName"
                                :data-source="carrierOptions"
                                :filterOption="filterOption"
                                placeholder="请输入用户来源称"
                                @change="handleFormChange('operatorName', $event)"
                                @select="handleFormChange('operatorName', $event)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="4">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <template v-if="type === 0">
            <ant-button class="sl-tool" type="primary" @click="openRateModal">利率设置</ant-button>
            <ant-button class="sl-tool" type="primary" @click="openBrokerModal">添加券商</ant-button>
        </template>

        <ant-table
            :class="type === 1 ? 'mt32px' : ''"
            :columns="columns"
            :rowKey="record => record.uid"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <span slot="amount" slot-scope="record">
                {{ record.amount | digitPrecision(6) }}
            </span>
            <span slot="totalDegree" slot-scope="record">
                {{ record.totalDegree | digitPrecision(6) }}
            </span>
            <span slot="remainingCredit" slot-scope="record">
                {{ record.remainingCredit | digitPrecision(6) }}
            </span>
            <span slot="totalLockReward" slot-scope="record">
                {{ record.totalLockReward | digitPrecision(6) }}
            </span>
            <span slot="lockReward" slot-scope="record">
                {{ record.lockReward | digitPrecision(6) }}
            </span>
            <span slot="subRewardValue" slot-scope="record">
                {{ record.subRewardValue | digitPrecision(6) }}
            </span>
            <span slot="createTime" slot-scope="record">
                {{ record.createTime | dateFormat }}
            </span>
            <a slot="child" slot-scope="record" :href="`#/member/broker/child/${record.uid}`" style="color: #68CA8A">详情</a>
            <template slot="operation" slot-scope="record">
                <ant-button v-if="type === 0" type="default" size="small" @click="openQuotaModal(record)" style="width: 65px">添加额度</ant-button>
            </template>
        </ant-table>

        <ant-pagination
            :current="parameters.pageNum"
            :pageSize="parameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <BrokerModal v-model="isBrokerShow" title="添加券商" @submit="handleBrokerSubmit" />

        <RateModal v-model="isRateShow" title="设置利率" :project-options="projectOptions" @submit="handleRateSubmit" />

        <QuotaModal v-model="isQuotaShow" title="添加额度" :broker="currentBroker" @submit="handleQuotaSubmit" />

        <SecondVerify v-model="isSecondVerifyShow" :title="'谷歌验证码'" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./member-broker.less" lang="less" scoped />

<script src="./member-broker.ts" />
