<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="recharge-address">
            <Header :title="$t('COMMON.RECHARGE_ADDRESS')" @left="$router.push('/mine/index')" />

            <div v-if="rechargeCoins" class="scb-separator">
                <p v-if="rechargeCoins.length <= 0" class="scb-none">{{ $t('RECHARGE.RECHARGE_ADDRESS_NO_DATA') }}</p>
                <CellGroup v-else>
                    <Cell v-for="(rechargeCoin, index) in rechargeCoins" :key="index" is-link @click="goCode(rechargeCoin)">
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
    </PullRefresh>
</template>

<style src="./recharge-address.less" lang="less" scoped />

<script src="./recharge-address.ts" />
