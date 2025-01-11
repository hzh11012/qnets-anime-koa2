# 评分

## 接口前缀

```shell
http://localhost:5200/api/rating
```

## 创建评分

> scope >= 1

```
POST    /create
```

### 参数说明

| 参数    | 类型     | 默认值 | 是否必填 | 说明     |
| ------- | -------- | ------ | -------- | -------- |
| id      | `number` | -      | ✅       | 动漫id   |
| score   | `number` | -      | ✅       | 评分分数 |
| content | `string` | -      | ✅       | 评分内容 |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "评分成功"
}
```

## 评分列表 - 管理员

> scope = 3

```
POST    /admin/list
```

### 参数说明

| 参数     | 类型              | 默认值         | 是否必填 | 说明                                                             |
| -------- | ----------------- | -------------- | -------- | ---------------------------------------------------------------- |
| page     | `number`          | 1              | -        | 分页，从 1 开始                                                  |
| pageSize | `number`          | 10             | -        | 每页数量                                                         |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                                                         |
| orderBy  | `string`          | `'created_at'` | -        | 排序方式                                                         |
| keyword  | `string`          | -              | -        | 搜索关键字，搜索范围为`'user.nickname'、'anime.name'、'content'` |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取评分列表成功",
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 4,
                "user_id": 1,
                "anime_id": 2,
                "score": 5,
                "content": "这部动漫的非常棒！",
                "nickname": "日常一号突击手Mio",
                "anime": {
                    "name": "xxx",
                    "cover_url": "http://loclahost:9999/67503f5d43d71.jpg",
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

## 删除评分 - 管理员

> scope = 3

```
POST    /admin/delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 评分id |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "删除评分成功"
}
```
