<template>
    <div class="pb4">
        <header>
            <h2>总资产（BCB）<i></i></h2>
            <h1>40000.67</h1>
            <p>昨日收益（BCB） <span></span> <i></i></p>
        </header>

        <div>
            <div>
                <i></i>
                <span>充值</span>
            </div>
            <div>
                <i></i>
                <span>提现</span>
            </div>
            <div>
                <i></i>
                <span>转账</span>
            </div>
        </div>

        <Tabs v-model="activeTab" animated swipeable @change="handleTabsChange">
            <Tab>
                <template slot="title">
                    <span>资产总账</span>
                </template>
                <template slot="default">
                    11111
                </template>
            </Tab>
            <Tab>
                <template slot="title">
                    <span>我的锁仓</span>
                </template>
                <template slot="default">
                    22222
                </template>
            </Tab>
            <Tab>
                <template slot="title">
                    <span>我的贷款</span>
                </template>
                <template slot="default">
                    33333
                </template>
            </Tab>
            <Tab>
                <template slot="title">
                    <span>推广奖励</span>
                </template>
                <template slot="default">
                    44444
                </template>
            </Tab>
        </Tabs>

        <Navs />
    </div>
</template>

<style src="./asset-index.less" lang="less" scoped />

<script src="./asset-index.ts" />
