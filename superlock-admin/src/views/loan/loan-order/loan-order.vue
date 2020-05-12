<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>贷款管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/loan/order">贷款订单</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">贷款订单列表</h2>
            </header>
            <div class="sl-block-body mw1300px">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="loanParameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('uid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="贷款订单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            <ant-input
                                type="text"
                                :value="loanParameters.conditions.loanSerial"
                                allowClear
                                placeholder="请输入贷款订单号"
                                @change="handleFormChange('loanSerial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="锁仓订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="loanParameters.conditions.lockSerial"
                                allowClear
                                placeholder="请输入锁仓订单号"
                                @change="handleFormChange('lockSerial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="订单状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="loanParameters.conditions.status"
                                :options="statusOptions"
                                allowClear
                                placeholder="请选择订单状态"
                                @change="handleFormChange('status', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="选择时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            {{ ((beginTime = loanParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = loanParameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                :showTime="{ format: 'HH:mm:ss', defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }"
                                format="YYYY-MM-DD HH:mm:ss"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="3">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table
            class="mw1300px nowrap"
            :columns="columns"
            :rowKey="record => `${record.uid}_${record.loanSerial}`"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <ant-tooltip class="w100px" slot="loanSerial" slot-scope="record">
                <template slot="title">{{ record.loanSerial }}</template>
                {{ record.loanSerial }}
            </ant-tooltip>
            <ant-tooltip class="w100px" slot="lockSerial" slot-scope="record">
                <template slot="title">{{ record.lockSerial }}</template>
                {{ record.lockSerial }}
            </ant-tooltip>
            <span slot="loanRate" slot-scope="record">{{ record.loanRate | ratePercent }}</span>
            <span :class="['loan-status', statusColors[record.status]]" slot="status" slot-scope="record">
                {{ statusNames[record.status] }}
            </span>
            <span :class="['loan-audit', auditColors[record.auditStatus]]" slot="auditStatus" slot-scope="record">
                {{ auditNames[record.auditStatus] }}
            </span>
            <template slot="operation" slot-scope="record">
                <template v-if="record.status === '0' && record.auditStatus === '1'">
                    <ant-button type="default" size="small" @click="setOperate(record.loanSerial, 3)">审核</ant-button>
                    <ant-button type="danger" size="small" @click="setOperate(record.loanSerial, 5)">驳回</ant-button>
                </template>
            </template>
        </ant-table>

        <ant-pagination
            :current="loanParameters.pageNum"
            :pageSize="loanParameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <SecondVerify :is-show="isSecondVerifyShow" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./loan-order.less" lang="less" scoped />

<script src="./loan-order.ts" />
