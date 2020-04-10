<template>
    <div class="transaction-record">
        <Header title="资金明细" isRight @left="$router.push('/asset/index')">
            <span slot="right" @click="openFilter">筛选</span>
        </Header>

        <div v-if="transactions" class="scb-separator">
            <p v-if="transactions.length <= 0" class="scb-none">暂无资金记录</p>
            <List
                v-else
                v-model="isLoading"
                :finished="isFinished"
                :immediate-check="false"
                loading-text="记录加载中……"
                finished-text="记录加载完毕"
                @load="fetchData"
            >
                <CellGroup>
                    <Cell
                        v-for="(transaction, index) in transactions"
                        :key="index"
                        :to="`/transaction/detail/${transaction.type}/${transaction.orderId}`"
                    >
                        <div slot="title">
                            <h2>{{ transaction.remark || '' }}</h2>
                            <p>{{ transaction.createTime | dateFormat }}</p>
                        </div>
                        <div slot="default">
                            <h3 :class="{ income: transaction.symbol === 1 }">
                                {{ `${['-', '+'][transaction.symbol]} ${transaction.amount} ${transaction.coin}` }}
                            </h3>
                            <p>{{ `余额 ${transaction.balance} ${transaction.balanceCoin}` }}</p>
                        </div>
                    </Cell>
                </CellGroup>
            </List>
        </div>

        <TransactionFilter v-model="isShow" @change="handleFilterChange" />
    </div>
</template>

<style src="./transaction-record.less" lang="less" scoped />

<script src="./transaction-record.ts" />
