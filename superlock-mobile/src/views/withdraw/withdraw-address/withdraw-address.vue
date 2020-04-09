<template>
    <div class="withdraw-address">
        <Header title="提现地址" isRight @left="$router.back(-1)">
            <span slot="right" @click="openWithdrawSetting">添加地址</span>
        </Header>

        <div v-if="withdrawAddresses" class="scb-separator">
            <p v-if="withdrawAddresses.length <= 0" class="scb-none">
                暂无提现地址，快去
                <a
                    class="scb-link"
                    href="javascript: void(0)"
                    @click="openWithdrawSetting"
                    >添加地址</a
                >
                吧！
            </p>
            <CellGroup v-else>
                <Cell
                    v-for="(withdrawAddress, index) in withdrawAddresses"
                    :key="index"
                    @click="chooseAddress(withdrawAddress)"
                >
                    <div slot="title">
                        <h2>{{ withdrawAddress.nickName }}</h2>
                        <p>{{ withdrawAddress.address }}</p>
                    </div>
                    <Checkbox
                        slot="right-icon"
                        :value="
                            selectedWithdrawAddress &&
                                withdrawAddress.address ===
                                    selectedWithdrawAddress.address
                        "
                    />
                </Cell>
            </CellGroup>
        </div>

        <WithdrawSetting
            v-model="isShow"
            :type="operationType"
            @submit="handleWithdrawSettingSubmit"
        />
    </div>
</template>

<style src="./withdraw-address.less" lang="less" scoped />

<script src="./withdraw-address.ts" />
