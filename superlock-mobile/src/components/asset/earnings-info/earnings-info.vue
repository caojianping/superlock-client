<template>
    <Popup
        v-model="isShow"
        class="page-popup earnings-popup"
        @close="closePopup"
    >
        <Header title="昨日收益" @left="closePopup" />

        <template v-if="earningsStats">
            <h2>
                <label>总收益：</label>
                <span>{{
                    `${earningsStats.yesterdayEarnings} ${earningsStats.yesterdayEarningsCoin}`
                }}</span>
            </h2>

            <CellGroup>
                {{ ((earnings = earningsStats.earnings || []), void 0) }}
                <Cell
                    v-for="(earning, index) in earnings"
                    :key="index"
                    :title="earningsTypes[earning.type - 1]"
                >
                    <span>{{
                        `${['-', '+'][earning.prefix]} ${earning.income}${
                            earning.coin
                        }`
                    }}</span>
                </Cell>
            </CellGroup>
        </template>
    </Popup>
</template>

<style src="./earnings-info.less" lang="less" scoped />

<script src="./earnings-info.ts" />
