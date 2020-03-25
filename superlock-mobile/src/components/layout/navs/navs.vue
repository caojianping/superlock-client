<template>
    <ul class="navs flex">
        <li class="nav-item" v-for="(route, index) in routes" :key="index">
            <a
                class="nav-link effect-ripple"
                :class="{ active: activePath === route.path }"
                @click="goPage(route.path)"
            >
                <i :class="['nav-icon', `nav-icon-${route.icon}`]" />
                <p class="nav-title">{{ route.title }}</p>
            </a>
        </li>
    </ul>
</template>

<style src="./navs.less" lang="less" scoped />

<script src="./navs.ts" />
