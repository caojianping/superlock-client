<template>
    <div class="home scb-reserved">
        {{ ((lockQuota = userLockQuota || {}), void 0) }}
        <div class="home-stats">
            <div class="user-stats">
                <p>剩余可锁仓额度({{ lockQuota.coin || '--' }})</p>
                <h1>{{ (lockQuota.amount || 0) | currencyComma }}</h1>
            </div>
            <div class="team-stats flex">
                <div class="team-stats-quota">
                    <p>团队已锁仓额度({{ lockQuota.usedCoin || '--' }})</p>
                    <h2>
                        {{ (lockQuota.usedAmount || 0) | currencyComma }}
                    </h2>
                </div>
                <div class="team-stats-count">
                    <p>我的团队(人)</p>
                    <h2>
                        <span>{{ lockQuota.childCount || 0 }}</span>
                        <!-- <i class="icon icon-arrow" /> -->
                    </h2>
                </div>
            </div>
        </div>

        <div class="home-project">
            <div v-if="isProjectSpinning" class="spin-container">
                <Spin :is-spinning="isProjectSpinning" />
            </div>

            <ul
                v-if="projectStats && projectStats.userLockProjectList"
                class="project-list"
            >
                {{
                    ((userLockProjectList =
                        projectStats.userLockProjectList || []),
                    void 0)
                }}
                <li
                    class="project-item"
                    :class="['project-item', `bg${project.unit}`]"
                    v-for="(project, index) in userLockProjectList"
                    :key="index"
                >
                    <h2 class="project-title">
                        <span>{{ project.memo }}</span>
                        <i
                            :class="[
                                'icon',
                                `icon-${
                                    ['new', 'new', 'hot'][project.unit - 1]
                                }`
                            ]"
                        />
                    </h2>
                    <div class="project-body flex">
                        <div>
                            <h2>
                                <span>{{
                                    project.rate | ratePercent(1, false)
                                }}</span>
                                <small>%</small>
                            </h2>
                            <p>预计年化率</p>
                        </div>
                        <div>
                            <h3>
                                <span>{{ project.length }}</span>
                                <small>{{ units[project.unit - 1] }}</small>
                            </h3>
                            <p>本金保证，每日返息</p>
                        </div>
                        <div>
                            <a
                                class="effect-ripple"
                                href="javascript: void(0)"
                                @click="joinLock(project)"
                                >立即参与</a
                            >
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="home-block">
            <h2 class="home-block-title">精口优选</h2>
            <div class="home-block-body optimize-container">
                <Spin :is-spinning="isOptimizeSpinning" />

                <ul v-if="projectStats" class="optimize-list">
                    {{
                        ((qualitySelectionLinks =
                            projectStats.qualitySelectionLinks || []),
                        void 0)
                    }}
                    <li class="optimize-item">
                        <a class="clearfix" :href="qualitySelectionLinks[0]">
                            <img
                                src="../../assets/images/home/top01.png"
                                alt=""
                            />
                            <div>
                                <h2>资产被锁仓，急需用钱怎么办？</h2>
                                <p>
                                    别着急，资产被锁仓了也没关系，我们可以借钱给你花！
                                </p>
                            </div>
                        </a>
                    </li>
                    <li class="optimize-item">
                        <a class="clearfix" :href="qualitySelectionLinks[1]">
                            <img
                                src="../../assets/images/home/top02.png"
                                alt=""
                            />
                            <div>
                                <h2>BCB降价了，资产缩减了怎么办？</h2>
                                <p>
                                    BCB降价了也没关系，我们已为您做好了保障，锁仓本金换房，值得您的关注！
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="home-block">
            <h2 class="home-block-title">加入我们</h2>
            <div class="home-block-body total-container">
                {{ ((statistics = (projectStats || {}).statistics), void 0) }}
                <div class="total-stats flex">
                    <div>
                        <p>累计注册用户(人)</p>
                        <h3>
                            <span>{{
                                statistics ? statistics.cumulativeUser : 0
                            }}</span>
                            <small>人</small>
                        </h3>
                    </div>
                    <div>
                        <p>
                            累计成效价值({{
                                statistics ? statistics.valuationCoin : 0
                            }})
                        </p>
                        <h3>
                            <span>{{
                                statistics ? statistics.cumulativeValuation : 0
                            }}</span>
                            <small>万</small>
                        </h3>
                    </div>
                </div>
            </div>
        </div>

        <Navs />
    </div>
</template>

<style src="./home.less" lang="less" scoped />

<script src="./home.ts" />
