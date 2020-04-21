<template>
    <Popup v-model="isShow" class="full">
        <Header :title="isForget ? '找回密码' : `${verifyNames[verifyType - 1]}验证码`" @left="handlePopupClose" />

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h2 v-if="verifyType === 1">您的邮箱：{{ email }}</h2>
                    <h2 v-else-if="verifyType === 2">您的手机号：{{ ['+' + areaCode, mobile].join(',') }}</h2>
                    <Field
                        class="code"
                        :value="code"
                        clearable
                        :placeholder="`请输入${verifyNames[verifyType - 1]}验证码`"
                        @input="handleFieldInput($event)"
                    >
                        <template slot="button">
                            <VerifyCode
                                :is-init="isShow"
                                :verify-type="verifyType"
                                :area-code="areaCode"
                                :mobile="mobile"
                                :email="email"
                                @stop="handleVerifyCodeStop"
                            />
                        </template>
                    </Field>
                </li>
                <li>
                    <Button class="effect-shadow" type="primary" block round @click="submit">{{ isForget ? '下一步' : '确认' }}</Button>
                </li>
            </ul>
        </div>
    </Popup>
</template>

<style src="./verify-form.less" lang="less" scoped />

<script src="./verify-form.ts" />
