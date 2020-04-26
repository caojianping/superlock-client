<template>
    <div class="recharge-prompt">
        <p>请勿向上述地址充值任何非该币种的资产，否则资产将不可找回。</p>
        <p>您充值至上述地址后，需要整个网络节点的确认后才能到账。</p>
        <p>您的充值地址不会经常改变，可重复充值。</p>
        <p v-if="rechargeCoin !== 'BCB'">最小充值数量：{{ minAmount }}个{{ rechargeCoin }}，小于最小数量的充值将不会到账，且无法退还</p>
    </div>
</template>

<style src="./recharge-prompt.less" lang="less" scoped />

<script src="./recharge-prompt.ts" />
