<template>
    <div>
        <Header></Header>

        <div>
            <Sider></Sider>
            <div class="content">
                <router-view />
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<style src="./layout.less" lang="less" scoped />

<script src="./layout.ts" />
