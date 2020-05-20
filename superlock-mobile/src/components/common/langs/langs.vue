<template>
    <div class="langs">
        <span :class="{ active: activeLang === 'zh' }" @click="toggleLang('zh')">中文</span>
        <i>/</i>
        <span :class="{ active: activeLang === 'en' }" @click="toggleLang('en')">English</span>
    </div>
</template>

<style src="./langs.less" lang="less" scoped />

<script src="./langs.ts" />
