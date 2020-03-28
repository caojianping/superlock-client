import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Utils from '@/ts/utils';
import { IAreaCode } from '@/ts/config';
import { UserFormModel } from '@/ts/models';

import { CellGroup, Field } from 'vant';
import AreaCode from '@/components/user/area-code';
import SmsCode from '@/components/user/sms-code';

@Component({
    name: 'UserForm',
    components: { CellGroup, Field, AreaCode, SmsCode }
})
export default class UserForm extends Vue {
    userForm: UserFormModel = new UserFormModel();

    // 处理Field控件input事件
    handleFieldInput(key: string, value: any) {
        let userForm = Utils.duplicate(this.userForm);
        userForm[key] = value;
        this.userForm = userForm;
        this.$emit('change', userForm);
    }

    // 处理地区区号组件change事件
    handleAreaCodeChange(areaCode: IAreaCode) {
        let userForm = Utils.duplicate(this.userForm);
        userForm.areaCode = areaCode.code;
        this.userForm = userForm;
        this.$emit('change', userForm);
    }

    // 处理短信验证码组件stop事件
    handleSmsCodeStop() {
        this.$emit('stop');
    }
}
