# 接口文档

###### v0.2

## 所有接口

前缀默认： 124.223.53.120:8088

全部以 post 方式发送请求，默认方式是 json，有改变的我会加粗标注，我会写一些成功返回和失败返回的案例，但是失败可能有更多情况，具体失败都在
msg 里面可以自行查看。

## 登录部分

1. 注册 `/user/login`

参数：json

```json
{
  "username": "hkw",
  "password": "123"
}
```

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODA3MTI1ODQsInVzZXJJZCI6IjEiLCJzdGF0dXMiOiJsb2dpbiIsInVzZXJuYW1lIjoiaGt3In0.S1GUBewbC-_XYSs9gY9Swm-pA2JPbb3DUUMO6k5Od2w"
}
```

> 注：data 里面是需要保存的 token 字符串，在我标注需要 token 的接口我会增加（token）的标识，需要在请求头中增添
> token：`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODA3MTI1ODQsInVzZXJJZCI6IjEiLCJzdGF0dXMiOiJsb2dpbiIsInVzZXJuYW1lIjoiaGt3In0.S1GUBewbC-\_XYSs9gY9Swm-pA2JPbb3DUUMO6k5Od2w`

#### 失败返回

```json
{
  "code": 200,
  "msg": null,
  "data": "用户名或密码错误"
}
```

2. 注册前异步调用的接口，查看注册 `username` 是否会存在

参数：json

```json
{
  "username": "hkw"
}
```

#### 成功返回

```json
{
  "code": 200,
  "msg": "用户名：hk1w 可以使用",
  "data": null
}
```

#### 失败返回

```json
{
  "code": 400,
  "msg": "用户名：hkw 已存在",
  "data": null
}
```

3. 注册 `/user/register` （上一个接口返回成功可使用才能调用！！！）

参数：json

```json
{
  "username": "h1w",
  "password": "123"
}
```

#### 成功返回

```json
{
  "code": 201,
  "msg": "注册成功，请返回登录界面登录",
  "data": null
}
```

## 登录模块之后就是进入 任务模块，可以查看存在的任务（非具体查看，只能展示名称信息），并且可以创建新任务（connection）

4.查看已存在任务 `/user/getConnection`


参数： token（来自登录模块）

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": [
    {
      "connectionId": 2,
      "userId": 1,
      "tableName": "何科伟的测试表",
      "linkName": null
    },
    {
      "connectionId": 3,
      "userId": 1,
      "tableName": "何科伟的测试表",
      "linkName": null
    },
    {
      "connectionId": 4,
      "userId": 1,
      "tableName": "何科伟的测试表",
      "linkName": null
    }
  ]
}
```

只需要展示 `tableName`，你也可以写个 1，2，3 给用户，但是不能用我这个的，之后点击进去之后的接口需要把 `connectionId` 传给我

5. 获取已存在 connection 的 token（使用该 token 调用该任务的内容查询）`/user/chooseConnection`

参数：`json+ token`（来自登录模块）

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb25uZWN0aW9uSWQiOiIxIiwiZXhwIjoxNjgwODUwMDU2LCJ1c2VySWQiOiIxIiwic3RhdHVzIjoiY29ubmVjdGlvbiIsInVzZXJuYW1lIjoiaGt3In0.lrr_NiIg1FA6CuIxyDg3M1muRwgmmRXuGmzIY4xderc"
}
```

使用该 token 调用查看具体某任务的内容或者进行修改等行为

#### 失败返回

```json
{
  "code": 500,
  "msg": "传参缺少ConnectionId",
  "data": null
}
```

6. 获得指定任务已导入的属性 `/import/getLink` （使用前需要接口 5）

参数： token（来自登录模块）

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": [
    {
      "linkId": 5,
      "linkComment": "排名",
      "connectionId": 2
    },
    {
      "linkId": 6,
      "linkComment": "姓名",
      "connectionId": 2
    },
    {
      "linkId": 7,
      "linkComment": "性别",
      "connectionId": 2
    },
    {
      "linkId": 8,
      "linkComment": "学号",
      "connectionId": 2
    },
    {
      "linkId": 9,
      "linkComment": "成绩",
      "connectionId": 2
    }
  ]
}
```

7. 创建任务（与后面接口先后调用）`/user/createConnection`

