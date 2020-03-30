<template>
    <div class="lock-detail">
        <div class="lock-detail-header">
            <Header title="锁仓详情" @left="$router.push('/home/index')" />
        </div>

        <div class="lock-detail-body">
            <h1 class="lock-detail-title">
                锁仓宝 -
                {{ lockProject.length + lockUnits[lockProject.unit - 1] }}
            </h1>

            <div class="lock-detail-intro">
                <ul>
                    <li>
                        <h2>
                            <span>{{
                                lockProject.rate | ratePercent(1, false)
                            }}</span>
                            <small>%</small>
                        </h2>
                        <p>预期年化利率</p>
                    </li>
                    <li>
                        <h2>
                            <span>{{ lockProject.length }}</span>
                            <small>{{ lockUnits[lockProject.unit - 1] }}</small>
                        </h2>
                        <p>锁仓期限</p>
                    </li>
                </ul>
                <p>
                    <i class="icon icon-lamp" />
                    <span>利率稳定不变 到期自动解锁</span>
                </p>
            </div>

            <div class="lock-detail-rule">
                <ul>
                    <li>
                        <h3>
                            <img src="" alt="" />
                            <span>利息计算</span>
                        </h3>
                        <p>
                            每日到账利息(BCB) -
                            (锁仓时折算的DC价值*锁仓年化利率)/当日BCB价格/{{
                                lockProject.length +
                                    lockUnits[lockProject.unit - 1]
                            }}
                        </p>
                    </li>
                    <li>
                        <h3>
                            <img src="" alt="" />
                            <span>收益到账</span>
                        </h3>
                        <p>
                            自锁仓日起计算利息，利息从锁仓第二日开始发放，当天发放前一天利息到个人可用余额账户
                        </p>
                    </li>
                    <li>
                        <img src="" alt="" />
                    </li>
                </ul>
            </div>

            <div class="lock-detail-feature">
                <h2>产品特点</h2>
                <ul>
                    <li>
                        <img src="" alt="" />
                        <div>
                            <h3>高回报率</h3>
                            <p>定期理财，超高利率</p>
                        </div>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <div>
                            <h3>每日返息</h3>
                            <p>每日返回利息到个人可用余额账户</p>
                        </div>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <div>
                            <h3>稳定收益</h3>
                            <p>以锁仓时本金为基数计息，利率固定</p>
                        </div>
                    </li>
                    <li>
                        <img src="" alt="" />
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

            <div class="lock-detail-explain">
                <h2>产品说明</h2>
                <p>
                    该产品为BCB锁仓理财，锁仓存入BCB。由于BCB的市场价值会有一定的波动，当您进行锁仓时，系统会按照当时市场上BCB：DC的价位计算出锁仓BCB对应的DC价值，并做记录。
                </p>
                <p>
                    您每日的利息计算以锁仓时DC价值为基准，再乘以锁仓利率，然后根据计算时BCB：DC的价值来计算。
                </p>
            </div>
        </div>

        <footer class="lock-detail-footer">
            <p>
                当前可锁仓额度：{{
                    `${userLockQuota.amount} ${userLockQuota.coin} = ${userLockQuota.valuationAmount} ${userLockQuota.valuationCoin}`
                }}
            </p>
            <router-link to="/lock/create">开始锁仓</router-link>
        </footer>
    </div>
</template>

<style src="./lock-detail.less" lang="less" scoped />

<script src="./lock-detail.ts" />
