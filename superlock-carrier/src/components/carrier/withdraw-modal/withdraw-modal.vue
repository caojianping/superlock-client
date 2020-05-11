<template>
    <ant-modal v-model="isShow" title="提现" :width="650" :footer="null" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="提现币种" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" value="BCB" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="账户余额" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" :value="`${withdrawForm.maxAmount || 0}BCB`" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="提现数量" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input-number
                        :value="withdrawForm.value"
                        :min="0"
                        :precision="6"
                        :placeholder="`账户余额${withdrawForm.maxAmount || 0}BCB`"
                        @change="handleFormChange('value', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
            <ant-col class="sl-all" :span="4" @click="withdrawAll">全部</ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="提现地址" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input
                        type="text"
                        :value="withdrawForm.toAddr"
                        allowClear
                        placeholder="请输入提现到账地址"
                        @change="handleFormChange('toAddr', $event.target.value)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <p class="withdraw-prompt">当前仅支持BCB提现，账户里的DC可先“一键闪兑”为BCB后再进行提现。</p>

        <ant-row :gutter="24">
            <ant-button class="sl-submit" type="primary" @click="submit(false)">保存</ant-button>
        </ant-row>

        <VerifyModal :is-show="isSecondVerifyShow" @submit="submit(true)" />
    </ant-modal>
</template>

<style src="./withdraw-modal.less" lang="less" scoped />

<script src="./withdraw-modal.ts" />
