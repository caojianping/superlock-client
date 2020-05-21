<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="fund-password scb-gray">
            {{ ((userInfoObj = userInfo || {}), void 0) }}
            {{ ((status = userInfoObj.haveFundPasswd), void 0) }}
            <Header
                :title="
                    `${{ false: $t('SECURITY.SETTING_FUND_PASSWORD'), true: $t('SECURITY.MODIFY_FUND_PASSWORD') }[status] ||
                        $t('MINE.FUND_PASSWORD')}`
                "
                @left="$router.push(from)"
            />

            <div class="scb-form scb-separator">
                <ul>
                    <li>
                        <h1>
                            {{
                                `${{ false: $t('SECURITY.SETTING_FUND_PASSWORD'), true: $t('SECURITY.MODIFY_FUND_PASSWORD') }[status] ||
                                    $t('MINE.FUND_PASSWORD')}`
                            }}
                        </h1>
                        <p>UID: {{ userInfoObj.userId || '--' }}</p>
                    </li>
                    <li v-if="status">
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

            {{ ((phone = userInfoObj.phone || {}), void 0) }}
            <VerifyList
                v-model="isVerifyShow"
                :area-code="phone.area"
                :mobile="phone.tel"
                :verify-result="verifyResult"
                from="/security/fund/password"
                @submit="handleVerifyListSubmit"
                @stop="handleVerifyListStop"
                @close="handleVerifyListClose"
            />

            <div id="captcha"></div>
        </div>
    </PullRefresh>
</template>

<style src="./fund-password.less" lang="less" scoped />

<script src="./fund-password.ts" />
