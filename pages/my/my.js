const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    list: [{
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        name: 'asd',

      },
      {
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        name: 'asdw',

      },
    ],
    joingroup: [],
    mycreate: [],
    joinact: [],
    imgurl: app.globalData.imgurl,
  },
  toCreateGroup(e){
    wx.navigateTo({
      url: '/pages/groupdetail/groupdetail?id'+e.currentTarget.dataset.id,
    })
  },
  toJoinGroup(e){
    wx.navigateTo({
      url: '/pages/groupdetail2/groupdetail2?id'+e.currentTarget.dataset.id,
    })
  },
  toActivity(e){
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id'+e.currentTarget.dataset.id,
    })
  },
  login2(e) {
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('userInfo', res.userInfo)
              let url2 = app.globalData.URL + '/user';
              var data = {
                // openid: "string",
                id: wx.getStorageSync('userId'),
                nick: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl,
                identity: 0,
                access_right: true,
                status: 0
              }
              util.other(url2, data, 'PUT').then(function (res) {
                console.log(res.data)
                if (res.data.code == 200) {
                  console.log('put info ')
                }
              })
              that.afterlogin()
              app.globalData.nickName = res.userInfo.nickName
              app.globalData.avatarUrl = res.userInfo.avatarUrl

              console.log(app.globalData.nickName)
              this.setData({
                nickname: app.globalData.nickName,
                avatarUrl: app.globalData.avatarUrl,
              })
              wx.showToast({
                title: '登陆成功',
                duration: 2000,
                success: function () {
                  that.setData({
                    islogin: true
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

                  let url2 = app.globalData.URL + '/group';
                  var data = {
                    // openid: "string",
                    id: wx.getStorageSync('userId'),
                    nick: res.data.data.nickName,
                    avatar: res.data.data.avatarUrl,
                    identity: 0,
                    access_right: true,
                    status: 0
                  }
                  util.other(url2, data, 'PUT').then(function (res) {
                    console.log(res.data)
                    if (res.data.code == 200) {
                      console.log('put info ')
                    }
                  })

                  wx.setStorageSync({ //将用户信息存入缓存 名称为userInfo
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
  //登录后 读取用户信息
  afterlogin() {
    //我创建的小组
    var that = this
    let url = app.globalData.URL + '/group/list';
    var data = {
      limit: '3',
      page: '1',
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      that.setData({
        myCreateGroup: res.data.data
      })
    })
     // 获取参加的小组
     url = app.globalData.URL + '/group/join/list';
     data = {
       limit: '3',
       page: '1',
       user_id: wx.getStorageSync('userId'),
     }
     util.get(url, data).then(function (res) {
       that.setData({
         myjoingroup: res.data.data
       })
     })
     // 获取用户创建的活动
     url = app.globalData.URL + '/group/activity/list';
     data = {
       limit: '3',
       page: '1',
       user_id: wx.getStorageSync('userId'),
     }
     util.get(url, data).then(function (res) {
       that.setData({
         myCreateActivity: res.data.data
       })
     })
     // 获取用户参加的活动
     url = app.globalData.URL + '/group/activity/join/list';
     data = {
       limit: '3',
       page: '1',
       user_id: wx.getStorageSync('userId'),
     }
     util.get(url, data).then(function (res) {
       that.setData({
         myJoinActivity: res.data.data
       })
     })
    //我的信息
    url = app.globalData.URL + '/user';
    data = {
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      that.setData({
        userinfodetail: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(app.globalData.avatarUrl)
    let t = wx.getStorageSync('userInfo')
    if (t) {
      this.setData({
        userinfo:t,
        avatarUrl: t.avatarUrl,
        islogin: true
      })
    }
    that.afterlogin()
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