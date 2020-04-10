<template>
    <div class="withdraw-index scb-gray">
        <Header title="提现" isRight @left="$router.push('/asset/index')">
            <router-link slot="right" to="/withdraw/record">明细</router-link>
        </Header>

        <div class="scb-form scb-separator">
            <ul>
                <li>
                    <h2>提现地址</h2>
                    <Field v-if="!withdrawForm.address" value="还没有添加提现地址，赶紧去添加吧" disabled>
                        <Icon slot="button" name="arrow" @click="goAddress" />
                    </Field>
                    <Field v-else :value="withdrawForm.address" disabled>
                        <Icon slot="button" name="arrow" @click="goAddress" />
                    </Field>
                </li>
                <li>
                    <h2>
                        <i class="icon icon-bcb" />
                        <span>BCB</span>
                    </h2>
                    <Field
                        type="number"
                        :value="withdrawForm.amount"
                        clearable
                        placeholder="请输入您想提现的金额"
                        @input="handleFieldInput('amount', $event)"
                    >
                        <span class="text-orange" slot="button" @click="withdrawAll">全部</span>
                    </Field>
                    {{ ((quotaObj = quota || {}), void 0) }}
                    <p class="text-orange">
                        可提现金额
                        {{
                            `${quotaObj.amount || '--'} BCB = 
                            ${quotaObj.valuationAmount || '--'}
                            ${quotaObj.valuationCoin || '--'}`
                        }}
                    </p>
                </li>
                <li>
                    <h2>备注</h2>
                    <Field :value="withdrawForm.remark" clearable placeholder="请输入提现备注" @input="handleFieldInput('remark', $event)" />
                </li>
                <li>
                    <Button class="effect-shadow" type="primary" block round @click="submit">确定提现</Button>
                </li>
            </ul>
        </div>

        <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
    </div>
</template>

<style src="./withdraw-index.less" lang="less" scoped />

<script src="./withdraw-index.ts" />
