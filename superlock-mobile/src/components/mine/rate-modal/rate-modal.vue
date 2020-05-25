<template>
    <Modal class="rate-modal" v-model="isShow" :closeable="false" @close="handleModalClose">
        <template slot="header">
            <h2>{{ $t('MINE.CHILD_DEFAULT_SETTING') }}</h2>
        </template>

        <ul class="rate-forms">
            <li v-for="(defaultRateForm, index) in defaultRateForms" :key="index">
                <Field v-if="defaultRateForm.type === 1">
                    <p slot="label" class="flex-middle">
                        <span>{{ `${defaultRateForm.length}${unitTypes[defaultRateForm.unit - 1]}${$t('MINE.LOCK_RATE')}` }}</span>
                    </p>
                    <template slot="input">
                        <div class="rate-input">
                            <div class="scb-input small">
                                <input type="text" v-model="defaultRateForm.value" :placeholder="`<=${defaultRateForm.max}%`" />
                                <span>%</span>
                            </div>
                        </div>
                        <p class="rate-prompt">{{ $t('MINE.MAX_SETTING_RATE') }}：{{ `${defaultRateForm.max}%` }}</p>
                    </template>
                </Field>
                <Field v-if="defaultRateForm.type === 2">
                    <p slot="label" class="flex-middle">
                        <span>{{ $t('MINE.PROMOTE_UNLOCK_RATE') }}</span>
                    </p>
                    <template slot="input">
                        <div class="rate-input">
                            <div class="scb-input small">
                                <input type="text" v-model="defaultRateForm.value" :placeholder="`<=${defaultRateForm.max}%`" />
                                <span>%</span>
                            </div>
                        </div>
                        <p class="rate-prompt">{{ $t('MINE.MAX_SETTING_RATE') }}：{{ `${defaultRateForm.max}%` }}</p>
                    </template>
                </Field>
            </li>
        </ul>

        <p v-if="defaultRateStats && !defaultRateStats.existDefault">{{ $t('MINE.RATE_PROMPT01') }}</p>
        <p v-else>{{ $t('MINE.RATE_PROMPT02') }}</p>

        <template slot="footer">
            <Button class="effect-shadow" type="default" round @click="cancel">{{ $t('COMMON.CANCEL') }}</Button>
            <Button class="effect-shadow" type="primary" round @click="submit">{{ $t('COMMON.CONFIRM') }}</Button>
        </template>
    </Modal>
</template>

<style src="./rate-modal.less" lang="less" scoped />

<script src="./rate-modal.ts" />
