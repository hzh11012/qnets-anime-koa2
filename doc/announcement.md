# 公告

## 接口前缀

```shell
http://localhost:5200/api/announcement
```

## 创建公告 - 管理员

> scope = 3

```
POST    /admin/create
```

### 参数说明

| 参数    | 类型           | 默认值 | 是否必填 | 说明     |
| ------- | -------------- | ------ | -------- | -------- |
| title   | `string(25)`   | -      | ✅       | 公告标题 |
| content | `string(1000)` | -      | ✅       | 公告内容 |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "创建公告成功"
}
```

## 公告列表 - 管理员

> scope = 3

```
POST    /admin/list
```

### 参数说明

| 参数     | 类型              | 默认值         | 是否必填 | 说明                                       |
| -------- | ----------------- | -------------- | -------- | ------------------------------------------ |
| page     | `number`          | 1              | -        | 分页，从 1 开始                            |
| pageSize | `number`          | 10             | -        | 每页数量                                   |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                                   |
| orderBy  | `string`          | `'created_at'` | -        | 排序方式                                   |
| keyword  | `string`          | -              | -        | 搜索关键字，搜索范围为`'title'、'content'` |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取公告列表成功",
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 6,
                "title": "我是公告标题",
                "content": "我是公告内容！！！！",
                "created_at": "2024-12-05 21:56:35"
            }
        ]
    }
}
```

## 公告删除 - 管理员

> scope = 3

```
POST    /admin/delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 公告id |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "删除公告成功"
}
```

## 标记公告已读

> scope >= 1

```
POST    /read
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 公告ID |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "标记公告已读成功"
}
```

## 用户公告列表

> scope >= 1

```
POST    /user/list
```

### 参数说明

| 参数     | 类型              | 默认值         | 是否必填 | 说明                                                                 |
| -------- | ----------------- | -------------- | -------- | -------------------------------------------------------------------- |
| page     | `number`          | 1              | -        | 分页，从 1 开始                                                      |
| pageSize | `number`          | 10             | -        | 每页数量                                                             |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                                                             |
| orderBy  | `string`          | `'created_at'` | -        | 排序方式                                                             |
| keyword  | `string`          | -              | -        | 搜索关键字，搜索范围为`'Announcement.title'、'Announcement.content'` |
| is_read  | `boolean[]`       | -              | -        | 是否已读                                                             |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取用户公告列表成功",
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 6,
                "user_id": 1,
                "announcement_id": 4,
                "nickname": "日常一号突击手Mio",
                "title": "我是公告标题",
                "content": "我是公告内容！！！！",
                "is_read": true,
                "created_at": "2024-12-05 21:56:35"
            }
        ]
    }
}
```

## 删除用户公告

> scope >= 1

```
POST    /user/delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 公告ID |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "删除用户公告成功"
}
```
