<template>
    <Modal class="password-modal" v-model="isShow" @close="handleModalClose">
        <template slot="header">
            <h2>{{ $t('COMMON.FUND_PASSWORD') }}</h2>
            <p>{{ $t('COMMON.ENTER_FUND_AND_AUTH') }}</p>
        </template>

        <div class="scb-input">
            <input type="password" v-model="password" :placeholder="$t('PLACEHOLDERS.ENTER_FUND_PASSWORD')" />
        </div>

        <template slot="footer">
            <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('COMMON.CONFIRM') }}</Button>
        </template>
    </Modal>
</template>

<style src="./password-modal.less" lang="less" scoped />

<script src="./password-modal.ts" />
