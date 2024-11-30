## 接口前缀

```shell
http://localhost:5200/api/video_category
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

# 视频分类

## 创建视频分类 - 管理员

> scope = 3

```
POST    /admin_create
```

### 参数说明

| 参数     | 类型     | 默认值 | 说明       |
| -------- | -------- | ------ | ---------- |
| category | `string` |        | 视频分类名 |

### 成功操作返回

```json
{
    "msg": "创建视频分类成功",
    "code": 200,
    "errorCode": 0
}
```

## 视频分类列表 - 管理员

> scope = 3

```
POST    /admin_list
```

### 参数说明

| 参数     | 类型              | 默认值         | 说明            |
| -------- | ----------------- | -------------- | --------------- |
| page     | `number`          | 1              | 分页，从 1 开始 |
| pageSize | `number`          | 10             | 每页数量        |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | 排序字段        |
| orderBy  | `string`          | `'created_at'` | 排序方式        |
| type     | `string`          | `'category'`   | 搜索范围        |
| keyword  | `string`          |                | 搜索关键字      |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取视频分类列表成功",
    "errorCode": 0,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 21,
                "category": "异世界",
                "created_at": "2024-11-30 20:49:30",
                "created_by": "日常一号突击手Mio"
            }
        ]
    }
}
```

## 视频分类删除 - 管理员

> scope = 3

```
POST    /admin_delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 说明       |
| ---- | -------- | ------ | ---------- |
| id   | `number` |        | 视频分类id |

### 成功操作返回

```json
{
    "msg": "删除视频分类成功",
    "code": 200,
    "errorCode": 0
}
```
