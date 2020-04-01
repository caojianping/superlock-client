<template>
    <Modal class="password-modal" v-model="isShow" @close="handleModalClose">
        <template slot="title">
            <h2>资金密码</h2>
            <p>请输入资金密码，进行身份认证</p>
        </template>
        <ul>
            <li>
                <input
                    type="password"
                    v-model="password"
                    placeholder="请输入资金密码"
                />
            </li>
            <li>
                <Button
                    class="effect-shadow"
                    type="primary"
                    block
                    round
                    @click="submit"
                    >确认</Button
                >
            </li>
        </ul>
    </Modal>
</template>

<style src="./password-modal.less" lang="less" scoped />

<script src="./password-modal.ts" />
