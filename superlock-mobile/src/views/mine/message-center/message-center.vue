<template>
    <div>
        <Header :title="$t('MINE.MESSAGE_CENTER')" @left="$router.back(-1)" />

        <p class="scb-none">{{ $t('COMMON.DEVELOPING') }}</p>
    </div>
</template>

<style src="./message-center.less" lang="less" scoped />

<script src="./message-center.ts" />
