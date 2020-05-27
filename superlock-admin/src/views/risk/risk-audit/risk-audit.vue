<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>风控管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/risk/audit">审核设置</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-form">
            <header class="sl-form-header">
                <h1 class="sl-form-title">小额免审设置</h1>
            </header>
            <div class="sl-form-body">
                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="提现免审金额(BCB)" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                            <ant-input-number
                                :value="freeTrial.withdrawLimit"
                                :min="0"
                                :precision="6"
                                placeholder="请输入提现免审金额(BCB)"
                                @change="handleFormChange('withdrawLimit', $event)"
                                @keyup.enter="submit(1, false)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="6">
                        <ant-button class="mt4px" type="primary" @click="submit(1, false)">保存</ant-button>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="利息支出免审金额(BCB)" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                            <ant-input-number
                                :value="freeTrial.everyrewardLimit"
                                :min="0"
                                :precision="6"
                                placeholder="请输入利息支出免审金额(BCB)"
                                @change="handleFormChange('everyrewardLimit', $event)"
                                @keyup.enter="submit(2, false)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="6">
                        <ant-button class="mt4px" type="primary" @click="submit(2, false)">保存</ant-button>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="推广奖励免审金额(BCB)" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                            <ant-input-number
                                :value="freeTrial.promotionrewardLimit"
                                :min="0"
                                :precision="6"
                                placeholder="请输入推广奖励免审金额(BCB)"
                                @change="handleFormChange('promotionrewardLimit', $event)"
                                @keyup.enter="submit(3, false)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="6">
                        <ant-button class="mt4px" type="primary" @click="submit(3, false)">保存</ant-button>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="最小锁仓数量(BCB)" :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                            <ant-input-number
                                :value="freeTrial.lockAmount"
                                :min="0"
                                :precision="6"
                                placeholder="请输入最小锁仓数量(BCB)"
                                @change="handleFormChange('lockAmount', $event)"
                                @keyup.enter="submit(4, false)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col :span="6">
                        <ant-button class="mt4px" type="primary" @click="submit(4, false)">保存</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <SecondVerify :is-show="isSecondVerifyShow" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./risk-audit.less" lang="less" scoped />

<script src="./risk-audit.ts" />
