import Vue from 'vue';
import { Component, Prop, Model, Watch } from 'vue-property-decorator';
import { IAreaCode, HotAreaCodes, AreaCodes } from '@/ts/config';
import { NavBar, IndexAnchor, IndexBar, Search, Cell } from 'vant';

@Component({
    name: 'AreaModal',
    components: { NavBar, IndexAnchor, IndexBar, Search, Cell }
})
export default class AreaModal extends Vue {
    @Model('close', { type: Boolean }) value!: boolean;
    @Prop() readonly areaCode!: IAreaCode;

    isShow: boolean = false;
    isSearch: boolean = false;

    hotAreaCodes: Array<IAreaCode> = HotAreaCodes;
    searchAreaCodes: Array<IAreaCode> = [];
    indexAreaCodes: any = {};

    keyword: string = '';

    // 关闭模态框
    closeModal() {
        this.isShow = false;
        this.$emit('close', false);
    }

    // 根据关键字过滤国家/地区列表
    getAreaCodesByKeyword(keyword: string): Array<IAreaCode> {
        return AreaCodes.filter(
            (areaCode: IAreaCode) =>
                (areaCode.name || '').indexOf(keyword) > -1 ||
                (areaCode.code || '').indexOf(keyword) > -1
        );
    }

    // 处理搜索框input事件
    handleSearchInput() {
        let keyword = this.keyword;
        if (!keyword) {
            this.isSearch = false;
            this.searchAreaCodes = [];
        } else {
            this.isSearch = true;
            this.searchAreaCodes = this.getAreaCodesByKeyword(keyword);
        }
    }

    // 处理搜索框clear事件
    handleSearchClear() {
        this.keyword = '';
        this.isSearch = false;
        this.searchAreaCodes = [];
    }

    // 选择国家/地区
    chooseAreaCode(areaCode: IAreaCode) {
        this.isShow = false;
        this.$emit('close', false);
        this.$emit('change', areaCode);
    }

    // 初始化数据
    initData() {
        let indexAreaCodes: any = {};
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter: string) => {
            indexAreaCodes[letter] = AreaCodes.filter(
                (areaCode: IAreaCode) =>
                    (areaCode.name || '')
                        .toLowerCase()
                        .indexOf(letter.toLowerCase()) === 0
            );
        });
        this.indexAreaCodes = indexAreaCodes;
    }

    created() {
        this.initData();
    }

    @Watch('value')
    watchValue(value: boolean) {
        this.isShow = value;
    }
}
