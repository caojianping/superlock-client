<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>数据报表</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/report/expend">支出报表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">支出报表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="支出类型" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="expendParameters.conditions.type"
                                :options="expendTypeOptions"
                                allowClear
                                placeholder="请选择支出类型"
                                @change="handleFormChange('type', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="10">
                        <ant-form-item label="选择时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{ ((beginTime = expendParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = expendParameters.conditions.endTime), void 0) }}
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
            :rowKey="record => `${record.date}_${record.type}_${record.dcAmount}_${record.bcbAmount}`"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <span slot="dcAmount" slot-scope="record">
                {{ record.dcAmount | digitPrecision(6) }}
            </span>
            <span slot="bcbAmount" slot-scope="record">
                {{ record.bcbAmount | digitPrecision(6) }}
            </span>
        </ant-table>

        <ant-pagination
            :current="expendParameters.pageNum"
            :pageSize="expendParameters.pageSize"
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

<style src="./expend-report.less" lang="less" scoped />

<script src="./expend-report.ts" />
