<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>贷款管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/loan/record">贷款记录</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">贷款记录列表</h2>
            </header>
            <div class="sl-block-body"></div>
        </div>

        <ant-button class="sl-tool" type="primary">导出报表</ant-button>

        <ant-table
            :columns="columns"
            :rowKey="record => record.serial"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        />

        <ant-pagination
            :current="recordParameters.pageNum"
            :pageSize="recordParameters.pageSize"
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

<style src="./loan-record.less" lang="less" scoped />

<script src="./loan-record.ts" />
