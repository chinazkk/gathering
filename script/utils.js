//添加finally：因为还有一个参数里面还有一个complete方法。

const sigUtils = require('../utils/sigUtils.js')

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};
//封装异步api
const wxPromisify = fn => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

const getLocationPromisified = wxPromisify(wx.getLocation); //获取经纬度
const showModalPromisified = wxPromisify(wx.showModal); //弹窗

// 封装post请求
const post = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    var signdata=sigUtils.genSig('POST', url, data)
    wx.request({
      url: url,
      data: signdata,
      method: 'POST',
      header: {
        "content-type": "application/json",
        'cookie': wx.getStorageSync("sessionid"), //读取cookie
      },
      success: function (res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
// 封装get请求
const get = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    var signdata=sigUtils.genSig('GET', url, data)
    wx.request({
      url: url,
      data: signdata,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
        // 'token': wx.getStorageSync('token')
      },
      success: function (res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

const other = (url, data, method) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    var signdata=sigUtils.genSig(method, url, data)
    wx.request({
      url: url,
      data: signdata,
      method: method,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync("sessionid") //读取cookie
        // 'token': wx.getStorageSync('token')
      },
      success: function (res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

module.exports = {
  post,
  get,
  other,
  getLocationPromisified,
  showModalPromisified,
}