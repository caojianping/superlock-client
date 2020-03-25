# 超级锁仓API接口说明



# 版本&更新记录

| 版本号  | 作者 | 日期     | 更新内容                 |
| ------- | ---- | -------- | ------------------------ |
| v.1.0.0 | maxw | 2020/1/4 | 注册,登陆,理财,我的,资产 |

------



# 功能说明





# 接口访问URL

https://tcapp.scvip.vip/api



# 1. 获取短信验证码

## 1.1基本描述

| 请求方式 | https POST     |
| -------- | -------------- |
| 请求地址 | /vfcode        |
| 接口方式 | 同步           |
| 功能说明 | 获取短信验证码 |

## 1.2请求参数

| 参数名  | 类型   | 必填 | 说明   |
| ------- | ------ | ---- | ------ |
| account | string | 是   | 手机号 |

请求示例：

https://tcapp.scvip.vip/api/vfcode?account=86,18133626940

## 1.3返回结果

| 字段名  | 类型    | 说明                                           |
| ------- | ------- | ---------------------------------------------- |
| code    | string  | 返回码，0表示成功，其他表示错误                |
| message | string  | 返回码的文字说明                               |
| data    | object  | 一个对象，携带了商户的完整余额宝存取交易明细。 |
| success | boolean | true:成功 false:失败                           |

## 1.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
	"data":null
}
```



# 2. 注册用户

## 2.1基本描述

| 请求方式 | https POST |
| -------- | ---------- |
| 请求地址 | /register  |
| 接口方式 | 同步       |
| 功能说明 | 注册用户   |

## 2.2请求参数

| 参数名         | 类型   | 必填 | 说明                |
| -------------- | ------ | ---- | ------------------- |
| account        | string | 是   | 用户账号            |
| accountKind    | string | 是   | 账号类型            |
| invitationCode | string | 是   | 上级代理邀请码      |
| passwd         | string | 是   | 密码（MD5加密后的） |
| vfcode         | string | 是   | 短信验证码          |

请求示例：

https://tcapp.scvip.vip/api/register?account=86,18133626940&accountKind=1&invitationCode=6352&passwd=DSFSGSGSGSGDSF&vfcode=736456

## 2.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
	"data":null
}
```



# 3.用户登陆

## 3.1基本描述

| 请求方式 | https POST       |
| -------- | ---------------- |
| 请求地址 | /login           |
| 接口方式 | 同步             |
| 功能说明 | 用户请求登陆接口 |

## 3.2请求参数

| 参数名      | 类型   | 必填 | 说明account           |
| ----------- | ------ | ---- | --------------------- |
| account     | string | 是   | 用户账号              |
| accountKind | string | 是   | 登陆类型 1:手机号登陆 |
| passwd      | string | 是   | 密码(MD5加密后的)     |
| vfcode      | string | 是   | 短信验证码            |

请求示例：

https://tcapp.scvip.vip/api/login?account=86,18133626940&accountKind=1&passwd=fdFDSAFFADFDSF&vfcode=635462

## 3.3返回结果

| 字段名  | 类型    | 说明                                 |
| ------- | ------- | ------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误      |
| message | string  | 返回码的文字说明                     |
| data    | object  | 一个对象，用于携带一些额外的返回信息 |
| success | boolean | true:成功 false:失败                 |

## 3.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":
    {
        "token": "1vZVFbwPokGd5pEXR71TyUkZoppdU902Wr3OdF37wwDO2TqaQblcy87FFoqXl7R8",
        "userId": "80581845",
        "phone": {
            "area": "+86",
            "tel": "18133626940"
        },
        "pttl": 259200,
        "haveFundPasswd":false，
        "nickName":"天才",
        "generalizationCode":"UDcS2S",
        "referralLink":"http://60.174.225.175:19000/regist/reg.html?code=UDcS2S"
    }
}
```

data里面字段说明：

**token:** 登陆token;

**userId:**  用户uid;

**pttl:**  超时时间；当pttl<=0时 需要重新登陆!

**haveFundPasswd:** 资金密码已设置标志；true:已经设置 false:未设置；

**nickName:** 昵称；

**generalizationCode：** 推广码；

**referralLink:** 推广链接；

**phone:** 

​		**area:**  区号；

​		**tel:** 手机号码；



# 4. 找回密码

## 4.1基本描述

| 请求方式 | https POST |
| -------- | ---------- |
| 请求地址 | /retrieval |
| 接口方式 | 同步       |
| 功能说明 | 重设密码   |

## 4.2请求参数

| 参数名      | 类型   | 必填 | 说明              |
| ----------- | ------ | ---- | ----------------- |
| account     | string | 是   | 用户账号          |
| accountKind | string | 是   | 账号类型          |
| newPasswd   | string | 是   | 密码(MD5加密后的) |
| vfcode      | string | 是   | 短信验证码        |

请求示例：

https://tcapp.scvip.vip/api/retrieval?account=86,18133626940&accountKind=1&newPasswd=SDFDSAFFADFDSF&vfcode=643252

## 4.3返回结果

| 字段名  | 类型    | 说明                                   |
| ------- | ------- | -------------------------------------- |
| code    | string  | 返回码，0表示成功，其他表示错误        |
| message | string  | 返回码的文字说明                       |
| data    | object  | 一个对象，用于携带一些额外的返回信息。 |
| success | boolean | true:成功 false:失败                   |

## 4.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 5. 我的(获取充值地址)

## 5.1基本描述

| 请求方式 | https GET              |
| -------- | ---------------------- |
| 请求地址 | /rechargeAddresses     |
| 接口方式 | 同步                   |
| 功能说明 | 获取用户的所有充值地址 |

## 5.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |
| coin   | string | 是   | 币种；例如：BCB             |

请求示例：

https://tcapp.scvip.vip/api/project/rechargeAddresses?coin=BCB

## 5.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 5.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":"bcbCXsKjjJz21EifjrxZQaJB6HsyxZDdTzQ5"
}
```

data里面字段值说明：地址；



# 6. 我的(获取提现地址)

## 6.1基本描述

| 请求方式 | https GET          |
| -------- | ------------------ |
| 请求地址 | /withdrawAddresses |
| 接口方式 | 同步               |
| 功能说明 | 获取用户提现地址   |

## 6.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/withdrawAddresses

## 6.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息。                       |
| success | boolean | true:成功 false:失败                                         |

## 6.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":[
                {
                    "nickName":"钱包地址1",
                    "address":"bcbafagdRFDSFAFDS"
                },
                {
                    "nickName":"钱包地址2",
                    "address":"bcbafafdsafdsagdRFDSFAFDS"
                }
       ]
}
```

data 字段值说明：

**nickName:** 昵称。

**address:** 地址。



# 7. 我的(更改登陆密码)

## 7.1基本描述

| 请求方式 | https POST   |
| -------- | ------------ |
| 请求地址 | /resetPasswd |
| 接口方式 | 同步         |
| 功能说明 | 更改登陆密码 |

## 7.2请求参数

| 参数名    | 类型   | 必填 | 说明                      |
| --------- | ------ | ---- | ------------------------- |
| token     | string | 是   | 放在请求头里面，登陆token |
| oldPasswd | string | 是   | 旧密码                    |
| newPasswd | string | 是   | 新密码                    |

请求示例：

https://tcapp.scvip.vip/api/user/resetPasswd?oldPasswd=FDSFAFFDS&newPasswd=FSAGAGAG

## 7.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 7.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":null
}
```



# 8. 我的(设置资金密码)

## 8.1基本描述

| 请求方式 | https POST     |
| -------- | -------------- |
| 请求地址 | /setFundPasswd |
| 接口方式 | 同步           |
| 功能说明 | 设置资金密码   |

## 8.2请求参数

| 参数名 | 类型   | 必填 | 说明                      |
| ------ | ------ | ---- | ------------------------- |
| token  | string | 是   | 放在请求头里面，登陆token |
| passwd | string | 是   | 资金密码                  |
| vfcode | string | 是   | 短信验证码                |

请求示例：

https://tcapp.scvip.vip/api/user/setFundPasswd?passwd=FDSFAFFDS&vfcode=635482

## 8.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 8.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":null
}
```



# 9. 我的(校验资金密码)

## 9.1基本描述

| 请求方式 | https POST       |
| -------- | ---------------- |
| 请求地址 | /checkFundPasswd |
| 接口方式 | 同步             |
| 功能说明 | 校验资金密码     |

## 9.2请求参数

| 参数名 | 类型   | 必填 | 说明                      |
| ------ | ------ | ---- | ------------------------- |
| token  | string | 是   | 放在请求头里面，登陆token |
| passwd | string | 是   | 资金密码                  |

请求示例：

https://tcapp.scvip.vip/api/user/checkFundPasswd?passwd=FDSFAFFDS

## 9.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 9.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":null
}
```



# 10. 我的(修改资金密码)

## 10.1基本描述

| 请求方式 | https POST        |
| -------- | ----------------- |
| 请求地址 | /modifyFundPasswd |
| 接口方式 | 同步              |
| 功能说明 | 修改资金密码      |

## 10.2请求参数

| 参数名    | 类型   | 必填 | 说明                      |
| --------- | ------ | ---- | ------------------------- |
| token     | string | 是   | 放在请求头里面，登陆token |
| oldPasswd | string | 是   | 旧的资金密码              |
| newPasswd | string | 是   | 新的资金密码              |

请求示例：

https://tcapp.scvip.vip/api/user/modifyFundPasswd?oldPasswd=fdsagsagdg&newPasswd=FDSFAFFDS

## 10.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 10.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":null
}
```



# 11. 我的(忘记资金密码)

## 11.1基本描述

| 请求方式 | https POST        |
| -------- | ----------------- |
| 请求地址 | /forgetFundPasswd |
| 接口方式 | 同步              |
| 功能说明 | 修改资金密码      |

## 11.2请求参数

| 参数名    | 类型   | 必填 | 说明                      |
| --------- | ------ | ---- | ------------------------- |
| token     | string | 是   | 放在请求头里面，登陆token |
| newPasswd | string | 是   | 资金密码                  |
| vfcode    | string | 是   | 短信验证码                |

请求示例：

https://tcapp.scvip.vip/api/user/checkFundPasswd?newPasswd=FDSFAFFDS&vfcode=898372

## 11.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 11.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":null
}
```



