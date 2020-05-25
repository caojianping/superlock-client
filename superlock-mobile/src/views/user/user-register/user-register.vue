<template>
    <div class="register">
        <Langs />

        <header class="register-header">
            <h1>{{ $t('USER.NEW_USER_REGISTER') }}</h1>
        </header>

        <UserForm v-if="registerStatus === 1" @change="handleUserFormChange">
            <Cell class="field-register" :border="false">
                <Button class="effect-shadow" type="primary" size="large" block round @click="submit">
                    {{ $t('USER.IMMEDIATELY_REGISTER') }}
                </Button>
            </Cell>

            <Cell class="field-download">
                <Button class="effect-shadow" size="large" block round @click="download">
                    {{ $t('USER.DOWNLOAD_APP') }}
                </Button>

                <p class="register-prompt">
                    {{ $t('USER.EXIST_ACCOUNT') }}，
                    <router-link class="scb-link" :to="`/user/login?code=${invitationCode}`">
                        {{ $t('USER.IMMEDIATELY_LOGIN') }}
                    </router-link>
                </p>
            </Cell>
        </UserForm>

        <div v-if="registerStatus === 2" class="register-status success">
            <img src="../../../assets/images/register/success.png" :alt="$t('USER.REGISTER_SUCCESS')" />
            <h2>{{ $t('USER.CONGRATULATIONS_REGISTER_SUCCESS') }}</h2>
            <Button class="effect-shadow" type="primary" size="large" block round :to="`/user/login?code=${invitationCode}`">
                {{ $t('USER.IMMEDIATELY_LOGIN') }}
            </Button>
            <Button class="effect-shadow" size="large" block round @click="download" style="margin-top: 1.5rem">
                {{ $t('USER.DOWNLOAD_APP') }}
            </Button>
        </div>

        <div v-if="registerStatus === 3" class="register-status failure">
            <img src="../../../assets/images/register/failure.png" :alt="$t('USER.INVITE_CODE_EXPIRED')" />
            <h2>{{ $t('USER.INVITE_CODE_EXPIRED') }}</h2>
        </div>

        <div v-if="registerStatus === 4" class="register-status unopen">
            <img src="../../../assets/images/register/unopen.png" :alt="$t('USER.UNOPEN_REGISTER')" />
            <h2>{{ $t('USER.UNOPEN_REGISTER') }}</h2>
        </div>

        <WechatPrompt />

        <VerifyList
            v-model="isVerifyShow"
            :area-code="userForm.areaCode"
            :mobile="userForm.mobile"
            :verify-result="verifyResult"
            from="/user/register"
            @submit="handleVerifyListSubmit"
            @stop="handleVerifyListStop"
        />

        <div id="captcha" />
    </div>
</template>

<style src="./user-register.less" lang="less" scoped />

<script src="./user-register.ts" />
