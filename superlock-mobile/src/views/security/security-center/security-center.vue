<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="security-center">
            <Header :title="$t('MINE.SECURITY_CENTER')" @left="$router.push('/mine/index')" />

            <CellGroup class="scb-separator">
                {{ ((userInfoObj = userInfo || {}), void 0) }}
                <Cell title="UID" :value="userInfoObj.userId || '--'" />
                <Cell
                    :title="$t('SECURITY.LOGIN_PASSWORD')"
                    is-link
                    :to="{ path: '/security/login/password', query: { from: '/security/center' } }"
                />
                <Cell :title="$t('COMMON.FUND_PASSWORD')" is-link @click="goFund" />
                <Cell
                    v-if="!userInfoObj.email"
                    :title="$t('MINE.EMAIL_BIND')"
                    is-link
                    :to="{ path: '/security/email', query: { from: '/security/center' } }"
                >
                    <span class="unbind">{{ $t('SECURITY.UNBIND') }}</span>
                </Cell>
                <Cell v-else :title="$t('MINE.EMAIL_BIND')">
                    <span class="binded">{{ userInfoObj.email }}</span>
                </Cell>
            </CellGroup>
        </div>
    </PullRefresh>
</template>

<style src="./security-center.less" lang="less" scoped />

<script src="./security-center.ts" />
