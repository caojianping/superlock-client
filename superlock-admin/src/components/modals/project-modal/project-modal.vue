<template>
    <ant-modal v-model="isShow" title="锁仓项目修改" :width="600" :footer="null" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="项目编号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" :value="project.id" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="项目名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input
                        type="text"
                        :value="projectForm.memo"
                        allowClear
                        placeholder="请输入项目名称"
                        @change="handleFormChange('memo', $event.target.value)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="项目周期(天)" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input-number :value="project.length" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="项目总额度(DC)" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input-number
                        :value="projectForm.quota"
                        :min="0"
                        placeholder="请输入项目总额度(DC)"
                        @change="handleFormChange('quota', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="锁仓利率(%)" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input-number
                        :value="projectForm.rate"
                        :min="0"
                        :max="100"
                        :precision="2"
                        placeholder="请输入锁仓利率(%)"
                        @change="handleFormChange('rate', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="直推奖励利率(%)" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input-number
                        :value="projectForm.pushRate"
                        :min="0"
                        :max="100"
                        :precision="2"
                        placeholder="请输入直推奖励利率(%)"
                        @change="handleFormChange('pushRate', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="项目状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-switch v-model="projectForm.enable" size="large" />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-button class="sl-submit" type="primary" @click="submit(false)">保存</ant-button>
        </ant-row>

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </ant-modal>
</template>

<style src="./project-modal.less" lang="less" scoped />

<script src="./project-modal.ts" />
