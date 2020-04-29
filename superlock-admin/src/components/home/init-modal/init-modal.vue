<template>
    <ant-modal v-model="isShow" title="初始化数据设置" :width="600" :footer="null" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="初始锁仓总额(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input-number
                        :value="init.initialTotalLock"
                        :min="0"
                        placeholder="请输入初始锁仓总额(DC)"
                        @change="handleFormChange('initialTotalLock', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="22">
                <ant-form-item label="初始注册用户(人)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                    <ant-input-number
                        :value="init.initialRegisteredUser"
                        :min="0"
                        :precision="0"
                        placeholder="请输入初始注册用户(人)"
                        @change="handleFormChange('initialRegisteredUser', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-button class="sl-submit" type="primary" @click="submit(false)">保存</ant-button>
        </ant-row>

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </ant-modal>
</template>

<style src="./init-modal.less" lang="less" scoped />

<script src="./init-modal.ts" />