# 12. 理财(理财项目列表)

## 12.1基本描述

| 请求方式 | https GET    |
| -------- | ------------ |
| 请求地址 | /projectList |
| 接口方式 | 同步         |
| 功能说明 | 理财项目列表 |

## 12.2请求参数

| 参数名 | 类型   | 必填 | 说明                      |
| ------ | ------ | ---- | ------------------------- |
| token  | string | 是   | 放在请求头里面，登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/projectList

## 12.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 12.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":{
        "userLockProjectList":[
                                    {
                                        "length":180,
                                        "unit":1,
                                        "rate":12
                                    },
                                    {
                                        "length":1,
                                        "unit":3,
                                        "rate":18
                                    }
    						],
        "statistics":{
            "cumulativeUser":100000,
            "cumulativeValuation":201221.323,
            "valuationCoin":"DC"
        },
        "links":[
            "https://tcwww.scvip.vip/advertise/invitation.html",
            "https://tcwww.scvip.vip/advertise/technology.html"
        ],
        "qualitySelectionLinks":[
            "https://tcwww.scvip.vip/advertise/invitation.html",
            "https://tcwww.scvip.vip/advertise/technology.html"
        ],
        "exchangeHousesLink":https://tcwww.scvip.vip/advertise/invitation.html
    }
    
}
```

data字段值说明：

**userLockProjectList:** 用户锁仓项目列表；

​	**length:** 锁仓长度。

​	**unit:** 单位。1:天  2:月  3:年

​	**rate:** 利率。

**statistics：**

​	**cumulativeUser：** 累计注册用户；

​	**cumulativeValuation：** 累计锁仓价值；

​	**valuationCoin：** 币种；DC；

**links:** 首页轮播图链接；

**qualitySelectionLinks:** 精品优选链接；

**exchangeHousesLink：** 换房链接；



# 13. 资产(资产总账)

## 13.1基本描述

| 请求方式 | https GET                |
| -------- | ------------------------ |
| 请求地址 | /capitalLedger           |
| 接口方式 | 同步                     |
| 功能说明 | 获取用户资产相关统计信息 |

## 13.2请求参数

| 参数名 | 类型   | 必填 | 说明                      |
| ------ | ------ | ---- | ------------------------- |
| token  | string | 是   | 放在请求头里面，登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/capitalLedger

## 13.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 13.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":{
       	"bcbTotalAmount":20000.22,
        "dcTotalAmount":800000.88,
        "bcbHotAmount":1000.2,
        "dcHotAmount":40000.4,
        "bcbLockAmount":600,
        "dcLockAmount":2400
    }
}
```

data字段值说明：

**bcbTotalAmount:** BCB总资产；

**dcTotalAmount：** DC总资产；

**bcbHotAmount：** BCB可用余额；

**dcHotAmount：** DC可用余额；

**bcbLockAmount：** BCB锁仓总额；

**dcLockAmount：** DC锁仓总额； 



# 14. 退出登陆

## 14.1基本描述

| 请求方式 | https post |
| -------- | ---------- |
| 请求地址 | /signOut   |
| 接口方式 | 同步       |
| 功能说明 | 退出登陆   |

## 14.2请求参数

| 参数名 | 类型   | 必填 | 说明                      |
| ------ | ------ | ---- | ------------------------- |
| token  | string | 是   | 放在请求头里面，登陆token |

请求示例：

https://tcapp.scvip.vip/api/user/signOut

## 14.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 14.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":null
}
```



# 15. 我的(获取充值币种列表)

## 15.1基本描述

| 请求方式 | https GET                      |
| -------- | ------------------------------ |
| 请求地址 | /rechargeCoinList              |
| 接口方式 | 同步                           |
| 功能说明 | 获取当前系统支持的充值币种列表 |

## 15.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/rechargeCoinList

## 15.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 15.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "symbol":"BCB",
            "icon":"https://testclt.cgs.cool/bcb.html",
            "name":"BlockChain for Business"
        },
        {
            "symbol":"DC",
            "icon":"https://testclt.cgs.cool/dc.html",
            "name":"Diamond Coin"
        }
    ]
}
```

data里面字段说明：

**symbol:** 币种。

**icon:** 币种图标。

**name:** 币种全名。



# 16. 我的(添加提现地址)

## 16.1基本描述

| 请求方式 | https POST          |
| -------- | ------------------- |
| 请求地址 | /addWithdrawAddress |
| 接口方式 | 同步                |
| 功能说明 | 添加提现地址        |

## 16.2请求参数

| 参数名   | 类型   | 必填 | 说明                        |
| -------- | ------ | ---- | --------------------------- |
| token    | string | 是   | 放在请求头里，用户登陆token |
| address  | string | 是   | 提现地址                    |
| nickName | string | 是   | 地址昵称                    |

请求示例：

https://tcapp.scvip.vip/api/project/addWithdrawAddress?address=bcbfdsfsaf&nickName=jack

## 16.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 16.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 17. 理财(锁仓)

## 17.1基本描述

| 请求方式 | https POST    |
| -------- | ------------- |
| 请求地址 | /lockPosition |
| 接口方式 | 同步          |
| 功能说明 | 锁仓          |

## 17.2请求参数

| 参数名     | 类型    | 必填 | 说明                        |
| ---------- | ------- | ---- | --------------------------- |
| token      | string  | 是   | 放在请求头里，用户登陆token |
| coin       | string  | 是   | 币种                        |
| amount     | decimal | 是   | 锁仓金额                    |
| length     | integer | 是   | 长度                        |
| unit       | integer | 是   | 单位，1:天 2:月 3:年        |
| rate       | decimal | 是   | 利率                        |
| fundPasswd | String  | 是   | 资金密码 （MD5加密后的）    |

请求示例：

https://tcapp.scvip.vip/api/project/lockPosition?coin=BCB&amount=100&length=180&unit=1&rate=12.1&fundPasswd=dsfagdsagdsaf

## 17.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 17.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data": {
            "orderId":"S20190113120312dfjafljsajgldsagf",
            "exchangeRate":42,
            "rate":12,
            "length":180,
            "unit":1,
            "amount":500,
            "coin":"BCB",
            "valuationAmount":8000,
            "valuationCoin":"DC",
            "startTime":"2019-12-31",
            "endTime":"2020-6-30",
            "remainingDays":170,
            "interestTime":"2019-12-31",
            "status":20,
            "remark":"计息中",
            "dcDailyIncome":10,
            "dcTotalIncome":100,
            "bcbTotalIncome"：2.5
        }
}
```

data字段值说明：

**orderId:** 锁仓订单干编号；

**exchangeRate：** 汇率；

**rate：** 锁仓利率；

**length：** 周期，如180，365；

**unit：** 单位；1：天 2：月 3：年；

**amount：** 锁仓BCB金额；

 **coin：** 锁仓币种；

**valuationAmount：** 计价金额；

**valuationCoin:** 计价币种，如DC；

**startTime：** 开始时间；

**endTime：** 到期时间；

**remainingDays：** 剩余天数；

**interestTime：** 起息日期；

**status：** 状态；0：订单创建；10：订单处理中； 20：计息中 ；30：锁仓到期；40：锁仓失败；

**remark:** 备注；

**dcDailyIncome：** 每日收益dc，币种固定为DC;

**dcTotalIncome:** 总收益dc，币种固定为DC;

**bcbTotalIncome:** 总收益bcb，币种固定为BCB;



# 18. 理财(充值记录)

## 18.1基本描述

| 请求方式 | https GET       |
| -------- | --------------- |
| 请求地址 | /rechargeRecord |
| 接口方式 | 同步            |
| 功能说明 | 获取充值记录    |

## 18.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | integer | 否   | 页数,默认第一页             |
| pageSize | integer | 否   | 每页显示多少条记录          |

请求示例：

https://tcapp.scvip.vip/api/project/rechargeRecord?pageNum=1&pageSize=20

## 18.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 18.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"ewrdsr24432",
            "txhash":"tsdfsfdsgafs",
            "createTime":"2020-02-18 12:12:12",
            "payCoin":"DC",
            "payAmount":100,
            "exchangeRate":0.02,
            "gotAmount":5,
            "gotCoin":"BCB"
            "memo":"",
            "statusRemark":"成功",
            "status":1,
            "capitalType":"支出"，
            "balance":100,
            "balanceCoin":"BCB"
        },
        {
            "orderId":"ewrdsr24432",
            "txhash":"tsdfsfdsgafs",
            "createTime":"2020-02-18 12:12:12",
            "payCoin":"DC",
            "payAmount":100,
            "exchangeRate":0.02,
            "gotAmount":5,
            "gotCoin":"BCB"
            "memo":"",
            "statusRemark":"成功",
            "status":1,
            "capitalType":"支出"，
            "balance":100,
            "balanceCoin":"BCB"
        }
    ]
}
```

data 字段值说明：

**orderId：** 订单号；

**payCoin:** 充值币种，如USDT;

**payAmount:** 充值金额。

**gotCoin:** 获得币种，如BCB；

**gotAmount:** 获得的金额。

**exchangeRate:** 汇率。

**memo:** 备注；

**statusRemark：** 状态描述；

**status:** 状态；

**capitalType：** 资金状态；支出；收入；

**createTime:** 创建时间。

**txhash:** 交易hash。

**balance:** 当前可用余额；

**balanceCoin:** 可用余额币种；



# 19. 理财(提现记录)

## 19.1基本描述

| 请求方式 | https GET       |
| -------- | --------------- |
| 请求地址 | /withdrawRecord |
| 接口方式 | 同步            |
| 功能说明 | 获取提现记录    |

## 19.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | integer | 否   | 页数,默认第一页             |
| pageSize | integer | 否   | 每页显示多少条记录          |

请求示例：

https://tcapp.scvip.vip/api/project/withdrawRecord?pageNum=1&pageSize=20

