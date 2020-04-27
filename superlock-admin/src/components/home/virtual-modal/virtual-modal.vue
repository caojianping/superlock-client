<template>
    <ant-modal v-model="isShow" :title="`${msg}虚拟数据设置`" :width="900" :footer="null" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="24">
                {{ ((initialLabel = ['初始锁仓总额(DC)', '初始注册用户(人)'][type - 1]), void 0) }}
                <ant-form-item :label="initialLabel" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
                    <ant-input-number
                        :value="virtual.initialAmount"
                        :min="0"
                        :placeholder="`请输入${initialLabel}`"
                        @change="handleFormChange('initialAmount', $event)"
                        @keyup.enter="submit(false)"
                    />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="24">
                <ant-form-item :label="`${msg}虚拟数据`" :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
                    <table class="virtual-table">
                        <thead>
                            <tr>
                                <th>{{ msg }}时间段</th>
                                <th>{{ msg }}时间间隔</th>
                                <th>{{ msg }}数据区间</th>
                                <th>
                                    <ant-button type="default" size="small" @click="addSection">添加</ant-button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(section, index) in virtual.virtualDtos || []" :key="index">
                                <td>
                                    {{ ((startTime = section.startTime), void 0) }}
                                    {{ ((endTime = section.endTime), void 0) }}
                                    <ant-time-picker
                                        :value="startTime ? moment(startTime, 'HH:mm') : undefined"
                                        format="HH:mm"
                                        placeholder="开始时间"
                                        @change="(time, timeStr) => handleSectionChange(index, 'startTime', timeStr)"
                                    />
                                    <span>至</span>
                                    <ant-time-picker
                                        :value="endTime ? moment(endTime, 'HH:mm') : undefined"
                                        format="HH:mm"
                                        placeholder="结束时间"
                                        @change="(time, timeStr) => handleSectionChange(index, 'endTime', timeStr)"
                                    />
                                </td>
                                <td>
                                    <ant-input-number
                                        :value="section.interval"
                                        :min="0"
                                        :precision="2"
                                        placeholder="时间间隔"
                                        @change="handleSectionChange(index, 'rate', $event)"
                                        @keyup.enter="submit(false)"
                                    />
                                    <span>分钟</span>
                                </td>
                                <td>
                                    <ant-input-number
                                        :value="section.minValue"
                                        :min="0"
                                        :precision="2"
                                        placeholder="最小值"
                                        @change="handleSectionChange(index, 'minValue', $event)"
                                        @keyup.enter="submit(false)"
                                    />
                                    <span>至</span>
                                    <ant-input-number
                                        :value="section.maxValue"
                                        :min="0"
                                        :precision="2"
                                        placeholder="最大值"
                                        @change="handleSectionChange(index, 'maxValue', $event)"
                                        @keyup.enter="submit(false)"
                                    />
                                </td>
                                <td>
                                    <ant-button type="danger" size="small" @click="removeSection(index)">删除</ant-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ant-form-item>
            </ant-col>
        </ant-row>
        <ant-row :gutter="24">
            <ant-button class="sl-submit" type="primary" @click="submit(false)">保存</ant-button>
        </ant-row>

        <SecondVerify :is-show="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </ant-modal>
</template>

<style src="./virtual-modal.less" lang="less" scoped />

<script src="./virtual-modal.ts" />
