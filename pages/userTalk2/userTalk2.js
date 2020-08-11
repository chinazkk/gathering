// pages/userTalk/userTalk.js
const app = getApp();
var util = require("../../script/utils.js");
var time = require("../../script/time.js");
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
Page({
  data: {
    messageinfo: [],
    currentpage: 1, //当前页数
    fleshlimit: '20', //每次刷新页数
    scrollHeight: '100vh',
    inputBottom: 0,
    input: ''
  },
  tomyinfo() {
    wx.navigateTo({
      url: '/pages/viewUserInfo/viewUserInfo?id=' + this.data.userInfo.id,
    })
  },
  toanoinfo() {
    wx.navigateTo({
      url: '/pages/viewUserInfo/viewUserInfo?id=' + this.data.anotherUser.id,
    })
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
  submit() {
    var that = this
    let url = app.globalData.URL + '/inform/message';
    var data = {
      content: this.data.input,
      to_id: this.data.anotherUser.id,
      from_id: this.data.userInfo.id
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '发送成功',
          duration: 2000,
        })
        that.setData({
          input: ''
        })
        that.secondload()
      }
    })
  },
  secondload() {
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    // initData(this);
    this.setData({
      cusHeadIcon: wx.getStorageSync('userInfo').avatarUrl,
      userid: wx.getStorageSync('userId'),
      talkid: that.data.talkid
    });
    //对话者的信息
    let url = app.globalData.URL + '/user';
    var data = {
      user_id: that.data.talkid,
    }
    util.get(url, data).then(function (res) {
      that.setData({
        anotherUser: res.data.data
      })
    })
    //自己的身份信息
    url = app.globalData.URL + '/user';
    data = {
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      that.setData({
        userInfo: res.data.data
      })
    })
    //消息列表
    url = app.globalData.URL + '/inform/message/list';
    data = {
      page: that.data.currentpage,
      limit: that.data.fleshlimit,
      id: that.data.talkid,
    }
    util.get(url, data).then(function (res) {
      console.log('message list', res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
        item.create_time = item.create_time.substring(5, 16)
      })
      console.log(test.length)
      //按時間排序
      for (var i = 0; i < test.length; i++) {
        for (var u = i + 1; u < test.length; u++) {
          if (test[i].create_time > test[u].create_time) {
            // console.log(test[i].create_time)
            var num = [];
            num = test[i];
            test[i] = test[u];
            test[u] = num;
          }
        }
      }
      for (var i = 0; i < test.length; i++) {
          var repTime = test[i].create_time.replace(/-/g, '/')
          test[i].formaltime = Date.parse(repTime) / 1000
      }

      that.setData({
        messageinfo: test
      })
      wx.hideLoading()
    })
  },
  getinput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  sorttime(a, b) {
    return a.create_time - b.create_time; //由低到高
    //return b.distance - a.distance;//由高到低
  },
  onLoad: function (options) {
    console.log('userid', options.id)
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    // initData(this);
    this.setData({
      cusHeadIcon: wx.getStorageSync('userInfo').avatarUrl,
      userid: wx.getStorageSync('userId'),
      talkid: options.id
    });
    //对话者的信息
    let url = app.globalData.URL + '/user';
    var data = {
      user_id: options.id,
    }
    util.get(url, data).then(function (res) {
      that.setData({
        anotherUser: res.data.data
      })
    })
    //自己的身份信息
    url = app.globalData.URL + '/user';
    data = {
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      that.setData({
        userInfo: res.data.data
      })
    })
    //消息列表
    url = app.globalData.URL + '/inform/message/list';
    data = {
      page: that.data.currentpage,
      limit: that.data.fleshlimit,
      id: options.id,
    }
    util.get(url, data).then(function (res) {
      console.log('message list', res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
        item.create_time = item.create_time.substring(5, 16)
      })
      console.log(test.length)
      //按時間排序
      for (var i = 0; i < test.length; i++) {
        for (var u = i + 1; u < test.length; u++) {
          if (test[i].create_time > test[u].create_time) {
            // console.log(test[i].create_time)
            var num = [];
            num = test[i];
            test[i] = test[u];
            test[u] = num;
          }
        }
      }
      for (var i = 0; i < test.length; i++) {
          var repTime = test[i].create_time.replace(/-/g, '/')
          test[i].formaltime = Date.parse(repTime) / 1000
      }

      that.setData({
        messageinfo: test
      })
      wx.hideLoading()
    })
  },

  /**
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
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