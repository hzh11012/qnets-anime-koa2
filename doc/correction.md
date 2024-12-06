## 接口前缀

```shell
http://localhost:5200/api/correct
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

# 纠错信息

## 创建纠错信息

> scope = 1

```
POST    /create
```

### 参数说明

| 参数    | 类型     | 默认值 | 是否必填 | 说明         |
| ------- | -------- | ------ | -------- | ------------ |
| message | `string` | -      | ✅       | 纠错信息内容 |

### 成功操作返回

```json
{
    "msg": "提交纠错信息成功",
    "code": 200,
    "errorCode": 0
}
```

## 纠错信息列表 - 管理员

> scope = 3

```
POST    /admin_list
```

### 参数说明

| 参数     | 类型              | 默认值         | 是否必填 | 说明                             |
| -------- | ----------------- | -------------- | -------- | -------------------------------- |
| page     | `number`          | 1              | -        | 分页，从 1 开始                  |
| pageSize | `number`          | 10             | -        | 每页数量                         |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                         |
| orderBy  | `string`          | `'created_at'` | -        | 排序方式                         |
| status   | `number[]`        | -              | -        | 纠错信息状态， 0-待处理 1-已完成 |
| type     | `string`          | `'message'`    | -        | 搜索范围                         |
| keyword  | `string`          | -              | -        | 搜索关键字                       |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取纠错信息列表成功",
    "errorCode": 0,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 18,
                "uid": 1,
                "message": "我是纠错信息",
                "status": 0,
                "created_at": "2024-11-25 19:56:35",
                "nickname": "日常一号突击手Mio"
            }
        ]
    }
}
```

## 纠错信息删除 - 管理员

> scope = 3

```
POST    /admin_delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明       |
| ---- | -------- | ------ | -------- | ---------- |
| id   | `number` | -      | ✅       | 纠错信息id |

### 成功操作返回

```json
{
    "msg": "删除纠错信息成功",
    "code": 200,
    "errorCode": 0
}
```

## 纠错信息修改 - 管理员

> scope = 3

```
POST    /admin_edit
```

### 参数说明

| 参数    | 类型     | 默认值 | 是否必填 | 说明                            |
| ------- | -------- | ------ | -------- | ------------------------------- |
| id      | `number` | -      | ✅       | 纠错信息id                      |
| message | `string` | -      | ✅       | 纠错信息内容                    |
| status  | `number` | -      | ✅       | 纠错信息状态，0-待处理 1-已完成 |

### 成功操作返回

```json
{
    "msg": "修改纠错信息成功",
    "code": 200,
    "errorCode": 0
}
```
