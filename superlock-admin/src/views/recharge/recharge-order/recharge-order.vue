<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>充值管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/recharge/order">充值订单</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">充值订单</h2>
            </header>
            <div class="sl-block-body mw1300px">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="parameters.conditions.serial"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('serial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="交易hash" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            <ant-input
                                type="text"
                                :value="parameters.conditions.hash"
                                allowClear
                                placeholder="请输入交易hash"
                                @change="handleFormChange('hash', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
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
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="选择币种" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="parameters.conditions.coinCode"
                                :options="coinOptions"
                                allowClear
                                placeholder="请选择币种"
                                @change="handleFormChange('coinCode', $event)"
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
            class="mw1300px nowrap"
            :columns="columns"
            :rowKey="record => record.serial"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <ant-tooltip class="w100px" slot="serial" slot-scope="record">
                <template slot="title">{{ record.serial }}</template>
                {{ record.serial }}
            </ant-tooltip>
            <ant-tooltip class="w100px" slot="hash" slot-scope="record">
                <template slot="title">{{ record.hash }}</template>
                {{ record.hash }}
            </ant-tooltip>
            <ant-tooltip class="w100px" slot="address" slot-scope="record">
                <template slot="title">{{ record.address }}</template>
                {{ record.address }}
            </ant-tooltip>
            <span slot="date" slot-scope="record">
                {{ record.date | dateFormat }}
            </span>
            <span slot="commissionRate" slot-scope="record">
                {{ record.commissionRate | ratePercent }}
            </span>
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

<style src="./recharge-order.less" lang="less" scoped />

<script src="./recharge-order.ts" />
