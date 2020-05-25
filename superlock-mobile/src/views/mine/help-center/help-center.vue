<template>
    <div>
        <Header :title="$t('HELP_CENTER')" @left="$router.back(-1)" />

        <p class="scb-none">{{ $t('COMMON.DEVELOPING') }}</p>
    </div>
</template>

<style src="./help-center.less" lang="less" scoped />

<script src="./help-center.ts" />
