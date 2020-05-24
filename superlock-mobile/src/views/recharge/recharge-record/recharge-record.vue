<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="recharge-record">
            <Header :title="$t('RECHARGE.RECHARGE_RECORD')" @left="$router.push(`/recharge/code/${rechargeCoin || 'BCB'}`)" />

            <div v-if="recharges" class="scb-separator">
                <p v-if="recharges.length <= 0" class="scb-none" v-html="$t('RECHARGE.RECHARGE_RECORD_NO_DATA')" />
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
                        <Cell v-for="(recharge, index) in recharges" :key="index" @click="goDetail(recharge)">
                            <div slot="title">
                                <h2>{{ (recharge.txhash || '') | hashTruncate }}</h2>
                                <p>{{ recharge.createTime | dateFormat }}</p>
                            </div>
                            <p slot="default">{{ `+ ${recharge.payAmount} ${recharge.payCoin}` }}</p>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./recharge-record.less" lang="less" scoped />

<script src="./recharge-record.ts" />
