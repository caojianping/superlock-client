<template>
    <div class="sl-container">
        <ant-breadcrumb class="sl-breadcrumb">
            <ant-breadcrumb-item>
                <router-link to="/home">首页</router-link>
            </ant-breadcrumb-item>
        </ant-breadcrumb>

        <div class="sl-block">
            <header class="sl-block-header">
                <h2 class="sl-block-title">数据概览</h2>
            </header>
            <div class="sl-block-body">
                <ul class="panel-list panel-total">
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>新增锁仓</h3>
                            <table>
                                <tr>
                                    <td>{{ homeData.new_lock_count || 0 }}</td>
                                    <td>
                                        {{ (homeData.new_lock_amount || 0) | digitPrecision }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>新增锁仓笔数(笔)</td>
                                    <td>新增锁仓总额(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>返点结算</h3>
                            <table>
                                <tr>
                                    <td>
                                        {{ (homeData.tb_rebate_amount || 0) | digitPrecision }}
                                    </td>
                                    <td>
                                        {{ (homeData.rebate_amount || 0) | digitPrecision }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>待结算返点(DC)</td>
                                    <td>已结算返点(DC)</td>
                                </tr>
                            </table>

                            <i></i>
                        </div>
                    </li>
                    <li class="panel-item">
                        <div class="panel-content">
                            <h3>累计锁仓</h3>
                            <table>
                                <tr>
                                    <td>
                                        {{ homeData.all_lock_count || 0 }}
                                    </td>
                                    <td>
                                        {{ (homeData.all_lock_amount || 0) | digitPrecision }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>累计锁仓笔数(笔)</td>
                                    <td>累计锁仓总额(DC)</td>
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
                                        {{ homeData.registered_user_count || 0 }}
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
    </div>
</template>

<style src="./home.less" lang="less" scoped />

<script src="./home.ts" />
