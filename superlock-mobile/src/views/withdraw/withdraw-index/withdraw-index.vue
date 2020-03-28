<template>
    <div class="withdraw-index">
        <Header title="提现">
            <router-link slot="right" to="/withdraw/record">明细</router-link>
        </Header>

        <div class="withdraw-form separator">
            <ul>
                <li>
                    <h2>提现地址</h2>
                    <Field
                        v-if="!withdrawForm.address"
                        value="还没有添加提现地址，赶紧去添加吧"
                        disabled
                    >
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
                        placeholder="请输入您想提现的金额"
                        @input="handleFieldInput('amount', $event)"
                    >
                        <span
                            class="text-prompt"
                            slot="button"
                            @click="withdrawAll"
                            >全部</span
                        >
                    </Field>
                    <p class="text-prompt">
                        可提现金额 {{ 0 }} BCB = {{ 0 }} DC
                    </p>
                </li>
                <li>
                    <h2>备注</h2>
                    <Field
                        :value="withdrawForm.remark"
                        placeholder="请输入提现备注"
                        @input="handleFieldInput('remark', $event)"
                    />
                </li>
                <li>
                    <Button type="primary" block round @click="openModal"
                        >确定提现</Button
                    >
                </li>
            </ul>
        </div>

        <Modal class="password-modal" v-model="isShow">
            <template slot="title">
                <h2>资金密码</h2>
                <p>请输入资金密码，进行身份认证</p>
            </template>
            <ul>
                <li>
                    <input
                        type="password"
                        :value="withdrawForm.fundPasswd"
                        @change="handlePasswordChange"
                    />
                </li>
                <li>
                    <Button
                        type="primary"
                        block
                        round
                        @click="submit"
                        >确认</Button
                    >
                </li>
            </ul>
        </Modal>
    </div>
</template>

<style src="./withdraw-index.less" lang="less" scoped />

<script src="./withdraw-index.ts" />
