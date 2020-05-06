<template>
    <ant-modal v-model="isShow" title="系统账户上分" :footer="null" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="上分账户ID" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input type="text" :value="pointForm.accountId" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="上分币种" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-select
                        :value="pointForm.coin"
                        :options="coinOptions"
                        allowClear
                        placeholder="请选择上分币种"
                        @change="handleCoinChange"
                    ></ant-select>
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="账户剩余数量" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input type="text" :value="currentPointInfo.canused_amount" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="上分数量" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input-number
                        :value="pointForm.value"
                        :min="0"
                        placeholder="请输入上分数量"
                        @change="handleFormChange('value', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="备注" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input
                        type="text"
                        :value="pointForm.memo"
                        allowClear
                        placeholder="请输入备注"
                        @change="handleFormChange('memo', $event.target.value)"
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

<style src="./point-modal.less" lang="less" scoped />

<script src="./point-modal.ts" />
