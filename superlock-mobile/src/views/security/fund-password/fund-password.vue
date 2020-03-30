<template>
    <div class="fund-password">
        <Header title="资金密码" @left="$router.push('/security/center')" />

        <div class="scb-form separator">
            <ul>
                <li>
                    <h1>资金密码</h1>
                    <p>UID: {{ userInfo.userId || '--' }}</p>
                </li>
                <li>
                    <h2>原密码</h2>
                    <Field
                        :value="securityForm.oldPassword"
                        placeholder="请输入原密码"
                        @input="handleFieldInput('oldPassword', $event)"
                    >
                        <router-link
                            class="text-prompt"
                            slot="button"
                            to="/user/forget"
                            >忘记密码</router-link
                        >
                    </Field>
                </li>
                <li>
                    <h2>新密码</h2>
                    <Field
                        :type="isNewPasswordVisible ? 'text' : 'password'"
                        :value="securityForm.newPassword"
                        placeholder="请输入新密码"
                        @input="handleFieldInput('newPassword', $event)"
                    >
                        <i
                            :class="[
                                'icon',
                                isNewPasswordVisible
                                    ? 'icon-visible'
                                    : 'icon-invisible'
                            ]"
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
                        placeholder="请再次输入新密码"
                        @input="handleFieldInput('confirmPassword', $event)"
                    >
                        <i
                            :class="[
                                'icon',
                                isConfirmPasswordVisible
                                    ? 'icon-visible'
                                    : 'icon-invisible'
                            ]"
                            slot="button"
                            @click="togglePassword('isConfirmPasswordVisible')"
                        />
                    </Field>
                    <p class="text-prompt">
                        提示：密码必须由大写字母、小写字母、数字、符号中两种或者两种以上组成，且长度为8-15位。
                    </p>
                </li>
                <li>
                    <Button
                        class="effect-shadow"
                        type="primary"
                        block
                        round
                        @click="submit"
                        >确认</Button
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<style src="./fund-password.less" lang="less" scoped />

<script src="./fund-password.ts" />