## 19.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 19.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"ewrdsr24432",
            "txhash":"dsfew324324ddsdfds",
            "createTime":"2020-02-18 12:12:12",
            "coin":"BCB",
            "amount":100,
            "toAddress":"bcbdfsrewrdfdsf",
            "memo":"",
            "statusRemark":"成功"，
            "status":1,
            "capitalType":"支出",
            "balance":100,
            "balanceCoin":"BCB"
        },
        {
            "orderId":"ewrdsr24432",
            "txhash":"dsfew324324ddsdfds",
            "createTime":"2020-02-18 12:12:12",
            "coin":"BCB",
            "amount":100,
            "toAddress":"bcbdfsrewrdfdsf",
            "memo":"",
            "statusRemark":"成功"，
            "status":1,
            "capitalType":"支出",
            "balance":100,
            "balanceCoin":"BCB"
        }
    ]
}
```

data 字段值说明：

**orderId:** 订单号；

**toAddress:** 提现地址;

**memo:** 备注；

**statusRemark:** 状态描述；

**status:** 状态；

**capitalType：** 资金类型；支付；收入；

**amount:** 提现金额。

**coin:** 币种，如BCB；

**createTime:** 创建时间。

**txhash:** 交易hash。

**balance:** 当前可用余额；

**balanceCoin:** 可用余额币种；



# 20. 今日汇率

## 20.1基本描述

| 请求方式 | https GET          |
| -------- | ------------------ |
| 请求地址 | /exchangeRateToday |
| 接口方式 | 同步               |
| 功能说明 | 获取今日汇率       |

## 20.2请求参数

| 参数名   | 类型   | 必填 | 说明                        |
| -------- | ------ | ---- | --------------------------- |
| token    | string | 是   | 放在请求头里，用户登陆token |
| fromCoin | string | 是   | 支付币种                    |
| toCoin   | string | 是   | 得到币种                    |

请求示例：

https://tcapp.scvip.vip/api/project/exchangeRateToday?fromCoin=DC&toCoin=BCB

## 20.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 20.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
            "rate":42,
            "fromCoin":"DC",
            "toCoin":"BCB",
            "date":"2020-01-13"
        }
}
```

data 字段值说明：

**rate:** 汇率;

**fromCoin:** 支付币种，如DC。

**toCoin:** 获得币种，如BCB；

**date:** 日期。



# 21. 资产(锁仓列表)

## 21.1基本描述

| 请求方式 | https GET          |
| -------- | ------------------ |
| 请求地址 | /lockOrderList     |
| 接口方式 | 同步               |
| 功能说明 | 获取用户的锁仓列表 |

## 21.2请求参数

| 参数名 | 类型   | 必填 | 说明                      |
| ------ | ------ | ---- | ------------------------- |
| token  | string | 是   | 放在请求头里面，登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/lockOrderList

## 21.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示通知接收成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，携带本次查询流水的状态。                           |
| success | boolean | true:成功 false:失败                                         |

## 21.4返回值样例

```java
{
    "success":true,
	"code":0,
	"message":"ok",
    "data":[
        {
            "orderId":"S20190113120312dfjafljsajgldsagf",
            "exchangeRate":42,
            "rate":12,
            "length":180,
            "unit":1,
            "amount":500,
            "coin":"BCB",
            "valuationAmount":8000,
            "valuationCoin":"DC",
            "startTime":"2019-12-31",
            "endTime":"2020-6-30",
            "remainingDays":170,
            "interestTime":"2019-12-31",
            "status":20,
            "remark":"计息中",
            "dcDailyIncome":10,
            "dcTotalIncome":100,
            "bcbTotalIncome"：2.5
        }
    ]
}
```

data字段值说明：

**orderId:** 锁仓订单干编号；

**exchangeRate：** 汇率；

**rate：** 锁仓利率；

**length：** 周期，如180，365；

**unit：** 单位；1：天 2：月 3：年；

**amount：** 锁仓BCB金额；

 **coin：** 锁仓币种；

**valuationAmount：** 计价金额；

**valuationCoin:** 计价币种，如DC；

**startTime：** 开始时间；

**endTime：** 到期时间；

**remainingDays：** 剩余天数；

**interestTime：** 起息日期；

**status：** 状态；0：订单创建；10：订单处理中； 20：计息中 ；30：锁仓到期；40：锁仓失败；

**remark:** 备注；

**dcDailyIncome：**每日收益价值，币种固定为DC;

**dcTotalIncome:** 累计收益数量，币种固定为DC;

**bcbTotalIncome:** 累计收益价值，币种固定为BCB;





# 22. 账单（交易记录）

## 22.1基本描述

| 请求方式 | https GET          |
| -------- | ------------------ |
| 请求地址 | /transactionRecode |
| 接口方式 | 同步               |
| 功能说明 | 获取交易记录       |

## 22.2请求参数

| 参数名   | 类型    | 必填 | 说明                                                         |
| -------- | ------- | ---- | ------------------------------------------------------------ |
| token    | string  | 是   | 放在请求头里，用户登陆token                                  |
| type     | Integer | 是   | 0:充值转入10:上下级转账 20:提现转出 30:锁仓 40:直推奖励 50:销量达标奖励 60:锁仓每日收益61:利差 70:推广解锁奖励 80:锁仓到期 90:贷款 100:还款1000:全部 |
| pageNum  | Integer | 否   | 页数,默认第一页                                              |
| pageSize | integer | 否   | 每页显示多少条记录                                           |

请求示例：

https://tcapp.scvip.vip/api/project/transactionRecode?type=0&pageNum=1&pageSize=20

## 22.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 22.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"DSFdsferdsfds32ewfd",
            "type":0,
            "remark":"充值转入",
            "amount":100,
            "symbol":1,
        	"voucher":"dsddsfdaf",
        	"coin":"BCB",
        	"createTime":"2020-01-13 12:22:23",
            "balance":100,
            "balanceCoin":"BCB"
        }
    ]
}
```

data 字段值说明：

**orderId:** 交易记录ID；

**type:** 业务类型;

**remark:** 备注;

**amount:** 金额；

**coin:** 币种；

**symbol:** 1 :+ 0: -  ;

**voucher:** 交易凭证；例如：订单号，交易hash等;

**createTime：** 创建时间；

**balance：** 当前可用余额；

**balanceCoin:** 可用余额币种；





# 23. 用户信息

## 23.1基本描述

| 请求方式 | https GET    |
| -------- | ------------ |
| 请求地址 | /userInfo    |
| 接口方式 | 同步         |
| 功能说明 | 获取用户信息 |

## 23.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/user/userInfo

## 23.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 23.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
            "token":"fdsagdagdsafdsafdsafdsa",
            "userId":"748273",
            "pttl":100324,
            "haveFundPasswd":true,
        	"nickName":"天才",
        	"generalizationCode":"wHSjd1d",
        	"referralLink":"http://60.174.225.175:19000/regist/reg.html?code=wHSjd1d"，
        	"phone":{
                "area":"86",
                "tel":"18133626940"
            }
        }
}
```

data 字段值说明：

**token:** 登陆token;

**userId:**  用户uid;

**pttl:**  超时时间；当pttl<=0时 需要重新登陆!

**haveFundPasswd:** 资金密码已设置标志；true:已经设置 false:未设置;

**nickName:** 昵称；

**generalizationCode:** 推广码；

**referralLink：** 推广链接；

**phone:** 

​		**area:**  区号；

​		**tel:** 手机号码；





# 24. 校验用户登录密码

## 24.1基本描述

| 请求方式 | https POST       |
| -------- | ---------------- |
| 请求地址 | /checkPasswd     |
| 接口方式 | 同步             |
| 功能说明 | 校验用户登录密码 |

## 24.2请求参数

| 参数名      | 类型   | 必填 | 说明                |
| ----------- | ------ | ---- | ------------------- |
| account     | string | 是   | 用户账号            |
| accountKind | string | 是   | 账号类型            |
| passwd      | string | 是   | 密码（MD5加密后的） |

请求示例：

https://tcapp.scvip.vip/api/checkPasswd?account=86,18133626940&accountKind=1&passwd=2569d419bfea999ff13fd1f7f4498b89

## 24.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 24.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```





# 25. 行为验证

## 25.1基本描述

| 请求方式 | https POST     |
| -------- | -------------- |
| 请求地址 | /checkBehavior |
| 接口方式 | 同步           |
| 功能说明 | 校验用户行为   |

## 25.2请求参数

| 参数名   | 类型   | 必填 | 说明       |
| -------- | ------ | ---- | ---------- |
| validate | string | 是   | 行为验证码 |

请求示例：

https://tcapp.scvip.vip/api/checkBehavior?validate=dsfaf

## 25.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 25.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```





# 26. 资产(提现)

## 26.1基本描述

| 请求方式 | https POST    |
| -------- | ------------- |
| 请求地址 | /withdrawCoin |
| 接口方式 | 同步          |
| 功能说明 | 用户提现      |

## 26.2请求参数

| 参数名     | 类型    | 必填 | 说明                        |
| ---------- | ------- | ---- | --------------------------- |
| token      | string  | 是   | 放在请求头里，用户登陆token |
| address    | string  | 是   | 提现地址                    |
| remark     | string  | 否   | 备注                        |
| amount     | decimal | 是   | 提现金额                    |
| fundPasswd | string  | 是   | 资金密码                    |

请求示例：

https://tcapp.scvip.vip/api/project/withdrawCoin?address=bcbdfsafdsafdsaf&remark=dfsafsdg&amount=100&fundPasswd=fdsafdsa

## 26.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 26.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 27. 我的团队(下级列表)

## 27.1基本描述

| 请求方式 | https GET  |
| -------- | ---------- |
| 请求地址 | /childList |
| 接口方式 | 同步       |
| 功能说明 | 所有下级   |

## 27.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | integer | 否   | 当前页数，默认第一页        |
| pageSize | integer | 否   | 默认每页20条数据            |

请求示例：

https://tcapp.scvip.vip/api/user/childList

