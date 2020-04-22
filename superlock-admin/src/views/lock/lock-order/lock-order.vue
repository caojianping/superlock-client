<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>锁仓管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/lock/order">锁仓订单</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">锁仓订单</h2>
            </header>
            <div class="sl-block-body mw1200px">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="lockParameters.conditions.serial"
                                allowClear
                                placeholder="请输入订单号"
                                @change="handleFormChange('serial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="订单状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            <ant-select
                                class="sl-select"
                                :value="lockParameters.conditions.status"
                                :options="statusOptions"
                                allowClear
                                placeholder="请选择订单状态"
                                @change="handleFormChange('status', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="用户来源" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="lockParameters.conditions.carrierName || undefined"
                                :options="carrierOptions"
                                showSearch
                                allowClear
                                placeholder="请输入用户来源"
                                @change="handleFormChange('carrierName', $event)"
                                :filterOption="carrierFilterOption"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="lockParameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('uid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="选择时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            {{ ((beginTime = lockParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = lockParameters.conditions.endTime), void 0) }}
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

        <ant-table
            class="mw1200px nowrap"
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
            <span slot="amount" slot-scope="record">
                {{ record.amount | digitPrecision(6) }}
            </span>
            <span slot="rate" slot-scope="record">
                {{ record.rate | ratePercent }}
            </span>
            <span slot="value" slot-scope="record">
                {{ record.value | digitPrecision(6) }}
            </span>
            <span slot="createDate" slot-scope="record">
                {{ record.createDate | dateFormat }}
            </span>
            <span :class="statusColors[record.status]" slot="status" slot-scope="record">
                {{ statusNames[record.status] }}
            </span>
        </ant-table>

        <ant-pagination
            :current="lockParameters.pageNum"
            :pageSize="lockParameters.pageSize"
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

<style src="./lock-order.less" lang="less" scoped />

<script src="./lock-order.ts" />
