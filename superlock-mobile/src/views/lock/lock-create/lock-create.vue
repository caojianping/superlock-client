<template>
    <div class="lock-create">
        <Header title="锁仓" @left="$router.push('/lock/detail')" />

        <div class="scb-form separator">
            <ul>
                <li>
                    <h1>
                        锁仓宝-{{
                            lockProject.length + lockUnits[lockProject.unit - 1]
                        }}
                    </h1>
                </li>
                <li>
                    <h2>可用余额</h2>
                    <P>{{ `${0} BCB` }}</P>
                </li>
                <li>
                    <h2>锁仓金额</h2>
                    <Field
                        type="number"
                        :value="lockForm.amount"
                        :min="0.1"
                        placeholder="0.1BCB起"
                        @input="handleFieldInput('amount', $event)"
                    >
                    </Field>
                    <p class="text-prompt">
                        当前可锁仓额度：{{
                            `${userLockQuota.amount} ${userLockQuota.coin} = ${userLockQuota.valuationAmount} ${userLockQuota.valuationCoin}`
                        }}
                    </p>
                </li>
                <li>
                    <Button
                        class="effect-shadow"
                        type="primary"
                        block
                        round
                        @click="openPassword"
                        >确定锁仓</Button
                    >
                    <p>今日锁仓，明日可获得收益</p>
                </li>
            </ul>
        </div>

        <Password v-model="isShow" @submit="handlePasswordSubmit" />
    </div>
</template>

<style src="./lock-create.less" lang="less" scoped />

<script src="./lock-create.ts" />
