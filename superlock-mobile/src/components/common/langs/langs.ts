import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Locales from '@/locales';

@Component({
    name: 'Langs',
    components: {}
})
export default class Langs extends Vue {
    @Prop({ type: Number, default: 0.75 }) readonly top!: number;

    activeLang: string = Locales.getLang();

    toggleLang(lang: string) {
        Locales.setLang(lang);
        window.location.reload(true);
    }
}
