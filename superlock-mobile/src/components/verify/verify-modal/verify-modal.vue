<template>
    <Modal class="verify-modal" v-model="isShow" @close="handleModalClose">
        <Tabs v-model="activeTab" :border="false" animated swipeable @change="handleTabsChange">
            <Tab title="短信验证" :disabled="smsFlag === 0">
                <h2>您的手机号：{{ ['+' + areaCode, mobile].join(',') }}</h2>
                <Field class="code" v-model="code" clearable placeholder="请输入短信验证码">
                    <template slot="button">
                        <VerifyCode :verify-type="2" :area-code="areaCode" :mobile="mobile" :email="email" @stop="handleVerifyCodeStop" />
                    </template>
                </Field>

                <div class="btn-container">
                    <Button class="effect-shadow" type="default" round @click="handleModalClose">取消</Button>
                    <Button class="effect-shadow" type="primary" round @click="submit">确认</Button>
                </div>
            </Tab>

            <Tab title="邮箱验证" :disabled="emailFlag === 0">
                <template v-if="email">
                    <h2>您的邮箱：{{ email }}</h2>
                    <Field class="code" v-model="code" clearable placeholder="请输入邮箱验证码">
                        <template slot="button">
                            <VerifyCode :verify-type="1" :area-code="areaCode" :mobile="mobile" :email="email" @stop="handleVerifyCodeStop" />
                        </template>
                    </Field>

                    <div class="btn-container">
                        <Button class="effect-shadow" type="default" round @click="handleModalClose">取消</Button>
                        <Button class="effect-shadow" type="primary" round @click="submit">确认</Button>
                    </div>
                </template>
                <template v-else>
                    <p>请联系客服找回密码</p>
                    <div class="btn-container">
                        <Button class="effect-shadow" type="default" round @click="handleModalClose">取消</Button>
                        <Button class="effect-shadow" type="primary" round @click="goCustomerService">确认</Button>
                    </div>
                </template>
            </Tab>
        </Tabs>
    </Modal>
</template>

<style src="./verify-modal.less" lang="less" scoped />

<script src="./verify-modal.ts" />
