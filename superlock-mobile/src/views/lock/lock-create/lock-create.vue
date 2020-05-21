<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="lock-create scb-gray">
            <Header title="锁仓" @left="$router.push('/lock/intro')" />

            <div class="scb-form scb-separator">
                {{ ((lockProjectObj = lockProject || {}), void 0) }}
                <ul>
                    <li>
                        <h1>BCB矿场-{{ lockProjectObj.length + unitTypes[lockProjectObj.unit - 1] }}</h1>
                    </li>
                    <li>
                        <h2>可用余额</h2>
                        <p v-if="!assetStats">-- BCB</p>
                        <P v-else>{{ assetStats.bcbHotAmount | coinUnit }}</P>
                    </li>
                    <li>
                        <h2>锁仓金额</h2>
                        <Field
                            type="number"
                            :value="lockForm.amount"
                            clearable
                            :placeholder="`${lockForm.minAmount || '--'}BCB起`"
                            @input="handleFieldInput('amount', $event)"
                        >
                        </Field>
                        <p v-if="!userLockQuota" class="text-orange">当前可锁仓额度：-- -- = -- --</p>
                        <p v-else class="text-orange">
                            当前可锁仓额度：{{
                                `${userLockQuota.amount} ${userLockQuota.coin} = ${userLockQuota.valuationAmount} ${userLockQuota.valuationCoin}`
                            }}
                        </p>
                    </li>
                    <li>
                        <Button class="effect-shadow" type="primary" block round @click="submit">确定锁仓</Button>
                        <p class="text-gray">今日锁仓，明日可获得收益</p>
                    </li>
                </ul>
            </div>

            <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./lock-create.less" lang="less" scoped />

<script src="./lock-create.ts" />
