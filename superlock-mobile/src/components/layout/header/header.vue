<template>
    <NavBar
        class="header"
        :left-arrow="true"
        :border="border"
        @click-left="goBack"
    >
        <slot name="title" slot="title">{{ title }}</slot>
        <slot name="right" slot="right">
            <Icon name="wap-home" @click="goHome" />
        </slot>
    </NavBar>
</template>

<style src="./header.less" lang="less" scoped />

<script src="./header.ts" />
