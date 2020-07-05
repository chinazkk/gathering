const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: ['排序', '参与人数', '最新发布'],
    tagindex: 0,
    visible: false,
    flag:0
  },
  cut(e) {
    var that=this
    console.log(this.data.chooseindex)
    let url = app.globalData.URL + '/group/join';
    let data = {
      id: this.data.chooseindex
    }
    util.other(url, data, 'DELETE').then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '移除成功',
          duration: 2000,
          success: function () {
            // setTimeout(function () {
            //   wx.switchTab({
            //     url: '/pages/index/index',
            //   })
            // }, 2000);
            that.secondload()
            that.setData({
              visible:false
            })
          }
        })
      } else {
        wx.showToast({
          title: '失败',
          image: '/images/fail.png',
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
  handleShow: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      chooseindex: e.currentTarget.dataset.id
    })
    this.setData({
      visible: true
    });
  },
  cancel() {
    this.setData({
      visible: false
    });
  },
  handleCancel: function () {
    this.setData({
      visible: false
    });
  },

  choose(e) {
    this.setData({
      tagindex: e.currentTarget.dataset.id
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  touserinfo(e){
    wx.navigateTo({
      url: '/pages/viewUserInfo/viewUserInfo?id='+e.currentTarget.dataset.id,
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //小组信息
    let tmpuserid=options.userid
    console.log('tmpuserid',tmpuserid)
    let ableFlag=wx.getStorageSync('userId')==options.userid?'1':'0'
    let url = app.globalData.URL + '/group/join/user/list';
    var data = {
      group_id: options.id
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        joininfo: res.data.data,
        groupnum: options.id,
        flag:ableFlag
      })
    })
  },
  secondload(){
    var that = this
    //小组信息
    let url = app.globalData.URL + '/groupjoin/user/list';
    var data = {
      group_id: this.data.groupnum
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        joininfo: res.data.data,
        // groupnum: options.id
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