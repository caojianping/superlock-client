<template>
    <div class="transfer-detail">
        <Header title="转账详情" @left="$router.push('/transfer/record')" />

        <div v-if="transfer !== undefined" class="scb-separator">
            <div v-if="transfer === null" class="scb-none">
                <img src="../../../assets/images/empty.png" alt="暂无转账数据" />
                <p>暂无转账数据</p>
            </div>
            <CellGroup v-else class="priority-value">
                <Cell title="交易单号">
                    <p class="scb-copy" id="orderId" :data-clipboard-text="transfer.orderId">
                        <span>{{ transfer.orderId }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell title="发款UID">
                    <p class="scb-copy" id="fromUid" :data-clipboard-text="transfer.fromUid">
                        <span>{{ transfer.fromUid }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell title="收款UID">
                    <p class="scb-copy" id="toUid" :data-clipboard-text="transfer.toUid">
                        <span>{{ transfer.toUid }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
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
