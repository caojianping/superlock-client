<template>
    <Popup v-model="isShow" class="page-popup" @close="closePopup">
        <Header title="锁仓详情" :isBorder="false" @left="closePopup" />

        <header>
            <h2>锁仓金额({{ lock.coin }})</h2>
            <h1>{{ lock.amount | currencyComma }}</h1>
            <p>
                {{
                    `= ${lock.valuationAmount | currencyComma}${
                        lock.valuationCoin
                    }`
                }}
            </p>
        </header>

        <h2 class="separator">锁仓详情</h2>

        <CellGroup>
            <Cell title="锁仓订单号" :value="lock.orderId" />
            <Cell title="汇率" :value="`1BCB = ${lock.exchangeRate}DC`" />
            <Cell
                title="锁仓周期"
                :value="`${lock.length}${units[lock.unit - 1]}`"
            />
            <Cell title="年化利率" :value="lock.rate | ratePercent" />
            <Cell
                title="开始时间"
                :value="lock.startTime | dateFormat('yyyy-MM-dd')"
            />
            <Cell title="锁仓剩余时间" :value="`${lock.remainingDays}天`" />
            <Cell title="状态">
                <span class="lock-status" :class="lockStyles[lock.status]">{{
                    lockStatuses[lock.status]
                }}</span>
            </Cell>
            <Cell title="每日收益价值" :value="`${lock.dcDailyIncome} DC`" />
            <Cell
                title="累计收益价值(DC)"
                :value="`${lock.dcTotalIncome} DC`"
            />
            <Cell
                title="累计收益数量(BCB)"
                :value="`${lock.bcbTotalIncome} BCB`"
            />
        </CellGroup>
    </Popup>
</template>

<style src="./lock-info.less" lang="less" scoped />

<script src="./lock-info.ts" />
