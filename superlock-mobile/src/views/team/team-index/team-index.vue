<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray scb-reserved team-index">
            {{ ((userLockQuotaObj = userLockQuota || {}), void 0) }}
            <header class="team-header">
                <Header :title="$t('TEAM.TITLE01')" :is-border="false" @left="$router.push(from || '/mine/index')" />
                <h2>{{ $t('TEAM.TEAM_LOCKABLE_QUOTA') }}({{ userLockQuotaObj.usedCoin || '--' }})</h2>
                <h1>{{ (userLockQuotaObj.usedAmount || 0) | currencyComma(4) }}</h1>
            </header>

            <div class="team-rates">
                <ul class="clearfix" :style="{ width: `${width * lockPromoteRates.length}rem` }">
                    <li v-for="(lockPromoteRate, index) in lockPromoteRates" :key="index" :style="{ width: width + 'rem' }">
                        <h3>{{ lockPromoteRate.rate | digitPrecision }}{{ lockPromoteRate.suffix }}</h3>

                        <p class="flex-middle">
                            <span v-if="lockPromoteRate.type === 1">{{
                                lockPromoteRate.length + unitTypes[lockPromoteRate.unit - 1] + rateTypes[lockPromoteRate.type - 1]
                            }}</span>
                            <span v-else>{{ rateTypes[lockPromoteRate.type - 1] }}</span>
                        </p>
                    </li>
                </ul>
            </div>

            <div v-if="childs" class="child-container">
                <p v-if="childs.length <= 0" class="scb-none">{{ $t('TEAM.TEAM_NO_DATA') }}</p>
                <List
                    v-else
                    class="child-list"
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    :loading-text="$t('COMMON.RECORD_LOADING')"
                    :finished-text="$t('COMMON.RECORD_LOADED')"
                    @load="fetchChilds"
                >
                    <CellGroup>
                        <Cell v-for="(child, index) in childs" :key="index" is-link @click="goDetail(child)">
                            <div slot="title">
                                <h2>{{ child.nickName }}</h2>
                                <h3>{{ `UID:${child.uid}` }}</h3>
                                <p v-if="child.rateSetRemind" class="flex">
                                    <i class="icon icon-pset" />
                                    <span>{{ $t('TEAM.UNSETTING_PROMPT') }}</span>
                                </p>
                            </div>
                            <div>
                                <h3>{{ $t('TEAM.TOTAL_PROMOTE_LOCK') }}</h3>
                                <p>{{ `${child.teamUsedQuota} DC` }}</p>
                            </div>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./team-index.less" lang="less" scoped />

<script src="./team-index.ts" />
