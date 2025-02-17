# 动漫

## 接口前缀

```shell
http://localhost:5200/api/anime
```

## 创建动漫 - 管理员

> scope = 3

```
POST    /admin/create
```

### 参数说明

| 参数        | 类型           | 默认值            | 是否必填 | 说明                                             |
| ----------- | -------------- | ----------------- | -------- | ------------------------------------------------ |
| series_id   | `number`       | -                 | ✅       | 系列ID                                           |
| name        | `string(50)`   | -                 | ✅       | 动漫名称                                         |
| description | `string(1000)` | -                 | ✅       | 动漫简介                                         |
| cover_url   | `string`       | -                 | ✅       | 动漫封面                                         |
| banner_url  | `string`       | -                 | ✅       | 动漫横幅                                         |
| remark      | `string(50)`   | -                 | -        | 动漫备注                                         |
| status      | `number`       | -                 | ✅       | 动漫状态 0-即将上线 1-连载中 2-已完结            |
| type        | `number`       | -                 | ✅       | 动漫类型 0-剧场版 1-日番 2-美番 3-国番 4-里番    |
| director    | `string(25)`   | -                 | -        | 动漫导演                                         |
| cv          | `string`       | -                 | -        | 动漫声优                                         |
| year        | `number`       | -                 | ✅       | 动漫发行年份 格式为YYYY                          |
| month       | `number`       | -                 | ✅       | 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番 |
| season_name | `string(10)`   | `'第${season}季'` | -        | 动漫季数名称                                     |
| season      | `number`       | -                 | ✅       | 动漫季数编号                                     |
| category    | `number[]`     | -                 | ✅       | 动漫分类，可指定多个分类id                       |

### 成功操作返回

```json
{
    "msg": "创建动漫成功",
    "code": 200
}
```

## 动漫列表

> scope >= 1 普通用户会限制部分内容的展示

```
POST    /list
```

### 参数说明

| 参数     | 类型              | 默认值         | 是否必填 | 说明                                             |
| -------- | ----------------- | -------------- | -------- | ------------------------------------------------ |
| page     | `number`          | 1              | -        | 分页，从 1 开始                                  |
| pageSize | `number`          | 10             | -        | 每页数量                                         |
| order    | `'DESC' \| 'ASC'` | `'DESC'`       | -        | 排序字段                                         |
| orderBy  | `string`          | `'created_at'` | -        | 排序方式                                         |
| keyword  | `string`          | -              | -        | 搜索关键字，搜索范围为`'name'、'director'、'cv'` |
| type     | `number[]`        | -              | -        | 动漫类型 0-剧场版 1-日番 2-美番 3-国番 4-里番    |
| status   | `number[]`        | -              | -        | 动漫状态 0-即将上线 1-连载中 2-已完结            |
| year     | `number[]`        | -              | -        | 动漫发行年份 格式为YYYY                          |
| month    | `number[]`        | -              | -        | 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番 |
| category | `number[]`        | -              | -        | 动漫分类，可指定多个分类id                       |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "获取动漫列表成功",
    "data": {
        "count": 1,
        "rows": [
            {
                "id": 1,
                "name": "动漫",
                "description": "我是动漫简介",
                "cover_url": "https://localhost.qnets.cn/2024/12/04/cover.jpg",
                "banner_url": "https://localhost.qnets.cn/2024/12/04/banner.jpg",
                "remark": null,
                "status": 2,
                "type": 3,
                "director": null,
                "cv": null,
                "year": 2023,
                "is_swiper": 0,
                "is_anime_guide": 0,
                "month": 3,
                "season": 1,
                "season_name": "第一季",
                "categories": [
                    {
                        "id": 1,
                        "name": "分类1"
                    },
                    {
                        "id": 2,
                        "name": "分类2"
                    }
                ],
                "created_at": "2024-12-05 19:26:04"
            }
        ]
    }
}
```

## 动漫删除 - 管理员

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
    "msg": "删除动漫成功"
}
```

## 修改动漫 - 管理员

> scope = 3

```
POST    /admin/edit
```

### 参数说明

