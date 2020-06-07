const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check1: false,
    check2: false,
    name: '',
    loc: '',
    info: '',
    tag: ''
  },
  getname(e) {
    let t='userinfo.nick'
    this.setData({
      [t]: e.detail.value
    })
  },
  getloc(e) {
    let t='userinfo.location'
    this.setData({
      [t]: e.detail.value
    })
  },
  getinfo(e) {
    let t='userinfo.introduction'
    this.setData({
      [t]: e.detail.value
    })
  },
  gettag(e) {
    let t='userinfo.tags'
    this.setData({
      [t]: e.detail.value
    })
  },
  check1(e) {
    this.setData({
      check1: !this.data.check1
    })
  },
  check2(e) {
    this.setData({
      check2: !this.data.check2
    })
  },

  saveinfo(e) {
    let url = app.globalData.URL + '/user';
    var data = {
      id: this.data.groupnum,
      name: this.data.info.name,
      introduction: this.data.info.introduction,
      number: this.data.info.number,
      question: this.data.info.question,
      image: this.data.info.image
    }
    util.other(url, data, 'PUT').then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '提交成功',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }, 2000);
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let url = app.globalData.URL + '/user';
    util.get(url, {}).then(function (res) {
      console.log(res.data)
      that.setData({
        userinfo:res.data.data
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