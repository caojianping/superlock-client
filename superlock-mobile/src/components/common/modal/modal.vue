<template>
    <Popup class="modal" v-model="isShow" round :closeable="closeable" :close-on-click-overlay="closeOnClickOverlay" @close="handlePopupClose">
        <header class="modal-header">
            <slot name="title"></slot>
        </header>
        <div class="modal-body">
            <slot></slot>
        </div>
    </Popup>
</template>

<style src="./modal.less" lang="less" scoped />

<script src="./modal.ts" />
