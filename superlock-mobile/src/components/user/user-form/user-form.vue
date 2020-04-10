<template>
    <CellGroup class="space-large" :border="false">
        <Field class="field-mobile" :value="userForm.mobile" clearable placeholder="请输入手机号码" @input="handleFieldInput('mobile', $event)">
            <template slot="label">
                <AreaCode @change="handleAreaCodeChange" />
            </template>
        </Field>

        <Field type="password" :value="userForm.password" clearable placeholder="请输入登录密码" @input="handleFieldInput('password', $event)" />

        <Field class="code" :value="userForm.smsCode" clearable placeholder="请输入验证码" @input="handleFieldInput('smsCode', $event)">
            <template slot="button">
                <SmsCode :area-code="userForm.areaCode" :mobile="userForm.mobile" @stop="handleSmsCodeStop" />
            </template>
        </Field>

        <slot />
    </CellGroup>
</template>

<style src="./user-form.less" lang="less" scoped />

<script src="./user-form.ts" />
