<template>
    <ant-modal v-model="isShow" :title="title" :footer="null" @cancel="handleModalCancel">
        <ul class="verify-form">
            <li>
                <ant-input
                    ref="code"
                    type="text"
                    v-model="code"
                    allowClear
                    placeholder="请输入谷歌验证码"
                    @keyup.enter="submit"
                />
            </li>
            <li>
                <ant-button class="sl-submit" type="primary" @click="submit">确定</ant-button>
            </li>
        </ul>
    </ant-modal>
</template>

<style src="./second-verify.less" lang="less" scoped />

<script src="./second-verify.ts" />
