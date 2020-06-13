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
    fleshlimit: '7', //每次刷新页数
    imgurl: app.globalData.imgurl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
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
          url = app.globalData.URL + '/user';
          data = {
            user_id: i.user_id
          }
          util.get(url, data).then(function (res) {
            console.log(res.data.data.avatar)
            i.image=res.data.data.avatar
          })
        }
      }
      that.setData({
        message: tmp
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