<template>
    <Popup v-model="isShow" class="full scb-gray" @close="handlePopupClose">
        <Header title="密码找回" @left="handlePopupClose" />

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h1>输入新密码</h1>
                </li>
                <li>
                    <h2>新密码</h2>
                    <Field
                        :type="isNewPasswordVisible ? 'text' : 'password'"
                        :value="userForm.password"
                        clearable
                        placeholder="请输入新密码"
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
                    <h2>确认新密码</h2>
                    <Field
                        :type="isConfirmPasswordVisible ? 'text' : 'password'"
                        :value="userForm.confirmPassword"
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
    </Popup>
</template>

<style src="./forget-form.less" lang="less" scoped />

<script src="./forget-form.ts" />
