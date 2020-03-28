<template>
    <ul class="navs flex">
        <li class="nav-item" v-for="(route, index) in routes" :key="index">
            <a
                class="nav-link effect-ripple"
                :class="{ active: activePath === route.path }"
                @click="goPage(route.path)"
            >
                <i
                    :class="[
                        'icon',
                        `icon-${route.icon}`,
                        { active: activePath === route.path }
                    ]"
                />
                <p class="nav-title">{{ route.title }}</p>
            </a>
        </li>
    </ul>
</template>

<style src="./navs.less" lang="less" scoped />

<script src="./navs.ts" />
