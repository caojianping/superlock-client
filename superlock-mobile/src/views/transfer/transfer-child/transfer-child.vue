<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="transfer-child">
            <Header :title="$t('TRANSFER.TRANSFER_CHILDS')" @left="$router.push('/transfer/index')" />

            <Search
                class="transfer-child-search"
                v-model="keyword"
                :clearable="false"
                shape="round"
                left-icon=""
                background="#f9f9f9"
                :placeholder="$t('PLACEHOLDERS.ENTER_CHILD_NICKNAME')"
            >
                <Icon slot="right-icon" name="search" @click="handleSearchAction" />
            </Search>

            <div v-if="transferChilds">
                <p v-if="transferChilds.length <= 0" class="scb-none">暂无下级信息</p>
                <List
                    v-else
                    v-model="isLoading"
                    :finished="isFinished"
                    :immediate-check="false"
                    :loading-text="$t('COMMON.RECORD_LOADING')"
                    :finished-text="$t('COMMON.RECORD_LOADED')"
                    @load="fetchTransferChilds"
                >
                    <CellGroup>
                        <Cell v-for="(transferChild, index) in transferChilds" :key="index" @click="chooseChild(transferChild)">
                            <div slot="title">
                                <h2>{{ transferChild.nickNameRemark }}</h2>
                                <p>{{ transferChild.uid }}</p>
                            </div>
                            <Checkbox slot="right-icon" :value="selectedTransferChild && transferChild.uid === selectedTransferChild.uid" />
                        </Cell>
                    </CellGroup>
                </List>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./transfer-child.less" lang="less" scoped />

<script src="./transfer-child.ts" />
