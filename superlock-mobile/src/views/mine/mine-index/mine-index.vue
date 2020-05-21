<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="mine-index scb-reserved">
            <h1>{{ $t('MINE.TITLE') }}</h1>

            {{ ((userInfoObj = userInfo || {}), void 0) }}
            <div class="user-info flex">
                <figure>
                    <img src="../../../assets/images/avatar.png" :alt="userInfoObj.nickName" />
                </figure>
                <div>
                    <h2>{{ userInfoObj.nickName || '--' }}</h2>
                    <p class="scb-copy" id="uid" :data-clipboard-text="userInfoObj.userId">
                        <span>UID: {{ userInfoObj.userId || '--' }}</span>
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
                        <span>{{ $t('MINE.TEAM_MGMT') }}</span>
                    </template>
                </Cell>
                <Cell is-link to="/invite/friend">
                    <template>
                        <i class="icon icon-invite" />
                        <span>{{ $t('MINE.INVITE_FRIEND') }}</span>
                    </template>
                </Cell>
            </CellGroup>

            <CellGroup>
                <Cell is-link to="/recharge/address">
                    <template>
                        <i class="icon icon-recharge" />
                        <span>{{ $t('COMMON.RECHARGE_ADDRESS') }}</span>
                    </template>
                </Cell>
                <Cell is-link :to="{ path: '/withdraw/address', query: { from: '/mine/index' } }">
                    <template>
                        <i class="icon icon-withdraw" />
                        <span>{{ $t('COMMON.WITHDRAW_ADDRESS') }}</span>
                    </template>
                </Cell>
            </CellGroup>

            <CellGroup>
                <Cell is-link to="/security/center">
                    <template>
                        <i class="icon icon-security" />
                        <span>{{ $t('MINE.SECURITY_CENTER') }}</span>
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
                <Cell is-link @click="goCustomerService">
                    <template>
                        <i class="icon icon-service" />
                        <span>{{ $t('MINE.CUSTOMER_SERVICE') }}</span>
                    </template>
                </Cell>
                <Cell is-link to="/setting/center">
                    <template>
                        <i class="icon icon-setting" />
                        <span>{{ $t('COMMON.SETTING') }}</span>
                    </template>
                </Cell>
            </CellGroup>

            <ModifyName v-model="isShow" :name="userInfoObj.nickName || ''" @submit="handleModifyNameSubmit" />

            <Navs />
        </div>
    </PullRefresh>
</template>

<style src="./mine-index.less" lang="less" scoped />

<script src="./mine-index.ts" />
