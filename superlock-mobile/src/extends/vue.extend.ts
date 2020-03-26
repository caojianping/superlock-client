import Vue from 'vue';
import Utils from '@/ts/utils';

// 日期格式化显示
Vue.filter('dateFormat', function(
    value: string,
    format: string = 'yyyy-MM-dd hh:mm:ss',
    isZeroize: boolean = true
) {
    if (!value) return '';
    if (!Utils.isDateString(value)) return value;
    return Utils.dateFormat(value, format, isZeroize);
});

// 利率百分比显示
Vue.filter('ratePercent', function(
    value: string | number,
    precision: number = 2,
    isPercent: boolean = true
) {
    return Utils.digitPercent(value, precision) + (isPercent ? '%' : '');
});

// 数字精度显示
Vue.filter('digitPrecision', function(
    value: string | number,
    precision: number = 2
) {
    return Utils.digitPrecision(value, precision);
});

// 货币逗号分隔显示
Vue.filter('currencyComma', function(value: number, precision: number = 2) {
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
    return `${value} ${unit}`;
});
