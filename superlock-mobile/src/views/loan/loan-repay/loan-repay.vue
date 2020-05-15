<template>
    <div class="scb-gray loan-repay">
        <Header title="贷款偿还" @left="$router.push('/loan/detail')" />

        <div v-if="loan !== undefined" class="scb-separator">
            <div v-if="loan === null" class="scb-none">
                <img src="../../../assets/images/empty.png" alt="暂无贷款数据" />
                <p>暂无贷款数据</p>
            </div>
            <template>
                <CellGroup class="priority-value">
                    <Cell title="贷款订单号" :value="loan.orderId" />
                    <Cell title="质押锁仓订单号" :value="loan.lockOrderId" />
                    <Cell title="质押锁仓价值" :value="`${loan.mortgageValuationAmount} ${loan.mortgageValuationCoin}`" />
                    <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                    <Cell title="贷款年利率" :value="loan.rate | ratePercent" />
                    <Cell title="放贷时间" :value="loan.lendTime | dateFormat" />

                    <Cell title="累计贷款时长" :value="`${loan.lendDays}天`" />
                    <Cell title="累计利息" :value="`${loan.totalInterest} ${loan.totalInterestCoin}`" />
                    <Cell title="应还本息(DC)" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                    <Cell title="还款汇率" :value="`1${loan.fromCoin} = ${loan.repaymentExchangeRate}${loan.toCoin}`" />
                    <Cell title="应还本息(BCB)" :value="`${loan.actualRepayment} ${loan.actualRepaymentCoin}`" />

                    <Cell title="当前账户可用余额" :value="`${loan.balance} BCB`" />
                </CellGroup>

                <div class="loan-footbar">
                    <Button class="effect-shadow" type="primary" block round @click="submit">确定还款</Button>
                </div>
            </template>
        </div>

        <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
    </div>
</template>

<style src="./loan-repay.less" lang="less" scoped />

<script src="./loan-repay.ts" />
