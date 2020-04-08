<template>
    <div class="recharge-address">
        <Header title="充值地址" @left="$router.back(-1)" />

        <div class="separator">
            <Spin :is-spinning="isSpinning" />

            <CellGroup v-if="!isSpinning">
                <Cell
                    v-for="(rechargeCoin, index) in rechargeCoins"
                    :key="index"
                    is-link
                    :to="`/recharge/code/${rechargeCoin.symbol}`"
                >
                    <div class="flex" slot="title">
                        <img
                            :src="rechargeCoin.icon"
                            :alt="rechargeCoin.symbol"
                        />
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
