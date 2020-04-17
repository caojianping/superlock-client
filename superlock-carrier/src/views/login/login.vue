<template>
    <div class="login">
        <div class="login-main">
            <h1 class="login-title">锁仓宝运营商管理系统</h1>

            <div class="login-content">
                <div class="login-banner"></div>

                <ul class="login-form">
                    <li>登录</li>
                    <li>
                        <label for="areaCode">国家、地区</label>
                        <ant-select
                            :value="loginForm.areaCode"
                            :options="areaCodeOptions"
                            showSearch
                            allowClear
                            placeholder="请选择国家、地区区号"
                            @change="handleFormChange('areaCode', $event)"
                            :filterOption="areaCodeFilterOption"
                        >
                            <ant-icon slot="prefix" type="user" />
                        </ant-select>
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
                            @keyup.enter="submit(false)"
                        >
                            <ant-icon slot="prefix" type="lock" />
                        </ant-input>
                    </li>

                    <li>
                        <ant-button type="primary" @click="submit(false)">登录</ant-button>
                    </li>
                </ul>
            </div>
        </div>

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./login.less" lang="less" scoped />

<script src="./login.ts" />
