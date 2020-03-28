<template>
    <Popup
        class="recharge-coins"
        v-model="isShow"
        round
        position="bottom"
        @close="handlePopupClose"
    >
        <h2>请选择要充值的币种类型</h2>
        <h3>所有转入的币种都将转换为BCB，请注意币种之间实时汇率波动</h3>

        <div>
            <Spin :is-spinning="isSpinning" />

            <CellGroup v-if="!isSpinning">
                <Cell
                    v-for="(rechargeCoin, index) in rechargeCoins"
                    :key="index"
                    :to="`/recharge/code/${rechargeCoin.symbol}`"
                >
                    <div slot="title">
                        <img
                            :src="rechargeCoin.icon"
                            :alt="rechargeCoin.symbol"
                        />
                        <span>{{ rechargeCoin.symbol }}</span>
                    </div>
                </Cell>
            </CellGroup>
        </div>

        <p class="separator" @click="handlePopupClose">取消</p>
    </Popup>
</template>

<style src="./recharge-coins.less" lang="less" scoped />

<script src="./recharge-coins.ts" />
