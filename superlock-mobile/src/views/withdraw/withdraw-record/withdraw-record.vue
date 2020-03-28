<template>
    <div class="withdraw-record">
        <Header title="提现记录">
            <span slot="right"></span>
        </Header>

        <p v-if="withdraws.length <= 0" class="none separator">
            暂无提现记录，快去
            <router-link class="link" to="/asset/index">提现</router-link>
            吧！
        </p>
        <List
            class="withdraw-list separator"
            v-else
            v-model="isLoading"
            :finished="isFinished"
            :immediate-check="true"
            loading-text="记录加载中……"
            finished-text="记录加载完毕"
            @load="fetchData"
        >
            <CellGroup>
                <Cell
                    v-for="(withdraw, index) in withdraws"
                    :key="index"
                    :to="`/withdraw/detail/${withdraw.orderId}`"
                >
                    <div slot="title">
                        <h2>{{ withdraw.txhash }}</h2>
                        <p>
                            {{ withdraw.createTime | dateFormat }}
                        </p>
                    </div>
                    <p slot="default">
                        {{ `- ${withdraw.amount} ${withdraw.coin}` }}
                    </p>
                </Cell>
            </CellGroup>
        </List>
    </div>
</template>

<style src="./withdraw-record.less" lang="less" scoped />

<script src="./withdraw-record.ts" />
