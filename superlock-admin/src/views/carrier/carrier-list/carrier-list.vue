<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>运营商管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/carrier/list">运营商列表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">运营商列表</h2>
            </header>
            <div class="sl-block-body mw1300px">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="运营商名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
                            <ant-select
                                :value="carrierParameters.conditions.carrierName || undefined"
                                :options="carrierOptions"
                                showSearch
                                allowClear
                                placeholder="请输入运营商名称"
                                @change="handleFormChange('carrierName', $event)"
                                :filterOption="carrierFilterOption"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="5">
                        <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="carrierParameters.conditions.mobile"
                                allowClear
                                placeholder="请输入手机号"
                                @change="handleFormChange('b', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="选择时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            {{ ((beginTime = carrierParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = carrierParameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                :showTime="{ format: 'HH:mm', defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')] }"
                                format="YYYY-MM-DD HH:mm"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="3">
                        <ant-button class="sl-search" type="primary" @click="search" style="margin-left: 0">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool large" type="primary" @click="openCarrierModal(1, 1, null)">新增运营商</ant-button>
        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table
            class="mw1300px nowrap"
            :columns="columns"
            :rowKey="record => record.carrierId"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <span slot="mobile" slot-scope="record">
                {{ record.areaCode + ',' + record.mobileNumber }}
            </span>
            <span slot="rebateRatio" slot-scope="record">
                {{ record.rebateRatio | ratePercent }}
            </span>
            <span slot="cycle" slot-scope="record">
                {{ record.billingCycle + record.unit }}
            </span>
            <span slot="createTime" slot-scope="record">
                {{ record.createTime | dateFormat }}
            </span>
            <template slot="operation" slot-scope="record">
                <ant-button class="w65px" type="danger" size="small" @click="openCarrierModal(2, 2, record)">密码重置</ant-button>
                <ant-button class="w80px" type="default" size="small" @click="openCarrierModal(2, 3, record)">更改手机号</ant-button>
                <ant-button class="w65px" type="danger" size="small" @click="openCarrierModal(2, 4, record)">返奖设置</ant-button>
            </template>
        </ant-table>

        <ant-pagination
            :current="carrierParameters.pageNum"
            :pageSize="carrierParameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <CarrierModal
            v-model="isCarrierShow"
            :operation-type="operationType"
            :form-type="formType"
            :carrier="carrier"
            @submit="handleCarrierModalSubmit"
        />

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./carrier-list.less" lang="less" scoped />

<script src="./carrier-list.ts" />
