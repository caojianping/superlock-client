<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>运营商管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/carrier/list">运营商列表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <ant-button class="sl-tool large" type="primary" @click="openCarrierModal(1, 1, null)">新增运营商</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.carrierId" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <span slot="mobile" slot-scope="record">
                {{ record.areaCode + ',' + record.mobileNumber }}
            </span>
            <span slot="rebateRatio" slot-scope="record">
                {{ (record.rebateRatio / 100) | ratePercent }}
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
