<template>
    <div class="login">
        <header>
            <img src="../../../assets/images/logo/logo-lg.png" alt="锁仓宝" />
            <h1>欢迎登录锁仓宝</h1>
        </header>

        <UserFields
            @change="handleUserFieldsChange"
            @stop="handleUserFieldsStop"
        >
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
        </UserFields>

        <p>
            <router-link to="/user/register">注册</router-link>
            <span>|</span>
            <router-link to="/user/forget">忘记密码</router-link>
        </p>

        <div id="captcha"></div>
    </div>
</template>

<style src="./user-login.less" lang="less" scoped />

<script src="./user-login.ts" />
