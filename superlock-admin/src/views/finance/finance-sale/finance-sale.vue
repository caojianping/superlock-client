<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>财务管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/finance/sale">日销奖励</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">日销奖励列表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="8">
                        <ant-form-item
                            label="UID"
                            :label-col="{ span: 6 }"
                            :wrapper-col="{ span: 18 }"
                        >
                            <ant-input
                                type="text"
                                :value="parameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="
                                    handleFormChange('uid', $event.target.value)
                                "
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="10">
                        <ant-form-item
                            label="选择时间"
                            :label-col="{ span: 6 }"
                            :wrapper-col="{ span: 18 }"
                        >
                            {{
                                (beginDate = parameters.conditions.beginDate, void 0),
                                (endDate = parameters.conditions.endDate, void 0)
                            }}
                            <ant-range-picker
                                :value="[
                                    beginDate ? moment(beginDate) : undefined,
                                    endDate ? moment(endDate) : undefined
                                ]"
                                :showTime="{ format: 'HH:mm' }"
                                format="YYYY-MM-DD HH:mm"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="6">
                        <ant-button
                            class="sl-search"
                            type="primary"
                            @click="search"
                            >搜索</ant-button
                        >
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table
            :columns="columns"
            :rowKey="record => record.fundSerial"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <ant-tooltip class="w100px" slot="fundSerial" slot-scope="record">
                <template slot="title">{{ record.fundSerial }}</template>
                {{ record.fundSerial }}
            </ant-tooltip>
            <ant-tooltip class="w100px" slot="serial" slot-scope="record">
                <template slot="title">{{ record.serial }}</template>
                {{ record.serial }}
            </ant-tooltip>
            <span slot="salesRate" slot-scope="record">
                {{ record.salesRate | ratePercent }}
            </span>
            <span slot="date" slot-scope="record">
                {{ record.date | dateFormat }}
            </span>
            <span :class="statusColors[record.status]" slot="status" slot-scope="record">
                {{ statusNames[record.status] }}
            </span>
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
    </div>
</template>

<style src="./finance-sale.less" lang="less" scoped />

<script src="./finance-sale.ts" />
