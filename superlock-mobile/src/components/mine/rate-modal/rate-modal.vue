<template>
    <Modal class="rate-modal" v-model="isShow" :closeable="false" @close="handleModalClose">
        <template slot="header">
            <h2>下级默认设置</h2>
        </template>

        <ul class="rate-forms">
            <li v-for="(defaultRateForm, index) in defaultRateForms" :key="index">
                <Field v-if="defaultRateForm.type === 1" :label="`${defaultRateForm.length}${unitTypes[defaultRateForm.unit - 1]}锁仓利率`">
                    <template slot="input">
                        <div class="rate-input">
                            <div class="scb-input small">
                                <input type="text" v-model="defaultRateForm.value" :placeholder="`<=${defaultRateForm.max}%`" />
                                <span>%</span>
                            </div>
                        </div>
                        <p class="rate-prompt">最大设置利率：{{ `${defaultRateForm.max}%` }}</p>
                    </template>
                </Field>
                <Field v-if="defaultRateForm.type === 2" :label="`推广解锁利率`">
                    <template slot="input">
                        <div class="rate-input">
                            <div class="scb-input small">
                                <input type="text" v-model="defaultRateForm.value" :placeholder="`<=${defaultRateForm.max}%`" />
                                <span>%</span>
                            </div>
                        </div>
                        <p class="rate-prompt">最大设置利率：{{ `${defaultRateForm.max}%` }}</p>
                    </template>
                </Field>
            </li>
        </ul>

        <p v-if="defaultRateStats && !defaultRateStats.existDefault">
            在这里设置的所有利率会作为您下级锁仓的默认值。如需对下级进行单独的设置，可进入“团队管理”中修改。下级的利率不能超过您当前利率，您与下级之间的利率差将会作为您个人的额外奖励。
        </p>
        <p v-else>
            重置下级默认利率，设置成功后，新发展的下级初始利率将全部使用新设置的默认利率。下级的默认利率不能大于您个人的当前利率。
        </p>

        <template slot="footer">
            <Button class="effect-shadow" type="default" round @click="cancel">取消</Button>
            <Button class="effect-shadow" type="primary" round @click="submit">确认</Button>
        </template>
    </Modal>
</template>

<style src="./rate-modal.less" lang="less" scoped />

<script src="./rate-modal.ts" />
