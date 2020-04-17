export class HomeModel {
    public new_lock_count!: number; // 新增锁仓笔数
    public new_lock_amount!: number; // 新增锁仓总额
    public tb_rebate_amount!: number; // 待结算返点
    public rebate_amount!: number; // 已结算返点
    public all_lock_count!: number; // 累计锁仓笔数
    public all_lock_amount!: number; // 累计锁仓总额
    public registered_user_count!: number; // 累计注册用户
}
