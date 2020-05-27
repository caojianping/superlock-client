<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray loan-apply">
            <Header :title="$t('LOAN.LOAN_APPLY')" :is-border="false" @left="$router.push({ path: '/loan/index', query: { isCache: 'true' } })" />

            <div class="scb-separator">
                <CellGroup>
                    {{ ((loanableLockObj = loanableLock || {}), void 0) }}
                    <Cell :title="$t('LOAN.PLEDGE_LOCK_ORDER_ID')" :value="applyForm.lockOrderId || '--'" />

                    <Cell :title="`${$t('LOAN.LOAN_VALUE')}(DC)`">
                        <div class="field-container">
                            <Field
                                type="number"
                                :value="applyForm.amount"
                                :border="false"
                                clearable
                                :placeholder="`> ${applyForm.minAmount || '--'} ${loanableLockObj.minLoanAmountCoin || '--'}`"
                                @input="handleFieldInput('amount', $event)"
                            />
                            <p>
                                {{
                                    $t('LOAN.MAX_LOANABLE', { amount: applyForm.maxAmount || '--', coin: loanableLockObj.maxLoanAmountCoin || '--' })
                                }}
                            </p>
                        </div>
                    </Cell>

                    <Cell :title="$t('LOAN.EXPECT_LOANABLE_TIME')">
                        <div class="field-container">
                            <Field
                                type="number"
                                :value="applyForm.loanDays"
                                :border="false"
                                clearable
                                :placeholder="$t('PLACEHOLDERS.ENTER_EXPECT_LOAN_TIME')"
                                @input="handleFieldInput('loanDays', $event)"
                            />
                            <p>{{ $t('LOAN.MAX_LOANABLE_TIME', { time: applyForm.maxDuration || '--' }) }}</p>
                        </div>
                    </Cell>

                    {{ ((loanBaseInfoObj = loanBaseInfo || {}), void 0) }}
                    <Cell :title="$t('LOAN.LOAN_YEAR_RATE')" :value="`${loanBaseInfoObj.loanRate || '--'}%`" />
                </CellGroup>

                <p>{{ $t('LOAN.APPLY_PROMPT01') }}</p>
                <p>{{ $t('LOAN.APPLY_PROMPT02') }}</p>

                <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('LOAN.SUBMIT_APPLY') }}</Button>
            </div>

            <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./loan-apply.less" lang="less" scoped />

<script src="./loan-apply.ts" />
