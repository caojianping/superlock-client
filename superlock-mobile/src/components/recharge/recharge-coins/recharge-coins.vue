<template>
    <Popup class="recharge-coins" v-model="isShow" round position="bottom" @close="handlePopupClose">
        <h2>{{ $t('RECHARGE.SELECT_COIN_TYPE') }}</h2>
        <h3>{{ $t('RECHARGE.PROMPT') }}</h3>

        <div>
            <Spin :is-spinning="isSpinning" />

            <CellGroup v-if="!isSpinning">
                <Cell v-for="(rechargeCoin, index) in rechargeCoins || []" :key="index" @click="goCode(rechargeCoin)">
                    <div slot="title">
                        <img :src="rechargeCoin.icon" :alt="rechargeCoin.symbol" />
                        <span>{{ rechargeCoin.symbol }}</span>
                    </div>
                </Cell>
            </CellGroup>
        </div>

        <p class="scb-separator" @click="handlePopupClose">{{ $t('COMMON.CANCEL') }}</p>
    </Popup>
</template>

<style src="./recharge-coins.less" lang="less" scoped />

<script src="./recharge-coins.ts" />
