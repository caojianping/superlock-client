<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray loan-detail">
            <Header :title="title" @left="$router.push(from)" />

            <div v-if="loan !== undefined" class="scb-separator">
                <div v-if="loan === null" class="scb-none">
                    <img src="../../../assets/images/empty.png" alt="暂无贷款数据" />
                    <p>暂无贷款数据</p>
                </div>

                <CellGroup v-else class="priority-value">
                    {{ ((status = loan.status), void 0) }}
                    <Cell title="贷款订单号">
                        <p class="scb-copy" id="orderId" :data-clipboard-text="loan.orderId">
                            <span>{{ loan.orderId }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell title="质押锁仓订单号">
                        <p class="scb-copy" id="lockOrderId" :data-clipboard-text="loan.lockOrderId">
                            <span>{{ loan.lockOrderId }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell title="质押锁仓价值" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />

                    <template v-if="status === 0 || status === 10">
                        <Cell title="申请数量" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell title="贷款年利率" :value="`${loan.rate}%`" />
                        <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                    </template>

                    <template v-else-if="status === 20 || status === 50">
                        <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell title="贷款年利率" :value="`${loan.rate}%`" />
                        <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                        <Cell title="放贷时间" :value="loan.lendDate | dateFormat" />
                        <Cell title="放款汇率" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                        <Cell title="放贷币种数量" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                        <Cell title="预计还款日期" :value="loan.estimatedRepayDate | dateFormat('yyyy-MM-dd')" />
                        <Cell
                            title="利息总计"
                            :value="`${loan.totalInterest} ${loan.totalInterestCoin}`"
                            is-link
                            :to="`/loan/interests/${loan.orderId}`"
                        />
                        <Cell title="应还本息" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    </template>

                    <template v-else-if="status === 31">
                        <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell title="贷款年利率" :value="`${loan.rate}%`" />
                        <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                        <Cell title="放贷时间" :value="loan.lendDate | dateFormat" />
                        <Cell title="放款汇率" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                        <Cell title="放贷币种数量" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                        <Cell title="预计还款日期" :value="loan.estimatedRepayDate | dateFormat('yyyy-MM-dd')" />
                        <Cell
                            title="利息总计"
                            :value="`${loan.totalInterest} ${loan.totalInterestCoin}`"
                            is-link
                            :to="`/loan/interests/${loan.orderId}`"
                        />
                        <Cell title="应还本息" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    </template>

                    <template v-else>
                        <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell title="贷款年利率" :value="`${loan.rate}%`" />
                        <Cell title="申请时间" :value="loan.applyTime | dateFormat" />
                        <Cell title="放贷时间" :value="loan.lendDate | dateFormat" />
                        <Cell title="放款汇率" :value="`1${loan.fromCoin} = ${loan.lendExchangeRate}${loan.toCoin}`" />
                        <Cell title="放贷币种数量" :value="`${loan.lendAmount} ${loan.lendAmountCoin}`" />
                        <Cell title="还款时间" :value="loan.repaymentTime | dateFormat" />
                        <Cell
                            title="利息总计"
                            :value="`${loan.totalInterest} ${loan.totalInterestCoin}`"
                            is-link
                            :to="`/loan/interests/${loan.orderId}`"
                        />
                        <Cell title="应还本息" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                        <Cell title="还款汇率" :value="`1${loan.fromCoin} = ${loan.repaymentExchangeRate}${loan.toCoin}`" />
                        <Cell title="实际还款价值" :value="`${loan.actualRepayment} ${loan.actualRepaymentCoin}`" />
                    </template>

                    <Cell title="状态">
                        <span :class="`text-${loanColors.get(status)}`">{{ loanStatuses.get(status) }}</span>
                    </Cell>
                </CellGroup>

                <div v-if="(loan && loan.status === 20) || loan.status === 50" class="loan-footbar">
                    <Button class="effect-shadow" type="primary" block round to="/loan/repay">立即还款</Button>
                </div>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./loan-detail.less" lang="less" scoped />

<script src="./loan-detail.ts" />
