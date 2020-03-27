<template>
    <div class="mine-index pb4">
        <h1>我的</h1>

        <div class="user-info flex">
            <figure>
                <img
                    src="../../../assets/images/avatar.png"
                    :alt="userInfo.nickName || ''"
                />
            </figure>
            <div>
                <h2>{{ userInfo.nickName || '--' }}</h2>
                <p>UID: {{ userInfo.userId || '--' }}</p>
            </div>
            <p>
                <Icon name="arrow" />
            </p>
        </div>

        <CellGroup>
            <Cell is-link>
                <template>
                    <i class="icon icon-team" />
                    <span>团队管理</span>
                </template>
            </Cell>
            <Cell is-link>
                <template>
                    <i class="icon icon-invite" />
                    <span>邀请好友</span>
                </template>
            </Cell>
        </CellGroup>

        <CellGroup>
            <Cell is-link to="/recharge/addresses">
                <template>
                    <i class="icon icon-recharge" />
                    <span>充值地址</span>
                </template>
            </Cell>
            <Cell is-link>
                <template>
                    <i class="icon icon-withdraw" />
                    <span>提现地址</span>
                </template>
            </Cell>
        </CellGroup>

        <CellGroup>
            <Cell is-link>
                <template>
                    <i class="icon icon-security" />
                    <span>安全中心</span>
                </template>
            </Cell>
            <Cell is-link>
                <template>
                    <i class="icon icon-help" />
                    <span>帮助中心</span>
                </template>
            </Cell>
            <Cell is-link>
                <template>
                    <i class="icon icon-message" />
                    <span>消息通知</span>
                </template>
            </Cell>
            <Cell is-link>
                <template>
                    <i class="icon icon-setting" />
                    <span>设置</span>
                </template>
            </Cell>
        </CellGroup>

        <Navs />
    </div>
</template>

<style src="./mine-index.less" lang="less" scoped />

<script src="./mine-index.ts" />
