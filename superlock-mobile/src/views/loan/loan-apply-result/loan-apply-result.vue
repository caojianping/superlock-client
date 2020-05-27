<template>
    <div class="scb-gray loan-apply-result">
        <Header :title="$t('LOAN.SUBMIT_RESULT')" :is-border="false" @left="$router.push('/loan/index')" />

        <div class="scb-separator">
            <img src="../../../assets/images/loan/apply-result.png" :alt="$t('LOAN.APPLY_SUCCESS')" />
            <p>{{ $t('LOAN.SUBMIT_PROMPT') }}</p>

            <Button class="effect-shadow" type="primary" block round @click="goLoanDetail">{{ $t('LOAN.LOOK_APPLY') }}</Button>
        </div>
    </div>
</template>

<style src="./loan-apply-result.less" lang="less" scoped />

<script src="./loan-apply-result.ts" />
