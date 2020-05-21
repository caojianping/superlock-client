<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="transfer-record">
            <Header :title="$t('TRANSFER.TRANSFER_RECORD')" @left="$router.push('/transfer/index')" />

            <div v-if="transfers" class="scb-separator">
                <p v-if="transfers.length <= 0" class="scb-none" v-html="$t('TRANSFER.TRANSFER_RECORD_NO_RECORD')" />
                <List
                    v-else
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    :loading-text="$t('COMMON.RECORD_LOADING')"
                    :finished-text="$t('COMMON.RECORD_LOADED')"
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
