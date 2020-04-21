<template>
    <div class="verify-code">
        <span v-if="!isSending && !isSpinning" class="verify-code-text effect-ripple" @click="sendCode">{{ text }}</span>
        <span v-if="isSending && isSpinning" class="verify-code-text" @click="sendCode">
            <Spin :is-spinning="isSpinning" text="" />
        </span>
        <span v-if="isSending && !isSpinning" class="verify-code-text disabled">{{ text }}</span>
    </div>
</template>

<style src="./verify-code.less" lang="less" scoped />

<script src="./verify-code.ts" />
