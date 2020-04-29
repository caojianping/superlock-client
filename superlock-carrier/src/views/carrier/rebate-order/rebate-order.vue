<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>运营商管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/carrier/rebate/order">返点记录</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">返点记录</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="8">
                        <ant-form-item label="订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="rebateParameters.conditions.serial"
                                allowClear
                                placeholder="请输入订单号"
                                @change="handleFormChange('serial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="10">
                        <ant-form-item label="选择时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            {{ ((beginTime = rebateParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = rebateParameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                :showTime="{ format: 'HH:mm:ss', defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] }"
                                format="YYYY-MM-DD HH:mm:ss"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="6">
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
            <span slot="endTime" slot-scope="record">
                {{ record.endTime | dateFormat }}
            </span>
            <span slot="rebateRatio" slot-scope="record">
                {{ record.rebateRatio | ratePercent }}
            </span>
        </ant-table>

        <ant-pagination
            :current="rebateParameters.pageNum"
            :pageSize="rebateParameters.pageSize"
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

<style src="./rebate-order.less" lang="less" scoped />

<script src="./rebate-order.ts" />
