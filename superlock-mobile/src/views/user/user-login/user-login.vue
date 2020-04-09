<template>
    <div class="login">
        <header>
            <img src="../../../assets/images/logo/logo-lg.png" alt="锁仓宝" />
            <h1>欢迎登录锁仓宝</h1>
        </header>

        <UserForm @change="handleUserFormChange" @stop="handleUserFormStop">
            <Cell>
                <Button
                    class="btn-login effect-shadow"
                    type="primary"
                    size="large"
                    block
                    round
                    @click="login"
                    >登&nbsp;录</Button
                >
            </Cell>
        </UserForm>

        <p>
            <router-link :to="`/user/register?code=${code}`">注册</router-link>
            <span>|</span>
            <a href="javascript: void(0)" @click="goForget">忘记密码</a>
        </p>

        <div id="captcha"></div>
    </div>
</template>

<style src="./user-login.less" lang="less" scoped />

<script src="./user-login.ts" />
