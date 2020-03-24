import { Dialog } from 'vant';

export class Prompt {
    public static info(message: string, options: any = {}) {
        options['className'] = 'prompt prompt-info';
        options['message'] = message;
        message && Dialog.alert(options);
    }

    public static warning(message: string, options: any = {}) {
        options['className'] = 'prompt prompt-warning';
        options['message'] = message;
        message && Dialog.alert(options);
    }

    public static error(message: string, options: any = {}) {
        options['className'] = 'prompt prompt-error';
        options['message'] = message;
        message && Dialog.alert(options);
    }

    public static success(message: string, options: any = {}) {
        options['className'] = 'prompt prompt-success';
        options['message'] = message;
        message && Dialog.alert(options);
    }

    public static confirm(message: string, options: any = {}) {
        options['className'] = 'prompt prompt-confirm';
        options['message'] = message;
        message && Dialog.alert(options);
    }
}
