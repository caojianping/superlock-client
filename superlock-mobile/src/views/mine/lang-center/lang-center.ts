import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Locales from '@/locales';

import { RadioGroup, Radio, CellGroup, Cell } from 'vant';
import Header from '@/components/common/header';

@Component({
    name: 'LangCenter',
    components: { RadioGroup, Radio, CellGroup, Cell, Header }
})
export default class LangCenter extends Vue {
    activeLang: string = Locales.getLang();

    // 选择语言
    chooseLang(lang: string) {
        Locales.setLang(lang);
        window.location.reload(true);
    }
}
