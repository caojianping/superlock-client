<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>贷款管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/loan/interest">利息记录</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">利息记录</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="贷款订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="loanParameters.conditions.loanSerial"
                                allowClear
                                placeholder="请输入贷款订单号"
                                @change="handleFormChange('loanSerial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="锁仓订单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
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
            :columns="columns"
            :rowKey="record => `${record.uid}_${record.loanSerial}`"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <span slot="loanRate" slot-scope="record">{{ record.loanRate | ratePercent }}</span>
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
    </div>
</template>

<style src="./loan-interest.less" lang="less" scoped />

<script src="./loan-interest.ts" />
