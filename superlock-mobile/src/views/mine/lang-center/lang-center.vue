<template>
    <div class="scb-gray lang-center">
        <Header :title="$t('MINE.LANG_CENTER')" @left="$router.push('/setting/center')" />

        <RadioGroup class="scb-separator" v-model="activeLang">
            <CellGroup>
                <Cell title="中文" clickable @click="chooseLang('zh')">
                    <template slot="right-icon">
                        <Radio name="zh" />
                    </template>
                </Cell>
                <Cell title="English" clickable @click="chooseLang('en')">
                    <template slot="right-icon">
                        <Radio name="en" />
                    </template>
                </Cell>
            </CellGroup>
        </RadioGroup>
    </div>
</template>

<style src="./lang-center.less" lang="less" scoped />

<script src="./lang-center.ts" />
