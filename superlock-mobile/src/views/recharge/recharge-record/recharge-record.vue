<template>
    <div class="recharge-record">
        <Header title="充值记录" @left="$router.push(`/recharge/code/${rechargeCoin || 'BCB'}`)" />

        <div v-if="recharges" class="scb-separator">
            <p v-if="recharges.length <= 0" class="scb-none">
                暂无充值记录，快去<router-link class="scb-link" to="/asset/index">充值</router-link>吧！
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
</template>

<style src="./recharge-record.less" lang="less" scoped />

<script src="./recharge-record.ts" />
