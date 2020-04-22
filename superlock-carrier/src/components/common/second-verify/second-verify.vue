<template>
    <ant-modal v-model="isModalShow" title="邮箱验证码" :footer="null" @cancel="handleModalCancel">
        <ul class="verify-form">
            <!-- <li>您的手机号：{{ ['+' + filterAreaCode.code, mobile].join(',') }}</li> -->
            <li>您的邮箱：{{ email }}</li>
            <li class="flex">
                <ant-input ref="code" type="text" v-model="code" allowClear placeholder="请输入邮箱验证码" @keyup.enter="submit" />
                <SmsCode :is-init="isModalShow" :email="email" />
            </li>
            <li>
                <ant-button class="sl-submit" type="primary" @click="submit">确定</ant-button>
            </li>
        </ul>
    </ant-modal>
</template>

<style src="./second-verify.less" lang="less" scoped />

<script src="./second-verify.ts" />
