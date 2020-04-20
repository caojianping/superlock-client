<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>资金管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/fund/record">资金记录</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">资金列表</h2>
            </header>
            <div class="sl-block-body mw1200px">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="parameters.conditions.orderId"
                                allowClear
                                placeholder="请输入订单号"
                                @change="handleFormChange('orderId', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="交易币种" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            <ant-select
                                :value="parameters.conditions.coinCode"
                                :options="coinOptions"
                                allowClear
                                placeholder="请选择交易币种"
                                @change="handleFormChange('coinCode', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="订单类型" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="parameters.conditions.orderType"
                                :options="orderOptions"
                                allowClear
                                placeholder="请选择币种"
                                @change="handleFormChange('orderType', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="账户名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="parameters.conditions.accountName"
                                :options="accountOptions"
                                allowClear
                                placeholder="请选择币种"
                                @change="handleFormChange('accountName', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="选择时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            {{ ((beginTime = parameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = parameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                :showTime="{ format: 'HH:mm', defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')] }"
                                format="YYYY-MM-DD HH:mm"
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

        <ant-table
            class="mw1200px"
            :columns="columns"
            :rowKey="record => `${record.uid}_${record.orderId}_${record.orderType}_${record.accountName}_${record.coinCode}_${record.value}`"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <span slot="createTime" slot-scope="record">
                {{ record.createTime | dateFormat }}
            </span>
            <ant-tooltip class="w100px" slot="orderId" slot-scope="record">
                <template slot="title">{{ record.orderId }}</template>
                {{ record.orderId }}
            </ant-tooltip>
            <ant-tooltip class="w100px" slot="uid" slot-scope="record">
                <template slot="title">{{ record.uid }}</template>
                {{ record.uid }}
            </ant-tooltip>
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
    </div>
</template>

<style src="./fund-record.less" lang="less" scoped />

<script src="./fund-record.ts" />
