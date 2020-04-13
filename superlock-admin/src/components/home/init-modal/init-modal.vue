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
                        label="初始锁仓总额(DC)"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input-number
                            :value="initInfoForm.initialTotalLock"
                            :min="0"
                            placeholder="请输入初始锁仓总额(DC)"
                            @change="
                                handleFormChange('initialTotalLock', $event)
                            "
                            @keyup.enter="submit(false)"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item
                        label="初始注册用户(人)"
                        :label-col="{ span: 8 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <ant-input-number
                            :value="initInfoForm.initialRegisteredUser"
                            :min="0"
                            :precision="0"
                            placeholder="请输入初始注册用户(人)"
                            @change="
                                handleFormChange(
                                    'initialRegisteredUser',
                                    $event
                                )
                            "
                            @keyup.enter="submit(false)"
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

<style src="./init-modal.less" lang="less" scoped />

<script src="./init-modal.ts" />
