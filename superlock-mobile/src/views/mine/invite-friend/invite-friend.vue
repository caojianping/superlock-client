<template>
    <div class="invite-friend">
        <Header title="" :is-border="false" @left="$router.back(-1)" />

        <div class="invite-rate" @click="openRateModal">
            <i class="icon icon-rate" />
            <span>{{ $t('MINE.RATE_SETTING') }}</span>
        </div>

        {{ ((userInfoObj = userInfo || {}), void 0) }}
        {{ ((referralLink = userInfoObj.referralLink || ''), void 0) }}
        <div class="invite-container">
            <p>{{ $t('MINE.SCAN_QRCODE') }}</p>
            <qriously class="invite-qrcode" :value="referralLink" :size="160" />
            <Button id="address" class="effect-shadow" type="primary" size="large" round :data-clipboard-text="referralLink">
                {{ $t('COMMON.COPY_ADDRESS') }}
            </Button>
        </div>

        <InvitePrompt v-model="isPromptShow" @confirm="handleInvitePromptConfirm" />

        <RateModal
            v-model="isRateShow"
            :uid="userInfoObj.userId"
            :defaultRateStats="defaultRateStats"
            @close="handleRateModalClose"
            @submit="handleRateModalSubmit"
        />
    </div>
</template>

<style src="./invite-friend.less" lang="less" scoped />

<script src="./invite-friend.ts" />
