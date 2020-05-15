<template>
    <div class="scb-gray loan-repay-result">
        <Header :title="title" :is-border="false" @left="$router.push('/loan/repay')" />

        <div :class="['scb-separator', ['failure', 'success'][type]]">
            <img v-if="type === 0" src="../../../assets/images/loan/repay-failure.png" alt="还款失败" />
            <img v-else-if="type === 1" src="../../../assets/images/loan/repay-success.png" alt="还款成功" />

            <h2>{{ title }}！</h2>
            <p>还款成功！质押锁仓已解锁，锁仓项目已到期，锁仓本金已返回个人账户之中。</p>

            <Button class="effect-shadow" type="primary" block round :to="{ path: '/asset/index', query: { type: 2 } }">完成</Button>
        </div>
    </div>
</template>

<style src="./loan-repay-result.less" lang="less" scoped />

<script src="./loan-repay-result.ts" />