## 27.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 27.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "nickName":"天才"，
            "uid":"27362363",
            "enable":true,
            "teamUsedQuota":1000,
            "date":"2020-02-06",
            "rates":[
                {
                    "type":1,
                    "length":180,
                    "unit":1,
                    "remark":"锁仓利率",
                    "suffix":"%",
                    "childValue":11.33,
                    "value":12
                },
                {
                    "type":2,
                    "length":null,
                    "unit":null,
                    "remark":"推广解锁利率",
                    "suffix":"%",
                    "childValue":2.33,
                    "value":5
                },
                {
                    "type":3,
                    "length":null,
                    "unit":null,
                    "remark":"锁仓额度",
                    "suffix":"DC",
                    "childValue":10000,
                    "value":50000
                }
            ]
        }
    ]
}
```

data字段值说明：

**nickName:** 下级名称；

**uid:** 下级uid;

**enable:** 是否激活；true:已激活，false:未激活；

**date:** 激活日期；

**rates:** 利率设置相关；

​		**type:**  类型；1:锁仓利率 2:推广解锁利率 3:锁仓额度；

​		**length：**锁仓长度；type为1时不为空；

​		**unit:**  锁仓长度单位；1：天 2：月 3：年； type为1时不为空；

​		**remark:** 类型描述；

​		**suffix：** 后缀单位；%，DC；

​		**childValue：** 下级当前值；

​		**value：** 用户当前值（下级可设置的最大值）；

**teamUsedQuota:** 团队已用额度；



# 28. 我的团队(激活下级)

## 28.1基本描述

| 请求方式 | https POST     |
| -------- | -------------- |
| 请求地址 | /activateChild |
| 接口方式 | 同步           |
| 功能说明 | 激活下级       |

## 28.2请求参数

| 参数名   | 类型   | 必填 | 说明                        |
| -------- | ------ | ---- | --------------------------- |
| token    | string | 是   | 放在请求头里，用户登陆token |
| childUid | string | 是   | 下级uid                     |

请求示例：

https://tcapp.scvip.vip/api/user/activateChild?childUid=261374

## 28.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 28.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```





# 29. 我的团队(查询下级)

## 29.1基本描述

| 请求方式 | https GET               |
| -------- | ----------------------- |
| 请求地址 | /queryChild             |
| 接口方式 | 同步                    |
| 功能说明 | 根据下级uid查询下级用户 |

## 29.2请求参数

| 参数名   | 类型   | 必填 | 说明                        |
| -------- | ------ | ---- | --------------------------- |
| token    | string | 是   | 放在请求头里，用户登陆token |
| childUid | string | 是   | 下级uid                     |

请求示例：

https://tcapp.scvip.vip/api/user/queryChild?childUid=27362363

## 29.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 29.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
            "nickName":"天才"，
            "uid":"27362363",
            "enable":true,
        	"teamUsedQuota":10000,
            "date":"2020-02-06",
            "rates":[
                {
                    "type":1,
                    "length":180,
                    "unit":1,
                    "remark":"锁仓利率",
                    "suffix":"%",
                    "childValue":11.33,
                    "value":12
                },
                {
                    "type":2,
                    "length":null,
                    "unit":null,
                    "remark":"推广解锁利率",
                    "suffix":"%",
                    "childValue":2.33,
                    "value":5
                },
                {
                    "type":3,
                    "length":null,
                    "unit":null,
                    "remark":"锁仓额度",
                    "suffix":"DC",
                    "childValue":10000,
                    "value":50000
                }
            ]
        }
}
```

data字段值说明：

**nickName:** 下级名称；

**uid:** 下级uid;

**enable:** 是否激活；true:已激活，false:未激活；

**date:** 激活日期；

**rates:** 利率设置相关；

​		**type:**  类型；1:锁仓利率 2:推广解锁利率 3:锁仓额度；

​		**length：**锁仓长度；type为1时不为空；

​		**unit:**  锁仓长度单位；1：天 2：月 3：年； type为1时不为空；

​		**remark:** 类型描述；

​		**suffix：** 后缀单位；%，DC；

​		**childValue：** 下级当前值；

​		**value：** 用户当前值（下级可设置的最大值）；

**teamUsedQuota:** 团队已用额度；



# 30. 废弃（参见46接口）我的团队(额度退还)

## 30.1基本描述

| 请求方式 | https POST             |
| -------- | ---------------------- |
| 请求地址 | /returnLockQuota       |
| 接口方式 | 同步                   |
| 功能说明 | 用不到的额度退还给上级 |

## 30.2请求参数

| 参数名 | 类型    | 必填 | 说明                        |
| ------ | ------- | ---- | --------------------------- |
| token  | string  | 是   | 放在请求头里，用户登陆token |
| amount | decimal | 是   | 额度                        |
| coin   | string  | 否   | 币种，例如DC                |

请求示例：

https://tcapp.scvip.vip/api/user/returnLockQuota?amount=10000

## 30.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 30.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 31. 可提现额度(提现)

## 31.1基本描述

| 请求方式 | https GET           |
| -------- | ------------------- |
| 请求地址 | /withdrawableAmount |
| 接口方式 | 同步                |
| 功能说明 | 获取用户可提现额度  |

## 31.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/withdrawableAmount

## 31.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 31.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
         "amount":100,
         "valuationAmount":400,
         "valuationCoin":"DC"
    }
}
```

data 字段值说明：

**amount:** 可提现BCB额度;

**valuationAmount:** 计价金额；

**valuationCoin:** 计价币种；如：DC



# 32. 用户锁仓额度

## 32.1基本描述

| 请求方式 | https GET        |
| -------- | ---------------- |
| 请求地址 | /lockQuota       |
| 接口方式 | 同步             |
| 功能说明 | 获取用户锁仓额度 |

## 32.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/user/lockQuota

## 32.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 32.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
         "totalAmount":500,
         "totalCoin":"DC",
         "totalValuationAmount":1.24,
         "totalValuationCoin":"BCB",
         "amount":400,
         "coin":"DC",
         "valuationAmount":100,
         "valuationCoin":"BCB",
         "usedAmount":200,
         "usedCoin":"DC",
         "usedValuationAmount:"5,
         "usedValuationCoin":"BCB",
         "childCount":100
    }
}
```

data 字段值说明：

**totalAmount:** 锁仓总额度；

**totalCoin：** 锁仓总额度币种；默认DC

**totalValuationAmount：** 锁仓总计价额度； 

**totalValuationCoin：** 锁仓总计价额度币种；BCB;

**amount:** 可用锁仓额度;

**coin:** 可用锁仓额度币种；默认DC；

**valuationAmount:** 可用锁仓额度计价金额；

**valuationCoin:** 可用锁仓额度计价币种；BCB；

**usedAmount:** 已用锁仓额度；

**usedCoin：** 已用额度币种；

**usedValuationAmount：** 已用额度计价金额；

**usedValuationCoin：** 已用额度计价币种

**childCount:** 下级数量；



# 33. 锁仓收益列表

## 33.1基本描述

| 请求方式 | https GET         |
| -------- | ----------------- |
| 请求地址 | /lockInterestList |
| 接口方式 | 同步              |
| 功能说明 | 锁仓收益记录      |

## 33.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| orderId  | string  | 是   | 锁仓订单号                  |
| pageNum  | Integer | 否   | 当前页                      |
| pageSize | Integer | 否   | 每页大小                    |

请求示例：

https://tcapp.scvip.vip/api/project/lockInterestList?orderId=fdfa324324

## 33.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 33.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
         "date":"2020-10-20",
         "rate":40,
         "fromCoin":"BCB",
         "toCoin":"DC",
         "fromAmount":1,
         "toAmount":40,
         "balance":100,
         "balanceCoin":"BCB" 
    	},
       {
         "date":"2020-10-20",
         "rate":40,
         "fromCoin":"BCB",
         "toCoin":"DC",
         "fromAmount":1,
         "toAmount":40,
         "balance":100,
         "balanceCoin":"BCB"
    	}
    ]
}
```

data 字段值说明：

**date:**  日期;

**rate:** 汇率；

**fromCoin:** 到账币种；

**toCoin:** 收益币种；

**fromAmount:** 到账金额；

**toAmount:** 收益金额；

**balance:** 当前可用余额；

**balanceCoin:** 可用余额币种；





# 34. 贷款收益列表

## 34.1基本描述

| 请求方式 | https GET         |
| -------- | ----------------- |
| 请求地址 | /loanInterestList |
| 接口方式 | 同步              |
| 功能说明 | 贷款收益记录      |

## 34.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| orderId  | string  | 是   | 锁仓订单号                  |
| pageNum  | Integer | 否   | 当前页                      |
| pageSize | Integer | 否   | 每页多少条数据              |

请求示例：

https://tcapp.scvip.vip/api/project/loanInterestList?orderId=fdfa324324

## 34.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 34.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
         "date":"2020-10-20",
         "amount:":100,
         "coin":"DC"
    	},
        {
         "date":"2020-10-20",
         "amount:":100,
         "coin":"DC"
    	}
    ]
}
```

data 字段值说明：

**date:**  日期;

**amount:** 利息；

**coin:** 币种；



# 35. 直推奖励列表

## 35.1基本描述

| 请求方式 | https GET       |
| -------- | --------------- |
| 请求地址 | /pushRewardList |
| 接口方式 | 同步            |
| 功能说明 | 直推奖励记录    |

## 35.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | Integer | 否   | 当前页                      |
| pageSize | Integer | 否   | 每页大小                    |

请求示例：

https://tcapp.scvip.vip/api/project/pushRewardList

## 35.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 35.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"dwerw2323",
            "uid":"432432",
            "date":"2020-10-20",
            "amount:":100,
            "reward":0.2,
            "coin":"BCB",
            "rewardValuation":0.1,
            "rewardValuationCoin":"DC",
            "balance":100,
            "balanceCoin":"BCB"
        },
        {
            "orderId":"dwerw2323",
            "uid":"432432",
            "date":"2020-10-20",
            "amount:":100,
            "reward":0.2,
            "coin":"BCB",
            "rewardValuation":0.1,
            "rewardValuationCoin":"DC",
            "balance":100,
            "balanceCoin":"BCB"
        }
    ]
}
```

data 字段值说明：

**orderId:** 直推奖励单号；

**uid:**  用户id;

**date:** 日期；

**amount:** 锁仓金额；

**reward:**  直推奖励；

**coin:** 锁仓金额和直推奖励币种；

**balance:** 当前可用余额；

**balanceCoin:** 可用余额币种；

**rewardValuation:** 奖励价值；

**rewardValuationCoin:** 奖励价值币种；



# 36. 锁仓奖励列表

## 36.1基本描述

| 请求方式 | https GET       |
| -------- | --------------- |
| 请求地址 | /lockRewardList |
| 接口方式 | 同步            |
| 功能说明 | 锁仓奖励记录    |

## 36.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | Integer | 否   | 当前页                      |
| pageSize | Integer | 否   | 每页大小                    |