参数： json+token（来自登录模块）

```json
{
  "tableName": "何科伟的测试表"
}
```

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb25uZWN0aW9uSWQiOiI1IiwiZXhwIjoxNjgwNzEzODg2LCJ1c2VySWQiOiIxIiwic3RhdHVzIjoiY29ubmVjdGlvbiIsInVzZXJuYW1lIjoiaGt3In0.xDcs7AVohSwHYTUhYszX2cSA7kkfXuuE_cSDBStg378"
}
```

获取新的 token 后保存，之后针对与这个新任务的调用，需要使用这个 token，当然这个 token 也可以用在之前的需要 token 的接口之中

8. 上传文件并返回属性字段（使用上一个接口的新 token，前后调用） `/import/getProperty`
   参数：`formdata + token`（来自登录模块）

<img src="https://pic.imgdb.cn/item/64253349a682492fccf63695.jpg">

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "fileName": "data1.xlsx",
    "sheetList": [
      {
        "sheetIndex": 0,
        "sheetName": "Sheet1",
        "dataLine": 4,
        "categoryList": [
          {
            "categoryIndex": 0,
            "categoryName": "排名"
          },
          {
            "categoryIndex": 1,
            "categoryName": "姓名"
          },
          {
            "categoryIndex": 2,
            "categoryName": "性别"
          },
          {
            "categoryIndex": 3,
            "categoryName": "学号"
          }
        ]
      }
    ]
  }
}
```

获得的内容除了 `sheetIndex` 和 `categoryIndex`
不能展示给用户，其他内容都展示，因为后面都作为可选参数进入导入，注意参数 `dataLine` 表示一个 sheet 共几行.

<img src="https://pic.imgdb.cn/item/642531d9a682492fccf46871.jpg">

如图展示为`"dataLine": 4`，下一个接口在导入时需要前端设置 start 和 end 的范围在 [2,4]
，可以提供给用户一个““全部导入”的按钮，一次性导入全部行，默认为 [2，dataLine]，start 的 1 不能选的原因在于，图中第一行为属性，不为真正的数据，所有不能选择。

> 注意：这个接口调用一次，下一个接口才能调用一次，因为这个接口是缓存数据吗，下一个接口的调用会删除缓存

9. 导入已选属性 `import/importPropertyByLine ` 与上一个接口前后调用

参数：json+ token（来自登录模块）参数来源上个属性的选择，start 最低为 2，end 最高为 `dataline` 的值。

```json
{
  "start": "2",
  "end": "3",
  "sheetIndex": 0,
  "category": [
    {
      "categoryIndex": 0,
      "categoryName": "排名"
    },
    {
      "categoryIndex": 1,
      "categoryName": "姓名"
    },
    {
      "categoryIndex": 2,
      "categoryName": "性别"
    },
    {
      "categoryIndex": 3,
      "categoryName": "学号"
    }
  ]
}
```

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": null
}
```

#### 失败返回

---

暂时到这，后面有点问题

10. 新增数据（就是添加数据，可以是后补属性如成绩等，也可以是补数据行）`/import/addDataByLine`
    该接口是在新任务的第一次数据导入完成后使用，使用前必须使用一次 接口 6. ！！！！，原因在接口 6 的注意中。

参数：json+ token（来自登录模块）

```json
{
  "start": "3",
  "end": "4",
  "sheetIndex": 0,
  "category": [
    {
      "categoryIndex": 0,
      "categoryName": "排名"
    },
    {
      "categoryIndex": 1,
      "categoryName": "姓名"
    },
    {
      "categoryIndex": 2,
      "categoryName": "性别"
    },
    {
      "categoryIndex": 3,
      "categoryName": "学号"
    }
  ]
}
```

#### 成功返回

#### 失败返回

11. 导入已选属性 `import/importPropertyByLine` 与上一个接口前后调用
    参数：json+ token（来自登录模块）

#### 成功返回

#### 失败返回

12. 导入已选属性 `import/importPropertyByLine` 与上一个接口前后调用
    参数：json+ token（来自登录模块）

#### 成功返回

#### 失败返回

13. 导入已选属性 import/importPropertyByLine 与上一个接口前后调用
    参数：json+ token（来自登录模块）

#### 成功返回

#### 失败返回
