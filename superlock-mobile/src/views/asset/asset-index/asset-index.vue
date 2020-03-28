<template>
    <div class="asset-index">
        <header class="asset-header">
            <h2>
                <label>总资产</label>
                <small>（BCB）</small>
                <i
                    class="icon"
                    :class="isTotalVisible ? 'icon-visible' : 'icon-invisible'"
                    @click="toggleTotal"
                />
            </h2>
            <h1 v-if="isTotalVisible">
                {{
                    (assetStats ? assetStats.bcbTotalAmount : 0) | currencyComma
                }}
            </h1>
            <h1 v-else>*******</h1>
            <p>
                <label>昨日收益（BCB）</label>
                <span
                    >+
                    {{
                        earningsStats ? earningsStats.yesterdayEarnings : 0
                    }}</span
                >
                <i class="icon icon-arrow" />
            </p>
        </header>

        <ul class="asset-links flex">
            <li @click="openRechargeCoins">
                <i></i>
                <span>充值</span>
            </li>
            <li @click="goPage('/withdraw/index')">
                <i></i>
                <span>提现</span>
            </li>
            <li @click="goPage('/transfer/index')">
                <i></i>
                <span>转账</span>
            </li>
        </ul>

        <Tabs
            class="asset-tabs"
            v-model="activeTab"
            animated
            swipeable
            @change="handleTabsChange"
        >
            <Tab>
                <template slot="title">
                    <span>资产总账</span>
                </template>
                <div class="tab-content">
                    <Spin :is-spinning="isAssetStatsSpinning" />
                    <CellGroup v-if="!isAssetStatsSpinning">
                        <Cell
                            title="总资产"
                            :value="
                                (assetStats ? assetStats.bcbTotalAmount : '0')
                                    | coinUnit
                            "
                        ></Cell>
                        <Cell
                            title="可用余额"
                            :value="
                                (assetStats ? assetStats.bcbHotAmount : '0')
                                    | coinUnit
                            "
                        ></Cell>
                        <Cell
                            title="锁仓金额"
                            :value="
                                (assetStats ? assetStats.bcbLockAmount : '0')
                                    | coinUnit
                            "
                        ></Cell>
                    </CellGroup>
                </div>
            </Tab>
            <Tab>
                <template slot="title">
                    <span>我的锁仓</span>
                </template>
                <div class="tab-content">
                    <Spin :is-spinning="isLocksSpinning" />
                    <template v-if="locks">
                        <p v-if="locks.length <= 0" class="none">
                            暂无锁仓记录，快去
                            <router-link class="link" to="/home/index"
                                >创建锁仓</router-link
                            >
                            吧！
                        </p>
                        <CellGroup v-else>
                            <Cell v-for="(lock, index) in locks" :key="index">
                                <template slot="title">
                                    <p>
                                        <span>{{
                                            `${lock.remark}-${lock.length}${
                                                lockUnits[lock.unit - 1]
                                            }`
                                        }}</span>
                                        <span>{{
                                            lockStatuses.get(lock.status)
                                        }}</span>
                                    </p>
                                    <p>{{ lock.orderId }}</p>
                                </template>
                                <template slot="default">
                                    <p>{{ `${lock.amount} ${lock.coin}` }}</p>
                                    <p>
                                        {{
                                            startTime | dateFormat('yyyy/MM/dd')
                                        }}
                                    </p>
                                </template>
                            </Cell>
                        </CellGroup>
                    </template>
                </div>
            </Tab>
            <Tab>
                <template slot="title">
                    <span>我的贷款</span>
                </template>
                <div class="tab-content"></div>
            </Tab>
            <Tab>
                <template slot="title">
                    <span>推广奖励</span>
                </template>
                <div class="tab-content"></div>
            </Tab>
        </Tabs>

        <RechargeCoins v-model="isRechargeCoinsShow" />

        <Navs />
    </div>
</template>

<style src="./asset-index.less" lang="less" scoped />

<script src="./asset-index.ts" />
