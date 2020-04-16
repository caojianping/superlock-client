<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>系统设置</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/system/user">用户列表</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <ant-button class="sl-tool" type="primary" @click="openUserModal(1)">添加用户</ant-button>

        <ant-table :columns="columns" :rowKey="record => record.id" :dataSource="list" :pagination="false" :loading="isPageLoading">
            <template slot="operation" slot-scope="record">
                <ant-button type="danger" size="small" @click="openDeleteConfirm(record)">删除</ant-button>
                <ant-button type="default" size="small" @click="openUserModal(2, record)">修改</ant-button>
                <ant-button class="w65px" type="danger" size="small" @click="openPasswordModal(record)">修改密码</ant-button>
                <ant-button class="w65px" type="default" size="small" @click="openGaConfirm(record)">重置GA</ant-button>
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

        <UserModal v-model="isUserShow" :roleOptions="roleOptions" :type="currentOperation" :user="currentUser" @submit="handleUserSubmit" />

        <PasswordModal v-model="isPasswordShow" title="输入登录密码" :user="currentUser" @submit="handlePasswordSubmit" />

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./system-user.less" lang="less" scoped />

<script src="./system-user.ts" />
