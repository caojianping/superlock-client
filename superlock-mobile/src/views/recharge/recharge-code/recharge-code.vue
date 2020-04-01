<template>
    <div class="recharge-code">
        <!-- <Header :title="`${rechargeCoin}收款码`"> -->
        <Header
            :title="`${rechargeCoin}充值地址`"
            isRight
            @left="$router.push('/asset/index')"
        >
            <router-link slot="right" to="/recharge/record">明细</router-link>
        </Header>

        <div class="code-container separator">
            <div class="code-content">
                <h1>{{ rechargeCoin }}</h1>
                <qriously :value="rechargeAddress" :size="180" />
                <p>{{ rechargeAddress }}</p>
                <Button
                    id="copy"
                    class="effect-tripple"
                    type="primary"
                    size="small"
                    round
                    :data-clipboard-text="rechargeAddress"
                    >复制地址</Button
                >
            </div>
        </div>

        <RechargePrompt />
    </div>
</template>

<style src="./recharge-code.less" lang="less" scoped />

<script src="./recharge-code.ts" />
