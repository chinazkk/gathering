const app = getApp();
var util = require("../../script/utils.js");
var time = require("../../script/time.js");
const sigUtils = require('../../utils/sigUtils.js')
Page({
  data: {
    motto: 'Hello World',
    fleshpage: '3',
    currentpage: 1,
    userInfo: {},
    activity: [],
    mygroup: [],
    hotactivity: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgurl: app.globalData.imgurl,
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
  onPullDownRefresh() {
    this.onLoad()
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
    //获取我的小组
    let url = app.globalData.URL + '/group/list';
    // var data = sigUtils.genSig('GET', url,
    // {
    //   limit: '4',
    //   page: '1',
    //   user_id: wx.getStorageSync('userId'),
    // })
    var data = {
      limit: '3',
      page: '1',
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      that.setData({
        mygroup: res.data.data
      })
    })
    //获取首页轮播图
    url = app.globalData.URL + '/group/list';
    data = {
      limit: '3',
      page: '1',
      isHot:'1'
    }
    util.get(url, data).then(function (res) {
      // console.log(res.data)
      that.setData({
        hotgroup: res.data.data
      })
    })
    //获取人气总榜
    url = app.globalData.URL + '/group/activity/list';
    data = {
      limit: '3',
      page: '1',
      isExpired:0,
      isHot: '1'
    }
    util.get(url, data).then(function (res) {
      // console.log(res.data)
      let tmp = res.data.data
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      // console.log("当前时间戳为：" + timestamp);
      var n = timestamp * 1000;
      var date = new Date(n);
      //年  
      var Y = date.getFullYear();
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      //时  
      var h = date.getHours();
      //分  
      var m = date.getMinutes();
      //秒  
      var s = date.getSeconds();
      var nowtime = Y +"-" + M +"-" + D +" " + h + ":" + m + ":" + s
      console.log(nowtime)
      for (let i of tmp) {
        i.lasttime = that.checkDate(nowtime, i.time)
      }
      that.setData({
        hotactivity: tmp
      })
    })

  },
  checkDate: function (startTime, endTime) {
    //日期格式化
    var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var ms = end_date.getTime() - start_date.getTime();
    //转换成天数
    var day = parseInt(ms / (1000 * 60 * 60 * 24));
    //do something
    // console.log("day = ", day);
    return day

  },

  todetail(e) {
    console.log('index', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/groupdetail/groupdetail?id=' + e.currentTarget.dataset.id,
    })
  },
  toswiperdetail(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/groupdetail2/groupdetail2?id=' + e.currentTarget.dataset.id,
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
  toactdetail(e) {
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  jump(e) {
    var tmp = e.currentTarget.dataset.id;

  },
  onShow() {
    this.onLoad()
  }
})