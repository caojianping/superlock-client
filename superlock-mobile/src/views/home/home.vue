<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="home-index">
            <Langs />

            {{ ((userLockQuotaObj = userLockQuota || {}), void 0) }}
            <div class="home-stats">
                <div class="user-stats">
                    <p>{{ $t('HOME.REMAIN_LOCKABLE_QUOTA') }}({{ userLockQuotaObj.coin || '--' }})</p>
                    <h1>{{ (userLockQuotaObj.amount || 0) | currencyComma }}</h1>
                </div>
                <div class="team-stats flex">
                    <div class="team-stats-quota">
                        <p>{{ $t('HOME.TEAM_LOCKED_QUOTA') }}({{ userLockQuotaObj.usedCoin || '--' }})</p>
                        <h2>{{ (userLockQuotaObj.usedAmount || 0) | currencyComma }}</h2>
                    </div>
                    <div class="team-stats-count">
                        <p>{{ $t('HOME.MY_TEAM') }}</p>
                        <h2>
                            <span>{{ userLockQuotaObj.childCount || 0 }}</span>
                            <i class="icon icon-arrow" @click="$router.push({ path: '/team/index', query: { from: '/home/index' } })" />
                        </h2>
                    </div>
                </div>
            </div>

            {{
                ((isEmpty =
                    !isProjectSpinning && (!projectStats || !projectStats.userLockProjectList || projectStats.userLockProjectList.length <= 0)),
                void 0)
            }}
            <div :class="['home-project', isEmpty ? 'empty' : '']">
                <Spin :is-spinning="isProjectSpinning" />
                <ul v-if="projectStats && projectStats.userLockProjectList" class="project-list">
                    {{
                        ((projects = projectStats.userLockProjectList || []), void 0)
                    }}
                    <li v-for="(project, index) in projects" :key="index" :class="['project-item', `bg${project.unit}`]">
                        <h2 class="project-title scb-border">
                            <span>{{ `${$t('COMMON.NAME')} - ${project.length}${unitTypes[project.unit - 1]}` }}</span>
                            <i :class="['icon', `icon-${['new', 'new', 'hot'][project.unit - 1]}`]" />
                        </h2>
                        <div class="project-body flex">
                            <div>
                                <h2>
                                    <span>{{ project.rate | ratePercent(2, false) }}</span>
                                    <small>%</small>
                                </h2>
                                <p>{{ $t('HOME.EXPECT_YEAR_RATE') }}</p>
                            </div>
                            <div>
                                <h3>
                                    <span>{{ project.length }}</span>
                                    <small>{{ unitTypes[project.unit - 1] }}</small>
                                </h3>
                                <p>{{ $t('HOME.GUARANTEE') }}</p>
                            </div>
                            <div>
                                <a class="effect-ripple" href="javascript: void(0)" @click="joinLock(project)">{{ $t('HOME.IMMEDIATELY_JOIN') }}</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="home-block">
                <h2 class="home-block-title">{{ $t('HOME.OPTIMIZE') }}</h2>
                <div class="home-block-body optimize-container">
                    <!-- {{ ((links = projectStats.qualitySelectionLinks || []), void 0) }} -->
                    <ul class="optimize-list">
                        <li class="optimize-item">
                            <router-link class="clearfix" to="/loan/index">
                                <img src="../../assets/images/home/top01.png" alt="" />
                                <div>
                                    <h2>{{ $t('HOME.OPTIMIZE_TITLE11') }}</h2>
                                    <p>{{ $t('HOME.OPTIMIZE_TITLE12') }}</p>
                                </div>
                                <i class="icon icon-detail-arrow" />
                            </router-link>
                        </li>
                        <!-- <li class="optimize-item">
                            <a class="clearfix" :href="links[1]">
                                <img src="../../assets/images/home/top02.png" alt="" />
                                <div>
                                    <h2>{{ $t('HOME.OPTIMIZE_TITLE21') }}</h2>
                                    <p>{{ $t('HOME.OPTIMIZE_TITLE22') }}</p>
                                </div>
                            </a>
                        </li> -->
                    </ul>
                </div>
            </div>

            <div class="home-block">
                <h2 class="home-block-title">{{ $t('HOME.JOIN_US') }}</h2>
                <div class="home-block-body total-container">
                    {{ ((statistics = (projectStats || {}).statistics || {}), void 0) }}
                    <div class="total-stats flex">
                        <div>
                            <p>{{ $t('HOME.TOTAL_REGISTER_COUNT') }}</p>
                            <h3>
                                <span>{{ statistics.cumulativeUser || 0 }}</span>
                                <small>人</small>
                            </h3>
                        </div>
                        <div>
                            <p>{{ $t('HOME.TOTAL_DEAL_VALUE') }}({{ statistics.valuationCoin || '--' }})</p>
                            <h3>
                                <span>{{ (statistics.cumulativeValuation || 0) | currencyComma(6) }}</span>
                                <small>万</small>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <BindGuide :is-rate-set="isRateSet" :is-email-bind="isEmailBind" path="/home/index" />

            <Navs />
        </div>
    </PullRefresh>
</template>

<style src="./home.less" lang="less" scoped />

<script src="./home.ts" />
