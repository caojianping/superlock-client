<template>
    <div class="mine-index scb-reserved">
        <h1>我的</h1>

        <div class="user-info flex">
            <figure>
                <img src="../../../assets/images/avatar.png" :alt="userInfo.nickName || ''" />
            </figure>
            <div>
                <h2>{{ userInfo.nickName || '--' }}</h2>
                <p id="uid" :data-clipboard-text="userInfo.userId || ''">
                    <span>UID: {{ userInfo.userId || '--' }}</span>
                    <i class="icon icon-copy" />
                </p>
            </div>
            <p @click="isShow = true">
                <Icon name="arrow" />
            </p>
        </div>

        <CellGroup>
            <Cell is-link :to="{ path: '/team/index', query: { from: '/mine/index' } }">
                <template>
                    <i class="icon icon-team" />
                    <span>团队管理</span>
                </template>
            </Cell>
            <Cell is-link to="/invite/friend">
                <template>
                    <i class="icon icon-invite" />
                    <span>邀请好友</span>
                </template>
            </Cell>
        </CellGroup>

        <CellGroup>
            <Cell is-link to="/recharge/address">
                <template>
                    <i class="icon icon-recharge" />
                    <span>充值地址</span>
                </template>
            </Cell>
            <Cell is-link :to="{ path: '/withdraw/address', query: { from: '/mine/index' } }">
                <template>
                    <i class="icon icon-withdraw" />
                    <span>提现地址</span>
                </template>
            </Cell>
        </CellGroup>

        <CellGroup>
            <Cell is-link to="/security/center">
                <template>
                    <i class="icon icon-security" />
                    <span>安全中心</span>
                </template>
            </Cell>
            <!-- <Cell is-link to="/help/center">
                <template>
                    <i class="icon icon-help" />
                    <span>帮助中心</span>
                </template>
            </Cell>
            <Cell is-link to="/message/center">
                <template>
                    <i class="icon icon-message" />
                    <span>消息通知</span>
                </template>
            </Cell> -->
            <Cell is-link to="/setting/center">
                <template>
                    <i class="icon icon-setting" />
                    <span>设置</span>
                </template>
            </Cell>
        </CellGroup>

        <ModifyName v-model="isShow" :name="userInfo.nickName || ''" @submit="handleModifyNameSubmit" />

        <Navs />
    </div>
</template>

<style src="./mine-index.less" lang="less" scoped />

<script src="./mine-index.ts" />
