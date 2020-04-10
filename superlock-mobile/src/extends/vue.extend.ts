import Vue from 'vue';
import Utils from '@/ts/utils';

// 日期格式化显示
Vue.filter('dateFormat', function(value: string, format: string = 'yyyy-MM-dd hh:mm:ss', isZeroize: boolean = true) {
    if (Utils.isNullOrUndefined(value)) return value;
    if (!Utils.isDateString(value)) return value;
    return Utils.dateFormat(value, format, isZeroize);
});

// 利率百分比显示
Vue.filter('ratePercent', function(value: string | number, precision: number = 2, isPercent: boolean = true) {
    if (Utils.isNullOrUndefined(value)) return value;
    return Utils.digitPercent(value, precision) + (isPercent ? '%' : '');
});

// 数字精度显示
Vue.filter('digitPrecision', function(value: string | number, precision: number = 2) {
    if (Utils.isNullOrUndefined(value)) return value;
    return Utils.digitPrecision(value, precision);
});

// 货币逗号分隔显示
Vue.filter('currencyComma', function(value: number, precision: number = 4) {
    if (Utils.isNullOrUndefined(value)) return value;

    let svalue = value.toString(),
        parts = svalue.split('.'),
        left = parts[0] || '',
        right = parts[1] || '';

    right = right
        ? right.length >= precision
            ? `.${right.substr(0, precision)}`
            : `.${right}${Utils.repeatChar('0', precision - right.length)}`
        : `.${Utils.repeatChar('0', precision)}`;

    let temp = left
        .split('')
        .reverse()
        .join('')
        .match(/(\d{1,3})/g);
    if (!temp) return '';
    else
        return (
            temp
                .join(',')
                .split('')
                .reverse()
                .join('') + right
        );
});

// 币种单位显示
Vue.filter('coinUnit', function(value: string | number, unit: string = 'BCB') {
    if (Utils.isNullOrUndefined(value)) return value;
    return `${value} ${unit}`;
});

// 哈希地址截取显示
Vue.filter('hashTruncate', function(value: string) {
    if (Utils.isNullOrUndefined(value)) return value;
    let left = value.slice(0, 11),
        right = value.substr(-10);
    return `${left}...${right}`;
});
