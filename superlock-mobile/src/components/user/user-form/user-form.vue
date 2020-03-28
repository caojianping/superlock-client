<template>
    <CellGroup class="space-large" :border="false">
        <Field
            class="field-mobile"
            :value="userForm.mobile"
            placeholder="请输入手机号码"
            clearable
            @input="handleFieldInput('mobile', $event)"
        >
            <template slot="label">
                <AreaCode @change="handleAreaCodeChange" />
            </template>
        </Field>

        <Field
            type="password"
            :value="userForm.password"
            placeholder="请输入登录密码"
            clearable
            @input="handleFieldInput('password', $event)"
        />

        <Field
            class="field-code"
            :value="userForm.smsCode"
            placeholder="请输入验证码"
            clearable
            @input="handleFieldInput('smsCode', $event)"
        >
            <template slot="button">
                <SmsCode
                    :area-code="userForm.areaCode"
                    :mobile="userForm.mobile"
                    @stop="handleSmsCodeStop"
                />
            </template>
        </Field>

        <slot />
    </CellGroup>
</template>

<style src="./user-form.less" lang="less" scoped />

<script src="./user-form.ts" />
