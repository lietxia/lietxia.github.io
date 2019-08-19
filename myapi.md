# 【API】传入牌谱，返回牌谱信息

## 传入数据

    log = 牌谱代码

【例】假设API在 `https://majsoul.union-game.com/api/loginfo.php`  
则访问↓后，传回【返回数据】  
`https://majsoul.union-game.com/api/loginfo.php?log=190817-1af34433-ad42-4e73-bd64-1caf347da167`

## 返回数据(JSON格式)
    {
    "name1": "东1东家昵称",
    "name2": "东1南家昵称",
    "name3": "东1西家昵称",
    "name4": "东1北家昵称",
    "uid1": "123456",
    "uid2": "123456",
    "uid3": "123456", 
    "uid4": "123456",
    "start1": "25000",
    "start2": "25000",
    "start3": "25000",
    "start4": "25000",
    "end1": "30000",
    "end2": "31000",
    "end3": "20000",
    "end4": "24000",
    }

* `uid1` 指 `东1东家数字id`
* `start1` 指 `东1东家起始分数`
* `end1` 指 `东1东家起始分数`

------

# 【API】获取大会室牌谱
## 传入数据

    cs = 大会室数字代码 (cs = championship)

【例】假设API在 `https://majsoul.union-game.com/api/getcslog.php`  
则访问↓后，传回【返回数据】  
`https://majsoul.union-game.com/api/getcslog.php?cs=123456`

## 返回数据(JSON格式)
    [
        {
            "date": "2019-08-21 09:01",
            "log": "190817-1af34433-ad42-4e73-bd64-1caf347da167",
        },
        {
            "date": "2019-08-21 09:03",
            "log": "190817-1af34433-ad42-4e73-bd64-1caf347da167",
        },
        {
            "date": "2019-08-21 10:03",
            "log": "190817-1af34433-ad42-4e73-bd64-1caf347da167",
        }
    ]

* `log` 指 `牌谱`
* `date` 指 `时间`

※`[]`里面可以接很多个`{}`，就是`[{},{},{},{}]`这样的，详细的查一下JSON格式就懂了。

------

# 【API】输入昵称，获取数字ID

## 传入数据

    name = 昵称
    area = 地区(传入值:  china/japan/global)

【例】假设API在 `https://majsoul.union-game.com/api/getuid.php`  
则访问↓后，传回【返回数据】  
`https://majsoul.union-game.com/api/getuid.php?name=myname&area=china`

## 返回数据(JSON格式)
    {
       "state":"success",
       "uid":"123456"
    }

* `state` 指 `状态` ,返回值:是`success`(成功)或`failed`(失败)
* `uid` 指 `用户数字ID` (user id)
* 如果昵称不存在，这样返回： `{"state":"failed","uid":""}`

------

# 【API】输入数字ID，获取昵称

## 传入数据

    uid = 用户数字ID

【例】假设API在 `https://majsoul.union-game.com/api/getname.php`  
则访问↓后，传回【返回数据】  
`https://majsoul.union-game.com/api/getname.php?uid=123456`

## 返回数据(JSON格式)
    {
       "state":"success",
       "name":"myname",
       "area":"china"
    }

* `state` 指 `状态` ,返回值:是`success`(成功)或`failed`(失败)
* `name` 指 `用户名`
* `area` 指 `地区` (值: china/japan/global)
* 如果uid不存在，这样返回： `{"state":"failed","name":"","area":""}`

------

# 【API】开始一次比赛

## 传入数据

    uid = 用户数字ID (uid = user id)
    pw = 用户密码 (pw = password)
    cs = 大会室数字代码 (cs = championship)
    name1 = 东家昵称
    name2 = 南家昵称
    name3 = 西家昵称
    name4 = 北家昵称
    start1 = 东家起始分数
    start2
    start3
    start4


【例】假设API在 `https://majsoul.union-game.com/api/start.php`  
网址传输汉字的时候，会进行 `urlencode`（url编码）  
比如 `选手` 进行 `urlencode` 后，变为`%e9%80%89%e6%89%8b`  
大部分情况程序会自动解码，如果不解码，需要程序员折腾一下  
则访问↓后，传回【返回数据】  
`https://majsoul.union-game.com/api/start.php?uid=123456&pw=abcde&cs=123456&name1=%e9%80%89%e6%89%8bA&name2=%e9%80%89%e6%89%8bB&name3=%e9%80%89%e6%89%8bC&name4=%e9%80%89%e6%89%8bD&start1=25000&start2=25000&start3=25000&start4=25000`


## 返回数据(JSON格式)
    {
    "state":"success",
    "msg":"ok",
    }

* `state` 指 `状态` ,返回值:是`success`(成功)或`failed`(失败)
* `msg` 指 `消息` (message)
  
### msg返回值:

* `ok` (成功)
* `login error` (登录错误)※用户名或密码错误
* `permission denied`(权限不足)※用户不是那个大会室的管理方
* `member not found 1`(东家没有预约)
* `member not found 2`(南家没有预约)
* `member not found 3`(西家没有预约)
* `member not found 4`(北家没有预约)
* `number is too large`(分数过大)※比如起始分输入100000000000
* `others`(其他错误)※未定义的错误