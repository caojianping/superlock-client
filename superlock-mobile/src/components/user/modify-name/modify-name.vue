<template>
    <Popup v-model="isShow" class="full" @close="handlePopupClose">
        <Header title="修改昵称" @left="handlePopupClose" />

        <div class="modify-form scb-separator">
            <Field
                :value="nickname"
                clearable
                placeholder="请输入昵称"
                @input="handleFieldInput($event)"
            ></Field>

            <Button
                class="effect-shadow"
                type="primary"
                block
                round
                @click="submit"
                >保存</Button
            >
        </div>
    </Popup>
</template>

<style src="./modify-name.less" lang="less" scoped />

<script src="./modify-name.ts" />
