## 接口前缀

```shell
http://localhost:5200/api/danmaku
```

## 接口鉴权

> 接口无特殊说明，必须携带token

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

# 弹幕

## 弹幕列表 - 管理员

> scope = 3

```
POST    /list
```

### 参数说明

| 参数     | 类型     | 默认值 | 是否必填 | 说明            |
| -------- | -------- | ------ | -------- | --------------- |
| page     | `number` | 1      | -        | 分页，从 1 开始 |
| pageSize | `number` | 10     | -        | 每页数量        |
| keyword  | `string` | -      | -        | 搜索关键字      |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取弹幕列表成功",
    "errorCode": 0,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": "9bf4392bdea9d7452caeec423ed725f7",
                "content": "这是一条弹幕",
                "time_dot": "00:14:41",
                "color": "#ffffff",
                "source": "https://localhost.qnets.cn/?url=https://localhost.qnets.cn/index.m3u8",
                "ip": "123.143.136.182",
                "del_id": "47",
                "created_at": "2024-10-08 02:15"
            }
        ]
    }
}
```

## 弹幕删除 - 管理员

> scope = 3

```
POST    /delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明       |
| ---- | -------- | ------ | -------- | ---------- |
| id   | `string` | -      | ✅       | 弹幕删除id |

### 成功操作返回

```json
{
    "msg": "删除弹幕成功",
    "code": 200,
    "errorCode": 0
}
```
