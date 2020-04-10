<template>
    <div class="recharge-address">
        <Header title="充值地址" @left="$router.back(-1)" />

        <div v-if="rechargeCoins" class="scb-separator">
            <p v-if="rechargeCoins.length <= 0" class="scb-none">暂无充值地址数据</p>
            <CellGroup v-else>
                <Cell v-for="(rechargeCoin, index) in rechargeCoins" :key="index" is-link :to="`/recharge/code/${rechargeCoin.symbol}`">
                    <div class="flex" slot="title">
                        <img :src="rechargeCoin.icon" :alt="rechargeCoin.symbol" />
                        <div>
                            <h2>{{ rechargeCoin.symbol }}</h2>
                            <p>{{ rechargeCoin.name }}</p>
                        </div>
                    </div>
                </Cell>
            </CellGroup>
        </div>
    </div>
</template>

<style src="./recharge-address.less" lang="less" scoped />

<script src="./recharge-address.ts" />
