<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="team-index scb-gray scb-reserved">
            {{ ((userLockQuotaObj = userLockQuota || {}), void 0) }}
            <header class="team-header">
                <Header title="团队成员" :isBorder="false" @left="$router.push(from || '/mine/index')" />
                <h2>团队已锁仓总额度({{ userLockQuotaObj.usedCoin || '--' }})</h2>
                <h1>
                    {{ (userLockQuotaObj.usedAmount || 0) | currencyComma(4) }}
                </h1>
            </header>

            <div class="team-rates">
                <ul class="clearfix" :style="{ width: `${width * lockPromoteRates.length}rem` }">
                    <li v-for="(lockPromoteRate, index) in lockPromoteRates" :key="index" :style="{ width: width + 'rem' }">
                        <h3>{{ lockPromoteRate.rate | digitPrecision }}{{ lockPromoteRate.suffix }}</h3>

                        <p v-if="lockPromoteRate.type === 1">
                            {{ lockPromoteRate.length + unitTypes[lockPromoteRate.unit - 1] + rateTypes[lockPromoteRate.type - 1] }}
                        </p>
                        <p v-else>{{ rateTypes[lockPromoteRate.type - 1] }}</p>
                    </li>
                </ul>
            </div>

            <div v-if="childs" class="child-container">
                <p v-if="childs.length <= 0" class="scb-none">暂无团队成员</p>
                <List
                    v-else
                    class="child-list"
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    loading-text="记录加载中……"
                    finished-text="记录加载完毕"
                    @load="fetchChilds"
                >
                    <CellGroup>
                        <Cell v-for="(child, index) in childs" :key="index" is-link @click="goDetail(child)">
                            <div slot="title">
                                <h2>{{ child.nickName }}</h2>
                                <p>{{ `UID:${child.uid}` }}</p>
                            </div>
                            <div>
                                <h3>累计推广锁仓</h3>
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
