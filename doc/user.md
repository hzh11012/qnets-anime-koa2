## 接口前缀

```shell
http://localhost:5200/api/
```

# 用户

## 用户信息

```
GET    /user/info
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
    url: 'http://localhost:5200/api/user/info',
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
        "phone": "166****6241",
        "scope": 0,
        "nickname": "用户25244885",
        "avatar": null,
        "created_at": "2024-11-14 11:33:00"
    }
}
```
