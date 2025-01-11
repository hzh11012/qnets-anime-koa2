# 新番导视

## 接口前缀

```shell
http://localhost:5200/api/anime_guide
```

## 添加新番导视 - 管理员

> scope = 3

```
POST    /admin/create
```

### 参数说明

| 参数        | 类型          | 默认值 | 是否必填 | 说明         |
| ----------- | ------------- | ------ | -------- | ------------ |
| id          | `number`      | -      | ✅       | 动漫ID       |
| update_day  | `number(1-7)` | -      | ✅       | 动漫更新日期 |
| update_time | `string`      | -      | ✅       | 动漫更新时间 |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "添加新番导视成功"
}
```

## 新番导视列表

> scope >= 1

```
POST    /list
```

### 参数说明

| 参数       | 类型              | 默认值         | 是否必填 | 说明                                 |
| ---------- | ----------------- | -------------- | -------- | ------------------------------------ |
| page       | `number`          | 1              | -        | 分页，从 1 开始                      |
| pageSize   | `number`          | 10             | -        | 每页数量                             |
| order      | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                             |
| orderBy    | `string`          | `'created_at'` | -        | 排序方式                             |
| keyword    | `string`          | -              | -        | 搜索关键字，搜索范围为`'Anime.name'` |
| update_day | `number(1-7)[]`   | -              | -        | 更新日期                             |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取新番导视列表成功",
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 21,
                "anime_id": 2,
                "title": "再见人生、你好龙生",
                "description": "有一天，最古老的神龙被人类讨伐了。历经悠久的岁月，力量强大到足以令诸神跪拜的龙，在孤独之中接受了自己的死亡。但当龙再次回过神来时，他已经获得了身为边境村民多兰的第二人生。",
                "cover_url": "https://localhost:5200/images/banner.png",
                "remark": "少女万岁、摇滚万岁",
                "status": 1,
                "update_day": 5,
                "update_time": "12:03",
                "created_at": "2024-11-30 20:49:30"
            }
        ]
    }
}
```

## 新番导视删除 - 管理员

> scope = 3

```
POST    /admin/delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明       |
| ---- | -------- | ------ | -------- | ---------- |
| id   | `number` | -      | ✅       | 新番导视ID |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "删除新番导视成功"
}
```
