import { CONSTANTS } from '../config';

export class Captcha {
    public static async initCaptcha(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (window['initNECaptcha']) {
                window['initNECaptcha'](
                    CONSTANTS.CAPTCHA_OPTIONS,
                    function onload(instance) {
                        return resolve(instance);
                    },
                    function onerror(err) {
                        return reject(err);
                    }
                );
            } else return reject('不支持initNECaptcha');
        });
    }
}
