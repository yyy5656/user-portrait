# 接口文档

v0.3

## 所有接口

**前缀默认： `124.223.53.120:8088`**

全部以 post 方式发送请求，默认方式是 json，有改变的我会加粗标注，我会写一些成功返回和失败返回的案例，但是失败可能有更多情况，具体失败都在
msg 里面可以自行查看。

## 登录部分

### 1. 注册 `/user/login`

参数：json

#### 发送

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

### 2. 注册前异步调用的接口，查看注册 `username` 是否会存在`/user/checkUsername`

参数：json

#### 发送

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

### 3. 注册 `/user/register`

> 上一个接口返回成功可使用才能调用！！！

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

### 4.查看已存在任务 `/user/getConnection`

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

只需要展示 tableName，你也可以写个序列标号给用户，但是不能用我这个的，之后点击进去之后的接口需要把 connetcionId 传给我

### 5.删除任务 `/user/deleteConnection`

参数：json+ token（来自登录模块）

#### 发送

```json
{
  "connectionId": "6"
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

```json
{
  "code": 400,
  "msg": "该任务不存在",
  "data": null
}
```

## 此后有两个方向，一个是点击某个已存在任务查看任务中具体属性（从接口 5.开始），一个是创建新的任务（从接口 7 开始）

### 6.获取已存在 connection 的 token（使用该 token 调用该任务的内容查询）`/user/chooseConnection`

参数：json+ token（来自登录模块）

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
  "msg": "传参缺少 ConnectionId",
  "data": null
}
```

### 7.获得指定任务已导入的属性和已导入数据行数 `/import/getLink`

（使用前需要接口 5）
参数： token（来自登录模块）

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": {
    "rowCount": 431,
    "links": [
      {
        "linkId": 55,
        "linkComment": "省区",
        "connectionId": 7,
        "linkType": 1
      },
      {
        "linkId": 56,
        "linkComment": "姓名",
        "connectionId": 7,
        "linkType": 0
      },
      {
        "linkId": 57,
        "linkComment": "性别",
        "connectionId": 7,
        "linkType": 1
      },
      {
        "linkId": 58,
        "linkComment": "民族",
        "connectionId": 7,
        "linkType": 1
      },
      {
        "linkId": 59,
        "linkComment": "专业志愿",
        "connectionId": 7,
        "linkType": 0
      }
    ]
  }
}
```

### 8.创建任务（与后面接口先后调用）`/user/createConnection`

参数： json+token（来自登录模块）

#### 发送

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

获取新的 token 后保存，之后针对与这个新任务的调用，需要使用这个 token，当然这个 token 也可以用在之前的需要 token 的接口之中使用

### 9.上传文件并返回属性字段（使用上一个接口的新 token，前后调用） `/import/getProperty`

参数：formdata + token（来自登录模块）

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
            "categoryName": "排名",
            "categoryType": 0
          },
          {
            "categoryIndex": 1,
            "categoryName": "姓名",
            "categoryType": 1
          },
          {
            "categoryIndex": 2,
            "categoryName": "性别",
            "categoryType": 1
          },
          {
            "categoryIndex": 3,
            "categoryName": "学号",
            "categoryType": 0
          }
        ]
      }
    ]
  }
}
```

获得的内容除了 sheetIndex 和 categoryIndex 不能展示给用户，其他内容都展示，因为后面都作为可选参数进入导入，注意参数 dataLine 表示一个 sheet 共几行。

<img src="https://pic.imgdb.cn/item/642531d9a682492fccf46871.jpg">

如图展示为"dataLine": 4，下一个接口在导入时需要前端设置 start 和 end 的范围在 [2,4]，可以提供给用户一个““全部导入”的按钮，一次性导入全部行，默认为 [2，dataLine]，start 的 1 不能选的原因在于，图中第一行为属性，不为真正的数据，所有不能选择
注意：这个接口调用一次，下一个接口才能调用一次，因为这个接口是缓存数据吗，下一个接口的调用会删除缓存