请求示例：

https://tcapp.scvip.vip/api/project/lockRewardList

## 36.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 36.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
         "orderId":"432432",
         "date":"2020-10-20",
         "amount:":100,
         "interest":0.2,
         "coin":"BCB",
         "interestValuation":0.1,
         "interestValuationCoin":"DC",   
         "balance":100,
         "balanceCoin":"BCB"
    	},
        {
         "orderId":"432432s",
         "date":"2020-10-20",
         "amount:":100,
         "interest":0.2,
         "coin":"BCB",
         "interestValuation":0.1,
         "interestValuationCoin":"DC",    
         "balance":100,
         "balanceCoin":"BCB"
    	}
    ]
}
```

data 字段值说明：

**orderId:**  锁仓订单号;

**date:** 日期；

**amount:** 锁仓总量；

**interest:**  锁仓奖励；

**coin:** 锁仓金额和锁仓奖励币种；

**balance:**当前可用余额；

**balanceCoin：** 可用余额币种；

**interestValuation:** 奖励价值；

**interestValuationCoin:** 奖励价值币种；



# 37. 推广解锁奖励列表

## 37.1基本描述

| 请求方式 | https GET         |
| -------- | ----------------- |
| 请求地址 | /unlockRewardList |
| 接口方式 | 同步              |
| 功能说明 | 推广解锁奖励记录  |

## 37.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | Integer | 否   | 当前页                      |
| pageSize | Integer | 否   | 每页大小                    |

请求示例：

https://tcapp.scvip.vip/api/project/unlockRewardList

## 37.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 37.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"432432",
            "date":"2020-10-20",
            "amount:":100,
            "interest":0.2,
            "coin":"BCB",
            "interestValuation":0.1,
         	"interestValuationCoin":"DC", 
            "balance":100,
            "balanceCoin":"BCB"
        },
        {
            "orderId":"432432",
            "date":"2020-10-20",
            "amount:":100,
            "interest":0.2,
            "coin":"BCB",
            "interestValuation":0.1,
         	"interestValuationCoin":"DC", 
            "balance":100,
            "balanceCoin":"BCB"
        }
    ]
}
```

data 字段值说明：

**orderId:**  锁仓订单号;

**date:** 日期；

**amount:** 锁仓总量；

**interest:**  锁仓解锁奖励；

**coin:** 锁仓金额和锁仓解锁奖励币种；

**balance:** 当前可用余额；

**balanceCoin:** 可用余额币种；

**interestValuation:** 奖励价值；

**interestValuationCoin:** 奖励价值币种；



# 38. 我的贷款

## 38.1基本描述

| 请求方式 | https GET      |
| -------- | -------------- |
| 请求地址 | /loanOrderList |
| 接口方式 | 同步           |
| 功能说明 | 贷款记录       |

## 38.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/loanOrderList

## 38.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 38.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"dsfafdsafsf",
            "lockOrderId":"dsfgsgfsagdsafds",
            "mortgageValuationAmount":10000,
            "mortgageValuationCoin":"DC",
            "loanValuationAmount":3000,
            "loanValuationCoin":"DC",
            "rate":11.2,
            "applyTime":"2020-03-24 23:23:23",
            "lendTime":"2020-03-24 23:23:23",
            "lendExchangeRate":1.2,
            "fromCoin":"BCB",
            "toCoin":"DC",
            "lendAmount":1500,
            "lendAmountCoin":"BCB",
            "estimatedRepayDate":"2020-03-24",
            "totalInterest":200,
            "totalInterestCoin":"DC",
            "shouldReturn":3200,
            "shouldReturnCoin":"DC",
            "repaymentExchangeRate":12,
            "actualRepayment":1503,
            "actualRepaymentCoin":"BCB",
            "status":50,
            "remark":"订单结束"    
    	},
        {
        	"orderId":"dsfafdsafsf",
            "lockOrderId":"dsfgsgfsagdsafds",
            "mortgageValuationAmount":10000,
            "mortgageValuationCoin":"DC",
            "loanValuationAmount":3000,
            "loanValuationCoin":"DC",
            "rate":11.2,
            "applyTime":"2020-03-24 23:23:23",
            "lendTime":"2020-03-24 23:23:23",
            "lendExchangeRate":1.2,
            "fromCoin":"BCB",
            "toCoin":"DC",
            "lendAmount":1500,
            "lendAmountCoin":"BCB",
            "estimatedRepayDate":"2020-03-24",
            "totalInterest":200,
            "totalInterestCoin":"DC",
            "shouldReturn":3200,
            "shouldReturnCoin":"DC",
            "repaymentExchangeRate":12,
            "actualRepayment":1503,
            "actualRepaymentCoin":"BCB",
            "status":50,
            "remark":"订单结束"
    	}
    ]
}
```

data 字段值说明：

**orderId:**  贷款订单号;

**lockOrderId:**  质押锁仓订单号；

**mortgageValuationAmount:** 抵押计价金额;

**mortgageValuationCoin:**  抵押计价币种；

**loanValuationAmount:** 贷款价值；

**loanValuationCoin：** 贷款价值币种；

**rate:** 贷款年利率;

**applyTime:**申请时间；

**lendTime：** 放款时间；

**lendExchangeRate：** 放款汇率；

**fromCoin：** from币种；

**toCoin:** to币种；

**lendAmount:** 放款币种数量；

**lendAmountCoin:** 放款币种BCB;

**estimatedRepayDate：** 预计还款日期；

**totalInterest：** 利息总计；

**totalInterestCoin：** 利息总计币种；

**shouldReturn:** 应还本息；

**shouldReturnCoin：** 应还本息币种；

**repaymentExchangeRate：**还款汇率；

**actualRepayment：** 实际还款价值；

**actualRepaymentCoin：** 实际还款价值币种；

**status:** 状态；

**remark:** 状态描述；



# 39. 推广奖励

## 39.1基本描述

| 请求方式 | https GET        |
| -------- | ---------------- |
| 请求地址 | /extensionReward |
| 接口方式 | 同步             |
| 功能说明 | 贷款记录         |

## 39.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/extensionReward

## 39.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 39.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
        "lockReward":100,
        "lockRewardCoin":"DC",
        "lockRewardValuation":2.5,
        "lockRewardValuationCoin":"BCB"，
        "unlockReward":100,
        "unlockRewardCoin":"DC",
        "unlockRewardValuation":2.5,
        "unlockRewardValuationCoin":"BCB",
        "pushReward":100,
        "pushRewardCoin":"DC"
        "pushRewardValuation":2.5,
        "pushRewardValuationCoin":"BCB",
        "allBalance":2200,
        "unlockBalance":1200，
        "salesReward":100,
        "salesRewardCoin":"BCB",
        "isBroker":true
    }
}
```

data 字段值说明：

**lockReward:**  锁仓奖励;

**lockRewardCoin:** 锁仓奖励币种；

**lockRewardValuation:** 锁仓计价奖励;

**lockRewardValuationCoin:**  锁仓计价奖励币种；

**unlockReward:** 推广解锁奖励；

**unlockRewardCoin：** 推广解锁奖励币种；

**unlockRewardValuation:** 推广解锁计价奖励;

**unlockRewardValuationCoin:** 推广解锁计价币种；

**pushReward：** 直推奖励；

**pushRewardCoin：**直推奖励币种；

**pushRewardValuation：**直推计价奖励；

**pushRewardValuationCoin:** 直推计价奖励币种；

**allBalance:** 奖励资金池；

**unlockBalance:**  已获取的。

**salesReward: ** 销量达标奖励；

**salesRewardCoin:** 销量达标奖励币种；

**isBroker:** 是不是券商；true:是券商；false:不是券商；



# 40. 贷款

## 40.1基本描述

| 请求方式 | https POST |
| -------- | ---------- |
| 请求地址 | /loanMoney |
| 接口方式 | 同步       |
| 功能说明 | 贷款       |

## 40.2请求参数

| 参数名      | 类型    | 必填 | 说明                        |
| ----------- | ------- | ---- | --------------------------- |
| token       | string  | 是   | 放在请求头里，用户登陆token |
| amount      | string  | 是   | 贷款金额；为DC              |
| loanDays    | Integer | 是   | 贷款时长；单位天            |
| lockOrderId | string  | 是   | 锁仓订单号                  |

请求示例：

https://tcapp.scvip.vip/api/project/loanMoney?amount=100&loanDays=30&lockOrderId=dfsaf2dsfdsf

## 40.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 40.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 41. 还款

## 41.1基本描述

| 请求方式 | https POST |
| -------- | ---------- |
| 请求地址 | /repayment |
| 接口方式 | 同步       |
| 功能说明 | 还款       |

## 41.2请求参数

| 参数名      | 类型   | 必填 | 说明                        |
| ----------- | ------ | ---- | --------------------------- |
| token       | string | 是   | 放在请求头里，用户登陆token |
| loansSerial | string | 是   | 贷款订单号                  |

请求示例：

https://tcapp.scvip.vip/api/project/repayment?loansSerial=dsfdsfsa

## 41.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 41.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 42. 可贷款额度

## 42.1基本描述

| 请求方式 | https GET  |
| -------- | ---------- |
| 请求地址 | /loanQuota |
| 接口方式 | 同步       |
| 功能说明 | 可贷款额度 |

## 42.2请求参数

| 参数名  | 类型   | 必填 | 说明                        |
| ------- | ------ | ---- | --------------------------- |
| token   | string | 是   | 放在请求头里，用户登陆token |
| orderId | string | 是   | 锁仓订单号                  |

请求示例：

https://tcapp.scvip.vip/api/project/loanQuota?orderId=dsfdsfsa

## 42.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 42.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
        "quota":400,
        "coin":"DC",
        "valuation":100,
        "valuationCoin":"BCB"
    }
}
```

data字段值说明：

**quota：**额度；

**coin:**  币种；

**valuation：** 计价额度；

**valuationCoin：** 计价额度币种；



# 43. 贷款比率和贷款利息利率

## 43.1基本描述

| 请求方式 | https GET              |
| -------- | ---------------------- |
| 请求地址 | /loanBaseInfo          |
| 接口方式 | 同步                   |
| 功能说明 | 贷款比率和贷款利息利率 |

## 43.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/loanBaseInfo

## 43.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 43.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
        "loanProportion":0.6,
        "loanRate":0.01
    }
}
```

