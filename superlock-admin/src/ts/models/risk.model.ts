// 免审模型
export class FreeTrialModel {
    public withdrawLimit!: number; // 提现免审金额
    public everyrewardLimit!: number; // 利息支出免审金额
    public promotionrewardLimit!: number; // 推广奖励免审金额
    public lockAmount!: number; // 最小锁仓数量
}
