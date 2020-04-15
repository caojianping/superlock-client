<template>
    <ant-modal v-model="isShow" :title="title" :footer="null" @cancel="handleModalCancel">
        <div>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="新密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="password"
                            v-model="passwordForm.newPwd"
                            allowClear
                            placeholder="请输入新密码"
                            @change="handleFormChange('newPwd', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="确认新密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="password"
                            v-model="passwordForm.confirmPwd"
                            allowClear
                            placeholder="请确认新密码"
                            @change="handleFormChange('confirmPwd', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-button class="sl-submit" type="primary" @click="submit">确定</ant-button>
            </ant-row>
        </div>
    </ant-modal>
</template>

<style src="./password-modal.less" lang="less" scoped />

<script src="./password-modal.ts" />
