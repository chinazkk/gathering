/*
  sigUtils 爱码仕签名算法 v0.1.0.200607
  by SalzFischKatze 2020年6月7日
  仅限于学习研究使用
  QQ523301264
*/
const base64 = require('js-base64').Base64
const CryptoJS = require('crypto-js')
const binascii = require('binascii')

const key = '723a80b7adf38fc8'  // HmacSHA1密钥
// url编码替换的特殊字符
const oldSym = ['\\*', '\\/', '\\-', '\\_', '\\.', '\\:', '%22', '\\+']
const newSym = ['%2A', '%2F', '%2D', '%5F', '%2E', '%3A', '', '%2B']

/** @description 生成签名
* @param {string} method - 网络请求的方法，例如’GET’、’POST’
* @param {string} url - 请求url，包括host，例如’https://gathering.chinazkk.cn/v1/’
* @param {Object} params - 请求参数的json形式
* @returns {Object} 原始请求参数中添加ts（时间戳）、sig（签名）字段后返回
*/
const genSig = function genSig (method, url, params) {
	// 拷贝params
	var origin_params = params
	// 生成当前时间戳
  var ts = new Date().getTime()
	// 对url及params进行url编码，替换部分特殊字符
  url = escape(url.replace(/\n/g, '').replace(/\r/g, ''))
  params = escape(JSON.stringify(params).replace(/\n/g, '').replace(/\r/g, ''))
  for (var i = 0; i < oldSym.length; i++) {
    url = url.replace(new RegExp(oldSym[i],'g'), newSym[i])
    params = params.replace(new RegExp(oldSym[i],'g'), newSym[i])
  }
	// 将method、url、params、ts用&拼接
  var comb = method + '&' + url + '&' + params + '&' + ts
	// 使用key对拼接后的字符串进行散列值计算
  var hmac_result = CryptoJS.HmacSHA1(comb, key).toString()
	// base64编码
  var sig = base64.btoa(binascii.unhexlify(hmac_result))
  // 添加ts、sig字段
	origin_params['ts'] = ts
  origin_params['sig'] = sig
  // 返回原始参数加上ts、sig字段
	return origin_params
}

/** @description 验证签名
* @param {string} method - 网络请求的方法，例如’GET’、’POST’
* @param {string} url - 请求url，包括host，例如’https://gathering.chinazkk.cn/v1/’
* @param {Object} params - 请求参数的json形式，此处应包括ts（时间戳）、sig（签名）字段
* @returns {int} 验证通过:1; 验证不通过:0
*/
const chkSig = function genSig (method, url, params) {
  // 提取ts、sig字段
	var ts = params['ts']
	var sig = unescape(params['sig'])
  delete params.ts
  delete params.sig
	// 对url及params进行url编码，替换部分特殊字符
  url = escape(url.replace(/\n/g, '').replace(/\r/g, ''))
  params = escape(JSON.stringify(params).replace(/\n/g, '').replace(/\r/g, ''))
  for (var i = 0; i < oldSym.length; i++) {
    url = url.replace(new RegExp(oldSym[i],'g'), newSym[i])
    params = params.replace(new RegExp(oldSym[i],'g'), newSym[i])
  }
	// 将method、url、params、ts用&拼接
  var comb = method + '&' + url + '&' + params + '&' + ts
  console.log(comb)
	// 使用key对拼接后的字符串进行散列值计算
  var hmac_result = CryptoJS.HmacSHA1(comb, key).toString()
	// base64编码
  var chk = base64.btoa(binascii.unhexlify(hmac_result))
	// 验证通过返回1，不通过返回0
  if (chk == sig) {
		return 1
  } else {
		return 0
  }
}

module.exports = {
  genSig: genSig,
  chkSig: chkSig
}
