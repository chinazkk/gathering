// api地址
// var apiUrl = "http://127.0.0.1:5000/v1"
// module.exports = {
//   apiList: {
//     user: apiUrl + '/user',
//     form: apiUrl + '/form'
//   },
// }

//模版
// wx.request({
//   url: config.apiList.user,
//   data: {},
//   header: {
//     'cookie': wx.getStorageSync("sessionid"), //读取cookie
//     "content-type": "application/json"
//   },
//   method: 'GET',
//   success: function (res) {
//     console.log(getCurrentPages()[getCurrentPages().length - 1].route + " request success", res.data)
//     if (res.data.code == 200) {

//     } else {
//       wx.showToast({
//         title: res.data.message,
//         icon: "none"
//       })
//     }
//   },
//   fail: function (res) {
//     console.log(getCurrentPages()[getCurrentPages().length - 1].route + " request fail", res.data)
//   },
//   complete: function (res) { },
// })
  