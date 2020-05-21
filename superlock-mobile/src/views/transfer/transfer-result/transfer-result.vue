<template>
    <div class="scb-gray transfer-result">
        <Header :title="title" :is-border="false" @left="$router.push('/transfer/index')" />

        <div :class="['scb-separator', ['failure', 'success'][type]]">
            <img v-if="type === 0" src="../../../assets/images/result/transfer-failure.png" :alt="$t('TRANSFER.TRANSFER_FAILURE')" />
            <img v-else-if="type === 1" src="../../../assets/images/result/transfer-success.png" :alt="$t('TRANSFER.TRANSFER_SUCCESS')" />

            <h2>{{ title }}</h2>
            <p v-if="type === 0">{{ msg }}</p>
            <template v-else-if="type === 1">
                <p>{{ $t('TRANSFER.RESULT_PROMPT') }}</p>
                <h3>
                    <i class="icon icon-bcb" />
                    <span>{{ amount }} BCB</span>
                </h3>
            </template>

            <Button class="effect-shadow" type="primary" block round to="/asset/index">{{ $t('TRANSFER.TRANSFER_COMPLETE') }}</Button>
        </div>
    </div>
</template>

<style src="./transfer-result.less" lang="less" scoped />

<script src="./transfer-result.ts" />
