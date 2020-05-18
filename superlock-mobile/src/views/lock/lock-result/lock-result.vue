<template>
    <div class="lock-info">
        <Header title="锁仓成功" :is-border="false" @left="$router.push('/lock/create')" />

        <div v-if="lockResult !== undefined">
            <p v-if="lockResult === null" class="scb-none">暂无锁仓信息</p>
            <template v-else>
                <header class="result">
                    <img src="../../../assets/images/result/result-success.png" alt="锁仓成功" />
                    <h1>锁仓成功</h1>
                    <p>
                        锁仓金额
                        {{ `${lockResult.amount || 0} ${lockResult.coin || '--'} = ${lockResult.valuationAmount || 0} ${lockResult.valuationCoin}` }}
                    </p>
                </header>

                <h2 class="scb-separator">锁仓详情</h2>

                <CellGroup class="priority-value">
                    <Cell title="锁仓订单号" :value="lockResult.orderId">
                        <p class="scb-copy" id="orderId" :data-clipboard-text="lockResult.orderId">
                            <span>{{ lockResult.orderId }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell title="汇率" :value="`1BCB = ${lockResult.exchangeRate}DC`" />
                    <Cell title="锁仓周期" :value="`${lockResult.length}${unitTypes[lockResult.unit - 1]}`" />
                    <Cell title="预期年化利率" :value="lockResult.rate | ratePercent" />
                    <Cell title="开始时间" :value="lockResult.startTime | dateFormat('yyyy-MM-dd')" />
                    <Cell title="解锁时间" :value="lockResult.endTime | dateFormat('yyyy-MM-dd')" />
                    <Cell title="起息时间" :value="lockResult.interestTime | dateFormat('yyyy-MM-dd')" />
                </CellGroup>
            </template>
        </div>
    </div>
</template>

<style src="./lock-result.less" lang="less" scoped />

<script src="./lock-result.ts" />
