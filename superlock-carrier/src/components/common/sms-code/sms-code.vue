<template>
    <div class="sms-code">
        <ant-button v-if="!isSending && !isSpinning" type="primary" @click="sendCode">{{ text }}</ant-button>
        <ant-button v-if="isSending && isSpinning" type="primary" :loading="isSpinning" @click="sendCode" />
        <ant-button v-if="isSending && !isSpinning" type="default" disabled>{{ text }}</ant-button>
    </div>
</template>

<style src="./sms-code.less" lang="less" scoped />

<script src="./sms-code.ts" />
