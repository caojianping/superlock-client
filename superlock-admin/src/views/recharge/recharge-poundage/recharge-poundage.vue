<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>充值管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/recharge/poundage">手续费设置</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <ant-table
            class="mt32px"
            :columns="columns"
            :rowKey="record => record.tokenType"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <span slot="chargeRate" slot-scope="record">
                {{ record.chargeRate | ratePercent }}
            </span>
            <template slot="operation" slot-scope="record">
                <ant-button type="default" size="small" @click="openModal(2, record)">修改</ant-button>
            </template>
        </ant-table>

        <PoundageModal v-model="isPoundageShow" :operation-type="operationType" :data="poundage" @submit="handleModalSubmit" />
    </div>
</template>

<style src="./recharge-poundage.less" lang="less" scoped />

<script src="./recharge-poundage.ts" />
