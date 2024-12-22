## 接口前缀

```shell
http://localhost:5200/api/banner
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

# 动漫轮播图

## 创建动漫轮播图 - 管理员

> scope = 3

```
POST    /admin_create
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | -        | 动漫ID |

### 成功操作返回

```json
{
    "msg": "创建动漫分类成功",
    "code": 200,
    "errorCode": 0
}
```

## 动漫轮播图列表

> scope = 1

```
POST    /list
```

### 参数说明

| 参数     | 类型              | 默认值         | 是否必填 | 说明                                 |
| -------- | ----------------- | -------------- | -------- | ------------------------------------ |
| page     | `number`          | 1              | -        | 分页，从 1 开始                      |
| pageSize | `number`          | 10             | -        | 每页数量                             |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                             |
| orderBy  | `string`          | `'created_at'` | -        | 排序方式                             |
| keyword  | `string`          | -              | -        | 搜索关键字，搜索范围为`'Anime.name'` |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取动漫轮播图列表成功",
    "errorCode": 0,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 21,
                "aid": 2,
                "title": "再见人生、你好龙生",
                "description": "有一天，最古老的神龙被人类讨伐了。历经悠久的岁月，力量强大到足以令诸神跪拜的龙，在孤独之中接受了自己的死亡。但当龙再次回过神来时，他已经获得了身为边境村民多兰的第二人生。",
                "banner_url": "https://localhost:5200/images/banner.png",
                "type": 1,
                "created_at": "2024-11-30 20:49:30"
            }
        ]
    }
}
```

## 动漫轮播图删除 - 管理员

> scope = 3

```
POST    /admin_delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 动漫id |

### 成功操作返回

```json
{
    "msg": "删除动漫轮播图成功",
    "code": 200,
    "errorCode": 0
}
```
