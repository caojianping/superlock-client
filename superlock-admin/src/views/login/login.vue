<template>
    <div class="login">
        <div class="login-main">
            <h1 class="login-title">锁仓宝后台管理系统</h1>

            <div class="login-content">
                <div class="login-banner"></div>

                <ul class="login-form">
                    <li>登录</li>
                    <li>
                        <label for="username">用户名</label>
                        <ant-input
                            ref="username"
                            id="username"
                            type="text"
                            :value="loginForm.username"
                            allowClear
                            placeholder="请输入用户名"
                            @change="handleFormChange('username', $event)"
                            @keyup.enter="submit(true, false)"
                        >
                            <ant-icon slot="prefix" type="user" />
                        </ant-input>
                    </li>

                    <li>
                        <label for="password">密码</label>
                        <ant-input
                            id="password"
                            type="password"
                            :value="loginForm.password"
                            allowClear
                            placeholder="请输入密码"
                            @change="handleFormChange('password', $event)"
                            @keyup.enter="submit(true, false)"
                        >
                            <ant-icon slot="prefix" type="lock" />
                        </ant-input>
                    </li>

                    <li>
                        <ant-button type="primary" @click="submit(true, false)">登录</ant-button>
                    </li>
                </ul>
            </div>
        </div>

        <GoogleAuth :is-show="isGoogleAuthShow" :login-form="loginForm" @submit="handleGoogleAuthSubmit" />

        <SecondVerify :is-show="isSecondVerifyShow" @submit="submit(false, true)" />
    </div>
</template>

<style src="./login.less" lang="less" scoped />

<script src="./login.ts" />
