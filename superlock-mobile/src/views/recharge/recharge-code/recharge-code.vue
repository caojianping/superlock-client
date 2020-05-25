<template>
    <div class="recharge-code">
        <Header :title="`${rechargeCoin}${$t('COMMON.RECHARGE_ADDRESS')}`" is-right @left="$router.push(from)">
            <router-link slot="right" to="/recharge/record">{{ $t('COMMON.DETAILS') }}</router-link>
        </Header>

        <div class="recharge-code-container scb-separator">
            <div class="recharge-code-content">
                <h1 :class="{ special: rechargeCoin !== 'BCB' }">{{ $t('RECHARGE.SCAN_PAY_ME') }}</h1>
                <h2 v-if="rechargeCoin !== 'BCB'">{{ $t('COMMON.PIECE') }}：{{ minAmount }}个{{ rechargeCoin }}</h2>
                <qriously :value="rechargeAddressQrcode" :size="180" />
                <p>{{ rechargeAddress }}</p>
                <Button id="address" class="effect-tripple" type="primary" size="small" round :data-clipboard-text="rechargeAddress">
                    {{ $t('COMMON.COPY_ADDRESS') }}
                </Button>
            </div>
        </div>

        {{ ((exchangeRateObj = exchangeRate || {}), void 0) }}
        <div v-if="rechargeCoin !== 'BCB'" class="recharge-exchange-rate">
            <p>
                {{ $t('RECHARGE.CURRENT_REFERENCE_RATE') }}：
                {{ `1 ${exchangeRateObj.fromCoin || '--'} = ${exchangeRateObj.rate || '--'} ${exchangeRateObj.toCoin || '--'}` }}
            </p>
            <p>{{ $t('RECHARGE.PROMPT') }}</p>
        </div>

        <RechargePrompt :recharge-coin="rechargeCoin" :min-amount="minAmount" />
    </div>
</template>

<style src="./recharge-code.less" lang="less" scoped />

<script src="./recharge-code.ts" />
