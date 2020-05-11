<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>锁仓管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/lock/award">奖励设置</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-form">
            <header class="sl-form-header">
                <h1 class="sl-form-title">奖励设置</h1>
            </header>
            <div class="sl-form-body">
                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="推广解锁利率(%)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number :value="awardForm.promotionRate" :precision="2" disabled />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <!-- <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="直推利率(%)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number :value="awardForm.pushStraightRate" :precision="2" disabled />
                        </ant-form-item>
                    </ant-col>
                </ant-row> -->

                <ant-row :gutter="24">
                    <ant-col :span="24">
                        <ant-form-item label="日销奖励:" :label-col="{ span: 6 }" :wrapper-col="{ span: 17 }">
                            <table class="award-table">
                                <thead>
                                    <tr>
                                        <th>达标日销数量（DC）</th>
                                        <th>达标返奖利率(%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(dailySale, index) in awardForm.dailySalesDto" :key="index">
                                        <td>
                                            <ant-input-number :value="dailySale.sales" disabled />
                                        </td>
                                        <td>
                                            <ant-input-number :value="dailySale.rate" :precision="2" disabled />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </ant-form-item>
                    </ant-col>
                </ant-row>
            </div>
        </div>
    </div>
</template>

<style src="./lock-award.less" lang="less" scoped />

<script src="./lock-award.ts" />
