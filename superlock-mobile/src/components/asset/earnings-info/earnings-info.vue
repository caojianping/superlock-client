<template>
    <Popup v-model="isShow" class="earnings-popup full" @close="handlePopupClose">
        <Header :title="$t('ASSET.YESTERDAY_EARNINGS')" @left="handlePopupClose" />

        <template v-if="earningsStats">
            <h2>
                <label>{{ $t('ASSET.TOTAL_EARNINGS') }}</label>
                <span>{{ `${earningsStats.yesterdayEarnings} ${earningsStats.yesterdayEarningsCoin}` }}</span>
            </h2>

            <CellGroup>
                {{ ((earnings = earningsStats.earnings || []), void 0) }}
                <Cell v-for="(earning, index) in earnings" :key="index" :title="earningsTypes[earning.type - 1]">
                    <span>{{ `${['-', '+'][earning.prefix]} ${earning.income}${earning.coin}` }}</span>
                </Cell>
            </CellGroup>
        </template>
    </Popup>
</template>

<style src="./earnings-info.less" lang="less" scoped />

<script src="./earnings-info.ts" />
