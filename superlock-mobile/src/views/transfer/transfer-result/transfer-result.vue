<template>
    <div class="scb-gray transfer-result">
        <Header :title="title" :is-border="false" @left="$router.push('/transfer/index')" />

        <div :class="['scb-separator', ['failure', 'success'][type]]">
            <img v-if="type === 0" src="../../../assets/images/result/transfer-failure.png" alt="转账失败" />
            <img v-else-if="type === 1" src="../../../assets/images/result/transfer-success.png" alt="转账成功" />

            <h2>{{ title }}</h2>
            <p v-if="type === 0">{{ msg }}</p>
            <template v-else-if="type === 1">
                <p>请确认是否到账</p>
                <h3>
                    <i class="icon icon-bcb" />
                    <span>{{ amount }} BCB</span>
                </h3>
            </template>

            <Button class="effect-shadow" type="primary" block round to="/asset/index">转账完成</Button>
        </div>
    </div>
</template>

<style src="./transfer-result.less" lang="less" scoped />

<script src="./transfer-result.ts" />
