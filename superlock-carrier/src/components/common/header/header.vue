<template>
    <header class="header">
        <router-link class="logo" to="/home">
            <img src="@/assets/logo.png" alt="锁仓宝" />
        </router-link>

        <a class="logout" href="javascript: void(0)" @click="logout">
            <i class="icon icon-logout"></i>
            <span>退出</span>
        </a>
        <p class="welcome">Hi，{{ tokenInfo.username }}，欢迎您的登录！</p>
    </header>
</template>

<style src="./header.less" lang="less" scoped />

<script src="./header.ts" />
