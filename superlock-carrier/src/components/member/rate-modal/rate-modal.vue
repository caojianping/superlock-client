<template>
    <ant-modal v-model="isShow" :title="title" :footer="null" @cancel="handleModalCancel">
        <div>
            <ant-row :gutter="24">
                <ant-col :span="20">
                    <ant-form-item label="UID" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                        <ant-input
                            type="text"
                            :value="rateForm.uid"
                            allowClear
                            placeholder="请输入UID"
                            @change="handleFormChange('uid', $event.target.value)"
                            @keyup.enter="submit"
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
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-button class="sl-submit" type="primary" @click="submit">保存</ant-button>
            </ant-row>
        </div>
    </ant-modal>
</template>

<style src="./rate-modal.less" lang="less" scoped />

<script src="./rate-modal.ts" />
