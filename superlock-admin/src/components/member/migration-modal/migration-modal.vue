<template>
    <ant-modal v-model="isShow" title="券商迁移" :width="600" :footer="null" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="券商UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <!-- <ant-input
                        type="text"
                        :value="migrationForm.uid"
                        allowClear
                        placeholder="请输入券商UID"
                        @change="handleFormChange('uid', $event.target.value)"
                        @keyup.enter="submit(false)"
                    /> -->
                    <ant-input type="text" :value="migrationForm.uid" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="当前所属平台" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" :value="migrationInfo ? migrationInfo.operatorName : ''" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="当前所属平台ID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" :value="migrationInfo ? migrationInfo.operatorId || '--' : '--'" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="迁移平台" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-select
                        :value="migrationForm.operatorId"
                        :options="migrationInfo ? migrationInfo.operatorList : []"
                        allowClear
                        placeholder="请选择迁移平台"
                        @change="handleFormChange('operatorId', $event)"
                    ></ant-select>
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="备注" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input
                        type="text"
                        :value="migrationForm.memo"
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

<style src="./migration-modal.less" lang="less" scoped />

<script src="./migration-modal.ts" />
