## 接口前缀

```shell
http://localhost:5200/api/anime
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

# 动漫

## 创建动漫 - 管理员

> scope = 3

```
POST    /admin_create
```

### 参数说明

| 参数        | 类型         | 默认值 | 是否必填 | 说明                                             |
| ----------- | ------------ | ------ | -------- | ------------------------------------------------ |
| name        | `string(50)` | -      | ✅       | 动漫名称                                         |
| description | `string`     | -      | ✅       | 动漫简介                                         |
| cover       | `string`     | -      | ✅       | 动漫封面                                         |
| remark      | `string(50)` | -      | -        | 动漫备注                                         |
| status      | `number`     | -      | ✅       | 动漫状态 0-即将上线 1-连载中 2-已完结            |
| type        | `number`     | -      | ✅       | 动漫类型 0-剧场版 1-日番 2-美番 3-里番           |
| director    | `string(25)` | -      | -        | 动漫导演                                         |
| cv          | `string`     | -      | -        | 动漫声优                                         |
| year        | `string(4)`  | -      | ✅       | 动漫发行年份 格式为YYYY                          |
| month       | `number`     | -      | ✅       | 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番 |
| category    | `number[]`   | -      | ✅       | 动漫分类，可指定多个分类id                       |

### 成功操作返回

```json
{
    "msg": "创建动漫成功",
    "code": 200,
    "errorCode": 0
}
```

## 动漫列表

> scope = 1 普通用户会限制部分内容的展示

```
POST    /list
```

### 参数说明

| 参数       | 类型              | 默认值         | 是否必填 | 说明                                             |
| ---------- | ----------------- | -------------- | -------- | ------------------------------------------------ |
| page       | `number`          | 1              | -        | 分页，从 1 开始                                  |
| pageSize   | `number`          | 10             | -        | 每页数量                                         |
| order      | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                                         |
| orderBy    | `string`          | `'created_at'` | -        | 排序方式                                         |
| searchType | `string`          | `'name'`       | -        | 搜索范围                                         |
| keyword    | `string`          | -              | -        | 搜索关键字                                       |
| status     | `number[]`        | -              | -        | 动漫状态 0-即将上线 1-连载中 2-已完结            |
| type       | `number[]`        | -              | -        | 动漫类型 0-剧场版 1-日番 2-美番 3-里番           |
| year       | `string[]`        | -              | -        | 动漫发行年份 格式为YYYY                          |
| month      | `number[]`        | -              | -        | 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番 |
| category   | `number[]`        | -              | -        | 动漫分类，可指定多个分类id                       |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取动漫列表成功",
    "errorCode": 0,
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 1,
                "name": "动漫",
                "description": "我是动漫简介",
                "cover": "https://localhost.qnets.cn/2024/12/04/cover.jpg",
                "remark": null,
                "status": 2,
                "type": 3,
                "director": null,
                "cv": null,
                "year": "2023",
                "month": 3,
                "categories": [
                    {
                        "id": 1,
                        "category": "分类1"
                    },
                    {
                        "id": 2,
                        "category": "分类2"
                    }
                ],
                "created_at": "2024-12-05 19:26:04"
            }
        ]
    }
}
```

## 动漫分类删除 - 管理员

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
    "msg": "删除动漫成功",
    "code": 200,
    "errorCode": 0
}
```

## 修改动漫 - 管理员

> scope = 3

```
POST    /admin_edit
```

### 参数说明

| 参数        | 类型         | 默认值 | 是否必填 | 说明                                             |
| ----------- | ------------ | ------ | -------- | ------------------------------------------------ |
| name        | `string(50)` | -      | ✅       | 动漫名称                                         |
| description | `string`     | -      | ✅       | 动漫简介                                         |
| cover       | `string`     | -      | ✅       | 动漫封面                                         |
| remark      | `string(50)` | -      | -        | 动漫备注                                         |
| status      | `number`     | -      | ✅       | 动漫状态 0-即将上线 1-连载中 2-已完结            |
| type        | `number`     | -      | ✅       | 动漫类型 0-剧场版 1-日番 2-美番 3-里番           |
| director    | `string(25)` | -      | -        | 动漫导演                                         |
| cv          | `string`     | -      | -        | 动漫声优                                         |
| year        | `string(4)`  | -      | ✅       | 动漫发行年份 格式为YYYY                          |
| month       | `number`     | -      | ✅       | 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番 |
| category    | `number[]`   | -      | ✅       | 动漫分类，可指定多个分类id                       |

### 成功操作返回

```json
{
    "msg": "修改动漫成功",
    "code": 200,
    "errorCode": 0
}
```
