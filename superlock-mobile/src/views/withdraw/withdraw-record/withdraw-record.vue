<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="withdraw-record">
            <Header title="提现记录" @left="$router.push('/withdraw/index')" />

            <div v-if="withdraws" class="scb-separator">
                <p v-if="withdraws.length <= 0" class="scb-none">
                    暂无提现记录，快去<router-link class="scb-link" to="/asset/index">提现</router-link>吧！
                </p>
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
                        <Cell v-for="(withdraw, index) in withdraws" :key="index" @click="goDetail(withdraw)">
                            <div slot="title">
                                <h2>{{ (withdraw.orderId || '') | hashTruncate }}</h2>
                                <p>{{ withdraw.createTime | dateFormat }}</p>
                            </div>
                            <p>{{ `- ${withdraw.amount} ${withdraw.coin}` }}</p>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./withdraw-record.less" lang="less" scoped />

<script src="./withdraw-record.ts" />
