<template>
    <Popup v-model="isShow" class="verify-list-popup full">
        <Header
            :title="isForget ? $t('USER.FIND_PASSWORD') : $t('USER.SECURITY_VERIFY')"
            :is-border="false"
            @left="isForget ? $router.push(from) : handlePopupClose()"
        />

        <div class="scb-separator" />

        <CellGroup>
            <Cell :class="{ disabled: smsFlag === 0 }" is-link @click="handleSmsVerify">
                <template slot="title">
                    <i class="icon icon-mobile" />
                    <span>{{ $t('USER.SMS_VERIFY') }}</span>
                </template>
            </Cell>
            <Cell :class="{ disabled: emailFlag === 0 }" is-link @click="handleEmailVerify">
                <template slot="title">
                    <i class="icon icon-email" />
                    <span>{{ $t('USER.EMAIL_VERIFY') }}</span>
                </template>
                <span v-if="emailFlag === 1" :class="!email ? 'unbind' : 'binded'">{{ email || $t('SECURITY.UNBIND') }}</span>
                <span v-else></span>
            </Cell>
        </CellGroup>

        <VerifyForm
            v-model="isVerifyShow"
            :is-forget="isForget"
            :verify-type="verifyType"
            :area-code="areaCode"
            :mobile="mobile"
            :email="email"
            @submit="handleVerifyFormSubmit"
            @stop="handleVerifyFormStop"
        />
    </Popup>
</template>

<style src="./verify-list.less" lang="less" scoped />

<script src="./verify-list.ts" />
