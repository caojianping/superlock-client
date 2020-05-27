<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>数据报表</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/report/recharge">充值报表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">充值报表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="充值币种" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="rechargeParameters.conditions.coinCode"
                                :options="coinOptions"
                                allowClear
                                placeholder="请选择充值币种"
                                @change="handleFormChange('coinCode', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="10">
                        <ant-form-item label="选择时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{ ((beginTime = rechargeParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = rechargeParameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                format="YYYY-MM-DD"
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
            class="stats"
            :columns="columns"
            :rowKey="record => `${record.date}_${record.coinCode}_${record.amount}_${record.gotCoin}_${record.gotAmount}`"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <span slot="totalCount" slot-scope="record">
                {{ record.totalCount | digitPrecision(0) }}
            </span>
            <span slot="amount" slot-scope="record">
                {{ record.amount | digitPrecision(6) }}
            </span>
            <span slot="gotAmount" slot-scope="record">
                {{ record.gotAmount | digitPrecision(6) }}
            </span>
        </ant-table>

        <ant-pagination
            :current="rechargeParameters.pageNum"
            :pageSize="rechargeParameters.pageSize"
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

<style src="./recharge-report.less" lang="less" scoped />

<script src="./recharge-report.ts" />
