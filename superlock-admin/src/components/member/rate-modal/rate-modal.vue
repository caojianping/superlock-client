<template>
    <ant-modal v-model="isShow" title="设置利率" :footer="null" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="UID" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input
                        type="text"
                        :value="rateForm.uid"
                        allowClear
                        placeholder="请输入UID"
                        @change="handleFormChange('uid', $event.target.value)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="项目类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-select
                        :value="rateForm.type"
                        :options="projectOptions"
                        allowClear
                        placeholder="请选择项目类型"
                        @change="handleFormChange('type', $event)"
                    ></ant-select>
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="利率(%)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input-number
                        :value="rateForm.rate"
                        :min="0"
                        :max="100"
                        :precision="2"
                        placeholder="请输入利率(%)"
                        @change="handleFormChange('rate', $event)"
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

<style src="./rate-modal.less" lang="less" scoped />

<script src="./rate-modal.ts" />
