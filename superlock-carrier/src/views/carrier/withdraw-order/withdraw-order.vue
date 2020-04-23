<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>运营商管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/carrier/withdraw/order">提现订单</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">提现订单</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="withdrawParameters.conditions.serial"
                                allowClear
                                placeholder="请输入订单号"
                                @change="handleFormChange('serial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="提现地址" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            <ant-input
                                type="text"
                                :value="withdrawParameters.conditions.address"
                                allowClear
                                placeholder="请输入到账地址"
                                @change="handleFormChange('address', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                class="sl-select"
                                :value="withdrawParameters.conditions.status"
                                :options="withdrawOptions"
                                allowClear
                                placeholder="请选择状态"
                                @change="handleFormChange('status', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="交易hash" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="withdrawParameters.conditions.txHash"
                                allowClear
                                placeholder="请输入交易hash"
                                @change="handleFormChange('txHash', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="选择时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            {{ ((beginTime = withdrawParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = withdrawParameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                :showTime="{ format: 'HH:mm:ss', defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }"
                                format="YYYY-MM-DD HH:mm:ss"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.serial" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <ant-tooltip class="w100px" slot="serial" slot-scope="record">
                <template slot="title">{{ record.serial }}</template>
                {{ record.serial }}
            </ant-tooltip>
            <ant-tooltip class="w100px" slot="address" slot-scope="record">
                <template slot="title">{{ record.address }}</template>
                {{ record.address }}
            </ant-tooltip>
            <ant-tooltip class="w100px" slot="txHash" slot-scope="record">
                <template slot="title">{{ record.txHash }}</template>
                {{ record.txHash }}
            </ant-tooltip>
            <span slot="createDate" slot-scope="record">
                {{ record.createDate | dateFormat }}
            </span>
            <span slot="finishDate" slot-scope="record">
                {{ record.finishDate | dateFormat }}
            </span>
            <span :class="statusColors[record.status]" slot="status" slot-scope="record">
                {{ statusNames[record.status] }}
            </span>
        </ant-table>

        <ant-pagination
            :current="withdrawParameters.pageNum"
            :pageSize="withdrawParameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <!-- <SecondVerify :is-show="isSecondVerifyShow" @submit="handleSecondVerifySubmit" /> -->
    </div>
</template>

<style src="./withdraw-order.less" lang="less" scoped />

<script src="./withdraw-order.ts" />
