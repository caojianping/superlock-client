<template>
    <Popup v-model="isShow" class="verify-form-popup full">
        <Header
            :title="isForget ? $t('USER.FIND_PASSWORD') : [$t('USER.EMAIL_VERIFY'), $t('USER.SMS_VERIFY')][verifyType - 1]"
            @left="handlePopupClose"
        />

        <div class="scb-separator" />

        <div class="scb-form">
            <ul>
                <li>
                    <h2 v-if="verifyType === 1">{{ $t('USER.YOUR_EMAIL') }}：{{ email }}</h2>
                    <h2 v-else-if="verifyType === 2">{{ $t('USER.YOUR_MOBILE') }}：{{ ['+' + areaCode, mobile].join(',') }}</h2>
                    <Field
                        class="code"
                        v-model="code"
                        clearable
                        :placeholder="[$t('PLACEHOLDERS.ENTER_EMAIL_CODE'), $t('PLACEHOLDERS.ENTER_SMS_CODE')][verifyType - 1]"
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
                    <Button class="effect-shadow" type="primary" block round @click="submit">
                        {{ isForget ? $t('USER.NEXT_STEP') : $t('COMMON.CONFIRM') }}
                    </Button>
                </li>
            </ul>
        </div>
    </Popup>
</template>

<style src="./verify-form.less" lang="less" scoped />

<script src="./verify-form.ts" />
