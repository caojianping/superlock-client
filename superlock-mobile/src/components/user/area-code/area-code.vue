<template>
    <div class="area-code">
        <div class="area-code-selected" @click="openPopup">
            <span>{{ `+${areaCode.code} ${areaCode.name}` }}</span>
            <i></i>
        </div>

        <Popup v-model="isShow" class="area-code-popup full">
            <header class="area-code-header">
                <Header title="国家和地区" isRight @left="handlePopupClose">
                    <Icon slot="right" name="close" @click="handlePopupClose" />
                </Header>

                <Search
                    class="area-code-search"
                    v-model="keyword"
                    placeholder="国家/地区"
                    shape="round"
                    background="white"
                    @input="handleSearchInput"
                    @clear="handleSearchClear"
                />
            </header>

            <div class="area-code-body">
                <template v-if="!isSearch">
                    <div class="area-code-hots">
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

                <div v-if="isSearch" class="area-code-searches">
                    <Cell
                        v-for="(areaCode, index) in searchAreaCodes"
                        :key="index"
                        :value="`${areaCode.name} +${areaCode.code}`"
                        @click="chooseAreaCode(areaCode)"
                    />
                </div>
            </div>
        </Popup>
    </div>
</template>

<style src="./area-code.less" lang="less" scoped />

<script src="./area-code.ts" />
