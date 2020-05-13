<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>锁仓管理</ant-breadcrumb-item>
            <ant-breadcrumb-item>
                <router-link to="/lock/create">锁仓创建</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-form">
            <header class="sl-form-header">
                <h1 class="sl-form-title">锁仓创建</h1>
            </header>
            <div class="sl-form-body">
                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="项目名称" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input
                                type="text"
                                :value="projectForm.memo"
                                allowClear
                                placeholder="请输入项目名称"
                                @change="handleFormChange('memo', $event.target.value)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="项目周期(天)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number
                                :value="projectForm.length"
                                :min="0"
                                allowClear
                                placeholder="请输入项目周期(天)"
                                @change="handleFormChange('length', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col class="sl-tip" :span="6">填写锁仓天数</ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="项目总额度(DC)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number
                                :value="projectForm.quota"
                                :min="0"
                                :precision="6"
                                placeholder="请输入项目总额度(DC)"
                                @change="handleFormChange('quota', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="锁仓利率(%)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number
                                :value="projectForm.rate"
                                :min="0"
                                :max="100"
                                :precision="2"
                                placeholder="请输入锁仓利率(%)"
                                @change="handleFormChange('rate', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col class="sl-tip" :span="6">最高锁仓利率</ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-col :span="18">
                        <ant-form-item label="直推奖励利率(%)" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
                            <ant-input-number
                                :value="projectForm.pushRate"
                                :min="0"
                                :max="100"
                                :precision="2"
                                placeholder="请输入直推奖励利率(%)"
                                @change="handleFormChange('pushRate', $event)"
                                @keyup.enter="submit(false)"
                            />
                        </ant-form-item>
                    </ant-col>
                    <ant-col class="sl-tip" :span="6">根据项目周期设置直推奖励</ant-col>
                </ant-row>

                <ant-row :gutter="24">
                    <ant-button class="sl-submit" type="primary" @click="submit(false)">创建</ant-button>
                </ant-row>
            </div>
        </div>

        <SecondVerify :is-show="isSecondVerifyShow" @submit="submit(true)" />
    </div>
</template>

<style src="./lock-create.less" lang="less" scoped />

<script src="./lock-create.ts" />
