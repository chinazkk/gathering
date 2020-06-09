/*
  sigUtils 爱码仕签名算法 v0.1.1.200609
  by SalzFischKatze 2020年6月9日
  仅限于学习研究使用
  QQ523301264
*/
const base64 = require('js-base64').Base64
const CryptoJS = require('crypto-js')
const binascii = require('binascii')

const key = '723a80b7adf38fc8'  // HmacSHA1密钥
// url编码替换的特殊字符
// %20 - py会将空格编码，js不会; %5C - py会将unicode编码为%5Cuxxxx，js为%uxxxx
const oldSym = ['\\*', '\\/', '\\-', '\\_', '\\.', '\\:', '%20', '%22', '\\+', '%5C', '%u']
const newSym = ['%2A', '%2F', '%2D', '%5F', '%2E', '%3A', '', '', '%2B', '%', 'u']

/** @description 生成签名
* @param {string} method - 网络请求的方法，例如’GET’、’POST’
* @param {string} url - 请求url，包括host，例如’https://gathering.chinazkk.cn/v1/’
* @param {Object} params - 请求参数的json形式
* @returns {Object} 原始请求参数中添加ts（时间戳）、sig（签名）字段后返回
*/
const genSig = function genSig (method, url, params) {
	// 拷贝params
	let origin_params = params
	// 生成当前时间戳
  let ts = new Date().getTime()
	// 对url及params进行url编码，替换部分特殊字符
  url = escape(url.replace(/\n/g, '').replace(/\r/g, '').replace(/\\/g, ''))
  params = escape(JSON.stringify(params).replace(/\n/g, '').replace(/\r/g, '').replace(/\\/g, ''))
  for (let i = 0; i < oldSym.length; i++) {
    url = url.replace(new RegExp(oldSym[i],'g'), newSym[i])
    params = params.replace(new RegExp(oldSym[i],'g'), newSym[i])
  }
	// 将method、url、params、ts用&拼接
  let comb = method + '&' + url + '&' + params + '&' + ts
	// 使用key对拼接后的字符串进行散列值计算
  let hmac_result = CryptoJS.HmacSHA1(comb, key).toString()
	// base64编码
  let sig = base64.btoa(binascii.unhexlify(hmac_result))
  // 添加ts、sig字段
	origin_params['ts'] = ts
  origin_params['sig'] = sig
  // 返回原始参数加上ts、sig字段
  console.log(origin_params)
	return origin_params
}

/** @description 验证签名
* @param {string} method - 网络请求的方法，例如’GET’、’POST’
* @param {string} url - 请求url，包括host，例如’https://gathering.chinazkk.cn/v1/’
* @param {Object} params - 请求参数的json形式，此处应包括ts（时间戳）、sig（签名）字段
* @returns {int} 验证通过:1; 验证不通过:0
*/
const chkSig = function genSig (method, url, params) {
  let ts, sig
  if (params['ts'] && params['sig']) {
    // 提取ts、sig字段
    ts = params['ts']
    sig = unescape(params['sig'])
  } else {
    return 40001
  }
	// 删除ts、sig字段后计算散列值
  delete params.ts
  delete params.sig
	// 对url及params进行url编码，替换部分特殊字符
  url = escape(url.replace(/\n/g, '').replace(/\r/g, '').replace(/\\/g, ''))
  params = escape(JSON.stringify(params).replace(/\n/g, '').replace(/\r/g, '').replace(/\\/g, ''))
  for (let i = 0; i < oldSym.length; i++) {
    url = url.replace(new RegExp(oldSym[i],'g'), newSym[i])
    params = params.replace(new RegExp(oldSym[i],'g'), newSym[i])
  }
	// 将method、url、params、ts用&拼接
  let comb = method + '&' + url + '&' + params + '&' + ts
	// 使用key对拼接后的字符串进行散列值计算
  let hmac_result = CryptoJS.HmacSHA1(comb, key).toString()
	// base64编码
  let chk = base64.btoa(binascii.unhexlify(hmac_result))
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
