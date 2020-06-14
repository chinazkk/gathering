const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentpage: 1, //当前页数
    fleshlimit: '6', //每次刷新页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获得私信列表
    let url = app.globalData.URL + '/user';
    let data = {
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        userinfo: res.data.data
      })
      wx.setNavigationBarTitle({
        title: res.data.data.nick
      })
    })
    //获取私信列表
    url = app.globalData.URL + '/inform/message/list';
    data = {
      id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        letter: res.data.data,
        limit: that.data.fleshlimit,
        page: that.data.currentpage
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