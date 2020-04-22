<template>
    <Popup v-model="isShow" class="verify-list-popup full">
        <Header :title="isForget ? '找回密码' : '安全验证'" :isBorder="false" @left="isForget ? $router.push(from) : handlePopupClose()" />

        <div class="scb-separator" />

        <CellGroup>
            <Cell :class="{ disabled: smsFlag === 0 }" is-link @click="handleSmsVerify">
                <template slot="title">
                    <i class="icon icon-mobile" />
                    <span>短信验证</span>
                </template>
            </Cell>
            <Cell :class="{ disabled: emailFlag === 0 }" is-link @click="handleEmailVerify">
                <template slot="title">
                    <i class="icon icon-email" />
                    <span>邮箱验证</span>
                </template>
                <span v-if="emailFlag === 1" :class="!email ? 'unbind' : 'binded'">{{ email || '未绑定' }}</span>
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
