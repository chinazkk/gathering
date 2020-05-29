const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    groupnum:'',
    imgurl:app.globalData.imgurl
  },  
  toupdate(){
    wx.navigateTo({
      url: '/pages/updategroup/updategroup?id='+this.data.groupnum,
    })
  },
  tocreate(){
    wx.navigateTo({
      url: '/pages/createactivity/createactivity?id='+this.data.groupnum,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that=this
    let url = app.globalData.URL + '/group';
    var data = {
      id:options.id
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        info: res.data.data,
        groupnum:options.id
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
      this.onLoad()
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