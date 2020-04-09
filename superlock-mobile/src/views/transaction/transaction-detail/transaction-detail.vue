<template>
    <div class="transaction-detail">
        <Header title="资金详情" @left="$router.push('/transaction/record')" />

        <div v-if="transaction !== undefined" class="scb-separator">
            <p v-if="transaction === null" class="scb-none">暂无资金详情数据</p>
            <template v-else>
                <CellGroup v-if="type === 0">
                    <Cell title="交易单号" :value="transaction.orderId" />
                    <Cell title="交易hash" :value="transaction.txhash" />
                    <Cell
                        title="充值时间"
                        :value="transaction.createTime | dateFormat"
                    />
                    <Cell title="充值币种" :value="transaction.payCoin" />
                    <Cell title="充值数量" :value="transaction.payAmount" />
                    <Cell
                        title="充值汇率"
                        :value="
                            `1${transaction.payCoin} = ${transaction.exchangeRate}BCB`
                        "
                    />
                    <Cell
                        title="到账"
                        :value="
                            `${transaction.gotAmount} ${transaction.gotCoin}`
                        "
                    />
                    <Cell title="资金类型" :value="transaction.capitalType" />
                    <Cell
                        title="可用余额"
                        :value="
                            `${transaction.balance} ${transaction.balanceCoin}`
                        "
                    />
                    <Cell title="备注" :value="transaction.memo" />
                    <Cell title="状态" :value="transaction.statusRemark" />
                </CellGroup>
                <CellGroup v-else-if="type === 10">
                    <Cell title="交易单号" :value="transaction.orderId" />
                    <Cell title="发款UID" :value="transaction.fromUid" />
                    <Cell title="收款UID" :value="transaction.toUid" />
                    <Cell title="转账币种" :value="transaction.coin" />
                    <Cell title="转账数量" :value="transaction.amount" />
                    <Cell
                        title="转账时间"
                        :value="transaction.createTime | dateFormat"
                    />
                    <Cell title="资金类型" :value="transaction.capitalType" />
                    <Cell
                        title="可用余额"
                        :value="
                            `${transaction.balance} ${transaction.balanceCoin}`
                        "
                    />
                    <Cell title="备注" :value="transaction.memo" />
                    <Cell title="状态" :value="transaction.statusRemark" />
                </CellGroup>
                <CellGroup v-else-if="type === 20">
                    <Cell title="交易单号" :value="transaction.orderId" />
                    <Cell title="交易hash" :value="transaction.txhash" />
                    <Cell
                        title="提现时间"
                        :value="transaction.createTime | dateFormat"
                    />
                    <Cell title="提现币种" :value="transaction.coin" />
                    <Cell title="提现数量" :value="transaction.amount" />
                    <Cell title="提现地址" :value="transaction.toAddress" />
                    <Cell title="资金类型" :value="transaction.capitalType" />
                    <Cell
                        title="可用余额"
                        :value="
                            `${transaction.balance} ${transaction.balanceCoin}`
                        "
                    />
                    <Cell title="备注" :value="transaction.memo" />
                    <Cell title="状态" :value="transaction.statusRemark" />
                </CellGroup>
                <CellGroup v-else>
                    <Cell title="交易单号" :value="transaction.orderId" />
                    <Cell title="交易类型" :value="transaction.typeRemark" />
                    <Cell
                        title="交易时间"
                        :value="transaction.createTime | dateFormat"
                    />
                    <Cell title="交易币种" :value="transaction.coin" />
                    <Cell title="交易数量" :value="transaction.amount" />
                    <Cell
                        title="汇率"
                        :value="
                            `1 ${transaction.coin} = ${transaction.exchangeRate} ${transaction.valuationCoin}`
                        "
                    />
                    <Cell title="资金类型" :value="transaction.capitalType" />
                    <Cell
                        title="可用余额"
                        :value="
                            `${transaction.balance} ${transaction.balanceCoin}`
                        "
                    />
                    <Cell title="备注" :value="transaction.memo" />
                    <Cell title="状态" :value="transaction.statusRemark" />
                </CellGroup>
            </template>
        </div>
    </div>
</template>

<style src="./transaction-detail.less" lang="less" scoped />

<script src="./transaction-detail.ts" />
