<template>
    <div>
        <Header :title="$t('HELP_CENTER')" @left="$router.push('/mine/index')" />

        <p class="scb-none">{{ $t('COMMON.DEVELOPING') }}</p>
    </div>
</template>

<style src="./help-center.less" lang="less" scoped />

<script src="./help-center.ts" />
