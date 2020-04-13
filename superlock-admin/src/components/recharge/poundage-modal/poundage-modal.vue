<template>
    <ant-modal
        v-model="isShow"
        :title="title"
        :width="600"
        :footer="null"
        @cancel="handleModalCancel"
    >
        <div>
            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item
                        label="交易币种"
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 18 }"
                    >
                        <ant-input
                            type="text"
                            :value="rechargePoundage.tokenType"
                            allowClear
                            disabled
                            placeholder="请输入交易币种"
                            @change="
                                handleFormChange(
                                    'tokenType',
                                    $event.target.value
                                )
                            "
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item
                        label="交易类型"
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 18 }"
                    >
                        <ant-input
                            type="text"
                            :value="rechargePoundage.type"
                            allowClear
                            :disabled="type === 2"
                            placeholder="请输入交易类型"
                            @change="
                                handleFormChange('type', $event.target.value)
                            "
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item
                        label="手续费币种"
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 18 }"
                    >
                        <ant-input
                            type="text"
                            :value="rechargePoundage.feeToken"
                            allowClear
                            :disabled="type === 2"
                            placeholder="请输入手续费币种"
                            @change="
                                handleFormChange(
                                    'feeToken',
                                    $event.target.value
                                )
                            "
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item
                        label="手续费比例(%)"
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 18 }"
                    >
                        <ant-input-number
                            :value="rechargePoundage.chargeRate"
                            :min="0"
                            :max="100"
                            :precision="2"
                            placeholder="请输入手续费比例(%)"
                            @change="handleFormChange('chargeRate', $event)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-button class="sl-submit" type="primary" @click="submit"
                    >保存</ant-button
                >
            </ant-row>
        </div>
    </ant-modal>
</template>

<style src="./poundage-modal.less" lang="less" scoped />

<script src="./poundage-modal.ts" />
