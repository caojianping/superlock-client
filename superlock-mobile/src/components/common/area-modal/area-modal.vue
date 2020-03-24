<template>
    <div v-if="isShow" class="area-modal">
        <header class="area-header">
            <NavBar
                title="国家和地区"
                left-arrow
                border
                @click-left="closeModal"
            />

            <Search
                class="area-search"
                v-model="keyword"
                placeholder="国家/地区"
                shape="round"
                background="white"
                @input="handleSearchInput"
                @clear="handleSearchClear"
            />
        </header>

        <div class="area-body">
            <template v-if="!isSearch">
                <div class="area-hots">
                    <Cell
                        v-for="(areaCode, index) in hotAreaCodes"
                        :key="index"
                        :value="`${areaCode.name} +${areaCode.code}`"
                        @click="chooseAreaCode(areaCode)"
                    />
                </div>

                <IndexBar v-if="!isSearch" :sticky="true">
                    <div v-for="(areaCodes, key) in indexAreaCodes" :key="key">
                        <IndexAnchor :index="key">{{ key }}</IndexAnchor>
                        <Cell
                            v-for="(areaCode, cindex) in areaCodes"
                            :key="cindex"
                            :value="`${areaCode.name} +${areaCode.code}`"
                            @click="chooseAreaCode(areaCode)"
                        />
                    </div>
                </IndexBar>
            </template>

            <div v-if="isSearch" class="area-searches">
                <Cell
                    v-for="(areaCode, index) in searchAreaCodes"
                    :key="index"
                    :value="`${areaCode.name} +${areaCode.code}`"
                    @click="chooseAreaCode(areaCode)"
                />
            </div>
        </div>
    </div>
</template>

<style src="./area-modal.less" lang="less" scoped />

<script src="./area-modal.ts" />
