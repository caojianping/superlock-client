<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>财务管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/finance/interest">利息支出</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">利息支出列表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="6">
                        <ant-form-item label="订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="parameters.conditions.serial"
                                allowClear
                                placeholder="请输入订单号"
                                @change="handleFormChange('serial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="6">
                        <ant-form-item label="UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="parameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('uid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="选择时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                            {{ ((beginDate = parameters.conditions.beginDate), void 0) }}
                            {{ ((endDate = parameters.conditions.endDate), void 0) }}
                            <ant-range-picker
                                :value="[beginDate ? moment(beginDate) : undefined, endDate ? moment(endDate) : undefined]"
                                :showTime="{ format: 'HH:mm' }"
                                format="YYYY-MM-DD HH:mm"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="3">
                        <ant-button class="sl-search" type="primary" @click="search" style="margin-left: 0">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.fundSerial" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <ant-tooltip class="w100px" slot="fundSerial" slot-scope="record">
                <template slot="title">{{ record.fundSerial }}</template>
                {{ record.fundSerial }}
            </ant-tooltip>
            <ant-tooltip class="w100px" slot="serial" slot-scope="record">
                <template slot="title">{{ record.serial }}</template>
                {{ record.serial }}
            </ant-tooltip>
            <span slot="value" slot-scope="record">
                {{ record.value | digitPrecision(6) }}
            </span>
            <span slot="amount" slot-scope="record">
                {{ record.amount | digitPrecision(6) }}
            </span>
            <span slot="rate" slot-scope="record">
                {{ record.rate | digitPrecision(6) }}
            </span>
            <span slot="interest" slot-scope="record">
                {{ record.interest | digitPrecision(6) }}
            </span>
            <span slot="date" slot-scope="record">
                {{ record.date | dateFormat }}
            </span>
            <span :class="statusColors[record.status]" slot="status" slot-scope="record">
                {{ statusNames[record.status] }}
            </span>
            <span :class="auditColors[record.auditStatus]" slot="auditStatus" slot-scope="record">
                {{ auditNames[record.auditStatus] }}
            </span>
            <template slot="operation" slot-scope="record">
                <template v-if="record.status === '0'">
                    <ant-button v-if="record.auditStatus !== '3'" type="default" size="small" @click="setOperate(record.fundSerial, 3)"
                        >审核</ant-button
                    >
                    <ant-button v-if="record.auditStatus === '1'" type="danger" size="small" @click="setOperate(record.fundSerial, 5)"
                        >驳回</ant-button
                    >
                </template>
            </template>
        </ant-table>

        <ant-pagination
            :current="parameters.pageNum"
            :pageSize="parameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./finance-interest.less" lang="less" scoped />

<script src="./finance-interest.ts" />
