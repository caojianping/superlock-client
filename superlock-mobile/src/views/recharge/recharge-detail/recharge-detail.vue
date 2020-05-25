<template>
    <div class="recharge-detail">
        <Header :title="$t('RECHARGE.RECHARGE_DETAIL')" @left="$router.push('/recharge/record')" />

        <div v-if="recharge !== undefined" class="scb-separator">
            <div v-if="recharge === null" class="scb-none">
                <img src="../../../assets/images/empty.png" :alt="$t('RECHARGE.RECHARGE_NO_DATA')" />
                <p>{{ $t('RECHARGE.RECHARGE_NO_DATA') }}</p>
            </div>
            <CellGroup v-else class="priority-value">
                <Cell :title="$t('COMMON.TRANSACTION_ID')">
                    <p class="scb-copy" id="orderId" :data-clipboard-text="recharge.orderId">
                        <span>{{ recharge.orderId }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell :title="$t('COMMON.TRANSACTION_HASH')">
                    <p class="scb-copy" id="txhash" :data-clipboard-text="recharge.txhash">
                        <span>{{ recharge.txhash }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell :title="$t('RECHARGE.RECHARGE_TIME')" :value="recharge.createTime | dateFormat" />
                <Cell :title="$t('RECHARGE.RECHARGE_COIN')" :value="recharge.payCoin" />
                <Cell :title="$t('RECHARGE.RECHARGE_AMOUNT')" :value="recharge.payAmount" />
                <Cell :title="$t('RECHARGE.RECHARGE_RATE')" :value="`1${recharge.payCoin} = ${recharge.exchangeRate}BCB`" />
                <Cell :title="$t('RECHARGE.TO_ACCOUNT')" :value="`${recharge.gotAmount} ${recharge.gotCoin}`" />
                <Cell :title="$t('COMMON.FUND_TYPE')" :value="fundTypes.get(recharge.capitalType)" />
                <Cell :title="$t('COMMON.AVAILABLE_BALANCE')" :value="`${recharge.balance} ${recharge.balanceCoin}`" />
                <Cell :title="$t('COMMON.REMARK')" :value="recharge.memo" />
                <Cell :title="$t('COMMON.STATUS')" :value="dataStatuses.get(recharge.statusRemark)" />
            </CellGroup>
        </div>
    </div>
</template>

<style src="./recharge-detail.less" lang="less" scoped />

<script src="./recharge-detail.ts" />
