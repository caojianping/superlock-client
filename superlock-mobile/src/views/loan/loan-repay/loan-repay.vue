<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray loan-repay">
            <Header :title="$t('LOAN.LOAN_REPAY')" @left="$router.push('/loan/detail')" />

            <div v-if="loan !== undefined" class="scb-separator">
                <div v-if="loan === null" class="scb-none">
                    <img src="../../../assets/images/empty.png" :alt="$t('LOAN.LOAN_NO_RECORD')" />
                    <p>{{ $t('LOAN.LOAN_NO_RECORD') }}</p>
                </div>
                <template>
                    <CellGroup class="priority-value">
                        <Cell :title="$t('LOAN.LOAN_ORDER_ID')">
                            <p class="scb-copy" id="orderId" :data-clipboard-text="loan.orderId">
                                <span>{{ loan.orderId }}</span>
                                <i class="icon icon-copy" />
                            </p>
                        </Cell>
                        <Cell :title="$t('LOAN.PLEDGE_LOCK_ORDER_ID')">
                            <p class="scb-copy" id="lockOrderId" :data-clipboard-text="loan.lockOrderId">
                                <span>{{ loan.lockOrderId }}</span>
                                <i class="icon icon-copy" />
                            </p>
                        </Cell>

                        <Cell :title="$t('LOAN.PLEDGE_LOCK_VALUE')" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />
                        <Cell :title="$t('LOAN.LOAN_VALUE')" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell :title="$t('LOAN.LOAN_YEAR_RATE')" :value="`${loan.rate}%`" />
                        <Cell :title="$t('LOAN.LENDING_TIME')" :value="loan.lendDate | dateFormat" />

                        <Cell :title="$t('LOAN.TOTAL_LAON_TIME')" :value="`${loan.lendDays}${$t('COMMON.DAY')}`" />
                        <Cell :title="$t('LOAN.TOTAL_INTEREST02')" :value="`${loan.totalInterest} ${loan.totalInterestCoin}`" />
                        <Cell :title="`${$t('LOAN.REPAY_MONEY')}(DC)`" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                        <Cell :title="$t('LOAN.REPAY_RATE')" :value="`1${loan.fromCoin} = ${loan.repaymentExchangeRate}${loan.toCoin}`" />
                        <Cell :title="`${$t('LOAN.REPAY_MONEY')}(BCB)`" :value="`${loan.shouldReturn} ${loan.shouldReturnCoin}`" />

                        <Cell :title="$t('LOAN.ACCOUNT_AVAILABLE_BALANCE')" :value="`${loan.balance} BCB`" />
                    </CellGroup>

                    <div class="loan-footbar">
                        <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('LOAN.CONFIRM_REPAY') }}</Button>
                    </div>
                </template>
            </div>

            <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./loan-repay.less" lang="less" scoped />

<script src="./loan-repay.ts" />
