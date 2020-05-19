<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="transfer-child">
            <Header title="我的下级" @left="$router.push('/transfer/index')" />

            <Search
                class="transfer-child-search"
                v-model="keyword"
                :clearable="false"
                shape="round"
                left-icon=""
                background="#f9f9f9"
                placeholder="下级昵称搜索"
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
                    loading-text="记录加载中……"
                    finished-text="记录加载完毕"
                    @load="fetchData"
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
