<template>
    <div class="loan-intro scb-gray">
        <Header title="了解锁仓质押贷" :isBorder="false" @left="$router.push('/loan/index')" />

        <div>
            <h1>锁仓质押贷</h1>
            <ul>
                <li><i /><span>锁仓抵押</span></li>
                <li><i /><span>快速放贷</span></li>
                <li><i /><span>随时还款</span></li>
            </ul>
        </div>

        <div>
            <h3>1.什么样的情况下可以贷款？</h3>
            <p>用户只有在有锁仓理财的时候能进行贷款活动，贷款是针对某一笔锁仓订单来申请贷款的。</p>
        </div>

        <div>
            <h3>2.锁仓理财作为质押品后还能有锁仓利息吗？</h3>
            <p>锁仓理财作为质押品期间将不再计算锁仓利息。如果贷款本息还清后，作为质押品的锁仓理财还在锁仓期内，则理财继续，锁仓利息也会继续发放。</p>
            <p>如果贷款本息还清后，如果质押的锁仓理财产品也处于到期状态，质押的锁仓理财产品将会解锁，锁仓本金返回可用资产账户中。</p>
        </div>

        <div>
            <h3>3.为什么有未到期的锁仓项目却无法贷款？</h3>
            <p>如果未到期的锁仓项目锁仓金额太小，或锁仓即将到期，这个时候是无法申请贷款的。</p>
        </div>

        <div>
            <h3>4.提现还贷是否需要赔息？</h3>
            <p>支持随借随还，提前还贷无需赔息。</p>
        </div>
    </div>
</template>

<style src="./loan-intro.less" lang="less" scoped />

<script src="./loan-intro.ts" />