data字段值说明：

**loanProportion：**贷款比例；

**loanRate:**  贷款利息利率；



# 44. 账单状态

## 44.1基本描述

| 请求方式 | https GET        |
| -------- | ---------------- |
| 请求地址 | /transactionType |
| 接口方式 | 同步             |
| 功能说明 | 账单状态         |

## 44.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/transactionType

## 44.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 44.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        	{
             "type":0,
             "remark":"充值转入"
            },
            {
             "type":10,
             "remark":"上下级转账"
            }
           ]
}
```

data字段值说明：

**type：**类型；

**remark:**  描述；



# 45. 给下级设置利率

## 45.1基本描述

| 请求方式 | https POST     |
| -------- | -------------- |
| 请求地址 | /setChildRate  |
| 接口方式 | 同步           |
| 功能说明 | 给下级设置利率 |

## 45.2 请求参数

| 参数名   | 类型   | 必填 | 说明                        |
| -------- | ------ | ---- | --------------------------- |
| token    | string | 是   | 放在请求头里，用户登陆token |
| childUid | string | 是   | 放在请求路径里，下级uid     |

放在body体中的参数,body体中的参数需要是json结构类型：

| 参数名 | 类型    | 必填 | 说明                                        |
| ------ | ------- | ---- | ------------------------------------------- |
| type   | Integer | 是   | 类型；1:锁仓利率 2: 推广解锁利率 3:锁仓额度 |
| length | Integer | 是   | 锁仓长度；type=1时不为空；                  |
| unit   | Integer | 是   | 锁仓长度单位；1:天 2:月 3:年                |
| value  | decimal | 是   | 所设置的值                                  |

请求示例：

https://tcapp.scvip.vip/api/user/setChildRate?childUid=26371623

放在请求body体中json结构类型的参数：

```java
[
    {
        "type":1,
        "length":180,
        "unit":1,
        "value":2.5
	},
    {
        "type":2,
        "length":null,
        "unit":null,
        "value":2.9
	}，
	{
        "type":3,
        "length":null,
        "unit":null,
        "value":200
	}
]
```



## 45.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 45.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 46. 额度退还

## 46.1基本描述

| 请求方式 | https POST       |
| -------- | ---------------- |
| 请求地址 | /returnLockQuota |
| 接口方式 | 同步             |
| 功能说明 | 额度退还         |

## 46.2 请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |
| quota  | string | 是   | 额度 ；DC                   |

请求示例：

https://tcapp.scvip.vip/api/user/returnLockQuota?childUid=26371623

## 46.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 46.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 47. 昨日收益和总资产

## 47.1基本描述

| 请求方式 | https GET          |
| -------- | ------------------ |
| 请求地址 | /yesterdayEarnings |
| 接口方式 | 同步               |
| 功能说明 | 昨日收益           |

## 47.2 请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/yesterdayEarnings

## 47.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 47.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
        "yesterdayEarnings":315,
        "yesterdayEarningsCoin":"BCB",
        "totalAssets":539,
        "totalAssetsCoin":"BCB",
        "totalValuationAssets":123.4,
        "totalValuationAssetsCoin":"DC",
        "earnings":[
            {
                "type":1,
                "remark":"锁仓盈利",
                "income":30,
                "coin":"BCB",
                "prefix":1
            },
            {
                "type":2,
                "remark":"下级锁仓",
                "income":30,
                "coin":"BCB",
                "prefix":1
            }
        ]
    }
}
```

data 字段值说明:

**yesterdayEarnings:** 昨日收益;

**yesterdayEarningsCoin:** 昨日收益币种；

**totalAssets：** 总资产；

**totalAssetsCoin：** 总资产币种；

**totalValuationAssets：** 计价总资产；

**totalValuationAssetsCoin：** 计价总资产币种；

**earnings：** 收益列表；

​		**type:** 类型； 1：锁仓盈利 2：下级锁仓 3：直推奖励 4：推广解锁奖励 5：日销奖励

​		**remark:** 备注；

​		**income: **收入；

​		**coin:** 币种；

​		**prefix:** 前缀；1 :+ 0: -  ;



# 48. 设置昵称

## 48.1 基本描述

| 请求方式 | https POST   |
| -------- | ------------ |
| 请求地址 | /setNickName |
| 接口方式 | 同步         |
| 功能说明 | 设置昵称     |

## 48.2 请求参数

| 参数名   | 类型   | 必填 | 说明                        |
| -------- | ------ | ---- | --------------------------- |
| token    | string | 是   | 放在请求头里，用户登陆token |
| nickName | string | 是   | 昵称                        |

请求示例：

https://tcapp.scvip.vip/api/user/setNickName?nickName=爱因斯坦

## 48.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 48.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 49. 转账

## 49.1 基本描述

| 请求方式 | https POST |
| -------- | ---------- |
| 请求地址 | /transfer  |
| 接口方式 | 同步       |
| 功能说明 | 转账       |

## 49.2 请求参数

| 参数名     | 类型    | 必填 | 说明                                      |
| ---------- | ------- | ---- | ----------------------------------------- |
| token      | string  | 是   | 放在请求头里，用户登陆token               |
| toUid      | string  | 是   | 要转给的uid;                              |
| quota      | decimal | 是   | 额度                                      |
| coin       | string  | 是   | 币种；固定为BCB                           |
| fundPasswd | string  | 是   | 资金密码                                  |
| memo       | string  | 否   | 备注；建议填写 字段不能过长不超过50个汉字 |

请求示例：

https://tcapp.scvip.vip/api/user/transfer?toUid=dse4324&quota=100&coin=BCB&fundPasswd=fdsgwtdsafds

## 49.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 49.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 50. 转账记录

## 50.1 基本描述

| 请求方式 | https GET       |
| -------- | --------------- |
| 请求地址 | /transferRecord |
| 接口方式 | 同步            |
| 功能说明 | 转账记录        |

## 50.2 请求参数

| 参数名  | 类型    | 必填 | 说明                        |
| ------- | ------- | ---- | --------------------------- |
| token   | string  | 是   | 放在请求头里，用户登陆token |
| pageNum | integer | 否   | 当前页；默认第一页          |
| pageNum | integer | 否   | 每页大小,默认20条           |

请求示例：

https://tcapp.scvip.vip/api/project/transferRecord

## 50.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 50.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"rewr32432ds"
            "fromUid":"234dsfewrw",
            "toUid":"324dsfsdds",
            "amount":100,
            "coin":"BCB",
            "prefix":1,
            "createTime":"2020-01-18 12:23:23",
            "balance":100,
            "balanceCoin":"BCB",
            "status":1,
            "statusRemark":"成功",
            "capitalType":"支出",
            "memo":"备注"
        },
        {
            "orderId":"dsfdsewr324324"
            "fromUid":"234dsfewrw",
            "toUid":"324dsfsdds",
            "amount":100,
            "coin":"BCB",
            "prefix":0,
            "createTime":"2020-01-18 12:23:23",
            "balance":100,
            "balanceCoin":"BCB",
            "status":1,
            "statusRemark":"成功",
            "capitalType":"支出",
            "memo":"备注"
        }
    ]
}
```

data字段值说明：

**orderId:** 订单号；

**fromUid:** 支付Uid;

**toUid:** 目标Uid; 

**amount:** 额度；

**coin:** 币种；固定BCB；

**prefix:** 前缀符号；0:-，1:+，；

**createTime:** 创建时间；

**balance:** 当前可用额度；

**balanceCoin:** 可用额度币种；

**status:** 状态；

**statusRemark:** 状态描述；

**capitalType：** 资金类型；支出；收入；

**memo:** 备注；



# 51. 额度记录

## 51.1 基本描述

| 请求方式 | https GET    |
| -------- | ------------ |
| 请求地址 | /quotaRecord |
| 接口方式 | 同步         |
| 功能说明 | 额度记录     |

## 51.2 请求参数

| 参数名  | 类型    | 必填 | 说明                        |
| ------- | ------- | ---- | --------------------------- |
| token   | string  | 是   | 放在请求头里，用户登陆token |
| pageNum | integer | 否   | 当前页；默认第一页          |
| pageNum | integer | 否   | 每页大小,默认20条           |

请求示例：

https://tcapp.scvip.vip/api/project/quotaRecord

## 51.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 51.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"refdsgsag234dsfs",
            "fromUid":"234dsfewrw",
            "toUid":"324dsfsdds",
            "quota":100,
            "coin":"DC",
            "prefix":1,
            "createTime":"2020-01-18 12:23:23",
            "status":1,
            "statusRemark":"成功",
            "type":1,
            "typeRemark":"用户转账",
            "lockOrderId":null
        },
        {
            "orderId":"dsfsafdsa22r"
            "fromUid":"234dsfewrw",
            "toUid":null,
            "quota":100,
            "coin":"DC",
            "prefix":0,
            "createTime":"2020-01-18 12:23:23",
            "status":1,
            "statusRemark":"成功"
            "type":2,
            "typeRemark":"锁仓消费",
            "lockOrderId":"Sedfdsrew322432df"    
        }
    ]
}
```

data字段值说明：

**orderId:** 订单编号；

**fromUid:** 支付Uid;

**toUid:** 目标Uid; 

**quota:** 额度；

**coin:** 币种；固定DC；

**prefix:** 前缀符号；0:-，1:+，；

**createTime:** 创建时间；

**status:** 状态；

**statusReamrk:** 状态描述；

**type:** 1:用户转账 2:锁仓消费；用户转账时lockOrderId为null；锁仓消费时toUid为null；

**lockOrderId：** 锁仓订单号；

**typeRemark：** 用户转账/锁仓消费；



# 52. 账单详情

## 52.1 基本描述

| 请求方式 | https GET          |
| -------- | ------------------ |
| 请求地址 | /transactionDetail |
| 接口方式 | 同步               |
| 功能说明 | 账单详情           |

## 52.2 请求参数

| 参数名  | 类型    | 必填 | 说明                        |
| ------- | ------- | ---- | --------------------------- |
| token   | string  | 是   | 放在请求头里，用户登陆token |
| type    | integer | 是   | 类型                        |
| orderId | integer | 是   | 订单号                      |

请求示例：

https://tcapp.scvip.vip/api/project/transactionDetail?type=0&orderId=213sdsf32sfdsf

