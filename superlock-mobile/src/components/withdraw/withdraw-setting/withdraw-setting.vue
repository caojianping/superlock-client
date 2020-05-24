<template>
    <Popup v-model="isShow" class="scb-gray full" @close="handlePopupClose">
        <Header :title="`${[$t('WITHDRAW.ADD_WITHDRAW_ADDRESS'), $t('WITHDRAW.MODIFY_WITHDRAW_ADDRESS')][type - 1]}`" @left="handlePopupClose" />

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h1>{{ $t('COMMON.WITHDRAW_ADDRESS') }}</h1>
                </li>
                <li>
                    <h2>{{ $t('WITHDRAW.WALLET_NAME') }}</h2>
                    <Field v-model="withdrawAddress.nickName" clearable :placeholder="$t('PLACEHOLDERS.WITHDRAW.ENTER_WALLET_NAME')" />
                </li>
                <li>
                    <h2>{{ $t('WITHDRAW.WALLET_ADDRESS') }}</h2>
                    <Field v-model="withdrawAddress.address" clearable :placeholder="$t('PLACEHOLDERS.ENTER_WALLET_ADDRESS')" />
                    <p class="text-orange">{{ $t('WITHDRAW.ADDRESS_PROMPT') }}</p>
                </li>
                <li>
                    <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('COMMON.CONFIRM') }}</Button>
                </li>
            </ul>
        </div>
    </Popup>
</template>

<style src="./withdraw-setting.less" lang="less" scoped />

<script src="./withdraw-setting.ts" />
