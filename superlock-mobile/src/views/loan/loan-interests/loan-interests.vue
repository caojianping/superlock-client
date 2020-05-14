<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <Header title="贷款利息" :isBorder="false" @left="$router.push('/loan/detail')" />

        <div v-if="loanInterests" class="interest-container">
            <p v-if="loanInterests.length <= 0" class="scb-none">暂无贷款利息</p>
            <List
                v-else
                class="interest-list"
                v-model="isLoading"
                :finished="isFinished"
                :immediate-check="false"
                loading-text="记录加载中……"
                finished-text="记录加载完毕"
                @load="fetchLoanInterests"
            >
                <CellGroup>
                    <Cell
                        v-for="(loanInterest, index) in loanInterests"
                        :key="index"
                        :title="loanInterest.date | dateFormat('yyyy-MM-dd')"
                        :value="`${loanInterest.amount} ${loanInterest.coin}`"
                    />
                </CellGroup>
            </List>
        </div>
    </PullRefresh>
</template>

<style src="./loan-interests.less" lang="less" scoped />

<script src="./loan-interests.ts" />
