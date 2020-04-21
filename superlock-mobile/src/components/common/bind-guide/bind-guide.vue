<template>
    <div class="bind-guide">
        <div class="bind-guide-container flex">
            <div class="bind-guide-title">
                <i class="icon icon-warning" />
                <span>为了您的账户安全请立刻绑定邮箱</span>
            </div>
            <router-link class="bind-guide-icon" :to="{ path: '/security/email', query: { from: path } }">
                <span>去绑定</span>
                <i class="icon icon-bind" />
            </router-link>
        </div>
    </div>
</template>

<style src="./bind-guide.less" lang="less" scoped />

<script src="./bind-guide.ts" />
