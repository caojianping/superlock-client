<template>
    <div class="recharge-detail">
        <Header
            title="充值详情"
            @left="$router.push('/recharge/record')"
        />

        <CellGroup class="separator">
            <Cell title="交易单号" :value="recharge.orderId" />
            <Cell title="交易hash" :value="recharge.txhash" />
            <Cell title="充值时间" :value="recharge.createTime | dateFormat" />
            <Cell title="充值币种" :value="recharge.payCoin" />
            <Cell title="充值数量" :value="recharge.payAmount" />
            <Cell title="充值汇率" :value="recharge.exchangeRate" />
            <Cell
                title="到账"
                :value="`${recharge.gotAmount} ${recharge.gotCoin}`"
            />
            <Cell title="资金类型" :value="recharge.capitalType" />
            <Cell
                title="可用余额"
                :value="`${recharge.balance} ${recharge.balanceCoin}`"
            />
            <Cell title="备注" :value="recharge.memo" />
            <Cell title="状态" :value="['失败', '成功'][recharge.status]" />
        </CellGroup>
    </div>
</template>

<style src="./recharge-detail.less" lang="less" scoped />

<script src="./recharge-detail.ts" />
