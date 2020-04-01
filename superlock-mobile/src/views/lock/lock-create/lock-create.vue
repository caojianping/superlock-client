<template>
    <div class="lock-create scb-gray">
        <Header title="锁仓" @left="$router.push('/lock/detail')" />

        <div class="scb-form separator">
            <ul>
                <li>
                    <h1>
                        锁仓宝-{{
                            lockProject.length + units[lockProject.unit - 1]
                        }}
                    </h1>
                </li>
                <li>
                    <h2>可用余额</h2>
                    <p v-if="!assetStats">-- BCB</p>
                    <P v-else>{{ assetStats.bcbTotalAmount | coinUnit }}</P>
                </li>
                <li>
                    <h2>锁仓金额</h2>
                    <Field
                        type="number"
                        :value="lockForm.amount"
                        clearable
                        placeholder="0.1BCB起"
                        @input="handleFieldInput('amount', $event)"
                    >
                    </Field>
                    <p v-if="!userLockQuota" class="text-prompt">
                        当前可锁仓额度：-- -- = -- --
                    </p>
                    <p v-else class="text-prompt">
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
                        @click="submit"
                        >确定锁仓</Button
                    >
                    <p>今日锁仓，明日可获得收益</p>
                </li>
            </ul>
        </div>

        <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
    </div>
</template>

<style src="./lock-create.less" lang="less" scoped />

<script src="./lock-create.ts" />
