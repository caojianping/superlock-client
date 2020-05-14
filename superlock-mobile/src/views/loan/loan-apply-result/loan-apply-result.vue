<template>
    <div class="loan-apply-result scb-gray">
        <Header title="提交结果" :isBorder="false" @left="$router.push('/loan/index')" />

        <div>
            <img src="" alt="" />
            <p>申请已提交审核，请耐心等候</p>

            <Button class="effect-shadow" type="primary" block round @click="goLoanDetail">查看申请详情</Button>
        </div>
    </div>
</template>

<style src="./loan-apply-result.less" lang="less" scoped />

<script src="./loan-apply-result.ts" />
