<template>
    <Popup v-model="isShow" class="full" @close="handlePopupClose">
        <div class="lock-result">
            <Header title="安全验证" :isBorder="false" @left="handlePopupClose" />

            <CellGroup>
                <Cell is-link>
                    <template>
                        <i class="icon icon-mobile" />
                        <span>短信验证</span>
                    </template>
                </Cell>
                <Cell is-link>
                    <template>
                        <i class="icon icon-email" />
                        <span>邮箱验证</span>
                    </template>
                </Cell>
            </CellGroup>
        </div>
    </Popup>
</template>

<style src="./second-verify.less" lang="less" scoped />

<script src="./second-verify.ts" />
