<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>贷款管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/loan/setting">贷款设置</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-form">
            <header class="sl-form-header">
                <h1 class="sl-form-title">贷款设置</h1>
            </header>
            <div class="sl-form-body">
                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="贷款年利率(%)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number
                                :value="loanInfo.loanRate"
                                :min="0"
                                :max="100"
                                :precision="2"
                                placeholder="请输入贷款年利率(%)"
                                @change="handleFormChange('loanRate', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="最大贷款比例(%)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number
                                :value="loanInfo.loanProportion"
                                :min="0"
                                :max="100"
                                :precision="2"
                                placeholder="请输入最大贷款比例(%)"
                                @change="handleFormChange('loanProportion', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="最小贷款价值(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number
                                :value="loanInfo.loanMinValue"
                                :min="0"
                                :max="100"
                                :precision="2"
                                placeholder="请输入最小贷款价值(DC)"
                                @change="handleFormChange('loanMinValue', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-button class="sl-submit" type="primary" @click="submit(false)">确定</ant-button>
                </ant-row>
            </div>
        </div>

        <SecondVerify :is-show="isSecondVerifyShow" @submit="submit(true)" />
    </div>
</template>

<style src="./loan-setting.less" lang="less" scoped />

<script src="./loan-setting.ts" />
