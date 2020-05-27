<template>
    <div class="transaction-detail">
        <Header :title="$t('TRANSACTION.TRANSACTION_DETAIL')" @left="$router.push('/transaction/record')" />

        <div v-if="transaction !== undefined" class="scb-separator">
            <div v-if="transaction === null" class="scb-none">
                <img src="../../../assets/images/empty.png" :alt="$t('TRANSACTION.TRANSACTION_NO_DATA')" />
                <p>{{ $t('TRANSACTION.TRANSACTION_NO_DATA') }}</p>
            </div>
            <CellGroup v-else class="priority-value">
                <Cell :title="$t('COMMON.TRANSACTION_ID')">
                    <p class="scb-copy" id="transactionOrderId" :data-clipboard-text="transaction.orderId">
                        <span>{{ transaction.orderId }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>

                <template v-if="type === 0">
                    <Cell :title="$t('COMMON.TRANSACTION_HASH')">
                        <p class="scb-copy" id="transactionTxhash" :data-clipboard-text="transaction.txhash">
                            <span>{{ transaction.txhash }}</span>
                            <i v-if="transaction.txhash" class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell :title="$t('RECHARGE.RECHARGE_TIME')" :value="transaction.createTime | dateFormat" />
                    <Cell :title="$t('RECHARGE.RECHARGE_COIN')" :value="transaction.payCoin" />
                    <Cell :title="$t('RECHARGE.RECHARGE_AMOUNT')" :value="transaction.payAmount" />
                    <Cell :title="$t('RECHARGE.RECHARGE_RATE')" :value="`1${transaction.payCoin} = ${transaction.exchangeRate}BCB`" />
                    <Cell :title="$t('RECHARGE.TO_ACCOUNT')" :value="`${transaction.gotAmount} ${transaction.gotCoin}`" />
                </template>
                <template v-else-if="type === 10">
                    <Cell :title="$t('TRANSFER.FROM_UID')" :value="transaction.fromUid" />
                    <Cell :title="$t('TRANSFER.TO_UID')" :value="transaction.toUid" />
                    <Cell :title="$t('TRANSFER.TRANSFER_COIN')" :value="transaction.coin" />
                    <Cell :title="$t('TRANSFER.TRANSFER_AMOUNT')" :value="transaction.amount" />
                    <Cell :title="$t('TRANSFER.TRANSFER_TIME')" :value="transaction.createTime | dateFormat" />
                </template>
                <template v-else-if="type === 20">
                    <Cell :title="$t('COMMON.TRANSACTION_HASH')">
                        <p class="scb-copy" id="transactionTxhash" :data-clipboard-text="transaction.txhash">
                            <span>{{ transaction.txhash }}</span>
                            <i v-if="transaction.txhash" class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell :title="$t('WITHDRAW.WITHDRAW_TIME')" :value="transaction.createTime | dateFormat" />
                    <Cell :title="$t('WITHDRAW.WITHDRAW_COIN')" :value="transaction.coin" />
                    <Cell :title="$t('WITHDRAW.WITHDRAW_AMOUNT')" :value="transaction.amount" />
                    <Cell :title="$t('COMMON.WITHDRAW_ADDRESS')" :value="transaction.toAddress" />
                </template>
                <template v-else>
                    <Cell :title="$t('TRANSACTION.TRANSACTION_TYPE')" :value="$t(`TRANSACTION.TRANSACTION_TYPES.${type}`)" />
                    <Cell :title="$t('TRANSACTION.TRANSACTION_TIME')" :value="transaction.createTime | dateFormat" />
                    <Cell :title="$t('TRANSACTION.TRANSACTION_COIN')" :value="transaction.coin" />
                    <Cell :title="$t('TRANSACTION.TRANSACTION_AMOUNT')" :value="transaction.amount" />
                    <Cell
                        :title="$t('COMMON.EXCHANGE_RATE')"
                        :value="`1 ${transaction.coin} = ${transaction.exchangeRate} ${transaction.valuationCoin}`"
                    />
                </template>

                <Cell :title="$t('COMMON.FUND_TYPE')" :value="fundTypes.get(transaction.capitalType)" />
                <Cell :title="$t('COMMON.AVAILABLE_BALANCE')" :value="`${transaction.balance} ${transaction.balanceCoin}`" />
                <Cell :title="$t('COMMON.REMARK')" :value="transaction.memo" />
                <Cell :title="$t('COMMON.STATUS')" :value="dataStatuses.get(transaction.statusRemark)" />
            </CellGroup>
        </div>
    </div>
</template>

<style src="./transaction-detail.less" lang="less" scoped />

<script src="./transaction-detail.ts" />
