import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { IAreaCode, HotAreaCodes, AreaCodes, defaultAreaCode } from '@/ts/config';

import { Popup, Icon, Search, IndexAnchor, IndexBar, Cell } from 'vant';
import Header from '@/components/common/header';

@Component({
    name: 'AreaCode',
    components: { Popup, Icon, Search, IndexAnchor, IndexBar, Cell, Header }
})
export default class AreaCode extends Vue {
    areaCode: IAreaCode = defaultAreaCode; // 当前地区区号
    isShow: boolean = false; // 是否显示模态框
    isSearch: boolean = false; // 是否显示搜索列表

    hotAreaCodes: Array<IAreaCode> = HotAreaCodes; // 热门地区区号列表
    searchAreaCodes: Array<IAreaCode> = []; // 搜索地区区号列表
    indexAreaCodes: any = {}; // 索引地区区号列表

    keyword: string = ''; // 搜索关键字

    // 打开弹出框
    openPopup() {
        this.isShow = true;
    }

    // 处理弹出框close事件
    handlePopupClose() {
        this.isShow = false;
    }

    // 根据关键字过滤国家/地区列表
    getAreaCodesByKeyword(keyword: string): Array<IAreaCode> {
        return AreaCodes.filter((areaCode: IAreaCode) => (areaCode.name || '').indexOf(keyword) > -1 || (areaCode.code || '').indexOf(keyword) > -1);
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
        this.areaCode = areaCode;
        this.$emit('change', areaCode);
    }

    // 初始化数据
    initData() {
        let indexAreaCodes: any = {};
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((letter: string) => {
            indexAreaCodes[letter] = AreaCodes.filter(
                (areaCode: IAreaCode) => (areaCode.name || '').toLowerCase().indexOf(letter.toLowerCase()) === 0
            );
        });
        this.indexAreaCodes = indexAreaCodes;
    }

    created() {
        this.initData();
    }
}
