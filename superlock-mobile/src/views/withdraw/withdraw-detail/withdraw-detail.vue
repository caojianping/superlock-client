<template>
    <div class="withdraw-detail">
        <Header title="提现详情">
            <span slot="right"></span>
        </Header>

        <CellGroup class="separator">
            <Cell title="交易单号" :value="withdraw.orderId" />
            <Cell title="交易hash" :value="withdraw.txhash" />
            <Cell title="提现时间" :value="withdraw.createTime | dateFormat" />
            <Cell title="提现币种" :value="withdraw.coin" />
            <Cell title="提现数量" :value="withdraw.amount" />
            <Cell title="提现地址" :value="withdraw.toAddress" />
            <Cell title="资金类型" :value="withdraw.capitalType" />
            <Cell
                title="可用余额"
                :value="`${withdraw.balance} ${withdraw.balanceCoin}`"
            />
            <Cell title="备注" :value="withdraw.memo" />
            <Cell title="状态" :value="['失败', '成功'][withdraw.status]" />
        </CellGroup>
    </div>
</template>

<style src="./withdraw-detail.less" lang="less" scoped />

<script src="./withdraw-detail.ts" />
