<template>
    <NavBar class="header" :border="isBorder">
        <slot v-if="isLeft" name="left" slot="left">
            <Icon name="arrow-left" @click="handleLeftClick" />
        </slot>
        <slot name="title" slot="title">{{ title }}</slot>
        <slot v-if="isRight" name="right" slot="right">
            <Icon name="wap-home" @click="handleRightClick" />
        </slot>
    </NavBar>
</template>

<style src="./header.less" lang="less" scoped />

<script src="./header.ts" />
