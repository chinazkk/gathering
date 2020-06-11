const app = getApp();
var util = require("../../script/utils.js");
var time = require("../../script/time.js");
Page({

  data: {
    thumb: 1,
    text: '',
    test:[{
      thumb:1
    }],
    talkinfo: []
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  gettext(e) {
    this.setData({
      text: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  tothumb(e){
    var that = this
    let url = app.globalData.URL + '/group/topic/praise';
    let t=e.currentTarget.dataset.index
    var data = {
     id:e.currentTarget.dataset.id
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      let tmp='talkinfo['+t+'].praise'
      if (res.data.code == 200) {
        that.setData({
          [tmp]:true
        })
        wx.showToast({
          title: '点赞成功',
          duration: 2000,
          success: function () {}
        })
      } else {
        wx.showToast({
          title: '提交失败',
          image: '/img/fail.png',
          icon: 'success',
          duration: 2000
        })
      }
    }).catch(function (res) {
      console.log(res)
      wx.showToast({
        title: '提交失败！',
        icon: 'success',
        duration: 2000
      })
    })
  },
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    this.setData({
      groupnum: options.id
    })
    let url = app.globalData.URL + '/group/topic/list';
    let url2 = app.globalData.URL + '/group/topic/praise';
    let data = {
      group_id: options.id,
      limit: '10',
      page: '1'
    }
    
    util.get(url, data).then(function (res) {
      let tmp = res.data.data
      for (let i of tmp) {
        i.lasttime = time.formatMsgTime(i.create_time)
      }
      that.setData({
        talkinfo: tmp,
      })
    })
  },
  secondload() {
    var that = this
    let url = app.globalData.URL + '/group/topic/list';
    let data = {
      group_id: this.data.groupnum,
      limit: '10',
      page: '1'
    }
    util.get(url, data).then(function (res) {
      let tmp = res.data.data
      for (let i of tmp) {
        i.lasttime = time.formatMsgTime(i.create_time)
      }
      that.setData({
        talkinfo: tmp,
      })
    })
  },
  commit(e) {
    var that = this
    let url = app.globalData.URL + '/group/topic';
    var data = {
      content: that.data.text,
      group_id: that.data.groupnum,
      user_id: wx.getStorageSync('userId')
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {

        wx.showToast({
          title: '提交成功',
          duration: 2000,
          success: function () {}
        })
        that.secondload()
      } else {
        wx.showToast({
          title: '提交失败',
          image: '/img/fail.png',
          icon: 'success',
          duration: 2000
        })
      }
    }).catch(function (res) {
      console.log(res)
      wx.showToast({
        title: '提交失败！',
        icon: 'success',
        duration: 2000
      })
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