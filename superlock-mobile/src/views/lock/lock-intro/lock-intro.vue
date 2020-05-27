<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-blue lock-intro">
            <Header :title="$t('COMMON.LOCK_DETAIL')" is-blue :is-border="false" @left="$router.push('/home/index')" />

            <div class="scb-blue-body">
                {{ ((lockProjectObj = lockProject || {}), void 0) }}
                <h1 class="lock-intro-title">
                    {{ `${$t('COMMON.NAME')} - ${lockProjectObj.length}${unitTypes[lockProjectObj.unit - 1]}` }}
                </h1>

                <div class="lock-intro-banner lock-container">
                    <ul class="flex">
                        <li>
                            <h2>
                                <span>{{ lockProjectObj.rate | ratePercent(2, false) }}</span>
                                <small>%</small>
                            </h2>
                            <p>{{ $t('COMMON.EXPECT_YEAR_RATE') }}</p>
                        </li>
                        <li>
                            <h2>
                                <span>{{ lockProjectObj.length }}</span>
                                <small>{{ unitTypes[lockProjectObj.unit - 1] }}</small>
                            </h2>
                            <p>{{ $t('LOCK.LOCK_DEADLINE') }}</p>
                        </li>
                    </ul>
                    <p>
                        <i class="icon icon-lamp" />
                        <span>{{ $t('LOCK.INTRO') }}</span>
                    </p>
                </div>

                <div class="lock-intro-rule lock-container">
                    <h2>{{ $t('LOCK.RULE') }}</h2>

                    <ul>
                        <li>
                            <h3>
                                <img src="../../../assets/images/lock/rule01.png" alt="" />
                                <span>{{ $t('LOCK.RULE_TITLE01') }}</span>
                            </h3>
                            <p>{{ $t('LOCK.RULE_TITLE011') }}</p>
                        </li>
                        <li>
                            <h3>
                                <img src="../../../assets/images/lock/rule02.png" alt="" />
                                <span>{{ $t('LOCK.RULE_TITLE02') }}</span>
                            </h3>
                            <p>{{ $t('LOCK.RULE_TITLE021') }}</p>
                        </li>
                    </ul>

                    <div class="flex times">
                        <div class="time-item">
                            <p class="flex-middle">
                                <span>{{ $t('LOCK.RULE_FLAG01') }}</span>
                            </p>
                            <i />
                            <p class="time-date">{{ new Date() | dateFormat('yyyy.MM.dd') }}</p>
                        </div>
                        <div class="time-item">
                            <p class="flex-middle">
                                <span>{{ $t('LOCK.RULE_FLAG02') }}</span>
                            </p>
                            <i />
                            <p class="time-date">{{ dateCalculate(new Date(), 'd', 1) | dateFormat('yyyy.MM.dd') }}</p>
                        </div>
                        <div class="time-item">
                            <p class="flex-middle">
                                <span>{{ $t('LOCK.RULE_FLAG03') }}</span>
                            </p>
                            <i />
                            <p class="time-date">
                                {{
                                    dateCalculate(new Date(), ['d', 'M', 'y'][lockProjectObj.unit - 1], lockProjectObj.length)
                                        | dateFormat('yyyy.MM.dd')
                                }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="lock-intro-feature lock-container">
                    <h2 class="lock-banner">{{ $t('LOCK.FEATURE') }}</h2>
                    <ul>
                        <li class="clearfix">
                            <img src="../../../assets/images/lock/feature01.png" alt="" />
                            <div>
                                <h3>{{ $t('LOCK.FEATURE_TITLE01') }}</h3>
                                <p>{{ $t('LOCK.FEATURE_TITLE011') }}</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <img src="../../../assets/images/lock/feature02.png" alt="" />
                            <div>
                                <h3>{{ $t('LOCK.FEATURE_TITLE02') }}</h3>
                                <p>{{ $t('LOCK.FEATURE_TITLE021') }}</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <img src="../../../assets/images/lock/feature03.png" alt="" />
                            <div>
                                <h3>{{ $t('LOCK.FEATURE_TITLE03') }}</h3>
                                <p>{{ $t('LOCK.FEATURE_TITLE031') }}</p>
                            </div>
                        </li>
                        <li class="clearfix">
                            <img src="../../../assets/images/lock/feature04.png" alt="" />
                            <div>
                                <h3>{{ $t('LOCK.FEATURE_TITLE04') }}</h3>
                                <p>
                                    {{ $t('LOCK.FEATURE_TITLE041') }} <a href="javascript: void(0)">{{ $t('LOCK.ROOM_CHANGE') }}</a>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="lock-intro-explain lock-container">
                    <h2 class="lock-banner">
                        <p class="flex-middle">
                            <span>{{ $t('LOCK.EXPLAIN') }}</span>
                        </p>
                    </h2>
                    <p>{{ $t('LOCK.EXPLAIN_TITLE01') }}</p>
                    <p>{{ $t('LOCK.EXPLAIN_TITLE02') }}</p>
                </div>
            </div>

            <footer class="scb-blue-footer">
                <p v-if="!userLockQuota">{{ $t('COMMON.CURRENT_LOCKABLE_QUOTA') }}：-- -- = -- --</p>
                <p v-else>
                    {{ $t('COMMON.CURRENT_LOCKABLE_QUOTA') }}：
                    {{ `${userLockQuota.amount} ${userLockQuota.coin} = ${userLockQuota.valuationAmount} ${userLockQuota.valuationCoin}` }}
                </p>
                <router-link to="/lock/create">{{ $t('LOCK.START_LOCK') }}</router-link>
            </footer>
        </div>
    </PullRefresh>
</template>

<style src="./lock-intro.less" lang="less" scoped />

<script src="./lock-intro.ts" />
