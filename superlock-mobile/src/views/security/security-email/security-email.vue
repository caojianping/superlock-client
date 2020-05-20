<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="security-email scb-gray">
            <Header title="绑定邮箱" @left="$router.push(from)" />

            <div class="scb-form scb-separator">
                {{ ((userInfoObj = userInfo || {}), void 0) }}
                <ul>
                    <li>
                        <h1>绑定邮箱</h1>
                    </li>

                    <li>
                        <h2>邮箱地址</h2>
                        <Field
                            :value="emailForm.emailAddress"
                            clearable
                            placeholder="请输入邮箱地址"
                            @input="handleFieldInput('emailAddress', $event)"
                        />
                    </li>

                    <li>
                        <h2>邮箱验证码</h2>
                        <Field
                            class="code"
                            :value="emailForm.emailCode"
                            clearable
                            placeholder="请输入邮箱验证码"
                            @input="handleFieldInput('emailCode', $event)"
                        >
                            <template slot="button">
                                {{ ((phone = userInfoObj.phone || {}), void 0) }}
                                <VerifyCode :verify-type="verifyType" :area-code="phone.area" :mobile="phone.tel" :email="emailForm.emailAddress" />
                            </template>
                        </Field>
                    </li>

                    <li>
                        <Button class="effect-shadow" type="primary" block round @click="submit">确认</Button>
                    </li>
                </ul>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./security-email.less" lang="less" scoped />

<script src="./security-email.ts" />
