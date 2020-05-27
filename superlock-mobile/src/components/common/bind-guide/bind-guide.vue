<template>
    <div v-if="isEmailBind === true || isRateSet === true" class="operate-guide">
        <Swipe autoplay="5000" duration="750" vertical indicator-color="transparent">
            <SwipeItem v-if="isEmailBind">
                <div class="guide-container">
                    <i class="icon icon-warning" />
                    <p class="flex-middle">
                        <span>{{ $t('COMMON.IMMEDIATELY_BIND_EMAIL') }}</span>
                    </p>
                    <router-link :to="{ path: '/security/email', query: { from: path } }">
                        <span>{{ $t('COMMON.GO_BIND') }}</span>
                        <i class="icon icon-jump" />
                    </router-link>
                </div>
            </SwipeItem>

            <SwipeItem v-if="isRateSet">
                <div class="guide-container">
                    <i class="icon icon-bulb" />
                    <p class="flex-middle">
                        <span>{{ $t('COMMON.IMMEDIATELY_SET_RATE') }}</span>
                    </p>
                    <router-link :to="{ path: '/team/index', query: { from: path } }">
                        <span>{{ $t('COMMON.GO_SETTING') }}</span>
                        <i class="icon icon-jump" />
                    </router-link>
                </div>
            </SwipeItem>
        </Swipe>
    </div>
</template>

<style src="./bind-guide.less" lang="less" scoped />

<script src="./bind-guide.ts" />
