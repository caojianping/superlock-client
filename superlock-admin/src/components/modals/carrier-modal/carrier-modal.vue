<template>
    <ant-modal v-model="isShow" :title="title" :width="600" :footer="null" @cancel="handleModalCancel">
        <div v-if="operationType === 1">
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="运营商名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="text"
                            :value="carrierForm.carrierName"
                            allowClear
                            placeholder="请输入运营商名称"
                            @change="handleFormChange('carrierName', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="国家、地区" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-select
                            :value="carrierForm.areaCode"
                            :options="areaCodeOptions"
                            showSearch
                            allowClear
                            placeholder="请选择国家、地区"
                            @change="handleFormChange('areaCode', $event)"
                            @search="handleFormChange('areaCode', $event)"
                            :filterOption="areaCodeFilterOption"
                        ></ant-select>
                    </ant-form-item>
                </ant-col>
            </ant-row>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="text"
                            :value="carrierForm.mobile"
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
                    <ant-form-item label="邮箱" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="text"
                            :value="carrierForm.email"
                            allowClear
                            placeholder="请输入邮箱"
                            @change="handleFormChange('email', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="登录密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="password"
                            :value="carrierForm.loginPwd"
                            allowClear
                            placeholder="8-15位大小写字母、数字、特殊字符任意两种组成"
                            @change="handleFormChange('loginPwd', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="返点比例(%)" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input-number
                            :value="carrierForm.rebateRatio"
                            :min="0"
                            :max="100"
                            :precision="2"
                            placeholder="请输入返点比例(%)"
                            @change="handleFormChange('rebateRatio', $event)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="结算周期" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-radio-group :value="currentCycle" @change="handleRadioChange">
                            <ant-radio v-for="(cycle, index) in cycleOptions" :key="index" :value="cycle.value">{{ cycle.label }}</ant-radio>
                        </ant-radio-group>
                    </ant-form-item>
                </ant-col>
            </ant-row>
        </div>

        <div v-else-if="operationType === 2">
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="运营商ID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input type="text" :value="carrier ? carrier.carrierId : ''" disabled />
                    </ant-form-item>
                </ant-col>
            </ant-row>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="运营商名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input type="text" :value="carrier ? carrier.carrierName : ''" disabled />
                    </ant-form-item>
                </ant-col>
            </ant-row>
            <ant-row :gutter="24" v-if="formType !== 5">
                <ant-col :span="22">
                    <ant-form-item label="手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input type="text" :value="carrier ? [carrier.areaCode, carrier.mobileNumber].join(',') : ''" disabled />
                    </ant-form-item>
                </ant-col>
            </ant-row>
            <ant-row :gutter="24" v-if="formType === 5">
                <ant-col :span="22">
                    <ant-form-item label="原邮箱地址" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input type="text" :value="carrier ? carrier.email : ''" disabled />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <template v-if="formType === 2">
                <ant-row :gutter="24">
                    <ant-col :span="22">
                        <ant-form-item label="密码重置" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="password"
                                :value="carrierForm.loginPwd"
                                allowClear
                                placeholder="8-15位大小写字母、数字、特殊字符任意两种组成"
                                @change="handleFormChange('loginPwd', $event.target.value)"
                                @keyup.enter="submit"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>
            </template>

            <template v-else-if="formType === 3">
                <ant-row :gutter="24">
                    <ant-col :span="22">
                        <ant-form-item label="国家、地区" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-select
                                :value="carrierForm.areaCode"
                                :options="areaCodeOptions"
                                showSearch
                                allowClear
                                placeholder="请选择国家、地区"
                                @change="handleFormChange('areaCode', $event)"
                                @search="handleFormChange('areaCode', $event)"
                                :filterOption="areaCodeFilterOption"
                            ></ant-select>
                        </ant-form-item>
                    </ant-col>
                </ant-row>
                <ant-row :gutter="24">
                    <ant-col :span="22">
                        <ant-form-item label="新手机号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="carrierForm.mobile"
                                allowClear
                                placeholder="请输入新手机号"
                                @change="handleFormChange('mobile', $event.target.value)"
                                @keyup.enter="submit"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>
                <ant-row :gutter="24">
                    <ant-col :span="22">
                        <ant-form-item label="新登录密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="password"
                                :value="carrierForm.loginPwd"
                                allowClear
                                placeholder="8-15位大小写字母、数字、特殊字符任意两种组成"
                                @change="handleFormChange('loginPwd', $event.target.value)"
                                @keyup.enter="submit"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>
            </template>

            <template v-else-if="formType === 4">
                <ant-row :gutter="24">
                    <ant-col :span="22">
                        <ant-form-item label="返点比例(%)" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input-number
                                :value="carrierForm.rebateRatio"
                                :min="0"
                                :max="100"
                                :precision="2"
                                placeholder="请输入返点比例(%)"
                                @change="handleFormChange('rebateRatio', $event)"
                                @keyup.enter="submit"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>
                <ant-row :gutter="24">
                    <ant-col :span="22">
                        <ant-form-item label="结算周期" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-radio-group :value="currentCycle" @change="handleRadioChange">
                                <ant-radio v-for="(cycle, index) in cycleOptions" :key="index" :value="cycle.value">{{ cycle.label }}</ant-radio>
                            </ant-radio-group>
                        </ant-form-item>
                    </ant-col>
                </ant-row>
            </template>

            <template v-else-if="formType === 5">
                <ant-row :gutter="24">
                    <ant-col :span="22">
                        <ant-form-item label="新邮箱地址" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="text"
                                :value="carrierForm.email"
                                allowClear
                                placeholder="请输入新邮箱地址"
                                @change="handleFormChange('email', $event.target.value)"
                                @keyup.enter="submit"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>
                <ant-row :gutter="24">
                    <ant-col :span="22">
                        <ant-form-item label="新登录密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                            <ant-input
                                type="password"
                                :value="carrierForm.loginPwd"
                                allowClear
                                placeholder="8-15位大小写字母、数字、特殊字符任意两种组成"
                                @change="handleFormChange('loginPwd', $event.target.value)"
                                @keyup.enter="submit"
                            />
                        </ant-form-item>
                    </ant-col>
                </ant-row>
            </template>
        </div>

        <ant-row :gutter="24">
            <ant-button class="sl-submit" type="primary" @click="submit">保存</ant-button>
        </ant-row>
    </ant-modal>
</template>

<style src="./carrier-modal.less" lang="less" scoped />

<script src="./carrier-modal.ts" />
