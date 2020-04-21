<template>
    <div class="security-center">
        <Header title="安全中心" @left="$router.push('/mine/index')" />

        <CellGroup class="scb-separator">
            <Cell title="UID" :value="userInfo.userId || '--'" />
            <Cell title="登录密码" is-link to="/security/login/password" />
            <Cell title="资金密码" is-link to="/security/fund/password" />
            <Cell title="邮箱绑定" is-link to="/security/email">
                <span :class="!userInfo.email ? 'unbind' : 'binded'">{{ userInfo.email || '未绑定' }}</span>
            </Cell>
        </CellGroup>
    </div>
</template>

<style src="./security-center.less" lang="less" scoped />

<script src="./security-center.ts" />
