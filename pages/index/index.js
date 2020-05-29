const app = getApp();
var util = require("../../script/utils.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    mygroup: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgurl:app.globalData.imgurl,
    group: [{
      id: 0,
      name: '123',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 0,
      name: '456',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, ],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }],
  },
  tocreate() {
    wx.navigateTo({
      url: '/pages/creategroup/creategroup',
    })
  },
  topop() {
    wx.navigateTo({
      url: '/pages/poprank/poprank',
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    let url = app.globalData.URL + '/group/activity/list';
    var data = {
      limit: '1',
      page: '1',
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        mygroup: res.data.data
      })
    })

  },
  todetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/groupdetail/groupdetail?id='+e.currentTarget.dataset.id,
    })
  },
  toswiperdetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/groupdetail/groupdetail?id='+e.currentTarget.dataset.id,
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jump(e) {
    var tmp = e.currentTarget.dataset.id;

  },
  onShow(){
		this.onLoad()
	}
})