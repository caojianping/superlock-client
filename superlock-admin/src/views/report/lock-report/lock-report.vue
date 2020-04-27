<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>数据报表</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/report/lock">锁仓报表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">锁仓报表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="锁仓期限" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{ ((length = lockParameters.conditions.length), void 0) }}
                            {{ ((unit = lockParameters.conditions.unit), void 0) }}
                            <ant-select
                                :value="length && unit ? `${length}_${unit}` : undefined"
                                :options="cycleOptions"
                                allowClear
                                placeholder="请选择锁仓期限"
                                @change="handleCycleChange"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="10">
                        <ant-form-item label="选择时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{ ((beginTime = lockParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = lockParameters.conditions.endTime), void 0) }}
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
            :rowKey="record => `${record.date}_${record.length}_${record.unit}_${record.lockAmount}_${record.lockValue}`"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <span slot="deadline" slot-scope="record">
                {{ record.length && record.unit ? record.length + lockUnits[Number(record.unit) - 1] : '' }}
            </span>
            <span slot="lockValue" slot-scope="record">
                {{ record.lockValue | digitPrecision(6) }}
            </span>
            <span slot="lockAmount" slot-scope="record">
                {{ record.lockAmount | digitPrecision(6) }}
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

<style src="./lock-report.less" lang="less" scoped />

<script src="./lock-report.ts" />
