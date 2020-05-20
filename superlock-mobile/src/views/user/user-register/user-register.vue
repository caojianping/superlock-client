<template>
    <div class="register">
        <Langs />

        <header>
            <h1>新用户注册</h1>
        </header>

        <UserForm v-if="registerStatus === 1" @change="handleUserFormChange">
            <Cell class="field-register" :border="false">
                <Button class="effect-shadow" type="primary" size="large" block round @click="submit">
                    立即注册
                </Button>
            </Cell>

            <Cell class="field-download">
                <Button class="effect-shadow" size="large" block round @click="download">
                    下载APP
                </Button>

                <p class="register-prompt">
                    已有账号，
                    <router-link class="scb-link" :to="`/user/login?code=${invitationCode}`">立即登录</router-link>
                </p>
            </Cell>
        </UserForm>

        <div v-if="registerStatus === 2" class="register-status success">
            <img src="../../../assets/images/register/success.png" alt="注册成功" />
            <h2>恭喜您，注册成功</h2>
            <Button class="effect-shadow" type="primary" size="large" block round :to="`/user/login?code=${invitationCode}`">
                立即登录
            </Button>
            <Button class="effect-shadow" size="large" block round @click="download" style="margin-top: 1.5rem">
                下载APP
            </Button>
        </div>

        <div v-if="registerStatus === 3" class="register-status failure">
            <img src="../../../assets/images/register/failure.png" alt="邀请注册失效" />
            <h2>邀请注册失效</h2>
        </div>

        <div v-if="registerStatus === 4" class="register-status unopen">
            <img src="../../../assets/images/register/unopen.png" alt="注册未开放" />
            <h2>当前未开放注册</h2>
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

        <div id="captcha"></div>
    </div>
</template>

<style src="./user-register.less" lang="less" scoped />

<script src="./user-register.ts" />
