<template>
    <div class="login">
        <ContactService />

        <Langs />

        <header class="login-header">
            <img src="../../../assets/images/logo.png" :alt="$t('COMMON.NAME')" />
            <h1>{{ $t('USER.WELCOME') }}</h1>
        </header>

        <UserForm @change="handleUserFormChange">
            <Cell>
                <Button class="btn-login effect-shadow" type="primary" size="large" block round @click="submit">{{ $t('USER.LOGIN') }}</Button>
            </Cell>
        </UserForm>

        <p class="login-toolbar">
            <router-link :to="`/user/register?code=${invitationCode}`">{{ $t('USER.REGISTER') }}</router-link>
            <span>|</span>
            <a href="javascript: void(0)" @click="goForget">{{ $t('USER.FORGET_PASSWORD') }}</a>
        </p>

        <VerifyModal
            v-model="isVerifyShow"
            :area-code="userForm.areaCode"
            :mobile="userForm.mobile"
            :verify-result="verifyResult"
            @submit="handleVerifyModalSubmit"
            @stop="handleVerifyModalStop"
        />

        <div id="captcha" />
    </div>
</template>

<style src="./user-login.less" lang="less" scoped />

<script src="./user-login.ts" />
