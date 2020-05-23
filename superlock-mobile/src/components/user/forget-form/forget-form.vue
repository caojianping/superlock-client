<template>
    <Popup v-model="isShow" class="full scb-gray">
        <Header :title="$t('USER.PASSWORD_FIND')" @left="$router.push(from)" />

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h1>{{ $t('USER.ENTER_NEW_PASSWORD') }}</h1>
                </li>
                <li>
                    <h2>{{ $t('SECURITY.NEW_PASSWORD') }}</h2>
                    <Field
                        :type="isNewPasswordVisible ? 'text' : 'password'"
                        :value="userForm.password"
                        clearable
                        :placeholder="$t('PLACEHOLDERS.ENTER_NEW_PASSWORD')"
                        @input="handleFieldInput('password', $event)"
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
                        :value="userForm.confirmPassword"
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
    </Popup>
</template>

<style src="./forget-form.less" lang="less" scoped />

<script src="./forget-form.ts" />
