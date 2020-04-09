<template>
    <Popup
        class="transaction-filter"
        v-model="isShow"
        round
        position="bottom"
        @close="handlePopupClose"
    >
        <h2>账单分类</h2>

        <div class="transaction-types">
            <Spin :is-spinning="isSpinning" />

            <ul class="clearfix">
                <li v-for="(item, index) in transactionTypes" :key="index">
                    <Button
                        :type="
                            item.type === transactionType.type
                                ? 'primary'
                                : 'default'
                        "
                        @click="chooseType(item)"
                        >{{ item.remark }}</Button
                    >
                </li>
            </ul>
        </div>

        <p class="scb-separator" @click="handlePopupClose">取消</p>
    </Popup>
</template>

<style src="./transaction-filter.less" lang="less" scoped />

<script src="./transaction-filter.ts" />
