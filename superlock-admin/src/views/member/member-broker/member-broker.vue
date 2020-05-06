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
            <div class="sl-block-body mw1200px">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="brokerParameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('uid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="用户来源" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="brokerParameters.conditions.carrierName || undefined"
                                :options="carrierOptions"
                                showSearch
                                allowClear
                                placeholder="请输入用户来源"
                                @change="handleFormChange('carrierName', $event)"
                                @search="handleFormChange('carrierName', $event)"
                                :filterOption="carrierFilterOption"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col v-if="type !== 0" :span="7">
                        <ant-form-item label="上级UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="brokerParameters.conditions.parent"
                                allowClear
                                placeholder="请输入上级UID"
                                @change="handleFormChange('parent', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="brokerParameters.conditions.mobileNumber"
                                allowClear
                                placeholder="请输入手机号"
                                @change="handleFormChange('mobileNumber', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="邮箱" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="brokerParameters.conditions.email"
                                allowClear
                                placeholder="请输入邮箱"
                                @change="handleFormChange('email', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <template v-if="type === 0">
            <ant-button class="sl-tool" type="primary" @click="openModal('isRateShow')">利率设置</ant-button>
            <ant-button class="sl-tool" type="primary" @click="openModal('isBrokerShow')">添加券商</ant-button>
            <ant-button class="sl-tool" type="primary" @click="openModal('isMigrationShow')">券商迁移</ant-button>
            <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>
        </template>

        <ant-table
            :class="['mw1200px', type === 1 ? '' : 'nowrap', type === 1 ? 'mt32px' : '']"
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
                <ant-button v-if="type === 0" type="default" size="small" @click="openModal('isQuotaShow', record)" style="width: 65px"
                    >添加额度</ant-button
                >
            </template>
        </ant-table>

        <ant-pagination
            :current="brokerParameters.pageNum"
            :pageSize="brokerParameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <BrokerModal v-model="isBrokerShow" @submit="handleModalSubmit" />

        <RateModal v-model="isRateShow" @submit="handleModalSubmit" />

        <QuotaModal v-model="isQuotaShow" :broker="broker" @submit="handleModalSubmit" />

        <MigrationModal v-model="isMigrationShow" @submit="handleModalSubmit" />
    </div>
</template>

<style src="./member-broker.less" lang="less" scoped />

<script src="./member-broker.ts" />
