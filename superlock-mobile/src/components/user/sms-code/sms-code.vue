<template>
    <div class="sms-code">
        <span
            v-if="!isSending && !isLoading"
            class="sms-code-text"
            @click="sendSmsCode"
            >{{ text }}</span
        >
        <span
            v-if="isSending && isLoading"
            class="sms-code-text"
            @click="sendSmsCode"
        >
            <Loading type="spinner" size="1.25rem" />
        </span>
        <span v-if="isSending && !isLoading" class="sms-code-text disabled">{{
            text
        }}</span>
    </div>
</template>

<style src="./sms-code.less" lang="less" scoped />

<script src="./sms-code.ts" />
