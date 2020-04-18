<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>运营商管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/carrier/index">运营数据</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-form">
            <header class="sl-form-header">
                <h1 class="sl-form-title">奖励设置</h1>
            </header>
            <div class="sl-form-body">
                {{ ((carrierInfoObj = carrierInfo || {}), void 0) }}
                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="新增锁仓量(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number :value="carrierInfoObj.newLockCount || 0" :precision="6" disabled />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="累计锁仓量(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number :value="carrierInfoObj.totalLock || 0" :precision="6" disabled />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="平台累计返奖(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number :value="carrierInfoObj.totalRebateAmount || 0" :precision="6" disabled />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="DC账户余额(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number :value="carrierInfoObj.dcBalance || 0" :precision="6" disabled />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="6">
                        <ant-button type="primary" @click="openModal(1)">一键闪兑</ant-button>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="BCB账户余额(BCB)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number :value="carrierInfoObj.bcbBalance || 0" :precision="6" disabled />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="6">
                        <ant-button type="primary" @click="openModal(2)">提现</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ExchangeModal v-model="isExchangeShow" @submit="handleExchangeModalSubmit" />

        <WithdrawModal v-model="isWithdrawShow" @submit="handleWithdrawModalSubmit" />

        <SecondVerify :is-show="isSecondVerifyShow" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./carrier-index.less" lang="less" scoped />

<script src="./carrier-index.ts" />
