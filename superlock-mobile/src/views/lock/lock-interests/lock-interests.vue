<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray lock-interests">
            <Header :title="$t('LOCK.INTEREST_RECORD')" :is-border="false" @left="$router.push('/lock/detail')" />

            <div v-if="lockInterests" class="scb-separator">
                <div v-if="lockInterests.length <= 0" class="scb-none">
                    <img src="../../../assets/images/empty.png" :alt="$t('LOCK.LOCK_INTEREST_NO_DATA')" />
                    <p>{{ $t('LOCK.LOCK_INTEREST_NO_DATA') }}</p>
                </div>
                <List
                    v-else
                    class="interest-list"
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    :loading-text="$t('COMMON.RECORD_LOADING')"
                    :finished-text="$t('COMMON.RECORD_LOADED')"
                    @load="fetchLockInterests"
                >
                    <CellGroup>
                        <Cell v-for="(lockInterest, index) in lockInterests" :key="index" :title="lockInterest.date | dateFormat('yyyy-MM-dd')">
                            <h3>{{ `+ ${lockInterest.fromAmount} ${lockInterest.fromCoin}` }}</h3>
                            <p>{{ `${$t('COMMON.VALUE')} ${lockInterest.toAmount} ${lockInterest.toCoin}` }}</p>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./lock-interests.less" lang="less" scoped />

<script src="./lock-interests.ts" />
