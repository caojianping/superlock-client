<template>
    <div class="transfer-detail">
        <Header :title="$t('TRANSFER.TRANSFER_DETAIL')" @left="$router.push('/transfer/record')" />

        <div v-if="transfer !== undefined" class="scb-separator">
            <div v-if="transfer === null" class="scb-none">
                <img src="../../../assets/images/empty.png" :alt="$t('TRANSFER.TRANSFER_NO_DATA')" />
                <p>{{ $t('TRANSFER.TRANSFER_NO_DATA') }}</p>
            </div>
            <CellGroup v-else class="priority-value">
                <Cell :title="$t('COMMON.TRANSACTION_ID')">
                    <p class="scb-copy" id="transferOrderId" :data-clipboard-text="transfer.orderId">
                        <span>{{ transfer.orderId }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell :title="$t('TRANSFER.FROM_UID')">
                    <p class="scb-copy" id="fromUid" :data-clipboard-text="transfer.fromUid">
                        <span>{{ transfer.fromUid }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell :title="$t('TRANSFER.TO_UID')">
                    <p class="scb-copy" id="toUid" :data-clipboard-text="transfer.toUid">
                        <span>{{ transfer.toUid }}</span>
                        <i class="icon icon-copy" />
                    </p>
                </Cell>
                <Cell :title="$t('TRANSFER.TRANSFER_COIN')" :value="transfer.coin" />
                <Cell :title="$t('TRANSFER.TRANSFER_AMOUNT')" :value="transfer.amount" />
                <Cell :title="$t('TRANSFER.TRANSFER_TIME')" :value="transfer.createTime | dateFormat" />
                <Cell :title="$t('COMMON.FUND_TYPE')" :value="fundTypes.get(transfer.capitalType)" />
                <Cell :title="$t('COMMON.AVAILABLE_BALANCE')" :value="`${transfer.balance} ${transfer.balanceCoin}`" />
                <Cell :title="$t('COMMON.REMARK')" :value="transfer.memo" />
                <Cell :title="$t('COMMON.STATUS')" :value="dataStatuses.get(transfer.statusRemark)" />
            </CellGroup>
        </div>
    </div>
</template>

<style src="./transfer-detail.less" lang="less" scoped />

<script src="./transfer-detail.ts" />
