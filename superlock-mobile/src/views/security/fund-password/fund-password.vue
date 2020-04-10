<template>
    <div class="fund-password scb-gray">
        {{ ((status = userInfo.haveFundPasswd), void 0) }}
        <Header :title="`${{ false: '设置', true: '修改' }[status]}资金密码`" @left="$router.push(from || '/security/center')" />

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h1>
                        {{ `${{ false: '设置', true: '修改' }[status]}资金密码` }}
                    </h1>
                    <p>UID: {{ userInfo.userId || '--' }}</p>
                </li>
                <li v-if="status">
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
                <li v-if="!status">
                    <h2>短信验证码</h2>
                    <Field
                        class="code"
                        :value="securityForm.smsCode"
                        clearable
                        placeholder="请输入短信验证码"
                        @input="handleFieldInput('smsCode', $event)"
                    >
                        <template slot="button">
                            {{ ((phone = userInfo.phone || {}), void 0) }}
                            <SmsCode :area-code="phone.area" :mobile="phone.tel" @stop="handleSmsCodeStop" />
                        </template>
                    </Field>
                </li>
                <li>
                    <Button class="effect-shadow" type="primary" block round @click="submit">确认</Button>
                </li>
            </ul>
        </div>

        <div id="captcha"></div>
    </div>
</template>

<style src="./fund-password.less" lang="less" scoped />

<script src="./fund-password.ts" />
