<template>
    <Popup v-model="isShow" class="page-popup" @close="closePopup">
        <Header
            :title="`${['添加', '修改'][type]}提现地址`"
            @left="closePopup"
        />

        <div class="scb-form separator">
            <ul>
                <li>
                    <h1>提现地址</h1>
                </li>
                <li>
                    <h2>钱包名称</h2>
                    <Field
                        v-model="withdrawAddress.nickName"
                        placeholder="请输入新添加的钱包名称"
                    />
                </li>
                <li>
                    <h2>钱包地址</h2>
                    <Field
                        v-model="withdrawAddress.address"
                        placeholder="请输入新添加的钱包地址"
                    />
                    <p class="text-prompt">
                        绑定的地址必须是BCB钱包地址
                    </p>
                </li>
                <li>
                    <Button
                        class="effect-shadow"
                        type="primary"
                        block
                        round
                        @click="submit"
                        >确认</Button
                    >
                </li>
            </ul>
        </div>
    </Popup>
</template>

<style src="./withdraw-setting.less" lang="less" scoped />

<script src="./withdraw-setting.ts" />
