import ClipboardJS from 'clipboard';
import { Prompt } from './prompt';

export class Clipboard {
    public static copy(id: string, title: string = '') {
        let element = document.getElementById(id);
        if (!element) return;

        let clipboard = new ClipboardJS(element);
        clipboard.on('success', function(e) {
            Prompt.success(`${title}复制成功`);
        });
        clipboard.on('error', function(e) {
            Prompt.error(`${title}复制失败`);
        });
    }
}
