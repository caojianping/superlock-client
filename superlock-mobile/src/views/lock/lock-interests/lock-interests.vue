<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray lock-interests">
            <Header title="收益记录" :is-border="false" @left="$router.push('/lock/detail')" />

            <div v-if="lockInterests" class="scb-separator">
                <div v-if="lockInterests.length <= 0" class="scb-none">
                    <img src="../../../assets/images/empty.png" alt="暂无锁仓收益" />
                    <p>暂无锁仓收益</p>
                </div>
                <List
                    v-else
                    class="interest-list"
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    loading-text="记录加载中……"
                    finished-text="记录加载完毕"
                    @load="fetchLockInterests"
                >
                    <CellGroup>
                        <Cell v-for="(lockInterest, index) in lockInterests" :key="index" :title="lockInterest.date | dateFormat('yyyy-MM-dd')">
                            <h3>{{ `+ ${lockInterest.fromAmount} ${lockInterest.fromCoin}` }}</h3>
                            <p>{{ `价值 ${lockInterest.toAmount} ${lockInterest.toCoin}` }}</p>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./lock-interests.less" lang="less" scoped />

<script src="./lock-interests.ts" />
