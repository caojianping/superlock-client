<template>
    <div class="scb-gray setting-center">
        <Header :title="$t('MINE.SETTING_CENTER')" @left="$router.push('/mine/index')" />

        <CellGroup class="scb-separator">
            <Cell :title="$t('MINE.LANGUAGE')" is-link to="/lang/center" />
            <!-- <Cell title="关于我们" is-link /> -->
        </CellGroup>

        <div class="logout effect-ripple" @click="logout">{{ $t('MINE.LOGOUT') }}</div>
    </div>
</template>

<style src="./setting-center.less" lang="less" scoped />

<script src="./setting-center.ts" />
