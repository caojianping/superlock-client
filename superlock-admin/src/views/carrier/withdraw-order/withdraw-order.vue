<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>运营商管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/carrier/withdraw/order">提现订单</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">提现订单</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="8">
                        <ant-form-item label="订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="withdrawParameters.conditions.serial"
                                allowClear
                                placeholder="请输入订单号"
                                @change="handleFormChange('serial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="8">
                        <ant-form-item label="到账地址" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="withdrawParameters.conditions.address"
                                allowClear
                                placeholder="请输入到账地址"
                                @change="handleFormChange('address', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="8">
                        <ant-form-item label="运营商名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-auto-complete
                                :value="withdrawParameters.conditions.carrierId"
                                :data-source="carrierOptions"
                                :filterOption="filterOption"
                                placeholder="请输入运营商名称"
                                @change="handleFormChange('carrierId', $event)"
                                @select="handleFormChange('carrierId', $event)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="8">
                        <ant-form-item label="状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                class="sl-select"
                                :value="withdrawParameters.conditions.status"
                                :options="withdrawOptions"
                                allowClear
                                placeholder="请选择状态"
                                @change="handleFormChange('status', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="12">
                        <ant-form-item label="选择时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{ ((beginTime = withdrawParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = withdrawParameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                :showTime="{ format: 'HH:mm' }"
                                format="YYYY-MM-DD HH:mm"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="4">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.carrierId" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <span slot="createTime" slot-scope="record">
                {{ record.createTime | dateFormat }}
            </span>
            <span slot="endTime" slot-scope="record">
                {{ record.endTime | dateFormat }}
            </span>
            <template slot="operation">
                <ant-button class="w65px" type="danger" size="small">驳回</ant-button>
                <ant-button class="w65px" type="default" size="small">审核</ant-button>
            </template>
        </ant-table>

        <ant-pagination
            :current="withdrawParameters.pageNum"
            :pageSize="withdrawParameters.pageSize"
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

<style src="./withdraw-order.less" lang="less" scoped />

<script src="./withdraw-order.ts" />
