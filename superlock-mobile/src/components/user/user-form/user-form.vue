<template>
    <CellGroup class="space-large" :border="false">
        <Field
            class="field-mobile"
            :value="userForm.mobile"
            clearable
            :placeholder="$t('PLACEHOLDERS.ENTER_MOBILE')"
            @input="handleFieldInput('mobile', $event)"
        >
            <template slot="label">
                <AreaCode @change="handleAreaCodeChange" />
            </template>
        </Field>

        <Field
            type="password"
            :value="userForm.password"
            clearable
            :placeholder="$t('PLACEHOLDERS.ENTER_PASSWORD')"
            @input="handleFieldInput('password', $event)"
        />

        <!-- <Field class="code" :value="userForm.smsCode" clearable placeholder="请输入验证码" @input="handleFieldInput('smsCode', $event)">
            <template slot="button">
                <SmsCode :area-code="userForm.areaCode" :mobile="userForm.mobile" @stop="handleSmsCodeStop" />
            </template>
        </Field> -->
        <slot />
    </CellGroup>
</template>

<style src="./user-form.less" lang="less" scoped />

<script src="./user-form.ts" />
