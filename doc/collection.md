# 收藏

## 接口前缀

```shell
http://localhost:5200/api/collection
```

## 创建收藏

> scope >= 1

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
    "code": 200,
    "msg": "收藏成功"
}
```

## 收藏列表 - 管理员

> scope = 3

```
POST    /admin/list
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
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 4,
                "user_id": 1,
                "anime_id": 2,
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

## 取消收藏

> scope >= 1

```
POST    /delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 动漫id |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "取消收藏成功"
}
```

## 取消收藏 - 管理员

> scope = 3

```
POST    /delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 收藏id |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "取消收藏成功"
}
```
