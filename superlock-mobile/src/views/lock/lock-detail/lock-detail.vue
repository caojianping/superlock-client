<template>
    <div class="lock-info">
        <Header :title="$t('COMMON.LOCK_DETAIL')" :is-border="false" @left="$router.push({ path: '/asset/index', query: { type: 1 } })" />

        <div v-if="lock !== undefined">
            <p v-if="lock === null" class="scb-none">{{ $t('LOCK.LOCK_NO_RECORD') }}</p>
            <template v-else>
                <header class="detail">
                    <h2>{{ $t('COMMON.LOCK_AMOUNT') }}({{ lock.coin }})</h2>
                    <h1>{{ lock.amount || 0 }}</h1>
                    <p>{{ `= ${lock.valuationAmount || 0}${lock.valuationCoin}` }}</p>
                </header>

                <h2 class="scb-separator">{{ $t('COMMON.LOCK_DETAIL') }}</h2>

                <CellGroup class="priority-value">
                    <Cell :title="$t('LOCK.LOCK_ORDER_ID')" :value="lock.orderId">
                        <p class="scb-copy" id="orderId" :data-clipboard-text="lock.orderId">
                            <span>{{ lock.orderId }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell :title="$t('COMMON.EXCHANGE_RATE')" :value="`1BCB = ${lock.exchangeRate}DC`" />
                    <Cell :title="$t('LOCK.LOCK_CYCLE')" :value="`${lock.length}${unitTypes[lock.unit - 1]}`" />
                    <Cell :title="$t('COMMON.EXPECT_YEAR_RATE')" :value="lock.rate | ratePercent" />
                    <Cell :title="$t('LOCK.START_TIME')" :value="lock.startTime | dateFormat('yyyy-MM-dd')" />
                    <Cell :title="$t('LOCK.LOCK_REMAIN_TIME')" :value="`${lock.remainingDays}${$t('COMMON.DAY')}`" />
                    <Cell :title="$t('COMMON.STATUS')">
                        <span :class="`text-${lockColors.get(lock.status)}`">{{ lockStatuses.get(lock.status) }}</span>
                    </Cell>
                    <Cell :title="$t('LOCK.DAILY_EARNINGS_VALUE')" :value="`${lock.dcDailyIncome} DC`" />
                    <Cell
                        :title="$t('LOCK.TOTAL_EARNINGS_VALUE')"
                        :value="`${lock.dcTotalIncome} DC`"
                        is-link
                        :to="`/lock/interests/${lock.orderId}`"
                    />
                    <Cell :title="$t('LOCK.DAILY_EARNINGS_AMOUNT')" :value="`${lock.bcbTotalIncome} BCB`" />
                </CellGroup>
            </template>
        </div>
    </div>
</template>

<style src="./lock-detail.less" lang="less" scoped />

<script src="./lock-detail.ts" />
