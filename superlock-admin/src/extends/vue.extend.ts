import Vue from 'vue';
import Utils from '@/ts/utils';

Vue.filter('dateFormat', function(value: string, format: string = 'yyyy-MM-dd hh:mm:ss', isZeroize: boolean = true) {
    if (!value) return '';
    if (!Utils.isDateString(value)) return value;
    return Utils.dateFormat(value, format, isZeroize);
});

Vue.filter('ratePercent', function(value: string | number, precision: number = 2) {
    return Utils.digitPercent(value, precision) + '%';
});

Vue.filter('digitPrecision', function(value: string | number, precision: number = 2) {
    return Utils.digitPrecision(value, precision);
});

Vue.directive('focus', {
    inserted: function(element: HTMLElement) {
        let inputs = element.getElementsByTagName('input');
        if (inputs && inputs[0]) {
            inputs[0].focus();
        }
    }
});
