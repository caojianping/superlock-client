<template>
    <div class="recharge-detail">
        <Header title="充值详情" @left="$router.push('/recharge/record')" />

        <div v-if="recharge !== undefined" class="scb-separator">
            <p v-if="recharge === null" class="scb-none">暂无充值数据</p>
            <CellGroup v-else>
                <Cell title="交易单号" :value="recharge.orderId" />
                <Cell title="交易hash" :value="recharge.txhash" />
                <Cell title="充值时间" :value="recharge.createTime | dateFormat" />
                <Cell title="充值币种" :value="recharge.payCoin" />
                <Cell title="充值数量" :value="recharge.payAmount" />
                <Cell title="充值汇率" :value="`1${recharge.payCoin} = ${recharge.exchangeRate}BCB`" />
                <Cell title="到账" :value="`${recharge.gotAmount} ${recharge.gotCoin}`" />
                <Cell title="资金类型" :value="recharge.capitalType" />
                <Cell title="可用余额" :value="`${recharge.balance} ${recharge.balanceCoin}`" />
                <Cell title="备注" :value="recharge.memo" />
                <Cell title="状态" :value="recharge.statusRemark" />
            </CellGroup>
        </div>
    </div>
</template>

<style src="./recharge-detail.less" lang="less" scoped />

<script src="./recharge-detail.ts" />
