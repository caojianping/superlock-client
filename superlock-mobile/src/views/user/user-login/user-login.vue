<template>
    <div class="login">
        <div class="contact-service" @click="goCustomerService">
            <i class="icon icon-service-inverse" />
            <span>联系客服</span>
        </div>

        <header>
            <img src="../../../assets/images/logo/logo-lg.png" alt="锁仓宝" />
            <h1>欢迎登录锁仓宝</h1>
        </header>

        <UserForm @change="handleUserFormChange">
            <Cell>
                <Button class="btn-login effect-shadow" type="primary" size="large" block round @click="submit">登&nbsp;录</Button>
            </Cell>
        </UserForm>

        <p>
            <router-link :to="`/user/register?code=${invitationCode}`">注册</router-link>
            <span>|</span>
            <a href="javascript: void(0)" @click="goForget">忘记密码</a>
        </p>

        <VerifyList
            v-model="isVerifyShow"
            :area-code="userForm.areaCode"
            :mobile="userForm.mobile"
            :verify-result="verifyResult"
            @submit="handleVerifyListSubmit"
            @stop="handleVerifyListStop"
        />

        <div id="captcha"></div>
    </div>
</template>

<style src="./user-login.less" lang="less" scoped />

<script src="./user-login.ts" />
