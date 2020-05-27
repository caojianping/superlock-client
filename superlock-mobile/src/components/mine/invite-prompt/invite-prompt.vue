<template>
    <Modal class="invite-prompt" v-model="isShow" :closeable="false" :closeOnClickOverlay="false">
        <template slot="header">
            <div class="invite-prompt-title clearfix">
                <img src="../../../assets/images/reminder.png" :alt="$t('MINE.WARM_PROMPT')" />
                <div>
                    <h1>{{ $t('MINE.WARM_PROMPT') }}</h1>
                    <p>REMINDER</p>
                </div>
            </div>
        </template>

        <p>{{ $t('MINE.INVITE_PROMPT') }}</p>

        <template slot="footer">
            <Button class="effect-shadow" type="primary" round block @click="confirm">{{ $t('MINE.IMMEDIATELY_SETTING') }}</Button>
        </template>
    </Modal>
</template>

<style src="./invite-prompt.less" lang="less" scoped />

<script src="./invite-prompt.ts" />
