<template>
    <div class="scb-gray withdraw-result">
        <Header :title="title" :is-border="false" @left="$router.push('/withdraw/index')" />

        <div :class="['scb-separator', ['failure', 'success'][type]]">
            <img v-if="type === 0" src="../../../assets/images/result/result-failure.png" :alt="$t('WITHDRAW.WITHDRAW_FAILURE')" />
            <img v-else-if="type === 1" src="../../../assets/images/result/result-success.png" :alt="$t('WITHDRAW.WITHDRAW_SUCCESS')" />

            <h2>{{ title }}</h2>
            <p v-if="type === 0">{{ msg }}</p>
            <template v-else-if="type === 1">
                <p>{{ $tc('WITHDRAW.RESULT_PROMPT', { address: address }) }}</p>
                <h3>
                    <i class="icon icon-bcb" />
                    <span>{{ amount }} BCB</span>
                </h3>
            </template>

            <Button class="effect-shadow" type="primary" block round to="/asset/index">{{ $t('WITHDRAW.WITHDRAW_COMPLETE') }}</Button>
        </div>
    </div>
</template>

<style src="./withdraw-result.less" lang="less" scoped />

<script src="./withdraw-result.ts" />
