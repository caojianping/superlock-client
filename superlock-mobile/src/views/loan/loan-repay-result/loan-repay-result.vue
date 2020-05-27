<template>
    <div class="scb-gray loan-repay-result">
        <Header :title="title" :is-border="false" @left="$router.push('/loan/repay')" />

        <div :class="['scb-separator', ['failure', 'success'][type]]">
            <img v-if="type === 0" src="../../../assets/images/result/repay-failure.png" :alt="$t('LOAN.REPAY_FAILURE')" />
            <img v-else-if="type === 1" src="../../../assets/images/result/repay-success.png" :alt="$t('LOAN.REPAY_SUCCESS')" />

            <h2>{{ [$t('LOAN.REPAY_FAILURE'), $t('LOAN.REPAY_SUCCESS_AND_CHECK')][type] }}</h2>
            <p v-if="msg">{{ msg }}</p>

            <Button class="effect-shadow" type="primary" block round :to="{ path: '/asset/index', query: { type: 2 } }">{{
                $t('COMMON.COMPLETE')
            }}</Button>
        </div>
    </div>
</template>

<style src="./loan-repay-result.less" lang="less" scoped />

<script src="./loan-repay-result.ts" />
