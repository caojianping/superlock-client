<template>
    <Popup v-model="isShow" class="page-popup" @close="closePopup">
        <Header title="修改昵称" @left="closePopup" />

        <div class="modify-form separator">
            <Field
                :value="nickname"
                placeholder="请输入昵称"
                clearable
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
