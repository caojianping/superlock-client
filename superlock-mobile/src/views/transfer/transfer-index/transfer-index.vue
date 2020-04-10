<template>
    <div class="transfer-index scb-gray">
        <Header title="转账" isRight @left="$router.push('/asset/index')">
            <router-link slot="right" to="/transfer/record">转账记录</router-link>
        </Header>

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h2>收款UID</h2>
                    <Field :value="transferForm.toUid" clearable placeholder="请输入收款UID" @input="handleFieldInput('toUid', $event)">
                        <i slot="button" class="icon icon-child" @click="goChild" />
                    </Field>
                </li>
                <li>
                    <h2>
                        <i class="icon icon-bcb" />
                        <span>BCB</span>
                    </h2>
                    <Field
                        type="number"
                        :value="transferForm.quota"
                        clearable
                        placeholder="请输入您想转账的金额"
                        @input="handleFieldInput('quota', $event)"
                    >
                        <span class="text-orange" slot="button" @click="transferAll">全部</span>
                    </Field>
                    {{ ((quotaObj = quota || {}), void 0) }}
                    <p class="text-orange">
                        可转账金额
                        {{
                            `${quotaObj.amount || '--'} BCB = 
                            ${quotaObj.valuationAmount || '--'}
                            ${quotaObj.valuationCoin || '--'}`
                        }}
                    </p>
                </li>
                <li>
                    <h2>备注</h2>
                    <Field :value="transferForm.memo" clearable placeholder="请输入转账备注" @input="handleFieldInput('memo', $event)" />
                </li>
                <li>
                    <Button class="effect-shadow" type="primary" block round @click="submit">确定转账</Button>
                    <p class="text-orange">
                        转账功能只支持锁仓宝用户之间的BCB资产互转。
                    </p>
                    <p class="text-orange">请正确填写收款人UID，以免资金错转</p>
                </li>
            </ul>
        </div>

        <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
    </div>
</template>

<style src="./transfer-index.less" lang="less" scoped />

<script src="./transfer-index.ts" />
