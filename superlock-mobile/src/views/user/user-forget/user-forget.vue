<template>
    <div class="scb-gray user-forget">
        <VerifyList
            v-model="isVerifyShow"
            :area-code="userForm.areaCode"
            :mobile="userForm.mobile"
            :verify-result="verifyResult"
            is-forget
            :from="from"
            @submit="handleVerifyListSubmit"
            @stop="handleVerifyListStop"
        />

        <ForgetForm v-model="isForgetShow" :from="from" @submit="handleForgetFormSubmit" @close="handleForgetFormClose" />

        <div id="captcha" />
    </div>
</template>

<style src="./user-forget.less" lang="less" scoped />

<script src="./user-forget.ts" />
