<template>
    <div class="transaction-detail">
        <Header title="资金详情" @left="$router.push('/transaction/record')" />

        <div v-if="transaction !== undefined" class="scb-separator">
            <div v-if="transaction === null" class="scb-none">
                <img src="../../../assets/images/empty.png" alt="暂无资金详情数据" />
                <p>暂无资金详情数据</p>
            </div>
            <CellGroup v-else class="priority-value">
                <Cell :title="$t('COMMON.TRASACTION_ID')">
                    <p class="scb-copy" id="orderId" :data-clipboard-text="transaction.orderId">
                        <span>{{ transaction.orderId }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>

                <template v-if="type === 0">
                    <Cell :title="$t('COMMON.TRASACTION_HASH')"> :value="transaction.txhash" />
                    <Cell title="充值时间" :value="transaction.createTime | dateFormat" />
                    <Cell title="充值币种" :value="transaction.payCoin" />
                    <Cell title="充值数量" :value="transaction.payAmount" />
                    <Cell title="充值汇率" :value="`1${transaction.payCoin} = ${transaction.exchangeRate}BCB`" />
                    <Cell title="到账" :value="`${transaction.gotAmount} ${transaction.gotCoin}`" />
                </template>
                <template v-else-if="type === 10">
                    <Cell title="发款UID" :value="transaction.fromUid" />
                    <Cell title="收款UID" :value="transaction.toUid" />
                    <Cell title="转账币种" :value="transaction.coin" />
                    <Cell title="转账数量" :value="transaction.amount" />
                    <Cell title="转账时间" :value="transaction.createTime | dateFormat" />
                </template>
                <template v-else-if="type === 20">
                    <Cell :title="$t('COMMON.TRASACTION_HASH')" :value="transaction.txhash" />
                    <Cell title="提现时间" :value="transaction.createTime | dateFormat" />
                    <Cell title="提现币种" :value="transaction.coin" />
                    <Cell title="提现数量" :value="transaction.amount" />
                    <Cell title="提现地址" :value="transaction.toAddress" />
                </template>
                <template v-else>
                    <Cell title="交易类型" :value="transaction.typeRemark" />
                    <Cell title="交易时间" :value="transaction.createTime | dateFormat" />
                    <Cell title="交易币种" :value="transaction.coin" />
                    <Cell title="交易数量" :value="transaction.amount" />
                    <Cell :title="$t('COMMON.EXCHANGE_RATE')" :value="`1 ${transaction.coin} = ${transaction.exchangeRate} ${transaction.valuationCoin}`" />
                </template>

                <Cell :title="$t('COMMON.FUND_TYPE')" :value="transaction.capitalType" />
                <Cell :title="$t('COMMON.AVAILABLE_BALANCE')" :value="`${transaction.balance} ${transaction.balanceCoin}`" />
                <Cell :title="$t('COMMON.REMARK')" :value="transaction.memo" />
                <Cell :title="$t('COMMON.STATUS')" :value="transaction.statusRemark" />
            </CellGroup>
        </div>
    </div>
</template>

<style src="./transaction-detail.less" lang="less" scoped />

<script src="./transaction-detail.ts" />
