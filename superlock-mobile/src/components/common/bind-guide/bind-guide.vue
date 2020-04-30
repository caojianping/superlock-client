<template>
    <div v-if="isEmailBind === true || isRateSet === true" class="operate-guide">
        <Swipe autoplay="5000" duration="750" vertical indicator-color="transparent">
            <SwipeItem v-if="isEmailBind">
                <div class="guide-container flex">
                    <div class="guide-title">
                        <i class="icon icon-warning" />
                        <span>为了您的账户安全请立刻绑定邮箱</span>
                    </div>
                    <router-link class="guide-icon" :to="{ path: '/security/email', query: { from: path } }">
                        <span>去绑定</span>
                        <i class="icon icon-bind" />
                    </router-link>
                </div>
            </SwipeItem>

            <SwipeItem v-if="isRateSet">
                <div class="guide-container flex">
                    <div class="guide-title">
                        <i class="icon icon-bulb" />
                        <span>有新的锁仓项目，快去给下级设置利率吧</span>
                    </div>
                    <router-link class="guide-icon" :to="{ path: '/team/index', query: { from: path } }">
                        <span>去设置</span>
                        <i class="icon icon-bind" />
                    </router-link>
                </div>
            </SwipeItem>
        </Swipe>
    </div>
</template>

<style src="./bind-guide.less" lang="less" scoped />

<script src="./bind-guide.ts" />
