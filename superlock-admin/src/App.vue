<template>
    <ant-locale-provider :locale="locale">
        <div id="app" v-cloak style="height: 100%">
            <ant-spin class="sl-spin" :spinning="isFullLoading" tip="加载中...">
                <router-view />
            </ant-spin>
        </div>
    </ant-locale-provider>
</template>

<script src="./App.ts" />
