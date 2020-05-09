<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>用户中心</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                {{ ((type = childParameters.conditions.type), void 0) }}
                <router-link :to="`/member/broker/${type}`">{{ ['券商列表', '代理列表'][Number(type)] }}</router-link>
            </ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link :to="`/member/broker/child/${uid}`">下级代理</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block stats">
            <header class="sl-block-header">
                <h2 class="sl-block-title">下级详情</h2>
            </header>
            <div class="sl-block-body">
                <div class="stats-panel">
                    <h3>UID: {{ uid }}</h3>
                    <table>
                        <tr>
                            <td>{{ count || 0 }}</td>
                        </tr>
                        <tr>
                            <td>累计推广数量(DC)</td>
                        </tr>
                    </table>

                    <i></i>
                </div>
            </div>
        </div>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">
                    {{ ['券商列表', '代理列表'][type] }}
                </h2>
            </header>
            <div class="sl-block-body mw1200px">
                <ant-row :gutter="24">
                    <ant-col :span="7">
                        <ant-form-item label="下级UID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="childParameters.conditions.subordinateUid"
                                allowClear
                                placeholder="请输入UID"
                                @change="handleFormChange('subordinateUid', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="childParameters.conditions.mobile"
                                allowClear
                                placeholder="请输入手机号"
                                @change="handleFormChange('mobile', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="7">
                        <ant-form-item label="邮箱" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="childParameters.conditions.email"
                                allowClear
                                placeholder="请输入邮箱"
                                @change="handleFormChange('email', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="3">
                        <ant-button class="sl-search" type="primary" @click="search" style="margin-left: 0">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-button class="sl-tool" type="primary" @click="exportReport">导出报表</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.uid" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <span slot="mobile" slot-scope="record">{{ [record.areaCode, record.mobile].join(',') }}</span>
        </ant-table>

        <ant-pagination
            :current="childParameters.pageNum"
            :pageSize="childParameters.pageSize"
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

<style src="./member-broker-child.less" lang="less" scoped />

<script src="./member-broker-child.ts" />
