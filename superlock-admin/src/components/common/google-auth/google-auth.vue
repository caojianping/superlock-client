<template>
    <ant-modal v-model="isModalShow" :title="title" :width="700" :footer="null" :style="{ top: '32px' }" @cancel="handleModalCancel">
        <ul class="steps">
            <li class="step-item flex">
                <div class="step-number">第一步</div>
                <div class="step-content">
                    <h2 class="step-title">
                        请先在你的手机上安装谷歌验证器（Google Authenticator）
                    </h2>
                    <div class="step-note setup">
                        <a class="setup-link" :href="googlePlayUrl" target="_blank">
                            <img src="@/assets/images/google-auth/google-play.png" alt="Google Play" />
                        </a>
                        <a class="setup-link" :href="appStoreUrl" target="_blank">
                            <img src="@/assets/images/google-auth/app-store.png" alt="App Store" />
                        </a>
                    </div>
                </div>
            </li>

            <li class="step-item flex">
                <div class="step-number">第二步</div>
                <div class="step-content">
                    <h2 class="step-title">
                        使用谷歌验证器APP扫描二维码，或添加密文进行手工验证
                    </h2>
                    <div class="step-note gakey">
                        <div class="gakey-container">
                            <ant-input class="gakey-input" :value="gakey" disabled></ant-input>
                            <span class="gakey-btn" @click="refreshGoogleKey">刷新</span>
                        </div>
                        <qriously :value="qrcode" :size="160" />
                    </div>
                </div>
            </li>

            <li class="step-item flex">
                <div class="step-number">第三步</div>
                <div class="step-content">
                    <h2 class="step-title">
                        填入手机显示的动态密码以激活谷歌两部验证：
                    </h2>
                    <div class="step-note gacode">
                        <ant-input
                            class="gacode-input"
                            :value="gacode"
                            allowClear
                            v-focus
                            placeholder="请输入动态密码"
                            @change="handleFormChange('gacode', $event)"
                            @keyup.enter="submit"
                        ></ant-input>
                        <ant-button class="gacode-btn" type="primary" :disabled="isDisabled" :loading="isLoading" @click="submit">确定</ant-button>
                    </div>
                </div>
            </li>
        </ul>
    </ant-modal>
</template>

<style src="./google-auth.less" lang="less" scoped />

<script src="./google-auth.ts" />
