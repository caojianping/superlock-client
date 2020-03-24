import Validator, {
    ValidationRuleType,
    ValidationMessageType
} from 'jpts-validator';

const messages: ValidationMessageType = {
    password:
        '密码格式不正确，密码由8-15位大小写字母、数字、特殊字符任意两种组成'
};

const rules: ValidationRuleType = {
    password: function(
        value: string,
        isPassword: boolean = false,
        msg: string = ''
    ): any {
        if (isPassword) {
            if (
                value &&
                !/^(?![a-z]+$)(?![A-Z]+$)(?![\W_]+$)(?![0-9]+$)[a-zA-Z0-9\W_][^\u4e00-\u9fa5]{7,14}$/.test(
                    value
                )
            ) {
                return msg || messages.password;
            }
        }
    }
};

Validator.extendRule(rules, messages);
