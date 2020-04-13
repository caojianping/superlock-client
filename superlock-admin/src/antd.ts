import Vue from 'vue';
import {
    LocaleProvider,
    Row,
    Col,
    Icon,
    Spin,
    Breadcrumb,
    Form,
    Input,
    InputNumber,
    Select,
    DatePicker,
    Switch,
    Button,
    Modal,
    Table,
    Pagination,
    Tooltip
} from 'ant-design-vue';

export default function antd() {
    Vue.component('ant-locale-provider', LocaleProvider);
    Vue.component('ant-row', Row);
    Vue.component('ant-col', Col);
    Vue.component('ant-icon', Icon);
    Vue.component('ant-spin', Spin);
    Vue.component('ant-breadcrumb', Breadcrumb);
    Vue.component('ant-breadcrumb-item', Breadcrumb.Item);
    Vue.component('ant-form', Form);
    Vue.component('ant-form-item', Form.Item);
    Vue.component('ant-input', Input);
    Vue.component('ant-input-number', InputNumber);
    Vue.component('ant-select', Select);
    Vue.component('ant-select-option', Select.Option);
    Vue.component('ant-date-picker', DatePicker);
    Vue.component('ant-range-picker', DatePicker.RangePicker);
    Vue.component('ant-switch', Switch);
    Vue.component('ant-button', Button);
    Vue.component('ant-modal', Modal);
    Vue.component('ant-table', Table);
    Vue.component('ant-pagination', Pagination);
    Vue.component('ant-tooltip', Tooltip);
}
