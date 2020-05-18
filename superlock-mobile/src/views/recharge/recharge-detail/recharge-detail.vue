<template>
    <div class="recharge-detail">
        <Header title="充值详情" @left="$router.push('/recharge/record')" />

        <div v-if="recharge !== undefined" class="scb-separator">
            <div v-if="recharge === null" class="scb-none">
                <img src="../../../assets/images/empty.png" alt="暂无充值数据" />
                <p>暂无充值数据</p>
            </div>
            <CellGroup v-else class="priority-value">
                <Cell title="交易单号">
                    <p class="scb-copy" id="orderId" :data-clipboard-text="recharge.orderId">
                        <span>{{ recharge.orderId }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell title="交易hash">
                    <p class="scb-copy" id="txhash" :data-clipboard-text="recharge.txhash">
                        <span>{{ recharge.txhash }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
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
