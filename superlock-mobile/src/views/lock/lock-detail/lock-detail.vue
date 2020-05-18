<template>
    <div class="lock-info">
        <Header title="锁仓详情" :is-border="false" @left="$router.push({ path: '/asset/index', query: { type: 1 } })" />

        <div v-if="lock !== undefined">
            <p v-if="lock === null" class="scb-none">暂无锁仓信息</p>
            <template v-else>
                <header class="detail">
                    <h2>锁仓金额({{ lock.coin }})</h2>
                    <h1>{{ lock.amount || 0 }}</h1>
                    <p>{{ `= ${lock.valuationAmount || 0}${lock.valuationCoin}` }}</p>
                </header>

                <h2 class="scb-separator">锁仓详情</h2>

                <CellGroup class="priority-value">
                    <Cell title="锁仓订单号" :value="lock.orderId">
                        <p class="scb-copy" id="orderId" :data-clipboard-text="lock.orderId">
                            <span>{{ lock.orderId }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell title="汇率" :value="`1BCB = ${lock.exchangeRate}DC`" />
                    <Cell title="锁仓周期" :value="`${lock.length}${unitTypes[lock.unit - 1]}`" />
                    <Cell title="预期年化利率" :value="lock.rate | ratePercent" />
                    <Cell title="开始时间" :value="lock.startTime | dateFormat('yyyy-MM-dd')" />
                    <Cell title="锁仓剩余时间" :value="`${lock.remainingDays}天`" />
                    <Cell title="状态">
                        <span :class="`text-${lockColors.get(lock.status)}`">{{ lockStatuses.get(lock.status) }}</span>
                    </Cell>
                    <Cell title="每日收益价值" :value="`${lock.dcDailyIncome} DC`" />
                    <Cell title="累计收益价值(DC)" :value="`${lock.dcTotalIncome} DC`" is-link :to="`/lock/interests/${lock.orderId}`" />
                    <Cell title="累计收益数量(BCB)" :value="`${lock.bcbTotalIncome} BCB`" />
                </CellGroup>
            </template>
        </div>
    </div>
</template>

<style src="./lock-detail.less" lang="less" scoped />

<script src="./lock-detail.ts" />
