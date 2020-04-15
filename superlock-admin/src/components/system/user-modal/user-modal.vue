<template>
    <ant-modal v-model="isShow" :title="title" :width="600" :footer="null" @cancel="handleModalCancel">
        <div>
            <ant-row v-if="type === 2" :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="ID" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input type="text" :value="user ? user.id : ''" allowClear disabled />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="用户名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="text"
                            :value="userForm.name"
                            allowClear
                            :disabled="type === 2"
                            placeholder="请输入用户名"
                            @change="handleFormChange('name', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row v-if="type === 1" :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="初始密码" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="password"
                            :value="userForm.password"
                            allowClear
                            placeholder="8-15位大小写字母、数字、特殊字符任意两种组成"
                            @change="handleFormChange('password', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="UKEY编号" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-input
                            type="text"
                            :value="userForm.uKey"
                            allowClear
                            placeholder="请输入UKEY编号"
                            @change="handleFormChange('uKey', $event.target.value)"
                            @keyup.enter="submit"
                        />
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-col :span="22">
                    <ant-form-item label="用户角色" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                        <ant-select
                            :value="userForm.roleId"
                            :options="roleOptions"
                            allowClear
                            placeholder="请选择用户角色"
                            @change="handleFormChange('roleId', $event)"
                        ></ant-select>
                    </ant-form-item>
                </ant-col>
            </ant-row>

            <ant-row :gutter="24">
                <ant-button class="sl-submit" type="primary" @click="submit">保存</ant-button>
            </ant-row>
        </div>
    </ant-modal>
</template>

<style src="./user-modal.less" lang="less" scoped />

<script src="./user-modal.ts" />
