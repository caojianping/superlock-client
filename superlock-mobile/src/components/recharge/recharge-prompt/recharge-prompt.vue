<template>
    <div class="recharge-prompt">
        <p>{{ $t('RECHARGE.TIP01') }}</p>
        <p>{{ $t('RECHARGE.TIP02') }}</p>
        <p>{{ $t('RECHARGE.TIP03') }}</p>
        <p v-if="rechargeCoin !== 'BCB'">{{ $t('RECHARGE.TIP04', { amount: minAmount, coin: rechargeCoin }) }}</p>
    </div>
</template>

<style src="./recharge-prompt.less" lang="less" scoped />

<script src="./recharge-prompt.ts" />
