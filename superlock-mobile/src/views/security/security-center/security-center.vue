<template>
    <div class="security-center">
        <Header title="安全中心" @left="$router.push('/mine/index')" />

        <CellGroup class="scb-separator">
            <Cell title="UID" :value="userInfo.userId || '--'" />
            <Cell title="登录密码" is-link :to="{ path: '/security/login/password', query: { from: '/security/center' } }" />
            <Cell title="资金密码" is-link :to="{ path: '/security/fund/password', query: { from: '/security/center' } }" />
            <Cell v-if="!userInfo.email" title="邮箱绑定" is-link :to="{ path: '/security/email', query: { from: '/security/center' } }">
                <span class="unbind">未绑定</span>
            </Cell>
            <Cell v-else title="邮箱绑定">
                <span class="binded">{{ userInfo.email }}</span>
            </Cell>
        </CellGroup>
    </div>
</template>

<style src="./security-center.less" lang="less" scoped />

<script src="./security-center.ts" />
