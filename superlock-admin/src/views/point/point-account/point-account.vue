<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>上分管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/point/account">系统账号</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <ant-table
            :columns="columns"
            :rowKey="record => record.serial"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        />

        <ant-pagination
            :current="accountParameters.pageNum"
            :pageSize="accountParameters.pageSize"
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

<style src="./point-account.less" lang="less" scoped />

<script src="./point-account.ts" />
