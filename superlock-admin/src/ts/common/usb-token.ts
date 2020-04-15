import { sha256 } from 'js-sha256';
import Utils from '@/ts/utils';

const baseUrl = process.env.VUE_APP_BASE_URL;

export class UsbToken {
    public cert!: string;
    public sign!: string;
    public time!: string;

    constructor(cert: string, sign: string, time: string) {
        this.cert = cert;
        this.sign = sign;
        this.time = time;
    }

    public static async sendMessage(url: string, data: any): Promise<UsbToken | null> {
        if (!url) return Promise.reject('地址不可以为空');

        let surl = url.substring(baseUrl.length),
            pdata = Utils.isNullOrUndefined(data) ? '' : JSON.stringify(data);
        return new Promise((resolve: any, reject: any) => {
            let extensionId = 'ihjdinpccpakfpcafodpgfgcfmapokhc',
                timestamp = Utils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss', true, true),
                payload = `/superlockadmin${surl}${pdata}${timestamp}`,
                message = {
                    jsonrpc: '2.0',
                    method: 'Token_signRsa',
                    params: { hash: sha256(payload) }
                };
            // console.log('sendMessage payload:', payload);
            if (window['chrome'] && window['chrome']['runtime'] && window['chrome']['runtime'].sendMessage) {
                window['chrome']['runtime'].sendMessage(extensionId, message, function(response: any) {
                    // console.log('sendMessage response:', response);
                    if (response && response.result) {
                        let result = response.result;
                        resolve(new UsbToken(result.cert, result.signature, timestamp));
                    } else {
                        resolve(null);
                    }
                });
            } else {
                reject('未支持谷歌扩展程序');
            }
        });
    }
}
