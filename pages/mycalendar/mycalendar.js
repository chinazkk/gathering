const app = getApp();
var util = require("../../script/utils.js");
Page({
  data: {
    TabCur: 0,
    needflesh: true,
    list: ['全部', '即将到来', '已过期'],
    imgurl: app.globalData.imgurl,
    currentpage: 1, //当前页数
    fleshlimit: '5', //每次刷新页数
    scrollLeft: 0,
    info: [{
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        name: 'asd',

      },
      {
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        name: 'asdw',

      },
      {
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        name: 'awdsd',

      }
    ]
  },
  toactdetail(e) {
    wx.navigateTo({
      url: '/pages/groupdetail2/groupdetail2?id=' + e.currentTarget.dataset.id,
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      currentpage:1,
      needflesh: true,
      // scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url = app.globalData.URL + '/group/activity/list';
    var data = {
      user_id: wx.getStorageSync('userId'),
      page: 1,
      limit: 5
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
         item.time = item.time.substring(0, 10)
       })
      that.setData({
        allactivity:test
      })
    })
    //即将到来
    url = app.globalData.URL + '/group/activity/list';
    data = {
      isExpired: 0,
      user_id: wx.getStorageSync('userId'),
      page: 1,
      limit: 5
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
         item.time = item.time.substring(0, 10)
       })
      that.setData({
        upcommingActivity:test
      })
      
    })
    //已过期

    url = app.globalData.URL + '/group/activity/list';
    data = {
      isExpired: 1,
      user_id: wx.getStorageSync('userId'),
      page: 1,
      limit: 5
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
         item.time = item.time.substring(0, 10)
       })
      that.setData({
        expiredActivity:test
      })
      wx.hideLoading()
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  choose(e){
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      currentpage:1,
      needflesh: true,
    })
  },
  onReachBottom: function () {
    var that = this
    if (that.data.needflesh) {
      if (that.data.TabCur == 0) {
        wx.showLoading({
          title: '加载中',
          mask:true // true 显示遮罩
        })
        console.log("上拉刷新0")
        let url = app.globalData.URL + '/group/activity/list';
        let data = {
          user_id: wx.getStorageSync('userId'),
          limit: that.data.fleshlimit,
          page: that.data.currentpage + 1
        }
        util.get(url, data).then(function (res) {
          console.log('flesh', res.data)
          wx.hideLoading()
          if (!res.data.data.length) {
            that.setData({
              needflesh: false
            })
          } else {
            let tmp = that.data.allactivity
            for (let i of res.data.data)
              tmp.push(i)
            that.setData({
              allactivity: tmp,
              currentpage: that.data.currentpage + 1
            })
          }
        })
      }
      else if(that.data.TabCur==1){
        wx.showLoading({
          title: '加载中',
          mask:true // true 显示遮罩
        })
        console.log("上拉刷新1")
        let url = app.globalData.URL + '/group/activity/list';
        let data = {
          isExpired: 0,
          user_id: wx.getStorageSync('userId'),
          limit: that.data.fleshlimit,
          page: that.data.currentpage + 1
        }
        util.get(url, data).then(function (res) {
          wx.hideLoading()
          console.log('flesh', res.data)
          if (!res.data.data.length) {
            that.setData({
              needflesh: false
            })
          } else {
            let tmp = that.data.upcommingActivity
            for (let i of res.data.data)
              tmp.push(i)
            that.setData({
              upcommingActivity: tmp,
              currentpage: that.data.currentpage + 1
            })
          }
        })
      }
      else{
        wx.showLoading({
          title: '加载中',
          mask:true // true 显示遮罩
        })
        console.log("上拉刷新2")
        let url = app.globalData.URL + '/group/activity/list';
        let data = {
          isExpired: 1,
          user_id: wx.getStorageSync('userId'),
          limit: that.data.fleshlimit,
          page: that.data.currentpage + 1
        }
        util.get(url, data).then(function (res) {
          wx.hideLoading()
          console.log('flesh', res.data)
          if (!res.data.data.length) {
            that.setData({
              needflesh: false
            })
          } else {
            let tmp = that.data.expiredActivity
            for (let i of res.data.data)
              tmp.push(i)
            that.setData({
              expiredActivity: tmp,
              currentpage: that.data.currentpage + 1
            })
          }
        })
      }
    }
  },
})