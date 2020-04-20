<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>运营商管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/carrier/rebate/order">返点订单</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">返点订单</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="9">
                        <ant-form-item label="运营商名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="rebateParameters.conditions.carrierName || undefined"
                                :options="carrierOptions"
                                showSearch
                                allowClear
                                placeholder="请输入运营商名称"
                                @change="handleFormChange('carrierName', $event)"
                                :filterOption="carrierFilterOption"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="选择时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            {{ ((beginTime = rebateParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = rebateParameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                :showTime="{ format: 'HH:mm', defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')] }"
                                format="YYYY-MM-DD HH:mm"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="6">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.carrierId" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <ant-tooltip class="w100px" slot="serial" slot-scope="record">
                <template slot="title">{{ record.serial }}</template>
                {{ record.serial }}
            </ant-tooltip>
            <span slot="rebateRatio" slot-scope="record">
                {{ record.rebateRatio | ratePercent }}
            </span>
            <span slot="createTime" slot-scope="record">
                {{ record.createTime | dateFormat }}
            </span>
            <span slot="endTime" slot-scope="record">
                {{ record.endTime | dateFormat }}
            </span>
            <span :class="statusColors[record.status]" slot="status" slot-scope="record">
                {{ statusNames[record.status] }}
            </span>
            <template slot="operation" slot-scope="record">
                <ant-button v-if="record.status !== '3'" type="default" size="small" @click="setOperate(record.fundSerial, 3)">审核</ant-button>
                <ant-button v-if="record.status === '1'" type="danger" size="small" @click="setOperate(record.fundSerial, 5)">驳回</ant-button>
            </template>
        </ant-table>

        <ant-pagination
            :current="rebateParameters.pageNum"
            :pageSize="rebateParameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./rebate-order.less" lang="less" scoped />

<script src="./rebate-order.ts" />