## 52.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 52.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data"://有4种结果类型
    type=0://充值
    {
        "orderId":"ewrdsr24432",
        "txhash":"tsdfsfdsgafs",
        "createTime":"2020-02-18 12:12:12",
        "payCoin":"DC",
        "payAmount":100,
        "exchangeRate":0.02,
        "gotAmount":5,
        "gotCoin":"BCB"
        "memo":"",
        "statusRemark":"成功",
        "status":1,
        "capitalType":"支出"，
        "balance":100,
        "balanceCoin":"BCB"
    }
    type=10://转账
    {
        "orderId":"ewrdsr24432",
        "fromUid":"2743637",
        "toUid":"3245325",
        "coin":"BCB",
        "amount":100,
        "createTime":"2020-02-18 12:12:12",
        "memo":"",
        "statusRemark":"成功"，
        "status":1,
        "capitalType":"收入",
        "balance":100,
        "balanceCoin":"BCB"
    }
     type=20://提现
    {
        "orderId":"ewrdsr24432",
        "txhash":"dsfew324324ddsdfds",
        "createTime":"2020-02-18 12:12:12",
        "coin":"BCB",
        "amount":100,
        "toAddress":"bcbdfsrewrdfdsf",
        "memo":"",
        "statusRemark":"成功"，
        "status":1,
        "capitalType":"支出",
        "balance":100,
        "balanceCoin":"BCB"
    }
     type=其他://其他类型
    {
        "orderId":"ewrdsr24432",
        "typeRemark":"充值",
        "createTime":"2020-02-18 12:12:12",
        "coin":"BCB",
        "amount":100,
        "valuationCoin":"DC",
        "valuationAmount":400,
        "memo":"",
        "statusRemark":"成功"，
        "status":1,
        "capitalType":"支出"，
        "exchangeRate":0.02,
        "balance":100,
        "balanceCoin":"BCB"
    }
}
```

data字段值说明：

**orderId:** 订单编号;

**txhash:** 区块交易凭证; 

**createTime:** 时间；

**payCoin:** 支付币种；

**payAmount:** 支付金额；

**exchangeRate：** 汇率；

**gotAmount：** 得到金额;BCB;

**memo:** 备注；

**statusRemark:** 状态描述；

**fromUid：** 发款Uid;

**toUid:** 收款Uid;

**coin：** 币种；

**amount:** 金额；

**valuationCoin:** 计价币种；

**valuationAmount:** 计价金额；

**toAddress:** 收款地址；

**typeRemark：** 收益类型；

**capitalType:** 资金类型;支出，收入；

**status:** 状态；

**balance:** 当前可用额度；

**balanceCoin:** 可用额度币种；



# 53. 设置备注

## 53.1 基本描述

| 请求方式 | https POST         |
| -------- | ------------------ |
| 请求地址 | /setNickNameRemark |
| 接口方式 | 同步               |
| 功能说明 | 上级给下级设置备注 |

## 52.2 请求参数

| 参数名         | 类型   | 必填 | 说明                        |
| -------------- | ------ | ---- | --------------------------- |
| token          | string | 是   | 放在请求头里，用户登陆token |
| childUid       | string | 是   | 下级uid                     |
| nickNameRemark | string | 是   | 备注；不超过6个汉字的长度   |

请求示例：

https://tcapp.scvip.vip/api/user/setNickNameRemark?childUid=3243280&nickNameRemark=小李

## 52.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 52.4 返回值样例

~~~~java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
~~~~



# 54. 获取app版本信息

## 54.1 基本描述

| 请求方式 | https GET       |
| -------- | --------------- |
| 请求地址 | /appVersion     |
| 接口方式 | 同步            |
| 功能说明 | 获取app版本信息 |

## 54.2 请求参数

| 参数名 | 类型   | 必填 | 说明                               |
| ------ | ------ | ---- | ---------------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token        |
| type   | string | 是   | app类型；ios：苹果 android：安卓； |
| lang   | string | 是   | 语言；en：英文 zh_CN：中文；       |

请求示例：

https://tcapp.scvip.vip/api/appVersion?type=ios&lang=en

## 54.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 54.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
        "force":false,
        "type":"ios",
        "version":"1",
        "url":"http://****",
        "versionDesc":"新增滑动功能",
        "modifyTime":"2020-02-24 12:12:12",
        "lang":"en"
    }
}
```

data字段值说明： <b>注意：如果没有获取到相关配置，也返回成功，data=null;</b>

**force:** false/true 是否强制；

**type:** app类型；ios：苹果 android：安卓；

**version：** 版本号；

**url：** 更新路径;

**versionDesc:** 版本描述；

**modifyTime：** 修改时间；

**lang：** 语言；en：英文 zh_CN：中文；



# 55. 锁仓最小金额

## 55.1 基本描述

| 请求方式 | https GET        |
| -------- | ---------------- |
| 请求地址 | /minLockAmount   |
| 接口方式 | 同步             |
| 功能说明 | 获取锁仓最小金额 |

## 55.2 请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/minLockAmount

## 55.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 55.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":100
}
```

data：最小锁仓金额；



# 56. 获取锁仓利率和推广解锁利率

## 56.1 基本描述

| 请求方式 | https GET                  |
| -------- | -------------------------- |
| 请求地址 | /lockRateAndPushReward     |
| 接口方式 | 同步                       |
| 功能说明 | 获取锁仓利率和推广解锁利率 |

## 56.2 请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/project/lockRateAndPushReward

## 56.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 56.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
                {
                     "type":1,
                    "typeRemark":"锁仓利率"，
                    "length":7,
                    "unit":1,
                    "rate":15,
                    "suffix":"%"
                },
         		{
                    "type":2,
                    "typeRemark":"推广解锁利率"，
                    "length":null,
                    "unit":null,
                    "rate":5,
                    "suffix":"%"
                }
       
    ]
}
```

data里面字段值说明：

**type:** 1:锁仓利率；2：推广解锁利率；

**typeRemark：** 类型描述；

**length:**  type=1时不为空!  锁仓长度；

**unit：** type=1时不为空!  单位；1：天 2：月 3：年；

**rate:**  利率；

**suffix:** 利率后缀; %;



# 57. 获取下级通讯录列表

## 57.1 基本描述

| 请求方式 | https GET          |
| -------- | ------------------ |
| 请求地址 | /childMailList     |
| 接口方式 | 同步               |
| 功能说明 | 获取下级通讯录列表 |

## 57.2 请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| nickName | string  | 否   | 备注                        |
| pageNum  | Integer | 否   | 默认第一页                  |
| pageSize | Integer | 否   | 默认一页20条                |

请求示例：

https://tcapp.scvip.vip/api/user/childMailList?nickName=二狗子

## 57.3 返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 57.4 返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
                {
                    "nickName":"小明",
                    "nickNameRemark":"二狗子"，
                    "tel":18133626941,
                    "uid":"72832742",
                    "generalizationCode":"DSFDSCDSNKJ32FDKSF"
                },
         		{
                    "nickName":"小明",
                    "nickNameRemark":"二狗子"，
                    "tel":18133626941,
                    "uid":"72832742",
                    "generalizationCode":"XZCSFSA2RXdsadsdsf"
                }
       
    ]
}
```

data里面字段值说明：

**nickName:**  用户昵称；

**nickNameRemark：** 用户备注（上级给下级的备注）；

**tel:**  手机号码；

**uid：** 用户id;

**nickNameRemark:**  用户推广码；



# 58. 销量达标奖励列表

## 58.1基本描述

| 请求方式 | https GET        |
| -------- | ---------------- |
| 请求地址 | /salesRewardList |
| 接口方式 | 同步             |
| 功能说明 | 销量达标奖励记录 |

## 58.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | Integer | 否   | 当前页                      |
| pageSize | Integer | 否   | 每页大小                    |

请求示例：

https://tcapp.scvip.vip/api/project/salesRewardList

## 58.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 58.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "reward":100,
            "rewardCoin":"BCB",
            "salesVolume:":100000,
            "salesVolumeCoin":"DC",
            "date":"2020-03-12 12:12:12"
        },
        {
            "reward":100,
            "rewardCoin":"BCB",
            "salesVolume:":10000,
            "salesVolumeCoin":"DC",
            "date":"2020-03-12 12:12:12"
        }
    ]
}
```

data 字段值说明：

**reward:**  奖励；

**rewardCoin:**  奖励币种；

**salesVolume:** 达标触发数量；

**salesVolumeCoin:**  达标触发数量币种；

**date:** 时间；



# 59. 是否已设置下级默认利率

## 59.1基本描述

| 请求方式 | https GET              |
| -------- | ---------------------- |
| 请求地址 | /existDefaultRate      |
| 接口方式 | 同步                   |
| 功能说明 | 是否已设置下级默认利率 |

## 59.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

请求示例：

https://tcapp.scvip.vip/api/user/existDefaultRate

## 59.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 59.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
        "existDefault":false,
        "defaultRateList":[
            {
             	 "type":1,
                 "length":180,
                 "unit":1,
                 "remark":"锁仓利率",
                 "suffix":"%",
                 "value":12
            },
            {
              	 "type":2,
                 "length":null,
                 "unit":null,
                 "remark":"推广解锁利率",
                 "suffix":"%",
                 "value":5
            }
        ]
    }
}
```

data 字段值说明：

**existDefault:**  是否已设置下级默认利率； true:已设置 false:没设置；

**defaultRateList:**  需要设置的利率列表；

​	**type：** 1：锁仓利率；2：推广解锁利率

​	**length：** 锁仓长度；

​	**unit:** 锁仓长度单位；

​	**remark:** 备注；

​	**suffix：**单位；

​	**value：** 下级默认利率的最大值，即上级的利率；



# 60. 设置下级默认利率

## 60.1基本描述

| 请求方式 | https POST       |
| -------- | ---------------- |
| 请求地址 | /defaultRateSet  |
| 接口方式 | 同步             |
| 功能说明 | 设置下级默认利率 |

## 60.2请求参数

| 参数名 | 类型   | 必填 | 说明                        |
| ------ | ------ | ---- | --------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token |

放在body体中的参数,body体中的参数需要是json结构类型：

| 参数名 | 类型    | 必填 | 说明                                           |
| ------ | ------- | ---- | ---------------------------------------------- |
| type   | Integer | 是   | 类型；1:锁仓利率 2: 推广解锁利率               |
| length | Integer | 是   | 锁仓长度；type=1时不为空；                     |
| unit   | Integer | 是   | 锁仓长度单位；1:天 2:月 3:年；type=1时不为空； |
| value  | decimal | 是   | 所设置的值                                     |

请求示例：

https://tcapp.scvip.vip/api/user/defaultRateSet

放在请求body体中json结构类型的参数：

```java
[
    {
        "type":1,
        "length":180,
        "unit":1,
        "value":2.5
	},
    {
        "type":2,
        "length":null,
        "unit":null,
        "value":2.9
	}
]
```



## 60.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 60.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":null
}
```



