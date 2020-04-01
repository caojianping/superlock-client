<template>
    <Modal
        class="rate-modal"
        v-model="isShow"
        :closeable="false"
        @close="handleModalClose"
    >
        <template slot="title">
            <h2>下级默认设置</h2>
        </template>
        <ul class="rate-forms">
            <li v-for="(rateForm, index) in rateForms" :key="index">
                <Field
                    v-if="rateForm.type === 1"
                    type="number"
                    v-model="rateForm.value"
                    :label="
                        `${rateForm.length}${units[rateForm.unit]}锁仓利率`
                    "
                    clearable
                    :placeholder="`<${rateForm.max}%`"
                />
                <Field
                    v-if="rateForm.type === 2"
                    type="number"
                    v-model="rateForm.value"
                    label="推广解锁利率"
                    clearable
                    :placeholder="`<${rateForm.max}%`"
                />
            </li>
            <li
                v-if="teamRateInfo && !teamRateInfo.existDefault"
                class="rate-prompt"
            >
                在这里设置的所有利率会作为您下级锁仓的默认值。如需对下级进行单独的设置，可进入“团队管理”中修改。下级的利率不能超过您当前利率，您与下级之间的利率差将会作为您个人的额外奖励。
            </li>
            <li v-else class="rate-prompt">
                重置下级默认利率，设置成功后，新发展的下级初始利率将全部使用新设置的默认利率。下级的默认利率不能大于您个人的当前利率。
            </li>
            <li>
                <Button class="effect-shadow" round @click="cancel"
                    >取消</Button
                >
                <Button
                    class="effect-shadow"
                    type="primary"
                    round
                    @click="submit"
                    >确认</Button
                >
            </li>
        </ul>
    </Modal>
</template>

<style src="./rate-modal.less" lang="less" scoped />

<script src="./rate-modal.ts" />
