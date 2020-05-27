<template>
    <ul class="loan-banner flex">
        <li>
            <div>
                <i />
                <p class="flex-middle">
                    <span>{{ $t('LOAN.LOCK_PLEDGE') }}</span>
                </p>
            </div>
        </li>
        <li>
            <div>
                <i />
                <p class="flex-middle">
                    <span>{{ $t('LOAN.RAPID_LENDING') }}</span>
                </p>
            </div>
        </li>
        <li>
            <div>
                <i />
                <p class="flex-middle">
                    <span>{{ $t('LOAN.ANYTIME_REPAY') }}</span>
                </p>
            </div>
        </li>
    </ul>
</template>

<style src="./loan-banner.less" lang="less" scoped />

<script src="./loan-banner.ts" />
