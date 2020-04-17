<template>
    <div class="sider">
        <ul class="menus">
            <li class="menu-item" v-for="(menu, index) in menus" :key="index">
                {{ ((submenus = menu.items || []), void 0) }}
                {{ ((route = menu.route ? '#' + menu.route : 'javascript: void(0)'), void 0) }}
                <a class="menu-link clearfix" :class="{ active: path.indexOf(menu.path) === 0 }" :href="route" @click="toggleMenu(menu)">
                    <i :class="['icon', `icon-${menu.icon}`, { active: path.indexOf(menu.path) === 0 }]"></i>
                    <span>{{ menu.name }}</span>
                    <ant-icon v-if="submenus.length > 0" :type="menu.toggle ? 'up' : 'down'" />
                </a>

                <ol v-if="submenus.length > 0" v-show="menu.toggle" class="submenus">
                    <li class="submenu-item" v-for="(submenu, sindex) in submenus" :key="sindex">
                        {{ ((sroute = submenu.route ? '#' + submenu.route : 'javascript: void(0)'), void 0) }}
                        <a class="submenu-link" :class="{ active: path.indexOf(submenu.route) > -1 }" :href="sroute">
                            <span>{{ submenu.name }}</span>
                        </a>
                    </li>
                </ol>
            </li>
        </ul>
    </div>
</template>

<style src="./sider.less" lang="less" scoped />

<script src="./sider.ts" />
