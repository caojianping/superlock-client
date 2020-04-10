<template>
    <div class="withdraw-detail">
        <Header title="提现详情" @left="$router.push('/withdraw/record')" />

        <div v-if="withdraw !== undefined" class="scb-separator">
            <p v-if="withdraw === null" class="scb-none">暂无提现数据</p>
            <CellGroup v-else>
                <Cell title="交易单号" :value="withdraw.orderId" />
                <Cell title="交易hash" :value="withdraw.txhash" />
                <Cell title="提现时间" :value="withdraw.createTime | dateFormat" />
                <Cell title="提现币种" :value="withdraw.coin" />
                <Cell title="提现数量" :value="withdraw.amount" />
                <Cell title="提现地址" :value="withdraw.toAddress" />
                <Cell title="资金类型" :value="withdraw.capitalType" />
                <Cell title="可用余额" :value="`${withdraw.balance} ${withdraw.balanceCoin}`" />
                <Cell title="备注" :value="withdraw.memo" />
                <Cell title="状态" :value="withdraw.statusRemark" />
            </CellGroup>
        </div>
    </div>
</template>

<style src="./withdraw-detail.less" lang="less" scoped />

<script src="./withdraw-detail.ts" />
