<template>
    <div class="contact-service" :style="{ top: `${top}rem` }" @click="goCustomerService">
        <i class="icon icon-service-inverse" />
        <span>{{ $t('USER.CONTACT_SERVICE') }}</span>
    </div>
</template>

<style src="./contact-service.less" lang="less" scoped />

<script src="./contact-service.ts" />
