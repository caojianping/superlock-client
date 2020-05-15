<template>
    <div class="scb-gray loan-apply-result">
        <Header title="提交结果" :is-border="false" @left="$router.push('/loan/index')" />

        <div class="scb-separator">
            <img src="../../../assets/images/loan/apply-result.png" alt="申请成功" />
            <p>申请已提交审核，请耐心等候</p>

            <Button class="effect-shadow" type="primary" block round @click="goLoanDetail">查看申请详情</Button>
        </div>
    </div>
</template>

<style src="./loan-apply-result.less" lang="less" scoped />

<script src="./loan-apply-result.ts" />
