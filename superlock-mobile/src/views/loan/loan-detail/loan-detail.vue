<template>
    <div class="loan-detail scb-gray">
        <Header :title="title" @left="$router.push({ path: '/asset/index', query: { type: 2 } })" />

        <div v-if="loan !== undefined" class="scb-separator">
            <p v-if="loan === null" class="scb-none">暂无贷款数据</p>
            <CellGroup v-else>
                {{ ((status = loan.status), void 0) }}
                <template v-if="status === 0">
                    <Cell title="贷款订单号" :value="loan.orderId" />
                    <Cell title="质押锁仓订单号" :value="loan.lockOrderId" />
                    <Cell title="质押锁仓价值" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />
                    <Cell title="申请数量" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                    <Cell title="贷款年利率" :value="loan.rate | ratePercent" />
                    <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                    <Cell title="状态" :value="loanStatuses.get(loan.status)" />
                </template>

                <template v-else-if="status === 20">
                    <Cell title="贷款订单号" :value="loan.orderId" />
                    <Cell title="质押锁仓订单号" :value="loan.lockOrderId" />
                    <Cell title="质押锁仓价值" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />
                    <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                    <Cell title="贷款年利率" :value="loan.rate | ratePercent" />
                    <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                    <Cell title="放贷时间" :value="loan.lendTime | dateFormat" />
                    <Cell title="放款汇率" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                    <Cell title="放款币种数量" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                    <Cell title="预计还款时间" :value="loan.estimatedRepayDate | dateFormat" />
                    <Cell title="利息总计" :value="`${loan.totalInterest} ${loan.totalInterestCoin}`" is-link :to="`/loan/interest/${id}`" />
                    <Cell title="应还本息" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    <Cell title="状态" :value="loanStatuses.get(loan.status)" />
                </template>

                <template v-else>
                    <Cell title="贷款订单号" :value="loan.orderId" />
                    <Cell title="质押锁仓订单号" :value="loan.lockOrderId" />
                    <Cell title="质押锁仓价值" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />
                    <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                    <Cell title="贷款年利率" :value="loan.rate | ratePercent" />
                    <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                    <Cell title="放贷时间" :value="loan.lendTime | dateFormat" />
                    <Cell title="放款汇率" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                    <Cell title="放款币种数量" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                    <Cell title="还款时间" :value="loan.repaymentTime | dateFormat" />
                    <Cell title="利息总计" :value="`${loan.totalInterest} ${loan.totalInterestCoin}`" is-link :to="`/loan/interest/${id}`" />
                    <Cell title="应还本息" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    <Cell title="还款汇率" :value="`1${loan.fromCoin} = ${loan.repaymentExchangeRate}${loan.toCoin}`" />
                    <Cell title="实际还款价值" :value="`${loan.actualRepayment} ${loan.actualRepaymentCoin}`" />
                    <Cell title="状态" :value="loanStatuses.get(loan.status)" />
                </template>
            </CellGroup>

            <Button v-if="loan && loan.status === 20" class="effect-shadow" type="primary" block round :to="`/loan/repay/${id}`">立即还款</Button>
        </div>
    </div>
</template>

<style src="./loan-detail.less" lang="less" scoped />

<script src="./loan-detail.ts" />
