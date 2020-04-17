<template>
    <ant-modal v-model="isModalShow" title="短信验证码" :footer="null" @cancel="handleModalCancel">
        <ul class="verify-form">
            <li>您的手机号：{{ ['+' + filterAreaCode.code, mobile].join(',') }}</li>
            <li class="flex">
                <ant-input ref="smsCode" type="text" v-model="smsCode" allowClear placeholder="请输入短信验证码" @keyup.enter="submit" />
                <SmsCode :is-init="isModalShow" :area-code="areaCode" :mobile="mobile" />
            </li>
            <li>
                <ant-button class="sl-submit" type="primary" @click="submit">确定</ant-button>
            </li>
        </ul>
    </ant-modal>
</template>

<style src="./second-verify.less" lang="less" scoped />

<script src="./second-verify.ts" />
