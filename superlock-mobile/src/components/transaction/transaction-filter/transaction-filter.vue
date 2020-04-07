<template>
    <Popup
        class="transaction-filter"
        v-model="isShow"
        round
        position="bottom"
        @close="handlePopupClose"
    >
        <h2>账单分类</h2>

        <div>
            <Spin :is-spinning="isSpinning" />

            <ul>
                <li v-for="(item, index) in transactionTypes" :key="index">
                    <Button
                        :type="
                            item.type === transactionType.type
                                ? 'primary'
                                : 'default'
                        "
                        round
                        @click="chooseType(item)"
                        >{{ item.remark }}</Button
                    >
                </li>
            </ul>
        </div>

        <p class="separator" @click="handlePopupClose">取消</p>
    </Popup>
</template>

<style src="./transaction-filter.less" lang="less" scoped />

<script src="./transaction-filter.ts" />
