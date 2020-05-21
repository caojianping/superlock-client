<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="login-password scb-gray">
            <Header :title="$t('SECURITY.LOGIN_PASSWORD')" @left="$router.push('/security/center')" />

            <div class="scb-form scb-separator">
                {{ ((userInfoObj = userInfo || {}), void 0) }}
                <ul>
                    <li>
                        <h1>{{ $t('SECURITY.LOGIN_PASSWORD') }}</h1>
                        <p>UID: {{ userInfoObj.userId || '--' }}</p>
                    </li>
                    <li>
                        <h2>{{ $t('SECURITY.OLD_PASSWORD') }}</h2>
                        <Field
                            type="password"
                            :value="securityForm.oldPassword"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_OLD_PASSWORD')"
                            @input="handleFieldInput('oldPassword', $event)"
                        >
                            <a slot="button" class="text-orange" href="javascript: void(0)" @click="goForget">{{ $t('USER.FORGET_PASSWORD') }}</a>
                        </Field>
                    </li>
                    <li>
                        <h2>{{ $t('SECURITY.NEW_PASSWORD') }}</h2>
                        <Field
                            :type="isNewPasswordVisible ? 'text' : 'password'"
                            :value="securityForm.newPassword"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_NEW_PASSWORD')"
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
                        <h2>{{ $t('SECURITY.CONFIRM_PASSWORD') }}</h2>
                        <Field
                            :type="isConfirmPasswordVisible ? 'text' : 'password'"
                            :value="securityForm.confirmPassword"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_CONFIRM_PASSWORD')"
                            @input="handleFieldInput('confirmPassword', $event)"
                        >
                            <i
                                :class="['icon', isConfirmPasswordVisible ? 'icon-visible-password' : 'icon-invisible-password']"
                                slot="button"
                                @click="togglePassword('isConfirmPasswordVisible')"
                            />
                        </Field>
                        <p class="text-orange">{{ $t('SECURITY.PASSWORD_PROMPT') }}</p>
                    </li>
                    <li>
                        <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('COMMON.CONFIRM') }}</Button>
                    </li>
                </ul>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./login-password.less" lang="less" scoped />

<script src="./login-password.ts" />
