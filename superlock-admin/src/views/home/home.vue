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
                            {{ ((todayData = homeData.today || {}), void 0) }}
                            <table>
                                <tr>
                                    <td>{{ todayData.lockCount || 0 }}</td>
                                    <td>
                                        {{ (todayData.lockTotalAmount || 0) | digitPrecision }}
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
                                        {{ (todayData.loanTotalAmount || 0) | digitPrecision }}
                                    </td>
                                    <td>
                                        {{ (todayData.mortgageTotalAmount || 0) | digitPrecision }}
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
                    <i class="setting" @click="openInitModal"></i>
                </h2>
            </header>
            <div class="sl-block-body">
                <ul class="panel-list panel-total">
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>累计锁仓</h3>
                            {{ ((totalData = homeData.all || {}), void 0) }}
                            <table>
                                <tr>
                                    <td>{{ totalData.lockCount || 0 }}</td>
                                    <td>
                                        {{ (totalData.lockTotalAmount || 0) | digitPrecision }}
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
                            <h3>累计贷款</h3>
                            <table>
                                <tr>
                                    <td>{{ totalData.loanCount || 0 }}</td>
                                    <td>
                                        {{ (totalData.loanTotalAmount || 0) | digitPrecision }}
                                    </td>
                                    <td>
                                        {{ (totalData.mortgageTotalAmount || 0) | digitPrecision }}
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
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>累计注册用户</h3>
                            <table>
                                <tr>
                                    <td>
                                        {{ homeData.registerAllCount || 0 }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>注册用户(人)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <InitModal v-model="isShow" title="初始数据设置" :init-info="initInfoForm" @submit="handleInitSubmit" />

        <SecondVerify v-model="isSecondVerifyShow" title="谷歌验证码" @submit="handleSecondVerifySubmit" />
    </div>
</template>

<style src="./home.less" lang="less" scoped />

<script src="./home.ts" />
