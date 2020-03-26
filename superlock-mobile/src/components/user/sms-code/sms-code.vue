<template>
    <div class="sms-code">
        <span
            v-if="!isSending && !isSpinning"
            class="sms-code-text"
            @click="sendSmsCode"
            >{{ text }}</span
        >
        <span
            v-if="isSending && isSpinning"
            class="sms-code-text"
            @click="sendSmsCode"
        >
            <Spin :is-spinning="isSpinning" text="" />
        </span>
        <span v-if="isSending && !isSpinning" class="sms-code-text disabled">{{
            text
        }}</span>
    </div>
</template>

<style src="./sms-code.less" lang="less" scoped />

<script src="./sms-code.ts" />
