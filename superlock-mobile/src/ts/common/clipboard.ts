import ClipboardJS from 'clipboard';
import { Prompt } from './prompt';

import Locales from '@/locales';
const i18n = Locales.buildLocale();

export class Clipboard {
    public static copy(id: string, title: string = '') {
        let element = document.getElementById(id);
        if (!element) return;

        let clipboard = new ClipboardJS(element);
        clipboard.on('success', function(e) {
            Prompt.success(`${title}${i18n.tc('COMMON.COPY_SUCCESS')}`);
        });
        clipboard.on('error', function(e) {
            Prompt.error(`${title}${i18n.tc('COMMON.COPY_FAILURE')}`);
        });
    }
}
