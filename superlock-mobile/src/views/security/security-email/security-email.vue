<template>
    <PullRefresh v-model="isPulling" @refresh="refreshData">
        <div class="security-email scb-gray">
            <Header :title="$t('SECURITY.BIND_EMAIL')" @left="$router.push(from)" />

            <div class="scb-form scb-separator">
                {{ ((userInfoObj = userInfo || {}), void 0) }}
                <ul>
                    <li>
                        <h1>{{ $t('SECURITY.BIND_EMAIL') }}</h1>
                    </li>

                    <li>
                        <h2>{{ $t('SECURITY.EMAIL_ADDRESS') }}</h2>
                        <Field
                            :value="emailForm.emailAddress"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_EMAIL_ADDRESS')"
                            @input="handleFieldInput('emailAddress', $event)"
                        />
                    </li>

                    <li>
                        <h2>{{ $t('SECURITY.EMAIL_CODE') }}</h2>
                        <Field
                            class="code"
                            :value="emailForm.emailCode"
                            clearable
                            :placeholder="$t('PLACEHOLDERS.ENTER_EMAIL_CODE')"
                            @input="handleFieldInput('emailCode', $event)"
                        >
                            <template slot="button">
                                {{ ((phone = userInfoObj.phone || {}), void 0) }}
                                <VerifyCode :verify-type="verifyType" :area-code="phone.area" :mobile="phone.tel" :email="emailForm.emailAddress" />
                            </template>
                        </Field>
                    </li>

                    <li>
                        <Button class="effect-shadow" type="primary" block round @click="submit">{{ $t('COMMON.CONFIRM') }}</Button>
                    </li>
                </ul>
            </div>
        </div>
    </PullRefresh>
</template>

<style src="./security-email.less" lang="less" scoped />

<script src="./security-email.ts" />
