## 接口前缀

```shell
http://localhost:5200/api/collection
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

# 收藏

## 创建收藏

> scope = 1

```
POST    /create
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 动漫id |

### 成功操作返回

```json
{
    "msg": "收藏成功",
    "code": 200,
    "errorCode": 0
}
```

## 收藏列表

> scope = 1

```
POST    /list
```

### 参数说明

| 参数     | 类型              | 默认值         | 是否必填 | 说明                                    |
| -------- | ----------------- | -------------- | -------- | --------------------------------------- |
| page     | `number`          | 1              | -        | 分页，从 1 开始                         |
| pageSize | `number`          | 10             | -        | 每页数量                                |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                                |
| orderBy  | `string`          | `'created_at'` | -        | 排序方式                                |
| keyword  | `string`          | -              | -        | 搜索关键字，搜索范围为`'user.nickname'` |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取收藏列表成功",
    "errorCode": 0,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 4,
                "uid": 1,
                "aid": 2,
                "nickname": "日常一号突击手Mio",
                "anime": {
                    "name": "xxx",
                    "cover": "http://loclahost:9999/67503f5d43d71.jpg",
                    "remark": null,
                    "status": 2,
                    "type": 3
                },
                "created_at": "2024-12-10 10:56:56"
            }
        ]
    }
}
```

## 收藏列表 - 管理员

> scope = 3

```
POST    /admin_list
```

### 参数说明

| 参数     | 类型              | 默认值         | 是否必填 | 说明                                                  |
| -------- | ----------------- | -------------- | -------- | ----------------------------------------------------- |
| page     | `number`          | 1              | -        | 分页，从 1 开始                                       |
| pageSize | `number`          | 10             | -        | 每页数量                                              |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                                              |
| orderBy  | `string`          | `'created_at'` | -        | 排序方式                                              |
| keyword  | `string`          | -              | -        | 搜索关键字，搜索范围为`'user.nickname'、'anime.name'` |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取收藏列表成功",
    "errorCode": 0,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 4,
                "uid": 1,
                "aid": 2,
                "nickname": "日常一号突击手Mio",
                "anime": {
                    "name": "xxx",
                    "cover": "http://loclahost:9999/67503f5d43d71.jpg",
                    "remark": null,
                    "status": 2,
                    "type": 3
                },
                "created_at": "2024-12-10 10:56:56"
            }
        ]
    }
}
```

## 取消收藏

> scope = 1

```
POST    /cancel
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 动漫id |

### 成功操作返回

```json
{
    "msg": "取消收藏成功",
    "code": 200,
    "errorCode": 0
}
```

## 取消收藏 - 管理员

> scope = 3

```
POST    /cancel
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 收藏id |

### 成功操作返回

```json
{
    "msg": "取消收藏成功",
    "code": 200,
    "errorCode": 0
}
```
