<template>
    <div class="lock-info">
        <Header :title="$t('LOCK.LOCK_SUCCESS')" :is-border="false" @left="$router.push('/lock/create')" />

        <div v-if="lockResult !== undefined">
            <p v-if="lockResult === null" class="scb-none">{{ $t('LOCK.LOCK_NO_RECORD') }}</p>
            <template v-else>
                <header class="result">
                    <img src="../../../assets/images/result/result-success.png" :alt="$t('LOCK.LOCK_SUCCESS')" />
                    <h1>{{ $t('LOCK.LOCK_SUCCESS') }}</h1>
                    <p>
                        {{ $t('COMMON.LOCK_AMOUNT') }}
                        {{ `${lockResult.amount || 0} ${lockResult.coin || '--'} = ${lockResult.valuationAmount || 0} ${lockResult.valuationCoin}` }}
                    </p>
                </header>

                <h2 class="scb-separator">{{ $t('COMMON.LOCK_DETAIL') }}</h2>

                <CellGroup class="priority-value">
                    <Cell :title="$t('LOCK.LOCK_ORDER_ID')" :value="lockResult.orderId">
                        <p class="scb-copy" id="orderId" :data-clipboard-text="lockResult.orderId">
                            <span>{{ lockResult.orderId }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell :title="$t('COMMON.EXCHANGE_RATE')" :value="`1BCB = ${lockResult.exchangeRate}DC`" />
                    <Cell :title="$t('LOCK.LOCK_CYCLE')" :value="`${lockResult.length}${unitTypes[lockResult.unit - 1]}`" />
                    <Cell :title="$t('COMMON.EXPECT_YEAR_RATE')" :value="lockResult.rate | ratePercent" />
                    <Cell :title="$t('LOCK.START_TIME')" :value="lockResult.startTime | dateFormat('yyyy-MM-dd')" />
                    <Cell :title="$t('LOCK.UNLOCK_TIME')" :value="lockResult.endTime | dateFormat('yyyy-MM-dd')" />
                    <Cell :title="$t('LOCK.INTEREST_TIME')" :value="lockResult.interestTime | dateFormat('yyyy-MM-dd')" />
                </CellGroup>
            </template>
        </div>

        <router-link to="/home/index">{{ $t('LOCK.RETURN_HOME') }}</router-link>
    </div>
</template>

<style src="./lock-result.less" lang="less" scoped />

<script src="./lock-result.ts" />
