// pages/updateinfo/updateinfo.js
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
    this.setData({
      name: e.detail.value
    })
  },
  getloc(e) {
    this.setData({
      loc: e.detail.value
    })
  },
  getinfo(e) {
    this.setData({
      info: e.detail.value
    })
  },
  gettag(e) {
    this.setData({
      tag: e.detail.value
    })
  },
  check1(e) {
    console.log('wd')
    this.setData({
      check1: !this.data.check1
    })
  },
  check2(e) {
    this.setData({
      check2: !this.data.check2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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