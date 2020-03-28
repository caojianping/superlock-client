<template>
    <Popup class="modal" v-model="isShow" closeable @close="closePopup">
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
