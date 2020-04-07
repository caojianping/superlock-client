<template>
    <div class="transaction-detail">
        <Header title="资金明细" @left="$router.push('/transaction/record')" />

        <CellGroup class="separator">
            <Cell title="交易单号" :value="transaction.orderId" />
            <Cell title="交易类型" :value="transaction.type" />
            <Cell title="充值时间" :value="transaction.createTime | dateFormat" />
            <Cell title="充值币种" :value="transaction.coin" />
            <Cell title="充值总价值" :value="transaction.amount" />
            <Cell
                title="汇率"
                :value="`1${transaction.payCoin} = ${transaction.exchangeRate}BCB`"
            />
            <Cell title="资金类型" :value="transaction.capitalType" />
            <Cell
                title="可用余额"
                :value="`${transaction.balance} ${transaction.balanceCoin}`"
            />
            <Cell title="备注" :value="transaction.remark" />
            <Cell title="状态" :value="transaction.statusRemark" />
        </CellGroup>
    </div>
</template>

<style src="./transaction-detail.less" lang="less" scoped />

<script src="./transaction-detail.ts" />
