<template>
    <div class="setting-center scb-gray">
        <Header title="设置中心" @left="$router.back(-1)" />

        <CellGroup class="separator">
            <Cell title="语言" is-link />
            <Cell title="关于我们" is-link />
        </CellGroup>

        <div class="logout effect-ripple" @click="logout">退出登录</div>
    </div>
</template>

<style src="./setting-center.less" lang="less" scoped />

<script src="./setting-center.ts" />
