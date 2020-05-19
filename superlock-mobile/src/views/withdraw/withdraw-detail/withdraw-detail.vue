<template>
    <div class="withdraw-detail">
        <Header title="提现详情" @left="$router.push('/withdraw/record')" />

        <div v-if="withdraw !== undefined" class="scb-separator">
            <div v-if="withdraw === null" class="scb-none">
                <img src="../../../assets/images/empty.png" alt="暂无提现数据" />
                <p>暂无提现数据</p>
            </div>
            <CellGroup v-else class="priority-value">
                <Cell title="交易单号">
                    <p class="scb-copy" id="orderId" :data-clipboard-text="withdraw.orderId">
                        <span>{{ withdraw.orderId }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell title="交易hash">
                    <p class="scb-copy" id="txhash" :data-clipboard-text="withdraw.txhash">
                        <span>{{ withdraw.txhash }}</span>
                        <i v-if="withdraw.txhash" class="icon icon-copy" />
                    </p>
                </Cell>
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