# 61. 充值汇率

## 61.1基本描述

| 请求方式 | https GET     |
| -------- | ------------- |
| 请求地址 | /rechargeRate |
| 接口方式 | 同步          |
| 功能说明 | 获取充值汇率  |

## 61.2请求参数

| 参数名 | 类型   | 必填 | 说明                                                |
| ------ | ------ | ---- | --------------------------------------------------- |
| token  | string | 是   | 放在请求头里，用户登陆token                         |
| coin   | string | 是   | 充值币种;   <b>如果币种为BCB则不需要查询汇率；</b>> |

请求示例：

https://tcapp.scvip.vip/api/project/rechargeRate?coin=DC

## 61.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 61.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":{
            "rate":42,
            "fromCoin":"DC",
            "toCoin":"BCB",
            "date":"2020-01-13"
        }
}
```

data 字段值说明：

**rate:** 汇率;

**fromCoin:** 支付币种，如DC。

**toCoin:** 获得币种，如BCB；

**date:** 日期。



# 62. 最新锁仓信息

## 62.1基本描述

| 请求方式 | https GET      |
| -------- | -------------- |
| 请求地址 | /newLockOrders |
| 接口方式 | 同步           |
| 功能说明 | 新锁仓消息     |

## 62.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | Integer | 否   | 当前页                      |
| pageSize | Integer | 否   | 每页多少数据                |

请求示例：

https://tcapp.scvip.vip/api/project/newLockOrders?pageNum=1&pageSize=5

## 62.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 62.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "uid":"24324324",
            "amount":100,
            "coin":"BCB"
        },
        {
            "uid":"24324324",
            "amount":200,
            "coin":"BCB"
        }
    ]
}
```

data 字段值说明：

**uid:** 用户uid;

**amount:**  锁仓金额;

**coin:** 币种，如BCB;



# 63. 可贷款锁仓订单

## 63.1基本描述

| 请求方式 | https GET          |
| -------- | ------------------ |
| 请求地址 | /couldLoanLockList |
| 接口方式 | 同步               |
| 功能说明 | 可贷款锁仓订单     |

## 63.2请求参数

| 参数名   | 类型    | 必填 | 说明                        |
| -------- | ------- | ---- | --------------------------- |
| token    | string  | 是   | 放在请求头里，用户登陆token |
| pageNum  | Integer | 否   | 当前页                      |
| pageSize | Integer | 否   | 每页多少数据                |

请求示例：

https://tcapp.scvip.vip/api/project/couldLoanLockList?pageNum=1&pageSize=5

## 63.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 63.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data":[
        {
            "orderId":"24dsagdsag324324",
            "endDate":"2020-03-24",
            "lockValue":10000,
            "lockValueCoin":"DC",
            "minLoanAmount":1000,
            "minLoanAmountCoin":"DC",
            "maxLoanAmount":3000,
            "maxLoanAmountCoin":"DC",
            "maxLoanDays":60
        },
        {
            "orderId":"243243dsds24",
            "endDate":"2020-03-24",
            "lockValue":10000,
            "lockValueCoin":"DC",
            "minLoanAmount":1000,
            "minLoanAmountCoin":"DC",
            "maxLoanAmount":3000,
            "maxLoanAmountCoin":"DC",
            "maxLoanDays":60
        }
    ]
}
```

data 字段值说明：

**orderId:**  锁仓订单号;

**endDate:**  锁仓到期时间;

**lockValue:** 锁仓价值;

**lockValueCoin:** 锁仓价值币种；

**minLoanAmount：** 最小贷款金额；

**minLoanAmountCoin:** 最小贷款金额币种；

**maxLoanAmount：** 最大贷款金额；

**maxLoanAmountCoin:** 最大贷款金额币种；

**maxLoanDays：**最长贷款天数；



# 64. 根据锁仓订单号查询贷款详情

## 64.1基本描述

| 请求方式 | https GET                  |
| -------- | -------------------------- |
| 请求地址 | /loanOrderDetails          |
| 接口方式 | 同步                       |
| 功能说明 | 根据锁仓订单号查询贷款详情 |

## 64.2请求参数

| 参数名      | 类型    | 必填 | 说明                        |
| ----------- | ------- | ---- | --------------------------- |
| token       | string  | 是   | 放在请求头里，用户登陆token |
| lockOrderId | Integer | 是   | 锁仓订单号                  |

请求示例：

https://tcapp.scvip.vip/api/project/loanOrderDetails?lockOrderId=FDSAAGA242432

## 64.3返回结果

| 字段名  | 类型    | 说明                                                         |
| ------- | ------- | ------------------------------------------------------------ |
| code    | string  | 返回码，0表示成功，其他表示错误；其中999为登陆失效，需重新登陆 |
| message | string  | 返回码的文字说明                                             |
| data    | object  | 一个对象，用于携带一些额外的返回信息                         |
| success | boolean | true:成功 false:失败                                         |

## 64.4返回值样例

```java
{
    "success":true,
    "code": 0,
    "message": "ok",
    "data": {
                "orderId":"dsfafdsafsf",
                "lockOrderId":"dsfgsgfsagdsafds",
                "mortgageValuationAmount":10000,
                "mortgageValuationCoin":"DC",
                "loanValuationAmount":3000,
                "loanValuationCoin":"DC",
                "rate":11.2,
                "applyTime":"2020-03-24 23:23:23",
                "lendTime":"2020-03-24 23:23:23",
                "lendExchangeRate":1.2,
                "fromCoin":"BCB",
                "toCoin":"DC",
                "lendAmount":1500,
                "lendAmountCoin":"BCB",
                "estimatedRepayDate":"2020-03-24",
                "totalInterest":200,
                "totalInterestCoin":"DC",
                "shouldReturn":3200,
                "shouldReturnCoin":"DC",
                "repaymentExchangeRate":12,
                "actualRepayment":1503,
                "actualRepaymentCoin":"BCB",
                "status":50,
                "remark":"订单结束"    
    	}
}
```

data 字段值说明：

**orderId:**  贷款订单号;

**lockOrderId:**  质押锁仓订单号；

**mortgageValuationAmount:** 抵押计价金额;

**mortgageValuationCoin:**  抵押计价币种；

**loanValuationAmount:** 贷款价值；

**loanValuationCoin：** 贷款价值币种；

**rate:** 贷款年利率;

**applyTime:**申请时间；

**lendTime：** 放款时间；

**lendExchangeRate：** 放款汇率；

**fromCoin：** from币种；

**toCoin:** to币种；

**lendAmount:** 放款币种数量；

**lendAmountCoin:** 放款币种BCB;

**estimatedRepayDate：** 预计还款日期；

**totalInterest：** 利息总计；

**totalInterestCoin：** 利息总计币种；

**shouldReturn:** 应还本息；

**shouldReturnCoin：** 应还本息币种；

**repaymentExchangeRate：**还款汇率；

**actualRepayment：** 实际还款价值；

**actualRepaymentCoin：** 实际还款价值币种；

**status:** 状态；

**remark:** 状态描述；





# 返回码说明

| 1      | 成功                        |
| ------ | --------------------------- |
| 返回码 | 说明                        |
| -2     | 系统繁忙                    |
| 998    | 服务器忙                    |
| 999    | 登录失效,请重新登录         |
| 1050   | 验证码请求频繁              |
| 1051   | 短信发送失败                |
| 1052   | 验证码校验失败              |
| 1053   | 无效的用户                  |
| 1054   | 账户或密码错误              |
| 1055   | 手机号已被使用              |
| 1056   | 无效的推广码                |
| 1057   | 行为验证失败                |
| 1058   | 不能重复添加相同地址        |
| 1059   | 用户未激活                  |
| 1060   | 重置资金密码后24h内不可操作 |
| 1061   | 系统繁忙,请稍后重试         |
| 1062   | 锁仓额度不足                |
| 1063   | 获取资金币账户失败          |
| 1064   | 余额不足                    |
| 1065   | 上笔锁仓正在进行中,请稍后   |
| 1066   | 非法的锁仓请求              |
| 1067   | 非法的请求利率              |
| 1068   | 没有获取到用户额度          |
| 1069   | 无效的订单号                |
| 1070   | 无效的下级                  |
| 1071   | 代理关系非法                |
| 1072   | 锁仓利率设置非法            |
| 1073   | 推广解锁设置非法            |
| 1074   | 资金密码未设置              |
| 1075   | 账户已锁定,24h内不可操作    |
| 1076   | 获取今日汇率失败            |
| 1077   | 资金密码错误                |
| 1078   | 参数不完整                  |
| 1079   | 账号格式非法                |
| 1080   | 账号类型非法                |
| 1081   | 暂不支持该币种              |
| 1082   | 不是合法的BCB地址           |
| 1083   | 金额不合法                  |
| 1084   | 输入金额太小                |
| 1085   | 参数不合法                  |
| 1086   | 交易类型不合法              |
| 1087   | 贷款额度不足                |
| 1088   | 密码不能为空                |
| 1089   | 获取充币地址失败            |
| 1090   | 提现失败                    |
| 1091   | 贷款失败                    |
| 1092   | 还款失败                    |
| 1093   | 锁仓利率还未设置不可锁仓    |
| 1094   | 申请使用资金失败            |
| 1095   | 冻结资金失败                |
| 1096   | 转账失败                    |
| 1097   | 暂不支持该请求类型          |
| 1098   | 获取最小锁仓额度失败        |
| 1099   | 接收方未激活                |
| 1100   | 获取版本信息失败            |
| 1101   | 顶级用户,不可退额度         |

















