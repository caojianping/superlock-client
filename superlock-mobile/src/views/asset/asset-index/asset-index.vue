<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray scb-reserved asset-index">
            {{ ((assetStatsObj = assetStats || {}), void 0) }}
            {{ ((earningsStatsObj = earningsStats || {}), void 0) }}
            <header class="asset-header">
                <i class="icon icon-transaction" @click="$router.push('/transaction/record')" />
                <h2>
                    <label>{{ $t('ASSET.TOTAL_ASSET') }}</label>
                    <small>（BCB）</small>
                    <i class="icon" :class="isTotalVisible ? 'icon-visible' : 'icon-invisible'" @click="toggleTotal" />
                </h2>
                <h1 v-if="isTotalVisible">{{ (assetStatsObj.bcbTotalAmount || 0) | currencyComma(4) }}</h1>
                <h1 v-else>*******</h1>
                <p>
                    <label>{{ $t('ASSET.YESTERDAY_EARNINGS') }}（{{ earningsStatsObj.yesterdayEarningsCoin || '--' }}）</label>
                    <span>+ {{ earningsStatsObj.yesterdayEarnings || 0 }}</span>
                    <i class="icon icon-arrow" @click="openComponent('isEarningsInfoShow')" />
                </p>
            </header>

            <ul class="asset-links flex">
                <li @click="openComponent('isRechargeCoinsShow')">
                    <i /><span>{{ $t('COMMON.RECHARGE') }}</span>
                </li>
                <li @click="$router.push('/withdraw/index')">
                    <i /><span>{{ $t('COMMON.WITHDRAW') }}</span>
                </li>
                <li @click="$router.push('/transfer/index')">
                    <i /><span>{{ $t('COMMON.TRANSFER') }}</span>
                </li>
            </ul>

            {{ ((rateObj = exchangeRate || {}), void 0) }}
            {{ ((rateStr = `1 ${rateObj.fromCoin || '--'} = ${rateObj.rate || '--'} ${rateObj.toCoin || '--'}`), void 0) }}
            <Tabs class="asset-tabs" v-model="activeTab" animated swipeable @change="handleTabsChange">
                <Tab>
                    <span slot="title">{{ $t('ASSET.ASSET_TABS.0') }}</span>
                    <div class="tab-panel">
                        <h1 class="tab-title scb-border">
                            <i class="icon icon-exchange-rate" />
                            <span>{{ rateStr }}</span>
                        </h1>
                        <div class="tab-content">
                            <Spin :is-spinning="isAssetStatsSpinning" />
                            <CellGroup>
                                <Cell :title="$t('ASSET.TOTAL_ASSET')" :value="(assetStatsObj.bcbTotalAmount || 0) | coinUnit" />
                                <Cell :title="$t('COMMON.AVAILABLE_BALANCE')" :value="(assetStatsObj.bcbHotAmount || 0) | coinUnit" />
                                <Cell :title="$t('COMMON.LOCK_AMOUNT')" :value="(assetStatsObj.bcbLockAmount || 0) | coinUnit" />
                            </CellGroup>
                        </div>
                    </div>
                </Tab>

                <Tab>
                    <span slot="title">{{ $t('ASSET.ASSET_TABS.1') }}</span>
                    <div class="tab-panel">
                        <h1 class="tab-title scb-border">
                            <i class="icon icon-exchange-rate" />
                            <span>{{ rateStr }}</span>
                        </h1>
                        <div class="tab-content">
                            <Spin :is-spinning="isLocksSpinning" position="top" />
                            <template v-if="locks">
                                <p v-if="locks.length <= 0" class="scb-none" v-html="$t('ASSET.LOCK_NO_DATA')" />
                                <CellGroup v-else class="locks priority-title">
                                    <Cell v-for="(lock, index) in locks" :key="index" is-link @click="goLockDetail(lock)">
                                        <template slot="title">
                                            <h2>
                                                <span>{{ `${$t('COMMON.NAME')}-${lock.length}${unitTypes[lock.unit - 1]}` }}</span>
                                                <i :class="lockColors.get(lock.status) || 'gray'">
                                                    {{ lockStatuses.get(lock.status) || lock.remark }}
                                                </i>
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
                    <span slot="title">{{ $t('ASSET.ASSET_TABS.2') }}</span>
                    <div class="tab-panel">
                        <h1 class="tab-title scb-border">
                            <i class="icon icon-exchange-rate" />
                            <span>{{ rateStr }}</span>
                        </h1>
                        <div class="tab-content">
                            <Spin :is-spinning="isLoansSpinning" position="top" />
                            <template v-if="loans">
                                <p v-if="loans.length <= 0" class="scb-none">{{ $t('ASSET.LOAN_NO_DATA') }}</p>
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
                    <span slot="title">{{ $t('ASSET.ASSET_TABS.3') }}</span>
                    <div class="tab-panel">
                        <h1 class="tab-title scb-border">
                            <i class="icon icon-exchange-rate" />
                            <span>{{ rateStr }}</span>
                        </h1>
                        <div class="tab-content">
                            <Spin :is-spinning="isRewardStatsSpinning" />
                            <CellGroup>
                                {{ ((rewardStatsObj = rewardStats || {}), void 0) }}
                                <Cell
                                    :title="$t('ASSET.PUSH_REWARD')"
                                    is-link
                                    to="/reward/record/1"
                                    :value="`${rewardStatsObj.pushRewardValuation || 0} ${rewardStatsObj.pushRewardValuationCoin || 'BCB'}`"
                                />
                                <Cell
                                    :title="$t('ASSET.LOCK_REWARD')"
                                    is-link
                                    to="/reward/record/2"
                                    :value="`${rewardStatsObj.lockRewardValuation || 0} ${rewardStatsObj.lockRewardValuationCoin || 'BCB'}`"
                                />
                                <Cell
                                    :title="$t('ASSET.PROMOTE_REWARD')"
                                    is-link
                                    to="/reward/record/3"
                                    :value="`${rewardStatsObj.unlockRewardValuation || 0} ${rewardStatsObj.unlockRewardValuationCoin || 'BCB'}`"
                                />
                                <Cell
                                    :title="$t('ASSET.SALES_REWARD')"
                                    is-link
                                    to="/reward/record/4"
                                    :value="`${rewardStatsObj.salesReward || 0} ${rewardStatsObj.salesRewardCoin || 'BCB'}`"
                                />
                            </CellGroup>
                        </div>
                    </div>
                </Tab>
            </Tabs>

            <RechargeCoins v-model="isRechargeCoinsShow" />

            <EarningsInfo v-model="isEarningsInfoShow" />

            <Navs />
        </div>
    </PullRefresh>
</template>

<style src="./asset-index.less" lang="less" scoped />

<script src="./asset-index.ts" />
