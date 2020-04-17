<template>
    <div class="sms-code">
        <ant-button v-if="!isSending && !isSpinning" type="primary" @click="sendSmsCode">{{ text }}</ant-button>
        <ant-button v-if="isSending && isSpinning" type="primary" :loading="isSpinning" @click="sendSmsCode" />
        <ant-button v-if="isSending && !isSpinning" type="default" disabled>{{ text }}</ant-button>
    </div>
</template>

<style src="./sms-code.less" lang="less" scoped />

<script src="./sms-code.ts" />
