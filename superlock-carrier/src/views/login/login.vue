<template>
    <div class="login">
        <div class="login-main">
            <h1 class="login-title">锁仓宝运营商管理系统</h1>

            <div class="login-content">
                <div class="login-banner"></div>

                <ul class="login-form">
                    <li>登录</li>
                    <!-- <li>
                        <label for="areaCode">国家、地区</label>
                        <ant-select
                            :value="loginForm.areaCode"
                            :options="areaCodeOptions"
                            showSearch
                            allowClear
                            placeholder="请选择国家、地区区号"
                            @change="handleFormChange('areaCode', $event)"
                            :filterOption="areaCodeFilterOption"
                        />
                    </li>
                    <li>
                        <label for="mobile">手机号</label>
                        <ant-input
                            ref="mobile"
                            id="mobile"
                            type="text"
                            :value="loginForm.mobile"
                            allowClear
                            placeholder="请输入手机号"
                            @change="handleFormChange('mobile', $event)"
                            @keyup.enter="submit(false)"
                        >
                            <ant-icon slot="prefix" type="phone" />
                        </ant-input>
                    </li> -->

                    <li>
                        <label for="email">邮箱</label>
                        <ant-input
                            ref="email"
                            id="email"
                            type="text"
                            :value="loginForm.email"
                            allowClear
                            placeholder="请输入邮箱"
                            @change="handleFormChange('email', $event)"
                            @keyup.enter="submit(true, false)"
                        >
                            <ant-icon slot="prefix" type="mail" />
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

        <VerifyModal is-login :is-show="isSecondVerifyShow" @submit="submit(false, true)" />
    </div>
</template>

<style src="./login.less" lang="less" scoped />

<script src="./login.ts" />
