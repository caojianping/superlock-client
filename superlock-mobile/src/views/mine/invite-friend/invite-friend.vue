<template>
    <div class="invite-friend">
        <Header title="" :isBorder="false" @left="$router.back(-1)" />

        <div class="invite-rate" @click="openRateModal">
            <i class="icon icon-rate" />
            <span>利率设置</span>
        </div>

        {{ ((referralLink = userInfo.referralLink || ''), void 0) }}
        <div class="invite-container">
            <p>扫描二维码</p>
            <qriously class="invite-qrcode" :value="referralLink" :size="160" />
            <Button
                id="copy"
                class="effect-shadow"
                type="primary"
                size="large"
                round
                :data-clipboard-text="referralLink"
                >复制地址</Button
            >
        </div>

        <InvitePrompt
            v-model="isPromptShow"
            @confirm="handleInvitePromptConfirm"
        />

        <RateModal
            v-model="isRateShow"
            :uid="userInfo.userId"
            :defaultRateStats="defaultRateStats"
            @close="handleRateModalClose"
            @submit="handleRateModalSubmit"
        />
    </div>
</template>

<style src="./invite-friend.less" lang="less" scoped />

<script src="./invite-friend.ts" />
