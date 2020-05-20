<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray loan-repay">
            <Header title="贷款偿还" @left="$router.push('/loan/detail')" />

            <div v-if="loan !== undefined" class="scb-separator">
                <div v-if="loan === null" class="scb-none">
                    <img src="../../../assets/images/empty.png" alt="暂无贷款数据" />
                    <p>暂无贷款数据</p>
                </div>
                <template>
                    <CellGroup class="priority-value">
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
                        <Cell title="贷款价值" :value="`${loan.loanValuationAmount} ${loan.loanValuationCoin}`" />
                        <Cell title="贷款年利率" :value="`${loan.rate}%`" />
                        <Cell title="放贷时间" :value="loan.lendDate | dateFormat" />

                        <Cell title="累计贷款时长" :value="`${loan.lendDays}天`" />
                        <Cell title="累计利息" :value="`${loan.totalInterest} ${loan.totalInterestCoin}`" />
                        <Cell title="应还本息(DC)" :value="`${loan.shouldReturnValue} ${loan.shouldReturnValueCoin}`" />
                        <Cell title="还款汇率" :value="`1${loan.fromCoin} = ${loan.repaymentExchangeRate}${loan.toCoin}`" />
                        <Cell title="应还本息(BCB)" :value="`${loan.shouldReturn} ${loan.shouldReturnCoin}`" />

                        <Cell title="当前账户可用余额" :value="`${loan.balance} BCB`" />
                    </CellGroup>

                    <div class="loan-footbar">
                        <Button class="effect-shadow" type="primary" block round @click="submit">确定还款</Button>
                    </div>
                </template>
            </div>

            <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./loan-repay.less" lang="less" scoped />

<script src="./loan-repay.ts" />
