<template>
    <div class="team-child scb-gray">
        <Header :title="$t('TEAM.TITLE02')" @left="$router.back(-1)" />

        <div v-if="child !== undefined" class="scb-separator">
            <p v-if="child === null" class="scb-none">{{ $t('TEAM.TEAM_CHILD_NO_RECORD') }}</p>
            <div v-else>
                <CellGroup>
                    <Cell title="UID">
                        <p class="scb-copy" id="uid" :data-clipboard-text="child.uid">
                            <span>{{ child.uid }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell :title="$t('TEAM.CHILD_REMARK')" is-link :value="child.nickName || ''" @click="openRemarkModal" />
                    <Cell v-for="(childRateForm, index) in childRateForms" :key="index" is-link @click="openRateModal(index)">
                        <p slot="title" v-if="childRateForm.type === 1">
                            {{ childRateForm.length + unitTypes[childRateForm.unit - 1] + rateTypes[childRateForm.type - 1] }}
                        </p>
                        <p slot="title" v-else>
                            {{ rateTypes[childRateForm.type - 1] }}
                        </p>
                        <p>{{ childRateForm.showValue | digitPrecision }}{{ childRateForm.suffix }}</p>
                    </Cell>
                </CellGroup>

                <p>{{ $t('TEAM.CHILD_PROMPT01') }}</p>
            </div>
        </div>

        <Modal class="remark-modal" v-model="isRemarkShow">
            <template slot="header">
                <h2>{{ $t('TEAM.CHILD_REMAIRK_SETTING') }}</h2>
                <p>{{ $t('TEAM.CHILD_PROMPT02') }}</p>
            </template>

            <div class="scb-input">
                <input type="text" v-model="remark" :placeholder="$t('PLACEHOLDERS.ENTER_CHILD_REMARK')" />
            </div>

            <template slot="footer">
                <Button class="effect-shadow" type="default" round @click="cancelRemark">{{ $t('COMMON.CANCEL') }}</Button>
                <Button class="effect-shadow" type="primary" round @click="submitRemark">{{ $t('COMMON.CONFIRM') }}</Button>
            </template>
        </Modal>

        <Modal v-if="currentForm" class="rate-modal" v-model="isRateShow">
            <template slot="header">
                <h2 v-if="currentForm.type === 1">
                    {{ currentForm.length + unitTypes[currentForm.unit - 1] + rateTypes[currentForm.type - 1] }}{{ $t('COMMON.SETTING') }}
                </h2>
                <h2 v-else>{{ rateTypes[currentForm.type - 1] }}{{ $t('COMMON.SETTING') }}设置</h2>
                <p class="align-left">{{ $t('TEAM.CHILD_PROMPT03') }}</p>
            </template>

            <template>
                <div class="scb-input">
                    <input type="text" v-model="currentForm.value" />
                    <span>%</span>
                </div>
                <p class="rate-prompt">{{ $t('TEAM.SETTING_RANGE') }}：{{ `${currentForm.minAmount}% ~ ${currentForm.maxAmount}%` }}</p>
            </template>

            <template slot="footer">
                <Button class="effect-shadow" type="default" round @click="cancelRate">{{ $t('COMMON.CANCEL') }}</Button>
                <Button class="effect-shadow" type="primary" round @click="submitRate">{{ $t('COMMON.CONFIRM') }}</Button>
            </template>
        </Modal>
    </div>
</template>

<style src="./team-child.less" lang="less" scoped />

<script src="./team-child.ts" />
