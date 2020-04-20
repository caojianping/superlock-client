<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>上分管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/point/record">上分记录</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">上分记录列表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="8">
                        <ant-form-item label="转出UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="pointParameters.conditions.uid"
                                allowClear
                                placeholder="请输入转出UID"
                                @change="handleFormChange('uid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="10">
                        <ant-form-item label="选择时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{ ((beginTime = pointParameters.conditions.beginTime), void 0) }}
                            {{ ((endTime = pointParameters.conditions.endTime), void 0) }}
                            <ant-range-picker
                                :value="[beginTime ? moment(beginTime) : undefined, endTime ? moment(endTime) : undefined]"
                                :showTime="{ format: 'HH:mm', defaultValue: [moment('00:00', 'HH:mm'), moment('23:59', 'HH:mm')] }"
                                format="YYYY-MM-DD HH:mm"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="6">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="openPointModal">上分</ant-button>

        <ant-button class="sl-tool" type="primary" @click="openTransferModal">转账</ant-button>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.date" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <span slot="date" slot-scope="record">
                {{ record.date | dateFormat }}
            </span>
        </ant-table>

        <ant-pagination
            :current="pointParameters.pageNum"
            :pageSize="pointParameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <PointModal v-model="isPointShow" title="系统账户上分" @submit="handlePointSubmit" />

        <TransferModal v-model="isTransferShow" title="系统转账" @submit="handleTransferSubmit" />

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./point-record.less" lang="less" scoped />

<script src="./point-record.ts" />
