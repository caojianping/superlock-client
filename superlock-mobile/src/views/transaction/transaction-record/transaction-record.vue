<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="transaction-record">
            <Header :title="$t('TRANSACTION.TRANSACTION_DETAILS')" is-right @left="$router.push('/asset/index')">
                <span slot="right" @click="openFilter">{{ $t('TRANSACTION.FILTER') }}</span>
            </Header>

            <div v-if="transactions" class="scb-separator">
                <p v-if="transactions.length <= 0" class="scb-none">{{ $t('TRANSACTION.TRANSACTION_RECORD_NO_DATA') }}</p>
                <List
                    v-else
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    :loading-text="$t('COMMON.RECORD_LOADING')"
                    :finished-text="$t('COMMON.RECORD_LOADED')"
                    @load="fetchTransactions"
                >
                    <CellGroup>
                        <Cell
                            v-for="(transaction, index) in transactions"
                            :key="index"
                            :to="`/transaction/detail/${transaction.type}/${transaction.orderId}`"
                        >
                            <div slot="title">
                                <h2>{{ $t(`TRANSACTION.TRANSACTION_TYPES.${transaction.type}`) }}</h2>
                                <p>{{ transaction.createTime | dateFormat }}</p>
                            </div>
                            <div slot="default">
                                <h3 :class="{ income: transaction.symbol === 1 }">
                                    {{ `${['-', '+'][transaction.symbol]} ${transaction.amount} ${transaction.coin}` }}
                                </h3>
                                <p>{{ `${$t('COMMON.BALANCE')} ${transaction.balance} ${transaction.balanceCoin}` }}</p>
                            </div>
                        </Cell>
                    </CellGroup>
                </List>
            </div>

            <TransactionFilter v-model="isShow" @change="handleFilterChange" />
        </div>
    </PullRefresh>
</template>

<style src="./transaction-record.less" lang="less" scoped />

<script src="./transaction-record.ts" />
