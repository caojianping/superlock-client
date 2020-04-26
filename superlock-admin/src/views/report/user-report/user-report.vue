<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>数据报表</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/report/user">用户报表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">用户报表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="用户类型" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="userParameters.conditions.type"
                                :options="typeOptions"
                                allowClear
                                placeholder="请选择用户类型"
                                @change="handleFormChange('type', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="10">
                        <ant-form-item label="选择时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{ ((beginTime = userParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = userParameters.conditions.endTime), void 0) }}
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
            :columns="columns"
            :rowKey="record => `${record.date}_${record.type}_${record.count}`"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        />

        <ant-pagination
            :current="userParameters.pageNum"
            :pageSize="userParameters.pageSize"
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

<style src="./user-report.less" lang="less" scoped />

<script src="./user-report.ts" />
