<template>
    <div :class="['spin', position, { only: !text }]" v-if="isSpinning">
        <Loading type="spinner" size="1.125rem" color="#0076ff">{{ text }}</Loading>
    </div>
</template>

<style src="./spin.less" lang="less" scoped />

<script src="./spin.ts" />
