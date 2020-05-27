<template>
    <div class="scb-blue loan-intro">
        <Header :title="$t('LOAN.LOAN_INTRO')" is-blue :is-border="false" @left="$router.push('/loan/index')" />

        <div class="scb-blue-body">
            <div class="loan-info loan-container">
                <h1 class="scb-border">{{ $t('LOAN.TITLE01') }}</h1>
                <LoanBanner />
            </div>

            <h2>{{ $t('LOAN.LOAN_QUESTION01') }}</h2>
            <p>{{ $t('LOAN.LOAN_ANSWER01') }}</p>

            <h2>{{ $t('LOAN.LOAN_QUESTION02') }}</h2>
            <p>{{ $t('LOAN.LOAN_ANSWER021') }}</p>
            <p>{{ $t('LOAN.LOAN_ANSWER022') }}</p>

            <h2>{{ $t('LOAN.LOAN_QUESTION03') }}</h2>
            <p>{{ $t('LOAN.LOAN_ANSWER04') }}</p>

            <h2>{{ $t('LOAN.LOAN_QUESTION04') }}</h2>
            <p>{{ $t('LOAN.LOAN_ANSWER04') }}</p>
        </div>
    </div>
</template>

<style src="./loan-intro.less" lang="less" scoped />

<script src="./loan-intro.ts" />
