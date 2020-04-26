<template>
    <div class="recharge-code">
        <Header :title="`${rechargeCoin}充值地址`" isRight @left="$router.push('/asset/index')">
            <router-link slot="right" to="/recharge/record">明细</router-link>
        </Header>

        <div class="recharge-code-container scb-separator">
            <div class="recharge-code-content">
                <h1 :class="{ special: rechargeCoin !== 'BCB' }">扫一扫，向我付款</h1>
                <h2 v-if="rechargeCoin !== 'BCB'">最小充值数量：{{ minAmount }}个{{ rechargeCoin }}</h2>
                <qriously :value="rechargeAddressQrcode" :size="180" />
                <p>{{ rechargeAddress }}</p>
                <Button id="address" class="effect-tripple" type="primary" size="small" round :data-clipboard-text="rechargeAddress">复制地址</Button>
            </div>
        </div>

        {{ ((exchangeRateObj = exchangeRate || {}), void 0) }}
        <div v-if="rechargeCoin !== 'BCB'" class="recharge-exchange-rate">
            <p>当前参考汇率：{{ `1 ${exchangeRateObj.fromCoin || '--'} = ${exchangeRateObj.rate || '--'} ${exchangeRateObj.toCoin || '--'}` }}</p>
            <p>所有转入的币种都将折算为BCB</p>
        </div>

        <RechargePrompt :recharge-coin="rechargeCoin" :min-amount="minAmount" />
    </div>
</template>

<style src="./recharge-code.less" lang="less" scoped />

<script src="./recharge-code.ts" />
