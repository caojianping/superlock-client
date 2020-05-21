<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="reward-record">
            <Header :title="title" @left="$router.push({ path: '/asset/index', query: { type: 3 } })" />

            <div v-if="rewards" class="scb-separator">
                <p v-if="rewards.length <= 0" class="scb-none">暂无奖励记录</p>
                <List
                    v-else
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    loading-text="记录加载中……"
                    finished-text="记录加载完毕"
                    @load="fetchData"
                >
                    <CellGroup>
                        <Cell v-for="(reward, index) in rewards" :key="index">
                            <template v-if="type !== 4">
                                <div slot="title">
                                    <h2>
                                        {{ reward.orderId || '' }}
                                    </h2>
                                    <p>
                                        {{ reward.date | dateFormat }}
                                    </p>
                                </div>
                                <div slot="default">
                                    <h3 v-if="type === 1">
                                        {{ `+${reward.reward} ${reward.coin}` }}
                                    </h3>
                                    <h3 v-else>
                                        {{ `+${reward.interest} ${reward.coin}` }}
                                    </h3>
                                    <p v-if="type === 1">
                                        {{ `价值 ${reward.rewardValuation} ${reward.rewardValuationCoin}` }}
                                    </p>
                                    <p v-else-if="type === 2 || type === 3">
                                        {{ `价值 ${reward.interestValuation} ${reward.interestValuationCoin}` }}
                                    </p>
                                </div>
                            </template>
                            <template v-else>
                                <div slot="title">
                                    <h2>达标触发数量</h2>
                                    <p>
                                        {{ `${reward.salesVolume} ${reward.salesVolumeCoin}` }}
                                    </p>
                                </div>
                                <div slot="default">
                                    <h3>
                                        {{ `奖励：${reward.reward} ${reward.rewardCoin}` }}
                                    </h3>
                                    <p>{{ reward.date | dateFormat }}</p>
                                </div>
                            </template>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./reward-record.less" lang="less" scoped />

<script src="./reward-record.ts" />
