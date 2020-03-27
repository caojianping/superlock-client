<template>
    <div class="recharge-addresses">
        <Header title="充值地址">
            <span slot="right"></span>
        </Header>

        <div class="addresses-container separator">
            <Spin :is-spinning="isSpinning" />

            <CellGroup v-if="!isSpinning">
                <Cell
                    v-for="(coin, index) in coins"
                    :key="index"
                    is-link
                    :to="`/recharge/address/${coin.symbol}`"
                >
                    <div class="flex" slot="title">
                        <img :src="coin.icon" :alt="coin.symbol" />
                        <div>
                            <h2>{{ coin.symbol }}</h2>
                            <p>{{ coin.name }}</p>
                        </div>
                    </div>
                </Cell>
            </CellGroup>
        </div>
    </div>
</template>

<style src="./recharge-addresses.less" lang="less" scoped />

<script src="./recharge-addresses.ts" />
