<template>
    <Modal
        class="invite-prompt"
        v-model="isShow"
        :closeable="false"
        :closeOnClickOverlay="false"
    >
        <template slot="title">
            <div class="invite-prompt-title clearfix">
                <img src="../../../assets/images/reminder.png" alt="温馨提示" />
                <div>
                    <h1>温馨提示</h1>
                    <p>REMINDER</p>
                </div>
            </div>
        </template>

        <ul>
            <li>您需要先设置好友相关利率的默认值后，才能邀请好友哦！</li>
            <li>
                <Button
                    class="effect-shadow"
                    type="primary"
                    round
                    block
                    @click="confirm"
                    >立即设置</Button
                >
            </li>
        </ul>
    </Modal>
</template>

<style src="./invite-prompt.less" lang="less" scoped />

<script src="./invite-prompt.ts" />
