<template>
    <div class="user-forget scb-gray">
        <Header title="密码找回" @left="$router.push(from)" />

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h1>输入验证码</h1>
                    <p>
                        验证码已发送至
                        {{ `${userForm.areaCode},${userForm.mobile}` }}
                    </p>
                </li>
                <li>
                    <Field
                        class="code"
                        :value="userForm.smsCode"
                        clearable
                        placeholder="请输入验证码"
                        @input="handleFieldInput('smsCode', $event)"
                    >
                        <template slot="button">
                            <SmsCode
                                :area-code="userForm.areaCode"
                                :mobile="userForm.mobile"
                                is-init
                                @stop="handleSmsCodeStop"
                            />
                        </template>
                    </Field>
                </li>
                <li>
                    <Button
                        class="effect-shadow"
                        type="primary"
                        block
                        round
                        @click="nextStep"
                        >下一步</Button
                    >
                </li>
            </ul>
        </div>

        <ForgetForm v-model="isShow" @submit="handleForgetFormSubmit" />

        <div id="captcha"></div>
    </div>
</template>

<style src="./user-forget.less" lang="less" scoped />

<script src="./user-forget.ts" />
