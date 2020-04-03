<template>
    <div class="team-child scb-gray">
        <Header title="成员设置" @left="$router.back(-1)" />

        <CellGroup class="separator">
            <Cell title="UID">
                <p
                    id="uid"
                    class="child-uid"
                    :data-clipboard-text="child.uid || ''"
                >
                    <span>{{ child.uid || '' }}</span>
                    <i class="icon icon-copy" />
                </p>
            </Cell>
            <Cell
                title="下级备注"
                is-link
                :value="child.nickName || ''"
                @click="openRemarkModal"
            />
            <Cell
                v-for="(childRateForm, index) in childRateForms"
                :key="index"
                is-link
                :value="childRateForm.showValue + childRateForm.suffix"
                @click="openRateModal(index)"
            >
                <p slot="title" v-if="childRateForm.type === 1">
                    {{
                        childRateForm.length +
                            units[childRateForm.unit - 1] +
                            rateTypes[childRateForm.type - 1]
                    }}
                </p>
                <p slot="title" v-else>
                    {{ rateTypes[childRateForm.type - 1] }}
                </p>
            </Cell>
        </CellGroup>

        <p>
            在这里你可以设置下级的锁仓利率与推广锁仓利率。给下级设置的利率值不能高于你当前的利率值。你与下级之间的利率差将都归于你个人所有。
        </p>

        <Modal class="remark-modal" v-model="isRemarkShow">
            <template slot="title">
                <h2>下级备注设置</h2>
                <p>备注好下级，才能更容易区分团队成员</p>
            </template>
            <ul>
                <li>
                    <div class="scb-input">
                        <input
                            type="text"
                            v-model="remark"
                            placeholder="请输入下级备注"
                        />
                    </div>
                </li>
                <li>
                    <Button
                        class="effect-shadow"
                        type="default"
                        round
                        @click="cancelRemark"
                        >取消</Button
                    >
                    <Button
                        class="effect-shadow"
                        type="primary"
                        round
                        @click="submitRemark"
                        >确认</Button
                    >
                </li>
            </ul>
        </Modal>

        <Modal class="rate-modal" v-model="isRateShow">
            <template v-if="currentForm" slot="title">
                <h2>{{ rateTypes[currentForm.type] }}设置</h2>
                <p>
                    设置下级的锁仓利率，下级的锁仓利率不能高于你的利率。且本次设置的利率不能低于上次设置的利率。
                </p>
            </template>
            <ul v-if="currentForm">
                <li>
                    <div class="scb-input">
                        <input type="text" v-model="currentForm.value" />
                        <span>%</span>
                    </div>
                    <p>
                        可设置范围：{{
                            `${currentForm.minAmount}%-${currentForm.maxAmount}%`
                        }}
                    </p>
                </li>
                <li>
                    <Button
                        class="effect-shadow"
                        type="default"
                        round
                        @click="cancelRate"
                        >取消</Button
                    >
                    <Button
                        class="effect-shadow"
                        type="primary"
                        round
                        @click="submitRate"
                        >确认</Button
                    >
                </li>
            </ul>
        </Modal>
    </div>
</template>

<style src="./team-child.less" lang="less" scoped />

<script src="./team-child.ts" />
