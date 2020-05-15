<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="scb-blue loan-index">
            <Header title="锁仓质押贷" is-blue :is-border="false" @left="$router.push('/home/index')" />

            <div class="scb-blue-body">
                {{ ((loanBaseInfoObj = loanBaseInfo || {}), void 0) }}
                <div class="loan-info loan-container">
                    <h1>
                        有锁仓就可贷<span>（最高可贷锁仓价值的{{ `${loanBaseInfoObj.loanProportion || '--'}%` }}）</span>
                    </h1>
                    <h2 class="scb-border">
                        贷款年利率：<span>{{ `${loanBaseInfoObj.loanRate || '--'}%` }}</span>
                    </h2>
                    <LoanBanner />
                </div>

                <div class="loan-lock">
                    <h2>选择需要质押的锁仓</h2>

                    <div v-if="loanableLocks" class="lock-container">
                        <div v-if="loanableLocks.length <= 0" class="scb-none">
                            <img src="../../../assets/images/empty.png" alt="暂无锁仓项目" />
                            <p>暂无锁仓项目</p>
                        </div>
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
                                class="lock-item loan-container"
                                v-for="(loanableLock, index) in loanableLocks"
                                :key="index"
                                @click="goApply(loanableLock)"
                            >
                                {{ ((loanFlag = loanableLock.loanFlag), void 0) }}
                                <Cell title="锁仓订单号：" :value="loanableLock.orderId" :border="false" />
                                <Cell title="锁仓到期时间：" :border="false">
                                    <p class="clearfix">
                                        <span>{{ loanableLock.endDate | dateFormat('yyyy-MM-dd') }}</span>
                                        <Button v-if="loanFlag === 1" class="effect-shadow" type="default" size="small" round>抵押贷款</Button>
                                    </p>
                                </Cell>
                                <Cell title="锁仓价值：" :value="`${loanableLock.lockValue} ${loanableLock.lockValueCoin}`" :border="false" />
                                <Cell v-if="loanFlag !== 1" :class="['lock-flag', `flag${loanableLock.loanFlag}`]" :border="false">
                                    <span slot="title">{{ loanFlags.get(loanableLock.loanFlag) }}</span>
                                </Cell>
                            </CellGroup>
                        </List>
                    </div>
                </div>
            </div>

            <footer class="scb-blue-footer">
                <router-link to="/loan/intro">了解锁仓质押贷</router-link>
            </footer>
        </div>
    </PullRefresh>
</template>

<style src="./loan-index.less" lang="less" scoped />

<script src="./loan-index.ts" />
