<template>
    <Popup v-model="isShow" class="full" @close="handlePopupClose">
        <Header :title="$t('MINE.MODIFY_NICKNAME')" @left="handlePopupClose" />

        <div class="modify-form scb-separator">
            <Field :value="nickname" clearable :placeholder="$t('PLACEHOLDERS.ENTER_NICKNAME')" @input="handleFieldInput($event)"></Field>

            <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('COMMON.SAVE') }}</Button>
        </div>
    </Popup>
</template>

<style src="./modify-name.less" lang="less" scoped />

<script src="./modify-name.ts" />
