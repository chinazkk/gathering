const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    list:[{
      img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      name:'asd',

    },
    {
      img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      name:'asdw',
      
    },
   ],
   joingroup:[],
   mycreate:[],
   joinact:[]
  },

  login2(e) {
    var that=this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userInfo', res.userInfo)
              app.globalData.nickName = res.userInfo.nickName
              app.globalData.avatarUrl = res.userInfo.avatarUrl
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log(app.globalData.nickName)
              this.setData({
                nickname: app.globalData.nickName,
                avatarUrl:app.globalData.avatarUrl,
                
              })
              wx.showToast({
                title: '登陆成功',
                duration: 2000,
                success: function () {
                  // setTimeout(function () {
                  //   wx.navigateTo({
                  //     url: '/pages/myinfo/myinfo',
                  //   })
                  // }, 2000);
                  that.setData({
                    islogin:true
                  })
                }
              })
        
            }
          })
        }
      }
    })
  },
  login(e) {

    var that = this
    wx.login({
      success: function (res) {
        console.log(res);
        var code = res.code
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              var userinfo = res.userInfo
              console.log(userinfo);
              let url = app.globalData.URL + '/user/login';
              let data = {
                code: code,
                // nickname: userinfo.nickName,
                // head: userinfo.avatarUrl
              };
              util.post(url, data).then(function (res) {
                console.log('id', res)
                if (res.data.code == 200) {
                  that.setData({
                    userInfoAll: res.data.data
                  })
                  wx.setStorageSync({ //将用户信息存入缓存 名称为userinfo
                    key: "userInfo",
                    data: res.data.data
                  });
                  wx.showToast({
                    title: '登录成功！',
                    duration: 500,
                    success: function () {
                      setTimeout(function () {
                        wx.switchTab({
                          url: '/pages/index/index',
                        })
                        // wx.navigateBack({
                        //   delta:1
                        // })
                      }, 1000);
                    }

                  })
                } else {
                  wx.showToast({
                    title: '登录失败！',
                  })
                }
              })
            }
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.avatarUrl)
    let t=wx.getStorageSync('userInfo')
    this.setData({
      avatarUrl:t.avatarUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})