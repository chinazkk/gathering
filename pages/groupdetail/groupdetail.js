const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: [], //小组信息
    groupnum: '', //小组编号
    activityinfo: [], //活动
    talkinfo: [], //讨论
    imgurl: app.globalData.imgurl,
    test: [{
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ervn5p4iczibJjA5ZVRLibE4VwU7IMK9pkuP068LaAcjj7dHJVpuicppFeudLAs3Sj78cgHKUp92lJjaA/132'
      },
      {
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ervn5p4iczibJjA5ZVRLibE4VwU7IMK9pkuP068LaAcjj7dHJVpuicppFeudLAs3Sj78cgHKUp92lJjaA/132'
      }
    ]
  },
  toupdate() {  
    wx.navigateTo({
      url: '/pages/updategroup/updategroup?id=' + this.data.groupnum,
    })
  },
  tocreate() {
    wx.navigateTo({
      url: '/pages/createactivity/createactivity?id=' + this.data.groupnum,
    })
  },
  tojoindetail(e) {
    wx.navigateTo({
      url: '/pages/groupdeMate/groupdeMate?id=' + this.data.groupnum+'&userid='+e.currentTarget.dataset.userid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    console.log('detail', options.id)
    wx.setStorageSync('groupid', options.id)
    let ids = options.id
    var that = this
    //小组信息
    let url = app.globalData.URL + '/group';
    var data = {
      id: options.id
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        info: res.data.data,
        groupnum: ids
      })
    })
    //小组活动
    url = app.globalData.URL + '/group/activity/list';
    data = {
      group_id: options.id,
      limit: '2',
      page: '1'
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        activityinfo: res.data.data,
      })
    })
    //小组讨论
    url = app.globalData.URL + '/group/topic/list';
    data = {
      group_id: options.id,
      limit: '3',
      page: '1'
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        talkinfo: res.data.data,
      })
    })
    //小组参与者
    url = app.globalData.URL + '/group/join/user/list';
    data = {
      group_id: options.id,
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        joininfo: res.data.data,
        joinnum: res.data.data.length
      })
      wx.hideLoading()
    })
  },
  toactdetail(e) {
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  toallact(e) {
    wx.navigateTo({
      url: '/pages/groupdAct/groupdAct?id=' + this.data.groupnum,
    })
  },
  toalltalk(e) {
    wx.navigateTo({
      url: '/pages/groupdDiscuss/groupdDiscuss?id=' + this.data.groupnum,
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
    let t=wx.getStorageSync('groupid')
    console.log('other page group id',t)
    let tmp={}
    tmp.id=t
    this.onLoad(tmp)
  },
  onPullDownRefresh() {
   // this.onLoad()
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
    if (wx.getStorageSync('isCreateGroup')) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
    wx.removeStorageSync('groupid')
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