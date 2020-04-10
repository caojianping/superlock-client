<template>
    <div class="login-password scb-gray">
        <Header title="登录密码" @left="$router.push('/security/center')" />

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h1>登录密码</h1>
                    <p>UID: {{ userInfo.userId || '--' }}</p>
                </li>
                <li>
                    <h2>原密码</h2>
                    <Field
                        type="password"
                        :value="securityForm.oldPassword"
                        clearable
                        placeholder="请输入原密码"
                        @input="handleFieldInput('oldPassword', $event)"
                    >
                        <a slot="button" class="text-orange" href="javascript: void(0)" @click="goForget">忘记密码</a>
                    </Field>
                </li>
                <li>
                    <h2>新密码</h2>
                    <Field
                        :type="isNewPasswordVisible ? 'text' : 'password'"
                        :value="securityForm.newPassword"
                        clearable
                        placeholder="请输入新密码"
                        @input="handleFieldInput('newPassword', $event)"
                    >
                        <i
                            :class="['icon', isNewPasswordVisible ? 'icon-visible-password' : 'icon-invisible-password']"
                            slot="button"
                            @click="togglePassword('isNewPasswordVisible')"
                        />
                    </Field>
                </li>
                <li>
                    <h2>确认新密码</h2>
                    <Field
                        :type="isConfirmPasswordVisible ? 'text' : 'password'"
                        :value="securityForm.confirmPassword"
                        clearable
                        placeholder="请再次输入新密码"
                        @input="handleFieldInput('confirmPassword', $event)"
                    >
                        <i
                            :class="['icon', isConfirmPasswordVisible ? 'icon-visible-password' : 'icon-invisible-password']"
                            slot="button"
                            @click="togglePassword('isConfirmPasswordVisible')"
                        />
                    </Field>
                    <p class="text-orange">
                        提示：密码必须由大写字母、小写字母、数字、符号中两种或者两种以上组成，且长度为8-15位。
                    </p>
                </li>
                <li>
                    <Button class="effect-shadow" type="primary" block round @click="submit">确认</Button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style src="./login-password.less" lang="less" scoped />

<script src="./login-password.ts" />
