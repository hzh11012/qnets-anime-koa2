## 接口前缀

```shell
http://localhost:5200/api/
```

# 管理员

## 管理员注册

> 部署线上建议屏蔽掉此注册接口

```
POST    /admin/register
```

### 参数说明

| 参数     | 说明   | 是否必填 |
| -------- | ------ | :------: |
| phone    | 手机号 |    是    |
| password | 密码   |    是    |

### 成功操作返回

```json
{
    "msg": "注册成功",
    "code": 200,
    "errorCode": 0
}
```

## 管理员登录

```
POST    /admin/login
```

### 参数说明

| 参数     | 说明   | 是否必填 |
| -------- | ------ | :------: |
| phone    | 手机号 |    是    |
| password | 密码   |    是    |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "登录成功",
    "errorCode": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjoyLCJpYXQiOjE3Mjg4MTc1MTEsImV4cCI6MTcyODgyMTExMX0.CXJXF3W7MvhS3HGv6FjcD79zroGAhYEX8SVB4u4Rajg"
    }
}
```

## 管理员信息

```
POST    /admin/info
```

### 参数说明

无

### 必需携带token

在 Postman 软件里选择 Authorization，Type选择Basic Auth，Username 填写上token值即可。

在代码中需要在header上携带token：

```js
// 转码 token
// 需要安装一下base64: npm install js-base64
import {Base64} from 'js-base64';
function _encode() {
    const token = localStorage.getItem('token');
    const base64 = Base64.encode(token + ':');
    return 'Basic ' + base64;
}

// 代码示例：重点看header携带 Authorization Basic + token
ajax({
    url: 'http://localhost:5200/api/admin/info',
    method: 'GET',
    success: res => {
        console.log(res.data);
    },
    header: {
        Authorization: _encode()
    }
});

// 在 axios 携带token
config.headers['Authorization'] = _encode();
```

### 成功操作返回

```json
{
	"code": 200,
	"msg": "success",
	"errorCode": 0,
	"data": {
		"id": 1,
		"phone": "18585848833",
		"nickname": "Qnets"
	}
}
```
