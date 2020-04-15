<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>贷款管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/loan/interest">贷款计息</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">贷款计息列表</h2>
            </header>
            <div class="sl-block-body"></div>
        </div>

        <ant-button class="sl-tool" type="primary">导出报表</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.serial" :dataSource="list" :pagination="false" :loading="isPageLoading" />

        <ant-pagination
            :current="interestParameters.pageNum"
            :pageSize="interestParameters.pageSize"
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
