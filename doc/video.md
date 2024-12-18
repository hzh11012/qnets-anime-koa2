## 接口前缀

```shell
http://localhost:5200/api/video
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

# 视频

## 添加视频 - 管理员

> scope = 3

```
POST    /admin_create
```

### 参数说明

| 参数    | 类型         | 默认值 | 是否必填 | 说明         |
| ------- | ------------ | ------ | -------- | ------------ |
| id      | `number`     | -      | ✅       | 动漫ID       |
| title   | `string(50)` | -      | ✅       | 视频标题     |
| url     | `string`     | -      | ✅       | 视频链接     |
| episode | `number`     | -      | ✅       | 视频集数编号 |

### 成功操作返回

```json
{
    "msg": "添加视频成功",
    "code": 200,
    "errorCode": 0
}
```

## 视频播放

> scope = 1

```
POST    /play
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 视频id |

### 成功操作返回

```json
{
    "msg": "播放视频成功",
    "code": 200,
    "errorCode": 0
}
```

## 视频删除 - 管理员

> scope = 3

```
POST    /admin_delete
```

### 参数说明

| 参数 | 类型     | 默认值 | 是否必填 | 说明   |
| ---- | -------- | ------ | -------- | ------ |
| id   | `number` | -      | ✅       | 视频id |

### 成功操作返回

```json
{
    "msg": "删除视频成功",
    "code": 200,
    "errorCode": 0
}
```
