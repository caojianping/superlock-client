// 分页参数
export interface IPageParameters<T> {
    conditions: T; // 分页查询条件
    pageNum: number; // 分页索引
    pageSize: number; // 分页尺寸
}

// 分页结果
export class PageResult<T> {
    public totalCount: number; // 分页总数
    public list: Array<T>; // 分页数据列表

    constructor(totalCount: number, list: Array<T>) {
        this.totalCount = totalCount;
        this.list = list;
    }
}
