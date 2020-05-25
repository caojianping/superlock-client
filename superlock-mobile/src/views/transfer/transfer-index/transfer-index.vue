<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray transfer-index">
            <Header :title="$t('COMMON.TRANSFER')" is-right @left="$router.push('/asset/index')">
                <router-link slot="right" to="/transfer/record">{{ $t('TRANSFER.TRANSFER_RECORD') }}</router-link>
            </Header>

            <div class="scb-form scb-separator">
                <ul>
                    <li>
                        <h2>{{ $t('TRANSFER.TO_UID') }}</h2>
                        <Field
                            :value="transferForm.toUid"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_TO_UID')"
                            @input="handleFieldInput('toUid', $event)"
                        >
                            <i slot="button" class="icon icon-child" @click="$router.push('/transfer/child')" />
                        </Field>
                    </li>
                    <li>
                        <h2><i class="icon icon-bcb" /><span>BCB</span></h2>
                        <Field
                            type="number"
                            :value="transferForm.quota"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_TRANSFER_AMOUNT')"
                            @input="handleFieldInput('quota', $event)"
                        >
                            <span class="text-orange" slot="button" @click="transferAll">{{ $t('COMMON.ALL') }}</span>
                        </Field>
                        {{ ((usableQuotaObj = usableQuota || {}), void 0) }}
                        <p class="text-orange">
                            {{ $t('TRANSFER.TRANSFERABLE_AMOUNT') }}
                            {{
                                `${usableQuotaObj.amount || '--'} BCB = 
                                ${usableQuotaObj.valuationAmount || '--'} ${usableQuotaObj.valuationCoin || '--'}`
                            }}
                        </p>
                    </li>
                    <li>
                        <h2>{{ $t('COMMON.REMARK') }}</h2>
                        <Field
                            :value="transferForm.memo"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_TRANSFER_REMARK')"
                            @input="handleFieldInput('memo', $event)"
                        />
                    </li>
                    <li>
                        <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('TRANSFER.CONFIRM_TRANSFER') }}</Button>
                        <p class="text-orange">{{ $t('TRANSFER.PROMPT01') }}转账功能只支持BCB矿场用户之间的BCB资产互转。</p>
                        <p class="text-orange">{{ $t('TRANSFER.PROMPT02') }}请正确填写收款人UID，以免资金错转</p>
                    </li>
                </ul>
            </div>

            <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./transfer-index.less" lang="less" scoped />

<script src="./transfer-index.ts" />
