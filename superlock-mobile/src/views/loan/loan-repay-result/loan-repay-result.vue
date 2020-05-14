<template>
    <div class="loan-repay-result scb-gray">
        <Header title="还款成功" :isBorder="false" @left="$router.push('/loan/repay')" />

        <div>
            <img src="" alt="" />
            <h2>还款成功，请检查质押的锁仓是否释放。</h2>
            <p>还款成功！质押锁仓已解锁，锁仓项目已到期，锁仓本金已返回个人账户之中。</p>
            <Button class="effect-shadow" type="primary" block round :to="{ path: '/asset/index', query: { type: 2 } }">完成</Button>
        </div>
    </div>
</template>

<style src="./loan-repay-result.less" lang="less" scoped />

<script src="./loan-repay-result.ts" />
