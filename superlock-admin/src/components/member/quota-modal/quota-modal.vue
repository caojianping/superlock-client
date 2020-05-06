<template>
    <ant-modal v-model="isShow" title="添加额度" :footer="null" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="UID" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input type="text" :value="quotaForm.uid" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="剩余额度(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input type="text" :value="broker.remainingCredit" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="新增额度(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input-number
                        :value="quotaForm.amount"
                        :min="0"
                        placeholder="请输入新增额度(DC)"
                        @change="handleFormChange('amount', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-button class="sl-submit" type="primary" @click="submit(false)">保存</ant-button>
        </ant-row>

        <SecondVerify :is-show="isSecondVerifyShow" @submit="submit(true)" />
    </ant-modal>
</template>

<style src="./quota-modal.less" lang="less" scoped />

<script src="./quota-modal.ts" />
