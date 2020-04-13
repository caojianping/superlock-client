<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>贷款管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/loan/setting">贷款设置</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-form">
            <header class="sl-form-header">
                <h1 class="sl-form-title">贷款设置</h1>
            </header>
            <div class="sl-form-body">
                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item
                            label="贷款利率"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                        >
                            <ant-input-number
                                :value="''"
                                :min="0"
                                placeholder="请输入贷款利率"
                                @change="handleFormChange('', $event)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item
                            label="最大贷款数量"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                        >
                            <ant-input-number
                                :value="''"
                                :min="0"
                                placeholder="请输入最大贷款数量"
                                @change="handleFormChange('', $event)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item
                            label="可贷周期"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                        >
                            <ant-input-number
                                :value="''"
                                :min="0"
                                placeholder="请输入可贷周期"
                                @change="handleFormChange('', $event)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item
                            label="贷款时长"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                        >
                            <ant-input-number
                                :value="''"
                                :min="0"
                                placeholder="请输入贷款时长"
                                @change="handleFormChange('', $event)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item
                            label="最低抵押锁仓数量"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                        >
                            <ant-input-number
                                :value="''"
                                :min="0"
                                placeholder="请输入最低抵押锁仓数量"
                                @change="handleFormChange('', $event)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item
                            label="贷款"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                        >
                            <ant-input-number
                                :value="''"
                                :min="0"
                                placeholder="请输入贷款"
                                @change="handleFormChange('', $event)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-button
                        class="sl-submit"
                        type="primary"
                        @click="save"
                        >确定</ant-button
                    >
                </ant-row>
            </div>
        </div>
    </div>
</template>

<style src="./loan-setting.less" lang="less" scoped />

<script src="./loan-setting.ts" />
