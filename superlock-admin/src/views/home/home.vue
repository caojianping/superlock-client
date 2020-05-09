<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>
                <router-link to="/home">首页</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">今日数据</h2>
            </header>
            <div class="sl-block-body">
                <ul class="panel-list panel-today">
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>今日新增锁仓</h3>
                            {{ ((todayData = home.today || {}), void 0) }}
                            <table class="w80">
                                <tr>
                                    <td>{{ todayData.lockCount || 0 }}</td>
                                    <td>
                                        {{ (todayData.lockTotalAmount || 0) | digitPrecision(2) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>锁仓笔数(笔)</td>
                                    <td>锁仓总额(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>今日新增贷款</h3>
                            <table>
                                <tr>
                                    <td>{{ todayData.loanCount || 0 }}</td>
                                    <td>
                                        {{ (todayData.loanTotalAmount || 0) | digitPrecision(2) }}
                                    </td>
                                    <td>
                                        {{ (todayData.mortgageTotalAmount || 0) | digitPrecision(2) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>贷款笔数(笔)</td>
                                    <td>贷款总额(DC)</td>
                                    <td>抵押总额(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>昨日累计支出</h3>
                            <table>
                                <tr>
                                    <td>
                                        {{ todayData.totalExpenditure || 0 }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>锁仓总额(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">
                    数据总计
                    <!-- <span class="setting" @click="openModal('isInitShow')"><i />初始化设置</span> -->
                    <span class="setting" @click="openModal('isVirtualShow', 1)"><i />锁仓虚拟数据设置</span>
                    <span class="setting" @click="openModal('isVirtualShow', 2)"><i />注册虚拟数据设置</span>
                </h2>
            </header>
            <div class="sl-block-body">
                <ul class="panel-list panel-total">
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>累计锁仓</h3>
                            {{ ((totalData = home.all || {}), void 0) }}
                            <table class="w80">
                                <tr>
                                    <td>{{ totalData.lockCount || 0 }}</td>
                                    <td>
                                        {{ (totalData.lockTotalAmount || 0) | digitPrecision(2) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>锁仓笔数(笔)</td>
                                    <td>锁仓总额(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>实际锁仓</h3>
                            <table>
                                <tr>
                                    <td>{{ totalData.lockCount || 0 }}</td>
                                    <td>
                                        {{ (home.rel_lockTotal_bcb_Amount || 0) | digitPrecision(2) }}
                                    </td>
                                    <td>
                                        {{ (home.rel_lockTotal_dc_Amount || 0) | digitPrecision(2) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>锁仓笔数(笔)</td>
                                    <td>锁仓总量(BCB)</td>
                                    <td>锁仓总价值(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>累计贷款</h3>
                            <table>
                                <tr>
                                    <td>{{ totalData.loanCount || 0 }}</td>
                                    <td>
                                        {{ (totalData.loanTotalAmount || 0) | digitPrecision(2) }}
                                    </td>
                                    <td>
                                        {{ (totalData.mortgageTotalAmount || 0) | digitPrecision(2) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>贷款笔数(笔)</td>
                                    <td>贷款总额(DC)</td>
                                    <td>抵押总额(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>

                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>累计注册用户</h3>
                            <table>
                                <tr>
                                    <td>
                                        {{ home.registerAllCount || 0 }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>注册用户(人)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>实际注册用户</h3>
                            <table>
                                <tr>
                                    <td>
                                        {{ home.rel_registerAllCount || 0 }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>注册用户(人)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>累计支出</h3>
                            <table>
                                <tr>
                                    <td>
                                        {{ totalData.totalExpenditure || 0 }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>锁仓总额(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <InitModal v-model="isInitShow" @submit="handleModalSubmit" />

        <VirtualModal v-model="isVirtualShow" :type="type" @submit="handleModalSubmit" />
    </div>
</template>

<style src="./home.less" lang="less" scoped />

<script src="./home.ts" />
