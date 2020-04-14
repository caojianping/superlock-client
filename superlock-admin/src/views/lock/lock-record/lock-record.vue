<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>锁仓管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/lock/record">锁仓记录</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">锁仓列表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="订单号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="recordParameters.conditions.serial"
                                allowClear
                                placeholder="请输入订单号"
                                @change="handleFormChange('serial', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="订单状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                class="sl-select"
                                :value="recordParameters.conditions.status"
                                :options="statusOptions"
                                allowClear
                                placeholder="请选择订单状态"
                                @change="handleFormChange('status', $event)"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="用户来源" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-auto-complete
                                :value="recordParameters.conditions.carrierId"
                                :data-source="dataSource"
                                :filterOption="filterOption"
                                placeholder="请输入运营商名称"
                                @change="handleAutoCompleteChange"
                                @select="handleAutoCompleteChange"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="recordParameters.conditions.uid"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('uid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="9">
                        <ant-form-item label="选择时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            {{
                                (((beginTime = recordParameters.conditions.beginTime), void 0),
                                ((endTime = recordParameters.conditions.endTime), void 0))
                            }}
                            <ant-range-picker
                                :value="[
                                    beginTime ? moment(beginTime) : undefined,
                                    endTime ? moment(endTime) : undefined
                                ]"
                                :showTime="{ format: 'HH:mm' }"
                                format="YYYY-MM-DD HH:mm"
                                @change="handleRangePickerChange"
                            ></ant-range-picker>
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table
            :columns="columns"
            :rowKey="record => record.serial"
            :dataSource="list"
            :pagination="false"
            :loading="isPageLoading"
        >
            <ant-tooltip class="w100px" slot="serial" slot-scope="record">
                <template slot="title">{{ record.serial }}</template>
                {{ record.serial }}
            </ant-tooltip>
            <span slot="amount" slot-scope="record">
                {{ record.amount | digitPrecision(6) }}
            </span>
            <span slot="rate" slot-scope="record">
                {{ record.rate | ratePercent }}
            </span>
            <span slot="value" slot-scope="record">
                {{ record.value | digitPrecision(6) }}
            </span>
            <span slot="createDate" slot-scope="record">
                {{ record.createDate | dateFormat }}
            </span>
            <span :class="statusColors[record.status]" slot="status" slot-scope="record">
                {{ statusNames[record.status] }}
            </span>
        </ant-table>

        <ant-pagination
            :current="recordParameters.pageNum"
            :pageSize="recordParameters.pageSize"
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

<style src="./lock-record.less" lang="less" scoped />

<script src="./lock-record.ts" />
