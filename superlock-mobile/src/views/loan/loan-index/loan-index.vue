<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-blue loan-index">
            <Header :title="$t('LOAN.TITLE01')" is-blue :is-border="false" @left="$router.push('/home/index')" />

            <div class="scb-blue-body">
                {{ ((loanBaseInfoObj = loanBaseInfo || {}), void 0) }}
                <div class="loan-info loan-container">
                    <h1>
                        {{ $t('LOAN.TITLE02') }}
                        <span>（{{ $t('LOAN.TITLE02_DETAIL') }}{{ `${loanBaseInfoObj.loanProportion || '--'}%` }}）</span>
                    </h1>
                    <h2 class="scb-border">
                        {{ $t('LOAN.LOAN_YEAR_RATE') }}：
                        <span>{{ `${loanBaseInfoObj.loanRate || '--'}%` }}</span>
                    </h2>
                    <LoanBanner />
                </div>

                <div class="loan-lock">
                    <h2>{{ $t('LOAN.SELECT_PLEDGE_LOCK') }}</h2>

                    <div v-if="loanableLocks" class="lock-container">
                        <div v-if="loanableLocks.length <= 0" class="scb-none">
                            <img src="../../../assets/images/empty.png" :alt="$t('LOAN.LOCK_PROJECT_NO_RECORD')" />
                            <p>{{ $t('LOAN.LOCK_PROJECT_NO_RECORD') }}</p>
                        </div>
                        <List
                            v-else
                            class="lock-list"
                            v-model="isLoading"
                            :finished="isFinished"
                            :immediate-check="false"
                            :loading-text="$t('COMMON.RECORD_LOADING')"
                            :finished-text="$t('COMMON.RECORD_LOADED')"
                            @load="fetchLoanableLocks"
                        >
                            <CellGroup
                                class="lock-item loan-container"
                                v-for="(loanableLock, index) in loanableLocks"
                                :key="index"
                                @click="goApply(loanableLock)"
                            >
                                {{ ((loanFlag = loanableLock.loanFlag), void 0) }}
                                <Cell :title="`${$t('LOAN.LOCK_ORDER_ID')}：`" :value="loanableLock.orderId" :border="false" />
                                <Cell :title="`${$t('LOAN.LOCK_EXPIRE_TIME')}：`" :border="false">
                                    <p class="clearfix">
                                        <span>{{ loanableLock.endDate | dateFormat('yyyy-MM-dd') }}</span>
                                        <Button v-if="loanFlag === 1" class="effect-shadow" type="default" size="small" round>{{
                                            $t('LOAN.PLEDGE_LOAN')
                                        }}</Button>
                                    </p>
                                </Cell>
                                <Cell
                                    :title="`${$t('LOAN.LOCK_VALUE')}：`"
                                    :value="`${loanableLock.lockValue} ${loanableLock.lockValueCoin}`"
                                    :border="false"
                                />
                                <Cell v-if="loanFlag !== 1" :class="['lock-flag', `flag${loanableLock.loanFlag}`]" :border="false">
                                    <span slot="title">{{ loanFlags.get(loanableLock.loanFlag) }}</span>
                                </Cell>
                            </CellGroup>
                        </List>
                    </div>
                </div>
            </div>

            <footer class="scb-blue-footer">
                <router-link to="/loan/intro">{{ $t('LOAN.LOAN_INTRO') }}</router-link>
            </footer>
        </div>
    </PullRefresh>
</template>

<style src="./loan-index.less" lang="less" scoped />

<script src="./loan-index.ts" />
