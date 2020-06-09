const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    list: [{
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        name: 'asd',

      },
      {
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        name: 'asdw',

      },
    ],
    joingroup: [],
    mycreate: [],
    joinact: [],
    imgurl: app.globalData.imgurl,
  },
  getmessage(e) {
    this.setData({
      message: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    // console.log(app.globalData.avatarUrl)
    // let t = wx.getStorageSync('userInfo')
    // if (t) {
    //   this.setData({
    //     avatarUrl: t.avatarUrl,
    //     islogin: true
    //   })
    // }

    // 获取创建的小组
    let url = app.globalData.URL + '/group/list';
    var data = {
      limit: '6',
      page: '1',
      user_id: options.id,
    }
    util.get(url, data).then(function (res) {
      that.setData({
        mycreategroup: res.data.data
      })
    })
    // 获取参加的小组
    url = app.globalData.URL + '/group/join/list';
    data = {
      limit: '6',
      page: '1',
      user_id: options.id,
    }
    util.get(url, data).then(function (res) {
      that.setData({
        myjoingroup: res.data.data
      })
    })
    // 获取用户创建的活动
    url = app.globalData.URL + '/group/activity/list';
    data = {
      limit: '6',
      page: '1',
      user_id: options.id,
    }
    util.get(url, data).then(function (res) {
      that.setData({
        myCreateActivity: res.data.data
      })
    })
    // 获取用户参加的活动
    url = app.globalData.URL + '/group/activity/join/list';
    data = {
      limit: '6',
      page: '1',
      user_id: options.id,
    }
    util.get(url, data).then(function (res) {
      that.setData({
        myJoinActivity: res.data.data
      })
    })
    //获取浏览用户信息
    url = app.globalData.URL + '/user';
    data = {
      user_id: options.id
    }
    util.get(url, data).then(function (res) {
      that.setData({
        userinfo: res.data.data
      })
    })

  },
  //点击按钮弹窗指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });

  },
  //确认  
  confirm: function () {
    var that = this
    this.setData({
      hiddenmodalput: true
    })
    let url = app.globalData.URL + '/inform/message';
    var data = {
      content:this.data.message,
      to_id:this.data.userinfo.id,
      from_id:wx.getStorageSync('userId')
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '私信成功',
          duration: 2000,
        })
      } 
    })
  },
  message(e) {

  },
  //我创建的小组
  toactdetail(e) {
    wx.navigateTo({
      url: '/pages/groupdetail/groupdetail?id=' + e.currentTarget.dataset.id,
    })
  },

  //我加入的小组
  toactdetail2(e) {
    wx.navigateTo({
      url: '/pages/groupdetail2/groupdetail2?id=' + e.currentTarget.dataset.id,
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