### 10.导入已选属性 `import/importPropertyByLine`

与上一个接口前后调用
参数：json+ token（来自登录模块）参数来源上个属性的选择，start 最低为 2，end 最高为 dataline 的值

#### 发送

根据接口 9 的返回值进行发送。

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": null
}
```

### 11.删除任务的属性 `/import/removeProperty`（原 13 号端口）

参数：json+ token（来自登录模块）

### 发送

```json
{
  "linkId": "5"
}
```

参数从接口 7，token 还是以上两种情况，属于已经封装 connctionId 在 token 的情况

#### 成功返回

```json
{
  "code": 200,
  "msg": null,
  "data": null
}
```

#### 失败返回

```json
{
  "code": 400,
  "msg": "该属性不存在无法删除",
  "data": null
}
```

### 12.补充新的属性 `/import/addData`(原 17 号端口)

与 9 号接口前后调用，参数来自 9 号接口和 7 接口.

```json
"primaryLink": {
        "linkId": 48,
        "linkComment": "学号",
        "connectionId": 6,
        "linkType": 0
    },
```

是选择已经导入的属性作为主键，这里是选择学号，需要前端调 7 号接口让用户选，

```json
"primaryCategory": {
        "categoryIndex": 3,
        "categoryName": "学号",
        "categoryType": 0
    },
```

是选择 excel 表的属性作为上面主键的对应值，系统会一一对应导入，调 9 号接口让用户选。

参数：json+ token（来自登录模块）

```json
"category": [
        {
            "categoryIndex": 0,
            "categoryName": "排名",
            "categoryType": 0
        },
        {
            "categoryIndex": 1,
            "categoryName": "姓名",
            "categoryType": 1
        },
        {
            "categoryIndex": 2,
            "categoryName": "性别",
            "categoryType": 1
        }
    ]
```

是来自 9 号接口，切记！！！！上面选过的 primaryCategory 就不能再放进来了，选择的属性与之前已经存在的属性不要相同，否则会重复导入，前端注意一下！

#### 发送

完整参数如下：

```json
{
  "sheetIndex": 0,
  "primaryLink": {
    "linkId": 48,
    "linkComment": "学号",
    "connectionId": 6,
    "linkType": 0
  },
  "primaryCategory": {
    "categoryIndex": 3,
    "categoryName": "学号",
    "categoryType": 0
  },
  "category": [
    {
      "categoryIndex": 0,
      "categoryName": "排名",
      "categoryType": 0
    },
    {
      "categoryIndex": 1,
      "categoryName": "姓名",
      "categoryType": 1
    },
    {
      "categoryIndex": 2,
      "categoryName": "性别",
      "categoryType": 1
    }
  ]
}
```

#### 成功返回

会由两个数组`unMatchPrimaryKey` 和 `unImportDataList`，`unMatchPrimaryKey` 是数据库中未匹配的选择主键内容，比如 2019210967 这个学号数据库中有而 excel 表新增数据没有，则会返回 2019210967 在数组里面，`unImportDataList` 是 excel 表中有而数据库没有对应的内容，会返回为失败未导入，前端都展示提醒下。

然后就是新接口我在 apifox 都标注了新，属性都分为了 名词性属性 和 数值性属性，对应我说的一个是划分区间，一个是根据名词分类，分组不需要保留了但是需要对每一张生成图所需信息进行保留，以便下次登录还能重现已生成图表，这个接口我需要与前端敲定如何保存。

待续

### 13.导入已选属性 `import/importPropertyByLine` （原 18 号端口）

与上一个接口前后调用
参数：json+ token（来自登录模块）

#### 成功返回

#### 失败返回

### 14.导入已选属性 `import/importPropertyByLine` （原 19 号端口）

与上一个接口前后调用

参数：json+ token（来自登录模块）

#### 成功返回

#### 失败返回
