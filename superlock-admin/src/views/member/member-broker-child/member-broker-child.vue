<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>用户中心</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                {{ ((type = parameters.conditions.type), void 0) }}
                <router-link :to="`/member/broker/${type}`">{{ ['券商列表', '代理列表'][Number(type)] }}</router-link>
            </ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link :to="`/member/broker/child/${uid}`">下级代理</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
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
                            <td>锁仓总额(DC)</td>
                        </tr>
                    </table>

                    <i></i>
                </div>
            </div>
        </div>

        <ant-table class="mt32px" :columns="columns" :rowKey="record => record.uid" :dataSource="list" :pagination="false" :loading="isPageLoading" />

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

<style src="./member-broker-child.less" lang="less" scoped />

<script src="./member-broker-child.ts" />
