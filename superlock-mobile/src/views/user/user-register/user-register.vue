<template>
    <div class="register">
        <div class="register-container">
            <h1 class="register-title">立即注册</h1>
            <div class="register-body">
                <ul v-if="registerStatus === 1" class="register-form">
                    <li class="flex">
                        <div class="flex-2">
                            <div class="area-code" @click="openAreaModal">
                                <span>{{
                                    `+${activeAreaCode.code} ${activeAreaCode.name}`
                                }}</span>
                                <i></i>
                            </div>
                        </div>
                        <div class="flex-3">
                            <input
                                type="text"
                                v-model="registerForm.mobile"
                                placeholder="请输入手机号"
                            />
                        </div>
                    </li>
                    <li>
                        <input
                            class="block"
                            type="password"
                            v-model="registerForm.password"
                            placeholder="请输入登录密码"
                        />
                    </li>
                    <li class="flex">
                        <div class="flex-3">
                            <input
                                type="text"
                                v-model="registerForm.smsCode"
                                placeholder="请输入短信验证码"
                            />
                        </div>
                        <div class="flex-2">
                            <span
                                v-if="!isSending && !isLoading"
                                class="sms-code"
                                @click="sendSmsCode"
                                >{{ countdownText }}</span
                            >
                            <span
                                v-if="isSending && isLoading"
                                class="sms-code"
                                @click="sendSmsCode"
                            >
                                <Loading type="spinner" size="1.25rem" />
                            </span>
                            <span
                                v-if="isSending && !isLoading"
                                class="sms-code disabled"
                                >{{ countdownText }}</span
                            >
                        </div>
                    </li>
                    <li>
                        <button class="btn btn-register" @click="register">
                            立即注册
                        </button>
                    </li>
                    <li>
                        <button
                            class="btn btn-inverse btn-download"
                            @click="download"
                        >
                            下载APP
                        </button>
                    </li>
                </ul>

                <div
                    v-if="registerStatus === 2"
                    class="register-status success"
                >
                    <img
                        src="../../../assets/images/register/success.png"
                        alt="注册成功"
                    />
                    <h2>恭喜您，注册成功</h2>
                    <button
                        class="btn btn-inverse btn-download"
                        @click="download"
                    >
                        下载APP
                    </button>
                </div>

                <div
                    v-if="registerStatus === 3"
                    class="register-status failure"
                >
                    <img
                        src="../../../assets/images/register/failure.png"
                        alt="邀请注册失效"
                    />
                    <h2>邀请注册失效</h2>
                </div>

                <div v-if="registerStatus === 4" class="register-status unopen">
                    <img
                        src="../../../assets/images/register/unopen.png"
                        alt="注册未开放"
                    />
                    <h2>当前未开放注册</h2>
                </div>
            </div>
        </div>

        <AreaModal v-model="isShow" @change="handleAreaModalChange" />

        <WechatPrompt />

        <div id="captcha"></div>
    </div>
</template>

<style src="./user-register.less" lang="less" scoped />

<script src="./user-register.ts" />
