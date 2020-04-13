<template>
    <ant-modal
        v-model="isShow"
        :title="title"
        :footer="null"
        @cancel="handleModalCancel"
    >
        <div>
            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="UID"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input
                            type="text"
                            :value="quotaForm.uid"
                            disabled
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="剩余额度(DC)"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input
                            type="text"
                            :value="broker.remainingCredit"
                            disabled
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="新增额度(DC)"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input-number
                            :value="quotaForm.amount"
                            :min="0"
                            placeholder="请输入新增额度(DC)"
                            @change="handleFormChange('amount', $event)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-button class="sl-submit" type="primary" @click="submit"
                    >保存</ant-button
                >
            </ant-row>
        </div>
    </ant-modal>
</template>

<style src="./quota-modal.less" lang="less" scoped />

<script src="./quota-modal.ts" />
