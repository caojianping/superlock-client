import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Locales from '@/locales';

@Component({
    name: 'Langs',
    components: {}
})
export default class Langs extends Vue {
    activeLang: string = Locales.getLang();

    toggleLang(lang: string) {
        Locales.setLang(lang);
        window.location.reload(true);
    }
}
