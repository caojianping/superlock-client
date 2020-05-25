<template>
    <Modal class="verify-modal" v-model="isShow" @close="handleModalClose">
        <Tabs v-model="activeTab" :border="false" animated swipeable @change="handleTabsChange">
            <Tab :title="$t('USER.SMS_VERIFY')" :disabled="smsFlag === 0">
                <h2>{{ $t('USER.YOUR_MOBILE') }}：{{ ['+' + areaCode, mobile].join(',') }}</h2>
                <Field class="code" v-model="code" clearable :placeholder="$t('PLACEHOLDERS.ENTER_SMS_CODE')">
                    <template slot="button">
                        <VerifyCode :verify-type="2" :area-code="areaCode" :mobile="mobile" :email="email" @stop="handleVerifyCodeStop" />
                    </template>
                </Field>

                <div class="btn-container">
                    <Button class="effect-shadow" type="default" round @click="handleModalClose">{{ $t('COMMON.CANCEL') }}</Button>
                    <Button class="effect-shadow" type="primary" round @click="submit">{{ $t('COMMON.CONFIRM') }}</Button>
                </div>
            </Tab>

            <Tab :title="$t('USER.SMS_VERIFY')" :disabled="emailFlag === 0">
                <template v-if="email">
                    <h2>{{ $t('USER.YOUR_EMAIL') }}：{{ email }}</h2>
                    <Field class="code" v-model="code" clearable :placeholder="$t('PLACEHOLDERS.ENTER_EMAIL_CODE')">
                        <template slot="button">
                            <VerifyCode :verify-type="1" :area-code="areaCode" :mobile="mobile" :email="email" @stop="handleVerifyCodeStop" />
                        </template>
                    </Field>

                    <div class="btn-container">
                        <Button class="effect-shadow" type="default" round @click="handleModalClose">{{ $t('COMMON.CANCEL') }}</Button>
                        <Button class="effect-shadow" type="primary" round @click="submit">{{ $t('COMMON.CONFIRM') }}</Button>
                    </div>
                </template>
                <template v-else>
                    <p>{{ $t('USER.CONTACT_SERVICE_FIND_PASSWORD') }}</p>
                    <div class="btn-container">
                        <Button class="effect-shadow" type="default" round @click="handleModalClose">{{ $t('COMMON.CANCEL') }}</Button>
                        <Button class="effect-shadow" type="primary" round @click="goCustomerService">{{ $t('COMMON.CONFIRM') }}</Button>
                    </div>
                </template>
            </Tab>
        </Tabs>
    </Modal>
</template>

<style src="./verify-modal.less" lang="less" scoped />

<script src="./verify-modal.ts" />
