<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="transfer-record">
            <Header title="转账记录" @left="$router.push('/transfer/index')" />

            <div v-if="transfers" class="scb-separator">
                <p v-if="transfers.length <= 0" class="scb-none">
                    暂无转账记录，快去<router-link class="scb-link" to="/transfer/index">转账</router-link>吧！
                </p>
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
                        <Cell v-for="(transfer, index) in transfers" :key="index" @click="goDetail(transfer)">
                            <div slot="title">
                                <h2>{{ (transfer.orderId || '') | hashTruncate }}</h2>
                                <p>{{ transfer.createTime | dateFormat }}</p>
                            </div>
                            <p slot="default" :class="{ income: transfer.prefix === 1 }">
                                {{ `${['-', '+'][transfer.prefix]} ${transfer.amount} ${transfer.coin}` }}
                            </p>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./transfer-record.less" lang="less" scoped />

<script src="./transfer-record.ts" />
