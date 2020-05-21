<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="lock-create scb-gray">
            <Header :title="$t('COMMON.LOCK')" @left="$router.push('/lock/intro')" />

            <div class="scb-form scb-separator">
                {{ ((lockProjectObj = lockProject || {}), void 0) }}
                <ul>
                    <li>
                        <h1>{{ $t('COMMON.NAME') }}-{{ lockProjectObj.length + unitTypes[lockProjectObj.unit - 1] }}</h1>
                    </li>
                    <li>
                        <h2>$t('COMMON.AVAILABLE_BALANCE')</h2>
                        <p v-if="!assetStats">-- BCB</p>
                        <P v-else>{{ assetStats.bcbHotAmount | coinUnit }}</P>
                    </li>
                    <li>
                        <h2>{{ $t('COMMON.LOCK_AMOUNT') }}</h2>
                        <Field
                            type="number"
                            :value="lockForm.amount"
                            clearable
                            :placeholder="`> ${lockForm.minAmount || '--'}BCB`"
                            @input="handleFieldInput('amount', $event)"
                        >
                        </Field>
                        <p v-if="!userLockQuota" class="text-orange">{{ $t('COMMON.CURRENT_LOCKABLE_QUOTA') }}：-- -- = -- --</p>
                        <p v-else class="text-orange">
                            {{ $t('COMMON.CURRENT_LOCKABLE_QUOTA') }}：
                            {{ `${userLockQuota.amount} ${userLockQuota.coin} = ${userLockQuota.valuationAmount} ${userLockQuota.valuationCoin}` }}
                        </p>
                    </li>
                    <li>
                        <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('LOCK.CONFIRM_LOCK') }}</Button>
                        <p class="text-gray">{{ $t('LOCK.LOCK_PROMPT') }}</p>
                    </li>
                </ul>
            </div>

            <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./lock-create.less" lang="less" scoped />

<script src="./lock-create.ts" />
