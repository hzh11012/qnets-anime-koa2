# 动漫轮播图

## 接口前缀

```shell
http://localhost:5200/api/anime_banner
```

## 创建动漫轮播图 - 管理员

> scope = 3

```
POST    /admin/create
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | -        | 动漫ID |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "创建动漫轮播图成功"
}
```

## 动漫轮播图列表 - 管理员

> scope = 3

```
POST    /admin/list
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
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 21,
                "anime_id": 2,
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

## 动漫轮播图列表

> scope >= 1

```
GET    /list
```

### 参数说明

无

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取动漫轮播图列表成功",
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 21,
                "anime_id": 2,
                "title": "再见人生、你好龙生",
                "description": "有一天，最古老的神龙被人类讨伐了。历经悠久的岁月，力量强大到足以令诸神跪拜的龙，在孤独之中接受了自己的死亡。但当龙再次回过神来时，他已经获得了身为边境村民多兰的第二人生。",
                "banner_url": "https://localhost:5200/images/banner.png",
                "is_collected": false,
                "latest_video": {
                    "id": 21,
                    "episode": 2,
                    "title": "禁忌"
                }
            }
        ]
    }
}
```

## 动漫轮播图删除 - 管理员

> scope = 3

```
POST    /admin/delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 动漫id |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "删除动漫轮播图成功"
}
```
