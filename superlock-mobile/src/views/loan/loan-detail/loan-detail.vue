<template>
    <div class="scb-gray loan-detail">
        <Header :title="title" @left="$router.push(from)" />

        <div v-if="loan !== undefined" class="scb-separator">
            <div v-if="loan === null" class="scb-none">
                <img src="../../../assets/images/empty.png" alt="暂无贷款数据" />
                <p>暂无贷款数据</p>
            </div>
            <CellGroup v-else class="priority-value">
                {{ ((status = loan.status), void 0) }}
                <template v-if="status === 0">
                    <Cell title="贷款订单号" :value="loan.orderId" />
                    <Cell title="质押锁仓订单号" :value="loan.lockOrderId" />
                    <Cell title="质押锁仓价值" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />
                    <Cell title="申请数量" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                    <Cell title="贷款年利率" :value="`${loan.rate}%`" />
                    <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                    <Cell :class="['loan-status', loanColors.get(loan.status)]" title="状态" :value="loanStatuses.get(loan.status)" />
                </template>

                <template v-else-if="status === 20">
                    <Cell title="贷款订单号" :value="loan.orderId" />
                    <Cell title="质押锁仓订单号" :value="loan.lockOrderId" />
                    <Cell title="质押锁仓价值" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />
                    <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                    <Cell title="贷款年利率" :value="`${loan.rate}%`" />
                    <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                    <Cell title="放贷时间" :value="loan.lendTime | dateFormat" />
                    <Cell title="放款汇率" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                    <Cell title="放款币种数量" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                    <Cell title="预计还款时间" :value="loan.estimatedRepayDate | dateFormat" />
                    <Cell
                        title="利息总计"
                        :value="`${loan.totalInterest} ${loan.totalInterestCoin}`"
                        is-link
                        :to="`/loan/interests/${loan.lockOrderId}`"
                    />
                    <Cell title="应还本息" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    <Cell :class="['loan-status', loanColors.get(loan.status)]" title="状态" :value="loanStatuses.get(loan.status)" />
                </template>

                <template v-else>
                    <Cell title="贷款订单号" :value="loan.orderId" />
                    <Cell title="质押锁仓订单号" :value="loan.lockOrderId" />
                    <Cell title="质押锁仓价值" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />
                    <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                    <Cell title="贷款年利率" :value="`${loan.rate}%`" />
                    <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                    <Cell title="放贷时间" :value="loan.lendTime | dateFormat" />
                    <Cell title="放款汇率" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                    <Cell title="放款币种数量" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                    <Cell title="还款时间" :value="loan.repaymentTime | dateFormat" />
                    <Cell
                        title="利息总计"
                        :value="`${loan.totalInterest} ${loan.totalInterestCoin}`"
                        is-link
                        :to="`/loan/interests/${loan.lockOrderId}`"
                    />
                    <Cell title="应还本息" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    <Cell title="还款汇率" :value="`1${loan.fromCoin} = ${loan.repaymentExchangeRate}${loan.toCoin}`" />
                    <Cell title="实际还款价值" :value="`${loan.actualRepayment} ${loan.actualRepaymentCoin}`" />
                    <Cell :class="['loan-status', loanColors.get(loan.status)]" title="状态" :value="loanStatuses.get(loan.status)" />
                </template>
            </CellGroup>

            <div v-if="loan && loan.status === 20" class="loan-footbar">
                <Button class="effect-shadow" type="primary" block round to="/loan/repay">立即还款</Button>
            </div>
        </div>
    </div>
</template>

<style src="./loan-detail.less" lang="less" scoped />

<script src="./loan-detail.ts" />
