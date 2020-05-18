<template>
    <div class="team-child scb-gray">
        <Header title="成员设置" @left="$router.back(-1)" />

        <div v-if="child !== undefined" class="scb-separator">
            <p v-if="child === null" class="scb-none">暂时下级成员数据</p>
            <div v-else>
                <CellGroup>
                    <Cell title="UID">
                        <p class="scb-copy" id="uid" :data-clipboard-text="child.uid">
                            <span>{{ child.uid }}</span>
                            <i class="icon icon-copy" />
                        </p>
                    </Cell>
                    <Cell title="下级备注" is-link :value="child.nickName || ''" @click="openRemarkModal" />
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

                <p>
                    在这里你可以设置下级的锁仓利率与推广锁仓利率。给下级设置的利率值不能高于你当前的利率值。你与下级之间的利率差将都归于你个人所有。
                </p>
            </div>
        </div>

        <Modal class="remark-modal" v-model="isRemarkShow">
            <template slot="header">
                <h2>下级备注设置</h2>
                <p>备注好下级，才能更容易区分团队成员</p>
            </template>

            <div class="scb-input">
                <input type="text" v-model="remark" placeholder="请输入下级备注" />
            </div>

            <template slot="footer">
                <Button class="effect-shadow" type="default" round @click="cancelRemark">取消</Button>
                <Button class="effect-shadow" type="primary" round @click="submitRemark">确认</Button>
            </template>
        </Modal>

        <Modal v-if="currentForm" class="rate-modal" v-model="isRateShow">
            <template slot="header">
                <h2 v-if="currentForm.type === 1">
                    {{ currentForm.length + unitTypes[currentForm.unit - 1] + rateTypes[currentForm.type - 1] }}设置
                </h2>
                <h2 v-else>{{ rateTypes[currentForm.type - 1] }}设置</h2>
                <p class="align-left">
                    设置下级的锁仓利率，下级的锁仓利率不能高于你的利率。且本次设置的利率不能低于上次设置的利率。
                </p>
            </template>

            <template>
                <div class="scb-input">
                    <input type="text" v-model="currentForm.value" />
                    <span>%</span>
                </div>
                <p class="rate-prompt">可设置范围：{{ `${currentForm.minAmount}% ~ ${currentForm.maxAmount}%` }}</p>
            </template>

            <template slot="footer">
                <Button class="effect-shadow" type="default" round @click="cancelRate">取消</Button>
                <Button class="effect-shadow" type="primary" round @click="submitRate">确认</Button>
            </template>
        </Modal>
    </div>
</template>

<style src="./team-child.less" lang="less" scoped />

<script src="./team-child.ts" />
