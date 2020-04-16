<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>锁仓管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/lock/project">项目列表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">项目列表</h2>
            </header>
            <div class="sl-block-body">
                <ant-row :gutter="24">
                    <ant-col :span="8">
                        <ant-form-item label="项目ID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="projectParameters.conditions.projectId"
                                allowClear
                                placeholder="请输入项目ID"
                                @change="handleFormChange('projectId', $event.target.value)"
                            />
                        </ant-form-item>
                    </ant-col>

                    <ant-col :span="8">
                        <ant-button class="sl-search" type="primary" @click="search">搜索</ant-button>
                    </ant-col>
                </ant-row>
            </div>
        </div>

        <ant-table class="mt32px" :columns="columns" :rowKey="record => record.id" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <span slot="quota" slot-scope="record">
                {{ record.quota | digitPrecision(6) }}
            </span>
            <span slot="rate" slot-scope="record">
                {{ record.rate | ratePercent }}
            </span>
            <span slot="createTime" slot-scope="record">
                {{ record.createTime | dateFormat }}
            </span>
            <span slot="enable" slot-scope="record">
                {{ ['停用', '启用'][record.enable === true ? 1 : 0] }}
            </span>
            <template slot="operation" slot-scope="record">
                <ant-button type="default" size="small" @click="openProjectModal(record)">修改</ant-button>
            </template>
        </ant-table>

        <ant-pagination
            :current="projectParameters.pageNum"
            :pageSize="projectParameters.pageSize"
            :total="totalCount"
            :pageSizeOptions="pageSizeOptions"
            :showTotal="total => `共有 ${total} 条记录`"
            showQuickJumper
            showSizeChanger
            @change="handlePageNumChange"
            @showSizeChange="handlePageSizeChange"
        />

        <ProjectModal v-model="isShow" title="锁仓项目修改" :project="currentProject" @submit="handleProjectSubmit" />

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./lock-project.less" lang="less" scoped />

<script src="./lock-project.ts" />
