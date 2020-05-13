<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <Header title="锁仓质押贷" :isBorder="false" @left="$router.push('/home/index')" />

        {{ ((loanBaseInfoObj = loanBaseInfo || {}), void 0) }}
        <div class="loan-info">
            <h1>
                有锁仓就可贷
                <span>（最高可贷锁仓价值的{{ `${loanBaseInfoObj.loanProportion || '--'}%` }}）</span>
            </h1>
            <h2>
                贷款年利率：<span>{{ `${loanBaseInfoObj.loanRate || '--'}%` }}</span>
            </h2>
            <ul>
                <li><i /><span>锁仓抵押</span></li>
                <li><i /><span>快速放贷</span></li>
                <li><i /><span>随时还款</span></li>
            </ul>
        </div>

        <div class="loan-main">
            <h2>选择需要质押的锁仓</h2>

            <div v-if="loanableLocks" class="lock-container">
                <p v-if="loanableLocks.length <= 0" class="scb-none">暂无锁仓项目</p>
                <List
                    v-else
                    class="lock-list"
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    loading-text="记录加载中……"
                    finished-text="记录加载完毕"
                    @load="fetchLoanableLocks"
                >
                    <CellGroup
                        class="lock-item"
                        v-for="(loanableLock, index) in loanableLocks"
                        :key="index"
                        @click="goApply(loanableLock)"
                        style="margin-bottom: 1rem;"
                    >
                        {{ ((loanFlag = loanableLock.loanFlag), void 0) }}
                        <Cell title="锁仓订单号" :value="loanableLock.orderId" />
                        <Cell title="锁仓到期时间">
                            <p>
                                <span>{{ loanableLock.endDate | dateFormat('yyyy-MM-dd') }}</span>
                                <Button v-if="loanFlag === 1" class="effect-shadow" type="primary" size="small" round>抵押贷款</Button>
                            </p>
                        </Cell>
                        <Cell title="锁仓价值" :value="`${loanableLock.lockValue} ${loanableLock.lockValueCoin}`" />
                        <Cell v-if="loanFlag !== 1">
                            <span slot="title" :class="['lock-flag', `flag${loanFlag}`]">{{ loanFlags.get(loanFlag) }}</span>
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>

        <router-link to="/loan/intro">了解锁仓质押贷</router-link>
    </PullRefresh>
</template>

<style src="./loan-index.less" lang="less" scoped />

<script src="./loan-index.ts" />
