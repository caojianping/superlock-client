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
                        label="上分账户ID"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input
                            type="text"
                            :value="transferForm.fromId"
                            disabled
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="转账币种"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-select
                            :value="transferForm.coin"
                            :options="coinOptions"
                            allowClear
                            placeholder="请选择转账币种"
                            @change="handleCoinChange"
                        ></ant-select>
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="可转余额"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input
                            type="text"
                            :value="currentPointAccount.canused_amount"
                            disabled
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="收款账户ID"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input
                            type="text"
                            :value="transferForm.toId"
                            disabled
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="收款账户类型"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-select
                            :value="currentReceiptAccount.account"
                            :options="accountOptions"
                            allowClear
                            placeholder="请选择收款账户类型"
                            @change="handleAccountChange"
                        ></ant-select>
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="转账数量"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input-number
                            :value="transferForm.value"
                            :min="0"
                            placeholder="请输入转账数量"
                            @change="handleFormChange('value', $event)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item
                        label="备注"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input
                            type="text"
                            :value="transferForm.memo"
                            allowClear
                            placeholder="请输入备注"
                            @change="
                                handleFormChange('memo', $event.target.value)
                            "
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

<style src="./transfer-modal.less" lang="less" scoped />

<script src="./transfer-modal.ts" />
