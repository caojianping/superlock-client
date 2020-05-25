<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray loan-interests">
            <Header :title="$t('LOAN.LOAN_INTEREST')" :is-border="false" @left="$router.push('/loan/detail')" />

            <div v-if="loanInterests" class="scb-separator">
                <div v-if="loanInterests.length <= 0" class="scb-none">
                    <img src="../../../assets/images/empty.png" :alt="$t('LOAN.LOAN_INTEREST_NO_DATA')" />
                    <p>{{ $t('LOAN.LOAN_INTEREST_NO_DATA') }}</p>
                </div>
                <List
                    v-else
                    class="interest-list"
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    :loading-text="$t('COMMON.RECORD_LOADING')"
                    :finished-text="$t('COMMON.RECORD_LOADED')"
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
        </div>
    </PullRefresh>
</template>

<style src="./loan-interests.less" lang="less" scoped />

<script src="./loan-interests.ts" />
