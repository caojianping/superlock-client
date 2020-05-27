<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>系统设置</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/system/user">用户列表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <ant-button class="sl-tool" type="primary" @click="openModal('isUserShow', undefined, 1)">添加用户</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.id" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <span slot="comGa" slot-scope="record">{{ ['否', '是'][record.comGa] }}</span>
            <template slot="operation" slot-scope="record">
                <ant-button type="danger" size="small" @click="openConfirm(1, record)">删除</ant-button>
                <ant-button type="default" size="small" @click="openModal('isUserShow', record, 2)">修改</ant-button>
                <ant-button class="w65px" type="default" size="small" @click="openModal('isPasswordShow', record, undefined)">修改密码</ant-button>
                <ant-button class="w65px" type="danger" size="small" @click="openConfirm(2, record)">重置GA</ant-button>
                <ant-button class="w65px" type="default" size="small" @click="openConfirm(3, record)">设置总号</ant-button>
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

        <UserModal v-model="isUserShow" :operation-type="operationType" :user="user" @close="handleModalClose" @submit="handleModalSubmit" />

        <PasswordModal v-model="isPasswordShow" :user="user" @close="handleModalClose" @submit="handleModalSubmit" />

        <SecondVerify :is-show="isSecondVerifyShow && !isDisable" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./system-user.less" lang="less" scoped />

<script src="./system-user.ts" />
