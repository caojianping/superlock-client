<template>
    <Popup class="modal" v-model="isShow" round :closeable="closeable" :close-on-click-overlay="closeOnClickOverlay" @close="handlePopupClose">
        <header class="modal-header">
            <slot name="header" />
        </header>
        <div class="modal-body">
            <slot />
        </div>
        <div class="modal-footer">
            <slot name="footer" />
        </div>
    </Popup>
</template>

<style src="./modal.less" lang="less" scoped />

<script src="./modal.ts" />
