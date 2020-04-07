<template>
    <Popup v-model="isShow" class="reward-popup page-popup" @close="closePopup">
        <Header :title="title" @left="closePopup" />

        <div v-if="rewards" class="record-container separator">
            <p v-if="rewards.length <= 0" class="none">
                暂无奖励记录
            </p>
            <List
                v-else
                class="reward-list"
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
                                <h3>
                                    {{ `+${reward.amount} ${reward.coin}` }}
                                </h3>
                                <p v-if="type === 1">
                                    {{
                                        `价值 ${reward.rewardValuation} ${reward.rewardValuationCoin}`
                                    }}
                                </p>
                                <p v-else-if="type === 2 || type === 3">
                                    {{
                                        `价值 ${reward.interestValuation} ${reward.interestValuationCoin}`
                                    }}
                                </p>
                            </div>
                        </template>
                        <template v-else>
                            <div slot="title">
                                <h2>达标触发数量</h2>
                                <p>
                                    {{
                                        `${reward.salesVolume} ${reward.salesVolumeCoin}`
                                    }}
                                </p>
                            </div>
                            <div slot="default">
                                <h3>
                                    {{
                                        `奖励：${reward.reward} ${reward.rewardCoin}`
                                    }}
                                </h3>
                                <p>{{ reward.date | dateFormat }}</p>
                            </div>
                        </template>
                    </Cell>
                </CellGroup>
            </List>
        </div>
    </Popup>
</template>

<style src="./reward-list.less" lang="less" scoped />

<script src="./reward-list.ts" />
