<template>
    <div class="register">
        <header>
            <h1>新用户注册</h1>
        </header>

        <UserFields
            v-if="registerStatus === 1"
            @change="handleUserFieldsChange"
            @stop="handleUserFieldsStop"
        >
            <Cell :border="false">
                <Button
                    class="btn-register"
                    type="primary"
                    size="large"
                    block
                    round
                    @click="register"
                >
                    立即注册
                </Button>
            </Cell>
            <Cell class="field-download">
                <Button
                    class="btn-download"
                    size="large"
                    block
                    round
                    @click="download"
                >
                    下载APP
                </Button>
            </Cell>
        </UserFields>

        <div v-if="registerStatus === 2" class="register-status success">
            <img
                src="../../../assets/images/register/success.png"
                alt="注册成功"
            />
            <h2>恭喜您，注册成功</h2>
            <Button class="btn btn-inverse btn-download" @click="download">
                下载APP
            </Button>
        </div>

        <div v-if="registerStatus === 3" class="register-status failure">
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

        <WechatPrompt />

        <div id="captcha"></div>
    </div>
</template>

<style src="./user-register.less" lang="less" scoped />

<script src="./user-register.ts" />
