const app = getApp();
var util = require("../../script/utils.js");
var time = require("../../script/time.js");
Page({
  // 通知类型
  // 0-小组审核 
  // 1-站内好友私信
  // 2-提醒：即将参加的活动
  // 3-参加小组的公告和活动提醒
  // 4-已参加/已过期
  // 5-讨论被回复点赞

  /**
   * 页面的初始数据
   */
  data: {
    currentpage: 1, //当前页数
    fleshlimit: '6', //每次刷新页数
    imgurl: app.globalData.imgurl,
    needflesh: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    //获取通知列表
    let url = app.globalData.URL + '/inform/list';
    var data = {
      limit: that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      let tmp = res.data.data
      for (let i of tmp) {
        i.lasttime = time.formatMsgTime(i.create_time)
        if (i.image == null) {
          if (i.user.avatar.length > 40)
            i.image = i.user.avatar
          else
            i.image = 'https://gathering.chinazkk.cn/v1/user/img?url=' + i.user.avatar
        } else {
          if (i.image.length < 40)
            i.image = 'https://gathering.chinazkk.cn/v1/user/img?url=' + i.image
        }
      }
      that.setData({
        message: tmp
      })
      wx.hideLoading()
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
    var that = this
    if (that.data.needflesh) {
      console.log("上拉刷新")
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      //获取通知列表
      let url = app.globalData.URL + '/inform/list';
      var data = {
        limit: that.data.fleshlimit,
        page: that.data.currentpage+1
      }
      util.get(url, data).then(function (res) {
        let tmp = that.data.message
        if(res.data.data.length==0)
        {
          console.log('no other message')
          that.setData({
            needflesh:false
          })
        }
        for (let i of res.data.data) {
          i.lasttime = time.formatMsgTime(i.create_time)
          if (i.image == null) {
            if (i.user.avatar.length > 40)
              i.image = i.user.avatar
            else
              i.image = 'https://gathering.chinazkk.cn/v1/user/img?url=' + i.user.avatar
          } else {
            if (i.image.length < 40)
              i.image = 'https://gathering.chinazkk.cn/v1/user/img?url=' + i.image
          }
          tmp.push(i)
        }
        that.setData({
          message: tmp,
          currentpage:that.data.currentpage+1
        })
        wx.hideLoading()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})