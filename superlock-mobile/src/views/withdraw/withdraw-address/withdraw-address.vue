<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="withdraw-address">
            <Header :title="$t('COMMON.WITHDRAW_ADDRESS')" is-right @left="$router.push(from)">
                <span slot="right" @click="openWithdrawModal">{{ $t('WITHDRAW.ADD_ADDRESS') }}</span>
            </Header>

            <div v-if="withdrawAddresses" class="scb-separator">
                <p v-if="withdrawAddresses.length <= 0" class="scb-none" v-html="$t('WITHDRAW.WITHDRAW_ADDRESS_NO_DATA')" />
                <CellGroup v-else>
                    <Cell v-for="(withdrawAddress, index) in withdrawAddresses" :key="index" @click="chooseAddress(withdrawAddress)">
                        <div slot="title">
                            <h2>{{ withdrawAddress.nickName }}</h2>
                            <p>{{ withdrawAddress.address }}</p>
                        </div>
                        <Checkbox slot="right-icon" :value="selectedWithdrawAddress && withdrawAddress.address === selectedWithdrawAddress.address" />
                    </Cell>
                </CellGroup>
            </div>

            <WithdrawModal v-model="isShow" :type="operationType" @submit="handleWithdrawModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./withdraw-address.less" lang="less" scoped />

<script src="./withdraw-address.ts" />
