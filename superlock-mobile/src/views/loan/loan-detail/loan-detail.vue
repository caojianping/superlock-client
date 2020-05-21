<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray loan-detail">
            <Header :title="title" @left="$router.push(from)" />

            <div v-if="loan !== undefined" class="scb-separator">
                <div v-if="loan === null" class="scb-none">
                    <img src="../../../assets/images/empty.png" :alt="$t('LAON.LOAN_NO_RECORD')" />
                    <p>{{ $t('LAON.LOAN_NO_RECORD') }}</p>
                </div>

                <CellGroup v-else class="priority-value">
                    {{ ((status = loan.status), void 0) }}
                    <Cell :title="$t('LAON.LOAN_ORDER_ID')">
                        <p class="scb-copy" id="orderId" :data-clipboard-text="loan.orderId">
                            <span>{{ loan.orderId }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell :title="$t('LAON.PLEDGE_LOCK_ORDER_ID')">
                        <p class="scb-copy" id="lockOrderId" :data-clipboard-text="loan.lockOrderId">
                            <span>{{ loan.lockOrderId }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell :title="$t('LAON.PLEDGE_LOCK_VALUE')" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />

                    <template v-if="status === 0 || status === 10">
                        <Cell :title="$t('LAON.APPLY_COUNT')" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell :title="$t('LAON.LOAN_YEAR_RATE')" :value="`${loan.rate}%`" />
                        <Cell :title="$t('LAON.APPLY_TIME')" :value="loan.applyTime | dateFormat" />
                    </template>

                    <template v-else-if="status === 20 || status === 50">
                        <Cell :title="$t('LAON.LOAN_VALUE')" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell :title="$t('LAON.LOAN_YEAR_RATE')" :value="`${loan.rate}%`" />
                        <Cell :title="$t('LAON.APPLY_TIME')" :value="loan.applyTime | dateFormat" />
                        <Cell :title="$t('LAON.LENDING_TIME')" :value="loan.lendDate | dateFormat" />
                        <Cell :title="$t('LAON.LENDING_RATE')" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                        <Cell :title="$t('LAON.LENDING_COIN_AMOUNT')" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                        <Cell :title="$t('LAON.EXPECT_REPAY_DATE')" :value="loan.estimatedRepayDate | dateFormat('yyyy-MM-dd')" />
                        <Cell
                            :title="$t('LAON.TOTAL_INTEREST01')"
                            :value="`${loan.totalInterest} ${loan.totalInterestCoin}`"
                            is-link
                            :to="`/loan/interests/${loan.orderId}`"
                        />
                        <Cell :title="$t('LAON.REPAY_MONEY')" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    </template>

                    <template v-else-if="status === 31">
                        <Cell :title="$t('LAON.LOAN_VALUE')" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell :title="$t('LAON.LOAN_YEAR_RATE')" :value="`${loan.rate}%`" />
                        <Cell :title="$t('LAON.APPLY_TIME')" :value="loan.applyTime | dateFormat" />
                        <Cell :title="$t('LAON.LENDING_TIME')" :value="loan.lendDate | dateFormat" />
                        <Cell :title="$t('LAON.LENDING_RATE')" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                        <Cell :title="$t('LAON.LENDING_COIN_AMOUNT')" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                        <Cell :title="$t('LAON.EXPECT_REPAY_DATE')" :value="loan.estimatedRepayDate | dateFormat('yyyy-MM-dd')" />
                        <Cell
                            :title="$t('LAON.TOTAL_INTEREST01')"
                            :value="`${loan.totalInterest} ${loan.totalInterestCoin}`"
                            is-link
                            :to="`/loan/interests/${loan.orderId}`"
                        />
                        <Cell :title="$t('LAON.REPAY_MONEY')" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    </template>

                    <template v-else>
                        <Cell :title="$t('LAON.LOAN_VALUE')" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell :title="$t('LAON.LOAN_YEAR_RATE')" :value="`${loan.rate}%`" />
                        <Cell :title="$t('LAON.APPLY_TIME')" :value="loan.applyTime | dateFormat" />
                        <Cell :title="$t('LAON.LENDING_TIME')" :value="loan.lendDate | dateFormat" />
                        <Cell :title="$t('LAON.LENDING_RATE')" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                        <Cell :title="$t('LAON.LENDING_COIN_AMOUNT')" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                        <Cell :title="$t('LAON.REPAY_TIME')" :value="loan.repaymentTime | dateFormat" />
                        <Cell
                            :title="$t('LAON.TOTAL_INTEREST01')"
                            :value="`${loan.totalInterest} ${loan.totalInterestCoin}`"
                            is-link
                            :to="`/loan/interests/${loan.orderId}`"
                        />
                        <Cell :title="$t('LAON.REPAY_MONEY')" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                        <Cell :title="$t('LAON.REPAY_RATE')" :value="`1${loan.fromCoin} = ${loan.repaymentExchangeRate}${loan.toCoin}`" />
                        <Cell :title="$t('LAON.ACTUAL_REAPY_VALUE')" :value="`${loan.actualRepayment} ${loan.actualRepaymentCoin}`" />
                    </template>

                    <Cell :title="$t('COMMON.STATUS')">
                        <span :class="`text-${loanColors.get(status)}`">{{ loanStatuses.get(status) }}</span>
                    </Cell>
                </CellGroup>

                <div v-if="(loan && loan.status === 20) || loan.status === 50" class="loan-footbar">
                    <Button class="effect-shadow" type="primary" block round to="/loan/repay">{{ $t('LAON.IMMEDIATELY_REPAY') }}</Button>
                </div>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./loan-detail.less" lang="less" scoped />

<script src="./loan-detail.ts" />
