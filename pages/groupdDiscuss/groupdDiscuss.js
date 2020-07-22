const app = getApp();
var util = require("../../script/utils.js");
var time = require("../../script/time.js");
Page({
  data: {
    thumb: 1,
    text: '',
    test: [{
      thumb: 1
    }],
    talkinfo: [],
    showDel: true,
    hiddenmodalput: true,
    message: ''
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

  talkback: function (e) {
    console.log(e.currentTarget.dataset.userid)
    this.setData({
      chooseindex: e.currentTarget.dataset.id,
      visible: true
    })

    if (e.currentTarget.dataset.userid == this.data.userid) {
      this.setData({
        showDel: true
      })
    } else {
      this.setData({
        showDel: false
      })
    }
  },
  getmessage(e) {
    this.setData({
      message: e.detail.value
    })
  },
  //点击按钮弹窗指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      visible: !this.data.visible
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  reply() {
    var that = this
    let url = app.globalData.URL + '/group/topic';
    var data = {
      content: that.data.message,
      group_id: that.data.groupnum,
      topic_id: that.data.chooseindex,
      user_id: that.data.userid
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        that.setData({
          message: '',
          text: '',
          hiddenmodalput: true
        })
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
  handleCancel: function () {
    this.setData({
      visible: false
    });
  },
  delmessage(e){
    var that = this
    let url = app.globalData.URL + '/group/topic';
    var data = {
      topic_id: this.data.chooseindex
    }
    util.other(url, data, 'DELETE').then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '删除回复成功',
          duration: 2000,
          success: function () {
            console.log('cancel topic success')
          }
        })
        that.setData({
          visible:false
        })
        that.secondload()
      }
    })
  },
  tothumb(e) {
    var that = this
    let url = app.globalData.URL + '/group/topic/praise';
    let t = e.currentTarget.dataset.index
    var data = {
      id: e.currentTarget.dataset.id
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      let tmp = 'talkinfo[' + t + '].praise'
      if (res.data.code == 200) {
        that.secondload()
        that.setData({
          [tmp]: true
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
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });

    console.log(options.id)
    wx.setStorageSync('groupid', options.id)
    this.setData({
      groupnum: options.id
    })
    let url = app.globalData.URL + '/group/topic/list';
    let data = {
      group_id: options.id,
      limit: '10',
      page: '1'
    }

    util.get(url, data).then(function (res) {
      let tmp = res.data.data
      for (let i of tmp) {
        i.lasttime = time.formatMsgTime(i.create_time)
        for (let j of i.reply)
          j.lasttime = time.formatMsgTime(j.create_time)
      }
      that.setData({
        talkinfo: tmp,
        userid: wx.getStorageSync('userId')
      })
      wx.hideLoading()
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
        for (let j of i.reply)
          {
            j.lasttime = time.formatMsgTime(j.create_time)
          }
      }
      that.setData({
        talkinfo: tmp,
      })
    })
  },
  //普通评论 不是评论回复
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
        that.setData({
          text: ''
        })
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