<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="withdraw-index scb-gray">
            <Header :title="$t('COMMON.WITHDRAW')" is-right @left="$router.push('/asset/index')">
                <router-link slot="right" to="/withdraw/record">{{ $t('COMMON.DETAILS') }}</router-link>
            </Header>

            <div class="scb-form scb-separator">
                <ul>
                    <li>
                        <h2>{{ $t('COMMON.WITHDRAW_ADDRESS') }}</h2>
                        <Field v-if="!withdrawForm.address" :value="$t('WITHDRAW.ADD_ADDRESS_PROMPT')" disabled>
                            <Icon slot="button" name="arrow" @click="goAddress" />
                        </Field>
                        <Field v-else :value="withdrawForm.address" disabled>
                            <Icon slot="button" name="arrow" @click="goAddress" />
                        </Field>
                    </li>
                    <li>
                        <h2><i class="icon icon-bcb" /><span>BCB</span></h2>
                        <Field
                            type="number"
                            :value="withdrawForm.amount"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_WITHDRAW_AMOUNT')"
                            @input="handleFieldInput('amount', $event)"
                        >
                            <span class="text-orange" slot="button" @click="withdrawAll">{{ $t('COMMON.ALL') }}</span>
                        </Field>
                        {{ ((usableQuotaObj = usableQuota || {}), void 0) }}
                        <p class="text-orange">
                            {{ $t('WITHDRAW.WITHDRAWABLE_AMOUNT') }}
                            {{
                                `${usableQuotaObj.amount || '--'} BCB = 
                                ${usableQuotaObj.valuationAmount || '--'} ${usableQuotaObj.valuationCoin || '--'}`
                            }}
                        </p>
                    </li>
                    <li>
                        <h2>{{ $t('COMMON.REMARK') }}</h2>
                        <Field
                            :value="withdrawForm.remark"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_WITHDRAW_REMARK')"
                            @input="handleFieldInput('remark', $event)"
                        />
                    </li>
                    <li>
                        <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('WITHDRAW.CONFIRM_WITHDRAW') }}</Button>
                    </li>
                </ul>
            </div>

            <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./withdraw-index.less" lang="less" scoped />

<script src="./withdraw-index.ts" />