| 参数        | 类型           | 默认值            | 是否必填 | 说明                                             |
| ----------- | -------------- | ----------------- | -------- | ------------------------------------------------ |
| id          | `number`       | -                 | ✅       | 动漫ID                                           |
| series_id   | `number`       | -                 | -        | 系列ID                                           |
| name        | `string(50)`   | -                 | -        | 动漫名称                                         |
| description | `string(1000)` | -                 | -        | 动漫简介                                         |
| cover_url   | `string`       | -                 | -        | 动漫封面                                         |
| banner_url  | `string`       | -                 | -        | 动漫横幅                                         |
| remark      | `string(50)`   | -                 | -        | 动漫备注                                         |
| status      | `number`       | -                 | -        | 动漫状态 0-即将上线 1-连载中 2-已完结            |
| type        | `number`       | -                 | -        | 动漫类型 0-剧场版 1-日番 2-美番 3-国番 4-里番    |
| director    | `string(25)`   | -                 | -        | 动漫导演                                         |
| cv          | `string`       | -                 | -        | 动漫声优                                         |
| year        | `number`       | -                 | -        | 动漫发行年份 格式为YYYY                          |
| month       | `number`       | -                 | -        | 动漫发行月份 0-一月番 1-四月番 2-七月番 3-十月番 |
| season_name | `string(10)`   | `'第${season}季'` | -        | 动漫季数名称                                     |
| season      | `number`       | -                 | -        | 动漫季数编号                                     |
| category    | `number[]`     | -                 | -        | 动漫分类，可指定多个分类id                       |

### 成功操作返回

```json
{
    "code": 200,
    "msg": "修改动漫成功"
}
```

## 动漫详情 - 管理员

> scope = 3

```
POST    /admin/detail
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 动漫ID |

### 成功操作返回

```json
{
    "msg": "修改动漫成功",
    "code": 200,
    "data": {
        "id": 1,
        "sid": 1,
        "season_name": "第一季",
        "created_at": "2024-12-21 03:19:57",
        "name": "无职转生：到了异世界就拿出真本事",
        "description": "一场车祸夺走了34岁无业家里蹲男青年的生命，当他再度苏醒之后，震惊的发现自己竟然穿越到了异世界中，附身在了一位名为鲁迪乌斯（内山夕实配音）的贵族少爷身上。面对这命运之神给予他的重新来过的机会，男子发誓这一世一定要拿出点真本事来认真的生活。然而，尽管鲁迪乌斯有着这般宏达的决心，但废柴大叔的本性却还是屡屡暴露。",
        "cover_url": "https://localhost.qnets.cn/2024/12/04/cover.jpg",
        "banner_url": "https://localhost.qnets.cn/2024/12/04/banner.jpg",
        "remark": "cc",
        "status": 2,
        "type": 1,
        "director": "冈本学",
        "cv": "内山夕实/小原好美/茅野爱衣/加隈亚衣/森川智之/金元寿子/Lynn/浪川大辅",
        "year": 2021,
        "month": 0,
        "season": 1,
        "play_count": "21035",
        "score_count": 0,
        "collection_count": 0,
        "score": null,
        "videos": [
            {
                "id": 1,
                "title": "你好世界",
                "episode": 1,
                "url": "https://localhost.qnets.cn/anime/01/index.m3u8",
                "play_count": 11112
            }
        ],
        "categories": [
            {
                "id": 1,
                "name": "异世界"
            },
            {
                "id": 2,
                "name": "冒险"
            }
        ],
        "related": [
            {
                "id": 2,
                "name": "无职转生Ⅱ ～到了异世界就拿出真本事～",
                "cover_url": "https://localhost.qnets.cn/2024/12/04/cover.jpg",
                "banner_url": "https://localhost.qnets.cn/2024/12/04/banner.jpg",
                "year": 2023,
                "month": 2,
                "cv": "内山夕实/杉田智和/白石晴香/小林优/羽多野涉/泽城千春/山本格/鸟海浩辅/上田丽奈/兴津和幸/茅野爱衣",
                "director": "平野宏树 ",
                "status": 2,
                "type": 1
            }
        ]
    }
}
```
