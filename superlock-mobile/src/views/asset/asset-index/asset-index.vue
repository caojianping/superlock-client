<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="asset-index scb-reserved scb-gray">
            {{ ((assetStatsObj = assetStats || {}), void 0) }}
            {{ ((earningsStatsObj = earningsStats || {}), void 0) }}
            <header class="asset-header">
                <i class="icon icon-transaction" @click="goPage('/transaction/record')" />
                <h2>
                    <label>总资产</label>
                    <small>（BCB）</small>
                    <i class="icon" :class="isTotalVisible ? 'icon-visible' : 'icon-invisible'" @click="toggleTotal" />
                </h2>
                <h1 v-if="isTotalVisible">{{ (assetStatsObj.bcbTotalAmount || 0) | currencyComma(4) }}</h1>
                <h1 v-else>*******</h1>
                <p>
                    <label>昨日收益（{{ earningsStatsObj.yesterdayEarningsCoin || '--' }}）</label>
                    <span>+ {{ earningsStatsObj.yesterdayEarnings || 0 }}</span>
                    <i class="icon icon-arrow" @click="openEarningsInfo" />
                </p>
            </header>

            <ul class="asset-links flex">
                <li @click="openRechargeCoins"><i /><span>充值</span></li>
                <li @click="goPage('/withdraw/index')"><i /><span>提现</span></li>
                <li @click="goPage('/transfer/index')"><i /><span>转账</span></li>
            </ul>

            {{ ((rateObj = exchangeRate || {}), void 0) }}
            {{ ((rateStr = `1 ${rateObj.fromCoin || '--'} = ${rateObj.rate || '--'} ${rateObj.toCoin || '--'}`), void 0) }}
            <Tabs class="asset-tabs" v-model="activeTab" animated swipeable @change="handleTabsChange">
                <Tab>
                    <template slot="title"><span>资产总账</span></template>
                    <div class="tab-panel">
                        <h1 class="tab-title scb-border">
                            <i class="icon icon-exchange-rate" />
                            <span>{{ rateStr }}</span>
                        </h1>
                        <div class="tab-content">
                            <Spin v-if="!assetStats" :is-spinning="isAssetStatsSpinning" />
                            <CellGroup v-if="!isAssetStatsSpinning">
                                <Cell title="总资产" :value="(assetStats ? assetStats.bcbTotalAmount || 0 : 0) | coinUnit"></Cell>
                                <Cell title="可用余额" :value="(assetStats ? assetStats.bcbHotAmount || 0 : 0) | coinUnit"></Cell>
                                <Cell title="锁仓金额" :value="(assetStats ? assetStats.bcbLockAmount || 0 : 0) | coinUnit"></Cell>
                            </CellGroup>
                        </div>
                    </div>
                </Tab>

                <Tab>
                    <template slot="title"><span>我的锁仓</span></template>
                    <div class="tab-panel">
                        <h1 class="tab-title scb-border">
                            <i class="icon icon-exchange-rate" />
                            <span>{{ rateStr }}</span>
                        </h1>
                        <div class="tab-content">
                            <Spin v-if="!locks" :is-spinning="isLocksSpinning" />
                            <template v-if="!isLocksSpinning && locks">
                                <p v-if="locks.length <= 0" class="scb-none">
                                    暂无锁仓记录，快去<router-link class="scb-link" to="/home/index">创建锁仓</router-link>吧！
                                </p>
                                <CellGroup v-else class="locks priority-title">
                                    <Cell v-for="(lock, index) in locks" :key="index" @click="openLockInfo(lock)">
                                        <template slot="title">
                                            <h2>
                                                <span>{{ `BCB矿场-${lock.length}${unitTypes[lock.unit - 1]}` }}</span>
                                                <i :class="lockColors.get(lock.status) || 'gray'">{{
                                                    lockStatuses.get(lock.status) || lock.remark
                                                }}</i>
                                            </h2>
                                            <p>{{ lock.orderId }}</p>
                                        </template>
                                        <template slot="default">
                                            <h3>{{ `${lock.amount} ${lock.coin}` }}</h3>
                                            <p>{{ lock.startTime | dateFormat('yyyy-MM-dd') }}</p>
                                        </template>
                                    </Cell>
                                </CellGroup>
                            </template>
                        </div>
                    </div>
                </Tab>

                <Tab>
                    <template slot="title"><span>我的贷款</span></template>
                    <div class="tab-panel">
                        <h1 class="tab-title scb-border">
                            <i class="icon icon-exchange-rate" />
                            <span>{{ rateStr }}</span>
                        </h1>
                        <div class="tab-content">
                            <Spin v-if="!loans" :is-spinning="isLoansSpinning" />
                            <template v-if="!isLoansSpinning && loans">
                                <p v-if="loans.length <= 0" class="scb-none">暂无贷款记录</p>
                                <CellGroup v-else class="loans priority-title">
                                    <Cell v-for="(loan, index) in loans" :key="index" is-link @click="goLoanDetail(loan)">
                                        <template slot="title">
                                            <h2>
                                                <span>{{ loan.orderId }}</span>
                                                <i :class="loanColors.get(loan.status) || 'gray'">{{ loanStatuses.get(loan.status) }}</i>
                                            </h2>
                                            <p class="clearfix">
                                                <span>{{ loan.applyTime | dateFormat }}</span>
                                                <span>{{ `${loan.loanValuationAmount} ${loan.loanValuationCoin}` }}</span>
                                            </p>
                                        </template>
                                    </Cell>
                                </CellGroup>
                            </template>
                        </div>
                    </div>
                </Tab>

                <Tab>
                    <template slot="title"><span>推广奖励</span></template>
                    <div class="tab-panel">
                        <h1 class="tab-title scb-border">
                            <i class="icon icon-exchange-rate" />
                            <span>{{ rateStr }}</span>
                        </h1>
                        <div class="tab-content">
                            <Spin v-if="!rewardStats" :is-spinning="isRewardStatsSpinning" />
                            <CellGroup v-if="!isRewardStatsSpinning">
                                {{ ((rewardStatsObj = rewardStats || {}), void 0) }}
                                <Cell
                                    title="直推奖励"
                                    is-link
                                    to="/reward/record/1"
                                    :value="`${rewardStatsObj.pushRewardValuation || 0} ${rewardStatsObj.pushRewardValuationCoin || 'BCB'}`"
                                ></Cell>
                                <Cell
                                    title="团队锁仓奖励"
                                    is-link
                                    to="/reward/record/2"
                                    :value="`${rewardStatsObj.lockRewardValuation || 0} ${rewardStatsObj.lockRewardValuationCoin || 'BCB'}`"
                                ></Cell>
                                <Cell
                                    title="推广解锁奖励"
                                    is-link
                                    to="/reward/record/3"
                                    :value="`${rewardStatsObj.unlockRewardValuation || 0} ${rewardStatsObj.unlockRewardValuationCoin || 'BCB'}`"
                                ></Cell>
                                <Cell
                                    title="销量达标奖励"
                                    is-link
                                    to="/reward/record/4"
                                    :value="`${rewardStatsObj.salesReward || 0} ${rewardStatsObj.salesRewardCoin || 'BCB'}`"
                                ></Cell>
                            </CellGroup>
                        </div>
                    </div>
                </Tab>
            </Tabs>

            <RechargeCoins v-model="isRechargeCoinsShow" />

            <LockInfo v-model="isLockInfoShow" :lock="currentLock" />

            <EarningsInfo v-model="isEarningsInfoShow" />

            <Navs />
        </div>
    </PullRefresh>
</template>

<style src="./asset-index.less" lang="less" scoped />

<script src="./asset-index.ts" />
