<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>充值管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/recharge/address">地址管理</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">地址管理</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="5">
                        <ant-form-item label="UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="addressParameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('uid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="5">
                        <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="addressParameters.conditions.mobile"
                                allowClear
                                placeholder="请输入手机号"
                                @change="handleFormChange('mobile', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="5">
                        <ant-form-item label="充值地址" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input
                                type="text"
                                :value="addressParameters.conditions.address"
                                allowClear
                                placeholder="请输入充值地址"
                                @change="handleFormChange('address', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="5">
                        <ant-form-item label="选择币种" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-select
                                :value="addressParameters.conditions.coinCode"
                                :options="chainOptions"
                                allowClear
                                placeholder="请选择币种"
                                @change="handleFormChange('coinCode', $event)"
                            />
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
            :rowKey="record => `${record.uid}_${record.address}`"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <!-- <ant-tooltip class="w100px" slot="address" slot-scope="record">
                <template slot="title">{{ record.address }}</template>
                {{ record.address }}
            </ant-tooltip> -->
        </ant-table>

        <ant-pagination
            :current="addressParameters.pageNum"
            :pageSize="addressParameters.pageSize"
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

<style src="./recharge-address.less" lang="less" scoped />

<script src="./recharge-address.ts" />
