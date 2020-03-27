<template>
    <div class="recharge-address">
        <Header :title="`${coin}充值地址`">
            <router-link slot="right" to="/recharge/record">明细</router-link>
        </Header>

        <div class="address-container separator">
            <div class="address-content">
                <h1>{{ coin }}</h1>
                <qriously :value="address" :size="180" />
                <p>{{ address }}</p>
                <Button
                    class="effect-tripple"
                    type="primary"
                    size="small"
                    round
                    @click="copyAddress"
                    >复制地址</Button
                >
            </div>
        </div>

        <RechargePrompt />
    </div>
</template>

<style src="./recharge-address.less" lang="less" scoped />

<script src="./recharge-address.ts" />
