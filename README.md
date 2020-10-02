# Gathering
一款线上活动组团微信小程序

## 微信
![](https://github.com/939682389/gathering/blob/master/WechatIMG12.jpeg)

## 运行环境
- uWSGI、Nginx
- MySQL >=5.1
- python >=3.5

## 签名算法
`sigUtils` 爱码仕签名算法 `v0.1.2.200610`
by `SalzFischKatze` 2020年6月10日 仅限于学习研究使用 `QQ523301264`
- 引用方法 `require('../utils/sigUtils.js')`
```javascript
/** @description 验证签名
* @param {string} method - 网络请求的方法，例如’GET’、’POST’
* @param {string} url - 请求url，包括host，例如’https://gathering.cooltian.cn/v1’
* @param {Object} params - 请求参数的json形式，此处应包括ts（时间戳）、sig（签名）字段
* @returns {int} 验证通过:1; 验证不通过:0
*/
```

## 功能
- 小组创建
- 活动创建
- 用户聊天
- 消息通知

## 小程序介绍
### 功能界面
![](https://github.com/939682389/gathering/blob/master/WX20201002-132028@2x.png)

### 小程序二维码
![](https://github.com/939682389/gathering/blob/master/gh_791e99b5bf4a_258.jpg)

### 后台界面
![](https://github.com/939682389/gathering/blob/master/WX20201002-132441@2x.png)

## 后端介绍
### 技术栈
- python
- flask
- SQLAlchemy
- RESTPlus
