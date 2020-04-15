<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>系统设置</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/system/password">更改密码</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-form large">
            <header class="sl-form-header">
                <h1 class="sl-form-title">密码设置</h1>
            </header>
            <div class="sl-form-body">
                <ant-row :gutter="24">
                    <ant-col :span="15">
                        <ant-form-item label="原密码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input
                                type="password"
                                :value="passwordForm.oldPwd"
                                allowClear
                                placeholder="请输入原密码"
                                @change="handleFormChange('oldPwd', $event.target.value)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="15">
                        <ant-form-item label="新密码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input
                                type="password"
                                :value="passwordForm.newPwd"
                                allowClear
                                placeholder="请输入新密码"
                                @change="handleFormChange('newPwd', $event.target.value)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col class="sl-tip" :span="9">8-15位大小写字母、数字、特殊字符任意两种组成</ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="15">
                        <ant-form-item label="确认新密码" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input
                                type="password"
                                :value="passwordForm.confirmPwd"
                                allowClear
                                placeholder="请确认新密码"
                                @change="handleFormChange('confirmPwd', $event.target.value)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-button class="sl-submit" type="primary" @click="submit(false)" style="margin-left: 38%">提交</ant-button>
                </ant-row>
            </div>
        </div>

        <SecondVerify v-model="isSecondVerifyShow" :title="'谷歌验证码'" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./system-password.less" lang="less" scoped />

<script src="./system-password.ts" />
