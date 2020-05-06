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
                        <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="carrierParameters.conditions.mobile"
                                allowClear
                                placeholder="请输入手机号"
                                @change="handleFormChange('mobile', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="10">
                        <ant-form-item label="运营商名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="carrierParameters.conditions.carrierName || undefined"
                                :options="carrierOptions"
                                showSearch
                                allowClear
                                placeholder="请输入运营商名称"
                                @change="handleFormChange('carrierName', $event)"
                                @search="handleFormChange('carrierName', $event)"
                                :filterOption="carrierFilterOption"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="邮箱" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="carrierParameters.conditions.email"
                                allowClear
                                placeholder="请输入邮箱"
                                @change="handleFormChange('email', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="10">
                        <ant-form-item label="选择时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{ ((beginTime = carrierParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = carrierParameters.conditions.endTime), void 0) }}
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

        <ant-button class="sl-tool large" type="primary" @click="openModal(1, 1, null)">新增运营商</ant-button>
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
                <ant-button class="w65px" type="danger" size="small" @click="openModal(2, 2, record)">密码重置</ant-button>
                <ant-button class="w80px" type="default" size="small" @click="openModal(2, 3, record)">更改手机号</ant-button>
                <ant-button class="w80px" type="danger" size="small" @click="openModal(2, 5, record)">更改邮箱</ant-button>
                <ant-button class="w65px" type="default" size="small" @click="openModal(2, 4, record)">返奖设置</ant-button>
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

        <CarrierModal v-model="isCarrierShow" :operation-type="operationType" :form-type="formType" :carrier="carrier" @submit="handleModalSubmit" />
    </div>
</template>

<style src="./carrier-list.less" lang="less" scoped />

<script src="./carrier-list.ts" />
