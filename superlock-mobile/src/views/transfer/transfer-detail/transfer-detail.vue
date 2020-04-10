<template>
    <div class="transfer-detail">
        <Header title="转账详情" @left="$router.push('/transfer/record')" />

        <div v-if="transfer !== undefined" class="scb-separator">
            <p v-if="transfer === null" class="scb-none">暂无转账数据</p>
            <CellGroup v-else>
                <Cell title="交易单号" :value="transfer.orderId" />
                <Cell title="发款UID" :value="transfer.fromUid" />
                <Cell title="收款UID" :value="transfer.toUid" />
                <Cell title="转账币种" :value="transfer.coin" />
                <Cell title="转账数量" :value="transfer.amount" />
                <Cell title="转账时间" :value="transfer.createTime | dateFormat" />
                <Cell title="资金类型" :value="transfer.capitalType" />
                <Cell title="可用余额" :value="`${transfer.balance} ${transfer.balanceCoin}`" />
                <Cell title="备注" :value="transfer.memo" />
                <Cell title="状态" :value="transfer.statusRemark" />
            </CellGroup>
        </div>
    </div>
</template>

<style src="./transfer-detail.less" lang="less" scoped />

<script src="./transfer-detail.ts" />
