<template>
    <div class="verify-code">
        <ant-button v-if="!isSending && !isSpinning" type="primary" @click="sendCode">{{ text }}</ant-button>
        <ant-button v-if="isSending && isSpinning" type="primary" :loading="isSpinning" @click="sendCode" />
        <ant-button v-if="isSending && !isSpinning" type="default" disabled>{{ text }}</ant-button>
    </div>
</template>

<style src="./verify-code.less" lang="less" scoped />

<script src="./verify-code.ts" />
