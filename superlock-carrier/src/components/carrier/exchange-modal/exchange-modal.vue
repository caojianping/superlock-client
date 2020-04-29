<template>
    <ant-modal v-model="isShow" title="一键闪兑" :width="650" :footer="null" :maskClosable="stepType === 1" @cancel="handleModalCancel">
        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="闪兑币种" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" value="DC" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="目标币种" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" value="BCB" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="当前汇率" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" :value="`1 DC = ${rate || 0} BCB`" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="兑换数量" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input-number
                        :value="exchangeForm.amount"
                        :min="0"
                        :precision="6"
                        :disabled="stepType === 2"
                        :placeholder="`账户余额${exchangeForm.maxAmount || 0}DC`"
                        @change="handleFormChange('amount', $event)"
                        @keyup.enter="submit"
                    />
                </ant-form-item>
            </ant-col>
            <ant-col v-if="stepType === 1" :class="['sl-all', { disabled: stepType === 2 }]" :span="4" @click="exchangeAll">全部</ant-col>
        </ant-row>

        <ant-row :gutter="24">
            <ant-col :span="20">
                <ant-form-item label="预计兑换数量" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <ant-input type="text" :value="`${bcbAmount} BCB`" disabled />
                </ant-form-item>
            </ant-col>
        </ant-row>

        <div v-if="stepType === 1" class="exchange-prompt">
            当前汇率取值来自于当前市场的交易汇率。汇率存在实时变动的可能，实际闪兑汇率以兑换时的市场汇率取值为准。
        </div>
        <div v-else-if="stepType === 2" class="exchange-prompt countdown">
            <p>请在5分钟内确认是否闪兑。5分钟后订单将自动关闭。</p>
            <p v-html="`闪兑倒计时：<span>${text}</span>`" />
        </div>

        <ant-row :gutter="24">
            <ant-button v-if="stepType === 1" class="sl-submit" type="primary" @click="submitExchange(false)">确定</ant-button>
            <ant-button v-else-if="stepType === 2" class="sl-submit" type="primary" @click="confirmExchange">确认兑换</ant-button>
        </ant-row>

        <VerifyModal :is-show="isSecondVerifyShow" @submit="handleVerifyModalSubmit" />
    </ant-modal>
</template>

<style src="./exchange-modal.less" lang="less" scoped />

<script src="./exchange-modal.ts" />
