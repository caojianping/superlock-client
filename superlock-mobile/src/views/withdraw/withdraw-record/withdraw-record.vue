<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="withdraw-record">
            <Header :title="$t('WITHDRAW.WITHDRAW_RECORD')" @left="$router.push('/withdraw/index')" />

            <div v-if="withdraws" class="scb-separator">
                <p v-if="withdraws.length <= 0" class="scb-none" v-html="$t('WITHDRAW.WITHDRAW_RECORD_NO_DATA')" />
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
                        <Cell v-for="(withdraw, index) in withdraws" :key="index" @click="goDetail(withdraw)">
                            <div slot="title">
                                <h2>{{ (withdraw.orderId || '') | hashTruncate }}</h2>
                                <p>{{ withdraw.createTime | dateFormat }}</p>
                            </div>
                            <p>{{ `- ${withdraw.amount} ${withdraw.coin}` }}</p>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./withdraw-record.less" lang="less" scoped />

<script src="./withdraw-record.ts" />
