<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>用户中心</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/member/rate">利率详情</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">利率详情</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="8">
                        <ant-form-item
                            label="UID"
                            :label-col="{ span: 6 }"
                            :wrapper-col="{ span: 18 }"
                        >
                            <ant-input
                                type="text"
                                :value="parameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="
                                    handleFormChange('uid', $event.target.value)
                                "
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="8">
                        <ant-form-item
                            label="用户类型"
                            :label-col="{ span: 6 }"
                            :wrapper-col="{ span: 18 }"
                        >
                            <ant-select
                                :value="parameters.conditions.type"
                                :options="typeOptions"
                                allowClear
                                placeholder="请选择用户类型"
                                @change="handleFormChange('type', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="8">
                        <ant-button
                            class="sl-search"
                            type="primary"
                            @click="search"
                            >搜索</ant-button
                        >
                    </ant-col>
                </ant-row>
            </div>
        </div>
        
        <ant-table
            class="mt32px"
            :columns="columns"
            :rowKey="record => record.serial"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        />

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

<style src="./member-rate.less" lang="less" scoped />

<script src="./member-rate.ts" />
