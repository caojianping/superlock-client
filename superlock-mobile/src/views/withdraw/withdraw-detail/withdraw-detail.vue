<template>
    <div class="withdraw-detail">
        <Header :title="$t('WITHDRAW.WITHDRAW_DETAIL')" @left="$router.push('/withdraw/record')" />

        <div v-if="withdraw !== undefined" class="scb-separator">
            <div v-if="withdraw === null" class="scb-none">
                <img src="../../../assets/images/empty.png" :alt="$t('WITHDRAW.WITHDRAW_NO_DATA')" />
                <p>{{ $t('WITHDRAW.WITHDRAW_NO_DATA') }}</p>
            </div>
            <CellGroup v-else class="priority-value">
                <Cell :title="$t('COMMON.TRANSACTION_ID')">
                    <p class="scb-copy" id="withdrawOrderId" :data-clipboard-text="withdraw.orderId">
                        <span>{{ withdraw.orderId }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell :title="$t('COMMON.TRANSACTION_HASH')">
                    <p class="scb-copy" id="withdrawTxhash" :data-clipboard-text="withdraw.txhash">
                        <span>{{ withdraw.txhash }}</span>
                        <i v-if="withdraw.txhash" class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell :title="$t('WITHDRAW.WITHDRAW_TIME')" :value="withdraw.createTime | dateFormat" />
                <Cell :title="$t('WITHDRAW.WITHDRAW_COIN')" :value="withdraw.coin" />
                <Cell :title="$t('WITHDRAW.WITHDRAW_AMOUNT')" :value="withdraw.amount" />
                <Cell :title="$t('COMMON.WITHDRAW_ADDRESS')">
                    <p class="scb-copy" id="withdrawToAddress" :data-clipboard-text="withdraw.toAddress">
                        <span>{{ withdraw.toAddress }}</span>
                        <i v-if="withdraw.txhash" class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell :title="$t('COMMON.FUND_TYPE')" :value="fundTypes.get(withdraw.capitalType)" />
                <Cell :title="$t('COMMON.AVAILABLE_BALANCE')" :value="`${withdraw.balance} ${withdraw.balanceCoin}`" />
                <Cell :title="$t('COMMON.REMARK')" :value="withdraw.memo" />
                <Cell :title="$t('COMMON.STATUS')" :value="dataStatuses.get(withdraw.statusRemark)" />
            </CellGroup>
        </div>
    </div>
</template>

<style src="./withdraw-detail.less" lang="less" scoped />

<script src="./withdraw-detail.ts" />
