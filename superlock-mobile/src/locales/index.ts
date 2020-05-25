import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { LocalStorage } from 'jts-storage';
import { CONSTANTS } from '@/ts/config';

import { Locale } from 'vant';
import zhCN from 'vant/lib/locale/lang/zh-CN';
import enUS from 'vant/lib/locale/lang/en-US';

Vue.use(VueI18n);

export default class Locales {
    public static buildLocale() {
        const lang = LocalStorage.getItem<string>(CONSTANTS.LANG) || CONSTANTS.DEFAULT_LANG;
        Locale.use(lang, { zh: zhCN, en: enUS }[lang]); // vant国际化
        return new VueI18n({
            locale: lang,
            messages: {
                zh: require('./langs/zh-CN.json'),
                en: require('./langs/en-US.json')
            }
        }); // i18n国际化
    }

    public static setLang(lang: string) {
        LocalStorage.setItem<string>(CONSTANTS.LANG, lang, CONSTANTS.ONE_WEEK);
    }

    public static getLang(): string {
        return LocalStorage.getItem<string>(CONSTANTS.LANG) || CONSTANTS.DEFAULT_LANG;
    }
}
