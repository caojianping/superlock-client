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
                            <ant-input-number
                                :value="awardForm.promotionRate"
                                :min="0"
                                :max="100"
                                :precision="2"
                                placeholder="请输入推广解锁利率"
                                @change="handleFormChange('promotionRate', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="直推利率(%)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number
                                :value="awardForm.pushStraightRate"
                                :min="0"
                                :max="100"
                                :precision="2"
                                placeholder="请输入直推利率"
                                @change="handleFormChange('pushStraightRate', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <!-- <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item
                            label="最小锁仓数量(BCB)"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                        >
                            <ant-input-number
                                :value="awardForm.lockAmount"
                                :min="0"
                                placeholder="请输入最小锁仓数量(BCB)"
                                @change="handleFormChange('lockAmount', $event)"
                                @keyup.enter="submit(false)"
                            />
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
                                        <th>
                                            <ant-button type="default" size="small" @click="addDailySale">添加</ant-button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(dailySale, index) in awardForm.dailySalesDto" :key="index">
                                        <td>
                                            <ant-input-number
                                                :value="dailySale.sales"
                                                :min="0"
                                                placeholder="请输入达标日销数量"
                                                @change="handleDailySaleChange(index, 'sales', $event)"
                                                @keyup.enter="submit(false)"
                                            />
                                        </td>
                                        <td>
                                            <ant-input-number
                                                :value="dailySale.rate"
                                                :min="0"
                                                :max="100"
                                                :precision="2"
                                                placeholder="请输入达标返奖利率"
                                                @change="handleDailySaleChange(index, 'rate', $event)"
                                                @keyup.enter="submit(false)"
                                            />
                                        </td>
                                        <td>
                                            <ant-button type="danger" size="small" @click="removeDailySale(index)">删除</ant-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-button class="sl-submit" type="primary" @click="submit(false)">保存</ant-button>
                </ant-row>
            </div>
        </div>

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./lock-award.less" lang="less" scoped />

<script src="./lock-award.ts" />
