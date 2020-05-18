<template>
    <div class="scb-blue lock-intro">
        <Header title="锁仓详情" is-blue :is-border="false" @left="$router.push('/home/index')" />

        <div class="scb-blue-body">
            {{ ((lockProjectObj = lockProject || {}), void 0) }}
            <h1 class="lock-intro-title">
                {{ `BCB矿场 - ${lockProjectObj.length}${unitTypes[lockProjectObj.unit - 1]}` }}
            </h1>

            <div class="lock-intro-banner lock-container">
                <ul class="flex">
                    <li>
                        <h2>
                            <span>{{ lockProjectObj.rate | ratePercent(2, false) }}</span>
                            <small>%</small>
                        </h2>
                        <p>预期年化利率</p>
                    </li>
                    <li>
                        <h2>
                            <span>{{ lockProjectObj.length }}</span>
                            <small>{{ unitTypes[lockProjectObj.unit - 1] }}</small>
                        </h2>
                        <p>锁仓期限</p>
                    </li>
                </ul>
                <p>
                    <i class="icon icon-lamp" />
                    <span>利率稳定不变 到期自动解锁</span>
                </p>
            </div>

            <div class="lock-intro-rule lock-container">
                <h2>交易规则</h2>

                <ul>
                    <li>
                        <h3>
                            <img src="../../../assets/images/lock/rule01.png" alt="" />
                            <span>利息计算</span>
                        </h3>
                        <p>
                            每日到账利息(BCB) = (锁仓时折算的DC价值*锁仓年化利率)/当日BCB价格/365天
                        </p>
                    </li>
                    <li>
                        <h3>
                            <img src="../../../assets/images/lock/rule02.png" alt="" />
                            <span>收益到账</span>
                        </h3>
                        <p>
                            自锁仓日起计算利息，利息从锁仓第二日开始发放，当天发放前一天利息到个人可用余额账户
                        </p>
                    </li>
                </ul>

                <div class="flex times">
                    <div class="time-item">
                        <span>交易日</span>
                        <i />
                        <p>{{ new Date() | dateFormat('yyyy.MM.dd') }}</p>
                    </div>
                    <div class="time-item">
                        <span>利息到账</span>
                        <i />
                        <p>
                            {{ dateCalculate(new Date(), 'd', 1) | dateFormat('yyyy.MM.dd') }}
                        </p>
                    </div>
                    <div class="time-item">
                        <span>本金返还</span>
                        <i />
                        <p>
                            {{
                                dateCalculate(new Date(), ['d', 'M', 'y'][lockProjectObj.unit - 1], lockProjectObj.length) | dateFormat('yyyy.MM.dd')
                            }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="lock-intro-feature lock-container">
                <h2 class="lock-banner">产品特点</h2>
                <ul>
                    <li class="clearfix">
                        <img src="../../../assets/images/lock/feature01.png" alt="" />
                        <div>
                            <h3>高回报率</h3>
                            <p>定期理财，超高利率</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="../../../assets/images/lock/feature02.png" alt="" />
                        <div>
                            <h3>每日返息</h3>
                            <p>每日返回利息到个人可用余额账户</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="../../../assets/images/lock/feature03.png" alt="" />
                        <div>
                            <h3>稳定收益</h3>
                            <p>以锁仓时本金为基数计息，利率固定</p>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="../../../assets/images/lock/feature04.png" alt="" />
                        <div>
                            <h3>本金保证</h3>
                            <p>
                                锁仓期满时，如果币价下跌，可使用锁仓时的价位换购亚太城房产，详见
                                <a>换房</a>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="lock-intro-explain lock-container">
                <h2 class="lock-banner">产品说明</h2>
                <p>
                    该产品为BCB锁仓理财，锁仓存入BCB。由于BCB的市场价值会有一定的波动，当您进行锁仓时，系统会按照当时市场上BCB：DC的价位计算出锁仓BCB对应的DC价值，并做记录。
                </p>
                <p>
                    您每日的利息计算以锁仓时DC价值为基准，再乘以锁仓利率，然后根据计息时BCB：DC的价值来计算。
                </p>
            </div>
        </div>

        <footer class="scb-blue-footer">
            <p v-if="!userLockQuota">当前可锁仓额度：-- -- = -- --</p>
            <p v-else>
                当前可锁仓额度：{{
                    `${userLockQuota.amount} ${userLockQuota.coin} = ${userLockQuota.valuationAmount} ${userLockQuota.valuationCoin}`
                }}
            </p>
            <router-link to="/lock/create">开始锁仓</router-link>
        </footer>
    </div>
</template>

<style src="./lock-intro.less" lang="less" scoped />

<script src="./lock-intro.ts" />
