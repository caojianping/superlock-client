<template>
    <ant-modal v-model="isShow" :title="title" :width="600" :footer="null" @cancel="handleModalCancel">
        <div>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="国家" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-select
                            :value="brokerForm.areaCode"
                            :options="areaCodeOptions"
                            showSearch
                            allowClear
                            placeholder="请选择国家区号"
                            @change="handleFormChange('areaCode', $event)"
                            :filterOption="filterAreaCodes"
                        ></ant-select>
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="text"
                            :value="brokerForm.mobile"
                            allowClear
                            placeholder="请输入手机号"
                            @change="handleFormChange('mobile', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="代理额度(DC)" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input-number
                            :value="brokerForm.totalDegree"
                            :min="0"
                            placeholder="请输入代理额度(DC)"
                            @change="handleFormChange('totalDegree', $event)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="初始密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="password"
                            :value="brokerForm.password"
                            allowClear
                            placeholder="8-15位大小写字母、数字、特殊字符任意两种组成"
                            @change="handleFormChange('password', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-button class="sl-submit" type="primary" @click="submit">保存</ant-button>
            </ant-row>
        </div>
    </ant-modal>
</template>

<style src="./broker-modal.less" lang="less" scoped />

<script src="./broker-modal.ts" />
