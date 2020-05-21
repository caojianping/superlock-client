<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-gray loan-apply">
            <Header title="贷款申请" :is-border="false" @left="$router.push({ path: '/loan/index', query: { isCache: 'true' } })" />

            <div class="scb-separator">
                <CellGroup>
                    {{ ((loanableLockObj = loanableLock || {}), void 0) }}
                    <Cell title="质押锁仓订单" :value="applyForm.lockOrderId || '--'" />

                    <Cell title="贷款价值(DC)">
                        <div class="field-container">
                            <Field
                                type="number"
                                :value="applyForm.amount"
                                :border="false"
                                clearable
                                :placeholder="`> ${applyForm.minAmount || '--'} ${loanableLockObj.minLoanAmountCoin || '--'}`"
                                @input="handleFieldInput('amount', $event)"
                            />
                            <p>最高可贷{{ `${applyForm.maxAmount || '--'} ${loanableLockObj.maxLoanAmountCoin || '--'}` }}</p>
                        </div>
                    </Cell>

                    <Cell title="预计可贷时长">
                        <div class="field-container">
                            <Field
                                type="number"
                                :value="applyForm.loanDays"
                                :border="false"
                                clearable
                                placeholder="请输入预计可贷时长"
                                @input="handleFieldInput('loanDays', $event)"
                            />
                            <p>最多可贷时长{{ applyForm.maxDuration || '--' }}天</p>
                        </div>
                    </Cell>

                    {{ ((loanBaseInfoObj = loanBaseInfo || {}), void 0) }}
                    <Cell title="贷款年利率" :value="`${loanBaseInfoObj.loanRate || '--'}%`" />
                </CellGroup>

                <p>1.预计审核时间3~7个工作日，实际结果以审核确定时间为准。</p>
                <p>2.审核通过后，发放贷款时会根据当时BCB:DC汇率进行折算为BCB转入您的资金账户。</p>

                <Button class="effect-shadow" type="primary" block round @click="submit">提交申请</Button>
            </div>

            <PasswordModal v-model="isShow" @submit="handlePasswordModalSubmit" />
        </div>
    </PullRefresh>
</template>

<style src="./loan-apply.less" lang="less" scoped />

<script src="./loan-apply.ts" />
